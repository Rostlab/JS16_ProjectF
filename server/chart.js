// function to parse string in the format 2006-01-02 to JavaScript's Date type
var parseDate = d3.time.format("%Y-%m-%d").parse;
// Hourly Data e.g. 2005-01-02T03
var parseDetailDate = d3.time.format("%Y-%m-%dT%H").parse;

var parseYearMonth = d3.time.format("%Y-%m").parse;

// returns the month string used in our csvs
function stringMonth(month) {
  month++; // Our csv month starts at 1, JavaScript month at 0
  if (month > 9) {
    return month;
  } else {
    return "0" + month;
  }
}

// returns the characterChart
function characterChart(svg, dataURL, startDate, endDate) {
  var self = this;
  var zoom = d3.behavior.zoom(); // plot zooming behavior
  var drag = d3.behavior.drag(); // drag behavior scrollbar
  this.xDomainBounds = []; // Range of shown data
  this.resize = render; // Resizing behaviour
  this.episodeData = null;
  this.ready = 0;
  this.factor = 0; // Screen size factor
  this.dx = 0;
  this.detailData = []; // This is where I'd save my monthly csvs... If I had any
  this.fullYDomain = [];
  this.hourlyFullYDomain = [0, 0];
  this.hourly = false; // Hourly or monthly data shown?
  // startDate & endDate are optional parameters. Default values will be overwritten later.
  this.startDate = startDate;
  this.endDate = endDate;

  // Get CSV prefix
  function getPrefix() {
    var path = dataURL.split("/");
    path.pop();
    var s = "";
    for (var i = 0; i < path.length; i++) {
      s += path[i] + "/";
    }
    return s;
  }

  function getDetailPrefix() {
    var prfx = getPrefix();
    var slug = dataURL.split(prfx)[1].split(".csv")[0];
    return prfx + slug + "/";
  }

  // set margin
  var margin = {
    top: 30,
    right: 20,
    bottom: 85,
    left: 50
  };

  // calculate height and width from svg size
  function getSize() {
    var svgHeight = parseInt(svg.style('height'), 10),
      svgWidth = parseInt(svg.style('width'), 10);

    return {
      height: svgHeight - margin.top - margin.bottom,
      width: svgWidth - margin.left - margin.right
    };
  }

  // define axis
  var x = d3.time.scale()
    .range([0, getSize().width]),
    y = d3.scale.linear()
      .range([getSize().height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom")
    .outerTickSize(0),
    yAxis = d3.svg.axis().scale(y).orient("left")
      .outerTickSize(0);

  // Since there is only width-resizing: Define the number of yAxis-ticks according to screen size.
  // Default value is 10. Suitable for most cases.
  if (getSize().height < 200) {
    yAxis.ticks(6);
  } else if (getSize().height < 300) {
    yAxis.ticks(8);
  }

  // Seperate axis for episodes
  var eAxis = d3.svg.axis().scale(x).orient("top").tickSize(0, 0);

  // Seperate "scroll" axis for full domain
  var scrollScale = d3.time.scale().range([0, getSize().width]);
  var scrollAxis = d3.svg.axis().scale(scrollScale).outerTickSize(0).orient("bottom");

  // positive area between x-axis at y=0 and max(y)
  var calcAreaPos = d3.svg.area()
    .x(function (d) {
      return x(d.date);
    }).y0(function (d) {
      return y(0);
    }).y1(function (d) {
      return y(d.pos);
    });

  // negative area between x-axis at y=0 and min(y)
  var calcAreaNeg = d3.svg.area()
    .x(function (d) {
      return x(d.date);
    }).y0(function (d) {
      return y(d.neg);
    }).y1(function (d) {
      return y(0);
    });

  // trendline
  var calcTrend = d3.svg.line()
    .interpolate("basis-open")
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.pos + d.neg);
    });

  // Outer container for the timeline
  var container = svg.append("g")
    .attr("width", getSize().width)
    .attr("height", getSize().height)
    .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

  // Create a background area
  var plot = container.append("g");
  var background = plot.append("rect")
    .attr("class", "react background")
    .attr("width", getSize().width)
    .attr("height", getSize().height);

  // Create area-dividing line
  var y0line = plot.append("line")
    .attr("x1", "0")
    .attr("x2", getSize().width)
    .style("stroke", "#000");

  // create group for chart within svg
  var chart = plot.append("g")
    .attr("class", "react")
    .attr("clip-path", "url(#clip)");

  // Define the visible area for the plot & eLabel (needs clip path because of customized tick values)
  var clipper = container.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("x", background.attr("x"))
    .attr("y", background.attr("y") - margin.top) // for eLabel
    .attr("width", background.attr("width"))
    .attr("height", background.attr("height") + margin.top);

  // For yAxis animations
  var svgClipper = container.append("defs").append("clipPath")
    .attr("id", "svgclip")
    .append("rect")
    .attr("x", -margin.left)
    .attr("y", -margin.top)
    .attr("width", parseInt(svg.style('width'), 10))
    .attr("height", parseInt(svg.style('height'), 10) - 40);

  // add area elements
  var pos = chart.append("path").attr("class", "area pos"),
    neg = chart.append("path").attr("class", "area neg");

  // add trendline
  var trendline = chart.append("path").attr("class", "trendline noshow");

  // add error field
  var errMsg = plot.append("foreignObject")
    .attr("class", "noaction")
    .attr("width", getSize().width - 20)
    .attr("height", getSize().height - 10)
    .attr("x", 20)
    .attr("y", 10);

  // add about field
  var aboutMsg = container.append("g")
    .attr("clip-path", "url(#clip)")
    .append("g")
    .attr("class", "aboutmsg invisible")
    .attr("transform", "translate(70,10)");

  // Adding about field elements the old fashioned way
  {
    aboutMsg.append("rect")
      .attr("width", 160)
      .attr("height", 95);

    aboutMsg.append("circle")
      .attr("cx", 12)
      .attr("cy", 12)
      .attr("r", 6)
      .attr("class", "area pos");

    aboutMsg.append("circle")
      .attr("cx", 12)
      .attr("cy", 30)
      .attr("r", 6)
      .attr("class", "area neg");

    aboutMsg.append("circle")
      .attr("cx", 12)
      .attr("cy", 48)
      .attr("r", 6)
      .attr("fill", "#f5f5f5")
      .attr("fill-opacity", 0.8);

    aboutMsg.append("text")
      .attr("transform", "translate(24,18)")
      .text("Positive score");
    aboutMsg.append("text")
      .attr("transform", "translate(24,36)")
      .text("Negative score");
    aboutMsg.append("text")
      .attr("transform", "translate(24,54)")
      .text("Accumulated trend");
    aboutMsg.append("text")
      .attr("transform", "translate(6,80)")
      .attr("font-style", "italic")
      .text("Optimized for Chrome");
  }

  // add scroll bar
  var scrollbar = container.append("rect")
    .attr("class", "scrollbar")
    .attr("x", -10)
    .attr("y", getSize().height + 40)
    .attr("width", getSize().width)
    .attr("height", 6)
    .attr("rx", 10);
  var scrollknob = container.append("rect")
    .attr("class", "scrollknob")
    .attr("y", getSize().height + 38)
    .attr("height", 10);

  // add axis label elements
  var xLabel = container.append("g").attr("class", "x axis")
    .attr("transform", "translate(0," + (getSize().height) + ")"),
    yLabel = container.append("g").attr("class", "y axis").attr("clip-path", "url(#svgclip)");
  var eLabel = container.append("g").attr("class", "x axis").attr("clip-path", "url(#clip)");
  var scrollLabel = container.append("g").attr("class", "scroll axis")
    .attr("transform", "translate(0," + (getSize().height + 50) + ")");

  // add right border
  var rightBorder = container.append("rect")
    .attr("x", getSize().width)
    .attr("height", getSize().height)
    .attr("width", 1)
    .style("fill", "#000");

  // add Trendline-Button
  var trendButton = container.append("g")
    .attr("transform", "translate(10, " + (getSize().height - 30) + ")")
    .attr("class", "trendbutton");

  // add About-Button
  var aboutButton = container.append("g")
    .attr("transform", "translate(10, " + 10 + ")")
    .attr("class", "trendbutton");

  // add Data-Type-Label
  var dataTypeLabel = container.append("g")
    .attr("transform", "translate(10, " + (getSize().height - 55) + ")")
    .attr("class", "trendbutton noaction");

  function convertTwitterCSV(d) {
    var tmp = parseDate(d.date);
    //var offset = tmp.getTimezoneOffset() * 60 * 1000;
    //tmp.setTime(tmp.getTime() + offset);
    return {
      date: tmp, // parse date column to Date
      pos: +d.pos, // convert pos column to positive number
      neg: -d.neg // convert neg column to negative number
    };
  }

  // Hourly data
  function convertDetailTwitterCSV(d) {
    // Conversion to Eastern Time
    var tmp = parseDetailDate(d.date);
    //tmp.setTime(tmp.getTime() - (5 * 60 * 60 * 1000));
    //var offset = tmp.getTimezoneOffset() * 60 * 1000;
    //tmp.setTime(tmp.getTime() + offset);
    return {
      date: tmp, // parse date column to Date
      pos: +d.pos, // convert pos column to positive number
      neg: -d.neg // convert neg column to negative number
    };
  }

  function convertEpisodesCSV(d) {
    var tmp = parseDate(d.date);
    //var offset = tmp.getTimezoneOffset() * 60 * 1000;
    //tmp.setTime(tmp.getTime() + offset);
    return {
      date: tmp,
      code: d.code,
      title: d.title,
      seasonStartLabel: function () {
        var arr = d.code.split("E");
        if (parseInt(arr[1]) === 1) {
          return "Season " + (arr[0].split("S"))[1];
        }
        return "";
      }()
    };
  }

  // Fills in missing csv data
  function assignDefaultValues(error, data) {
    if (!!error) {
      errorMessage();
      return;
    }
    var newData = [];
    var dateRange = d3.extent(data, function (d) {
      return new Date(d.date);
    });
    dateRange[0].setDate(dateRange[0].getDate() - 1);

    var sortByDate = function (a, b) {
      return a.date > b.date ? 1 : -1;
    };
    var stepdate = new Date(dateRange[0]);

    for (var i = 0; i < data.length;) {
      //console.log(data[i].date + " "+ stepdate);
      if ((data[i].date - stepdate) === 0) {
        stepdate.setDate(stepdate.getDate() + 1);
        i++;
      } else {
        while (data[i].date.valueOf() > stepdate.valueOf()) {
          newData.push({
            date: new Date(stepdate), // Screw closures!
            pos: 0,
            neg: 0
          });
          stepdate.setDate(stepdate.getDate() + 1);

        }
      }
    }
    // Add "buffer entry" on the right
    newData.push({
      date: new Date(stepdate), // Screw closures!
      pos: 0,
      neg: 0
    });

    fillChart(data.concat(newData).sort(sortByDate));
  }

  // Fills in missing csv data for hourly values
  function assignDetailDefaultValues(error, data) {
    if (!!error) {
      // No data here ¯\_(ツ)_/¯ Let's create some
      // Getting a usable date from the error response url
      data = [];
      data[0] = {};
      data[0].date = parseYearMonth(error.responseURL.split(getDetailPrefix())[1].split(".csv")[0]);
    }
    var newData = [];
    var dateRange = function () {
      var dfloor = new Date(data[0].date);
      var dtop = new Date(data[0].date);
      dfloor.setDate(1);
      dfloor.setHours(0);
      dtop.setMonth(dtop.getMonth() + 1);
      dtop.setDate(0);
      dtop.setHours(23);
      return [dfloor, dtop];
    }();
    var sortByDate = function (a, b) {
      return a.date > b.date ? 1 : -1;
    };
    var stepdate = new Date(dateRange[0]);

    for (var i = 0; i < data.length;) {
      if ((data[i].date - stepdate) === 0) {
        stepdate.setHours(stepdate.getHours() + 1);
        i++;
      } else {
        while (data[i].date.valueOf() > stepdate.valueOf()) {
          newData.push({
            date: new Date(stepdate), // Screw closures!
            pos: 0,
            neg: 0
          });
          stepdate.setHours(stepdate.getHours() + 1);
        }
      }
    }
    while (stepdate.valueOf() < dateRange[1].valueOf()) {
      newData.push({
        date: new Date(stepdate), // Screw closures!
        pos: 0,
        neg: 0
      });
      stepdate.setHours(stepdate.getHours() + 1);
    }

    var datestring = dateRange[0].getFullYear() + "-" + stringMonth(dateRange[0].getMonth());
    var index = detailDataExists(datestring)[0];
    self.detailData[index].data = data.concat(newData).sort(sortByDate);
    recalc();
  }

  function fillChart(data) {
    // xDomainBounds: Max range of scrollable graph area. At least slightly before the first season, up until today.
    // We should extend the graph all the way back even if there's no data, to show that Twitter didn't care back then.
    self.xDomainBounds = [new Date(2010, 8, 1), new Date()];

    // Set initial domain. If not defined during the call: All the available data.
    if (typeof self.startDate === "undefined") {
      self.startDate = new Date(2014, 0, 1);
    }
    if (typeof self.endDate === "undefined") {
      self.endDate = self.xDomainBounds[1];
    }

    // Other start domain if there's less than three months of data
    var range = d3.extent(data, function (d) {
      return new Date(d.date);
    });
    if (range[1] - range[0] < 3 * 30 * 86400000) {
      self.startDate = range[0];
      self.endDate = range[1];
    }

    x.domain([self.startDate, self.endDate]);
    scrollScale.domain(self.xDomainBounds);

    // y from min(neg) to max(pos)
    self.fullYDomain = [d3.min(data, function (d) {
      return Math.min(-5.5, d.neg * 1.1); // Minimum domain = [-5.5;+5.5], always at least 10% headroom
    }), d3.max(data, function (d) {
      return Math.max(5.5, d.pos * 1.1);
    })];
    y.domain(self.fullYDomain);
    //y.nice();
    yLabel.call(yAxis);

    // set area data
    pos.datum(data);
    neg.datum(data);
    trendline.datum(data);

    self.allData = data;

    go();
  }

  function handleEpisodes(error, data) {
    if (!!error) {
      // Error message doesn't make sense for this case, but normally the episodes.csv should never be missing.
      errorMessage();
      return;
    }
    self.episodeData = data;

    // Create episode "lines" in graph
    plot.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "episode react")
      .attr("clip-path", "url(#clip)")
      .attr("y", 0)
      .attr("height", getSize().height);

    eAxis.tickValues(function () {
      var a = [];
      for (var i = 0; i < data.length; i++) {
        a.push(data[i].date);
      }
      return a;
    });

    go();
  }

  function zoomed() {
    if (x.domain()[0] < self.xDomainBounds[0]) {
      zoom.translate([zoom.translate()[0] - x(self.xDomainBounds[0]) + x.range()[0], 0]);
    } else if (x.domain()[1] > self.xDomainBounds[1]) {
      zoom.translate([zoom.translate()[0] - x(self.xDomainBounds[1]) + x.range()[1], 0]);
    }
    recalc();
  }

  // Operations which are needed for drawing & resizing the graph
  function render() {
    var s = getSize();
    x.range([0, s.width]);
    y.range([s.height, 0]);
    scrollScale.range([0, s.width]);
    background.attr("width", s.width);
    clipper.attr("width", s.width);
    plot.attr("width", s.width);
    rightBorder.attr("x", s.width);
    y0line.attr("x2", s.width)
      .attr("y1", y(0))
      .attr("y2", y(0));
    scrollbar.attr("width", s.width + 20);
    errMsg.attr("width", s.width - 20);

    // Ensure zooming functionality after resizing
    var currentDomain = x.domain()[1] - x.domain()[0],
      minScale = currentDomain / (self.xDomainBounds[1] - self.xDomainBounds[0]), // All the available data
      maxScale = currentDomain / (1000 * 60 * 60 * 5); // 5 hours
    zoom.scaleExtent([minScale, maxScale])
      .x(x);

    // Improved screen size factor
    if (s.width < 400) {
      self.factor = 1 / 8;
    } else if (s.width < 600) {
      self.factor = 0.30;
    } else if (s.width < 800) {
      self.factor = 1 / 2;
    } else if (s.width < 1200) {
      self.factor = 3 / 4;
    } else {
      self.factor = 1;
    }
    xAxis.ticks(Math.min(3, 10 * self.factor));

    // Recalculate DOM element positions only if there's actual data
    if (self.ready === 2) {
      recalc();
    }
  }

  // Returns array [integer, boolean]
  // integer: array index of entry if it exists, else -1
  // boolean: entry already has data value
  function detailDataExists(datestring) {
    for (var i = 0; i < self.detailData.length; i++) {
      if (self.detailData[i].name === datestring) {
        if (self.detailData[i] && self.detailData[i].data !== undefined) {
          return [i, true];
        }
        return [i, false];
      }
    }
    return [-1, false];
  }


  // Operations which are needed for drawing, resizing & zooming
  function recalc() {
    var hourlyMode = self.hourly;
    var dmn = x.domain();
    var dmnMonth = [dmn[0].getMonth(), dmn[1].getMonth()];
    var dmnYear = [dmn[0].getFullYear(), dmn[1].getFullYear()];
    var relevantData;
    var newData = false;

    // Helper Functions for Filter
    function dmnfilterDays(d) {
      if (d.date.valueOf() > (dmn[1].valueOf() + 3 * 86400000) || d.date.valueOf() < (dmn[0].valueOf() - 3 * 86400000)) {
        return false;
      }
      return true;
    }

    function dmnfilterHours(d) {
      if (d.date.valueOf() > (dmn[1].valueOf() + 3 * 3600000) || d.date.valueOf() < (dmn[0].valueOf() - 3 * 3600000)) {
        return false;
      }
      return true;
    }

    // Less than one month to show?
    if ((dmn[1] - dmn[0]) <= (30 * 86400000)) {
      var dtl0filename = dmnYear[0] + "-" + stringMonth(dmnMonth[0]);
      var dtl0 = detailDataExists(dtl0filename);
      // Data for two months needed?
      if (dmnMonth[0] !== dmnMonth[1]) {
        var dtl1filename = dmnYear[1] + "-" + stringMonth(dmnMonth[1]);
        var dtl1 = detailDataExists(dtl1filename);
        // Entry existing already?
        if (dtl0[0] > -1 && dtl1[0] > -1) {
          if (dtl0[1] && dtl1[1]) {
            // Filter only if data ready
            var emptycheck = self.detailData[dtl1[0]].data.filter(function (d) {
              if (d.pos !== 0 || d.neg !== 0) {
                return true;
              } else {
                return false;
              }
            });
            if (emptycheck.length === 0) {
              relevantData = self.detailData[dtl0[0]].data;
            } else {
              relevantData = self.detailData[dtl0[0]].data.concat(self.detailData[dtl1[0]].data);
            }
            relevantData = relevantData.filter(dmnfilterHours);
            hourlyMode = true;
            newData = true;
          }
        } else {
          // Data not existing yet.
          if (dtl0[0] === -1) {
            // Lower month missing. Create entry, fill it with data in assignDefaultValues
            self.detailData.push({
              "name": dtl0filename,
              "data": []
            });
            d3.csv(getDetailPrefix() + dtl0filename + ".csv", convertDetailTwitterCSV, assignDetailDefaultValues);
          }
          if (dtl1[0] === -1) {
            // Higher month missing. Create entry, fill it with data in assignDefaultValues
            self.detailData.push({
              "name": dtl1filename,
              "data": []
            });
            d3.csv(getDetailPrefix() + dtl1filename + ".csv", convertDetailTwitterCSV, assignDetailDefaultValues);
          }
          // Exit function execution. New data will come.
          return;
        }
      } else {
        // Only data for one month needed
        // Entry existing already?
        if (dtl0[0] > -1) {
          if (dtl0[1]) {
            // Filter only if data ready
            relevantData = self.detailData[dtl0[0]].data.filter(dmnfilterHours);
            hourlyMode = true;
            newData = true;
          }
        } else {
          // Data not existing yet
          self.detailData.push({
            "name": dtl0filename,
            "data": []
          });
          d3.csv(getDetailPrefix() + dtl0filename + ".csv", convertDetailTwitterCSV, assignDetailDefaultValues);
          // Exit function execution. New data will come.
          return;
        }
      }
    } else {
      // More than one month to show. Display daily data.
      relevantData = self.allData.filter(dmnfilterDays);
      hourlyMode = false;
    }

    pos.datum(relevantData);
    neg.datum(relevantData);
    trendline.datum(relevantData);

    // Update hourlyFullYDomain when switchting from daily to hourly or new data is available
    if ((hourlyMode && newData) || (hourlyMode && self.hourlyMode === false)) {
      var visibleDomain = [d3.min(relevantData, function (d) {
        return Math.min(-5.5, d.neg * 1.1); // Minimum domain = [-5.5;+5.5], always at least 10% headroom
      }), d3.max(relevantData, function (d) {
        return Math.max(5.5, d.pos * 1.1);
      })];

      // Update only if new max
      var tmp = self.hourlyFullYDomain;
      self.hourlyFullYDomain = d3.extent(self.hourlyFullYDomain.concat(visibleDomain), function (d) {
        return d;
      });
      if (tmp !== self.hourlyFullYDomain) {
        y.domain(self.hourlyFullYDomain);
        y0line.attr("y1", y(0))
          .attr("y2", y(0));
        yLabel.transition().duration(300).call(yAxis);
      }
    }

    // Have we switched from Daily to Hourly View or vice versa?
    if (hourlyMode !== self.hourly) {
      if (hourlyMode === true) {
        // Switched to hourly mode
        // Fancy animation
        dataTypeLabel.select("text").text("Score / Hour");
        dataTypeLabel.transition().duration(500).attr("style", "opacity: 1").transition().duration(500).attr("style", "opacity: 0.3");
      } else {
        // Switched to daily mode
        // Fancy animation & domain change
        dataTypeLabel.select("text").text("Score / Day");
        dataTypeLabel.transition().duration(500).attr("style", "opacity: 1").transition().duration(500).attr("style", "opacity: 0.3");
        y.domain(self.fullYDomain);
        y0line.attr("y1", y(0))
          .attr("y2", y(0));
        yLabel.transition().duration(500).call(yAxis);
      }
      pos.attr("style", "opacity: 0").transition().duration(300).attr("style", "opacity: 1");
      neg.attr("style", "opacity: 0").transition().duration(300).attr("style", "opacity: 1");
      trendline.attr("style", "opacity: 0").transition().duration(300).attr("style", "opacity: 1");
    }
    pos.attr("d", calcAreaPos);
    neg.attr("d", calcAreaNeg);
    trendline.attr("d", calcTrend);
    self.hourly = hourlyMode;

    updateLabels();

    // axis
    xLabel.call(xAxis);
    eLabel.call(eAxis);
    scrollLabel.call(scrollAxis);
  }

  // Updates episode labels & reacts to screen size
  function updateLabels() {
    var dmn = x.domain()[1] - x.domain()[0]; // Current domain
    var fulldmn = self.xDomainBounds[1] - self.xDomainBounds[0]; // Full domain
    var w = getSize().width;
    var dayWidth = (86400000 / dmn) * w;

    // episode rectangles
    var szn = svg.selectAll(".episode")
      .attr("x", function (d) {
        return x(d.date);
      })
      .attr("width", function (d) {
        return dayWidth;
      });

    // Zoom knob
    scrollknob.attr("width", Math.max(w * dmn / fulldmn, 20))
      .attr("x", Math.min(w * (x.domain()[0] - self.xDomainBounds[0]) / fulldmn, w - 20));

    // Move the Labels into the center of the day
    eLabel.selectAll('.tick text')
      .attr('transform', 'translate(' + dayWidth / 2 + ',0)');

    // Custom Tick Format for the Episode Axis
    if (dmn < (self.factor * 6 * 7 * 86400000)) { // < 6 Weeks * factor : Show Title
      eAxis.tickFormat(function (d, i) {
        return self.episodeData[i].code + ': "' + self.episodeData[i].title + '"';
      });
    } else if (dmn < (self.factor * 6 * 30 * 86400000)) { // < 6 Months * factor: Show Code
      eAxis.tickFormat(function (d, i) {
        return self.episodeData[i].code;
      });
    } else if (w > 500 || dmn < (3 * 365 * 86400000)) { //Show season start
      eAxis.tickFormat(function (d, i) {
        return self.episodeData[i].seasonStartLabel;
      });
    } else { // Show nothing
      eAxis.tickFormat("");
    }
  }

  // request csv twitter data and fill chart
  d3.csv(dataURL, convertTwitterCSV, assignDefaultValues);

  // request csv episodes data and create episode labels
  d3.csv(getPrefix() + "episodes.csv", convertEpisodesCSV, handleEpisodes);

  // Initial rendering when fillChart & handleEpisodes have finished (ready = 2)
  function go() {
    self.ready++;
    if (self.ready === 2) {
      // Not needed in case of error
      y0line.attr("stroke-width", 0.5);
      trendButton.append("rect")
        .attr("width", 95)
        .attr("height", 20);
      trendButton.append("text")
        .attr("x", 4)
        .attr("y", 15)
        .text("Toggle trendline");
      aboutButton.append("rect")
        .attr("width", 48)
        .attr("height", 20);
      aboutButton.append("text")
        .attr("x", 4)
        .attr("y", 15)
        .attr("class", "about")
        .text("About");
      dataTypeLabel.append("text")
        .attr("x", 4)
        .attr("y", 15)
        .text("Score / Day");

      render();

      // Zoom Handling
      var currentDomain = x.domain()[1] - x.domain()[0],
        minScale = currentDomain / (self.xDomainBounds[1] - self.xDomainBounds[0]), // All the available data
        maxScale = currentDomain / (1000 * 60 * 60 * 5); // 5 hours
      zoom.scaleExtent([minScale, maxScale])
        .x(x)
        .on("zoomstart", function () {
          self.zooming = true;
        })
        .on("zoomend", function () {
          self.zooming = false;
        });
      plot.call(zoom);

      // Dragging behavior of scrollbar
      drag.on("dragstart", function () {});
      drag.on("drag", function () {
        self.dx += d3.event.dx;
      });
      drag.on("dragend", function () {});
      scrollknob.call(drag);

      // Register remaining event handlers
      trendButton.on("click", function () {
        d3.event.stopImmediatePropagation();
        toggleTrend();
      });
      trendButton.on("mouseenter", function () {
        if (trendline.attr("class") !== "trendline") {
          trendButton.attr("class", "trendbutton fullOpac");
        }
      });
      trendButton.on("mouseleave", function () {
        if (trendline.attr("class") !== "trendline") {
          trendButton.attr("class", "trendbutton");
        }
      });
      aboutButton.on("click", function () {
        toggleAbout();
      });
      aboutButton.on("mouseenter", function () {
        if (aboutMsg.attr("class") !== "aboutmsg fullOpac") {
          aboutButton.attr("class", "trendbutton fullOpac");
        }
      });
      aboutButton.on("mouseleave", function () {
        if (aboutMsg.attr("class") !== "aboutmsg fullOpac") {
          aboutButton.attr("class", "trendbutton");
        }
      });

      aggregateZoom();
    }
  }


  // Aggregate zoom events at every frame for smooth zooming behavior outside of Google Chrome :)
  function aggregateZoom() {
    if (self.dx !== 0 || self.zooming) {
      zoom.translate([zoom.translate()[0] - self.dx, 0]);
      self.dx = 0;
      zoomed();
    }
    requestAnimationFrame(aggregateZoom);
  }

  function toggleTrend() {
    if (trendline.attr("class") === "trendline") {
      trendline.attr("class", "trendline noshow");
      chart.attr("class", "react");
      trendButton.attr("class", "trendbutton");
    } else {
      trendline.attr("class", "trendline");
      chart.attr("class", "react lowOpac");
      trendButton.attr("class", "trendbutton fullOpac");
    }
  }

  function toggleAbout() {
    if (aboutMsg.attr("class") !== "aboutmsg fullOpac") {
      aboutMsg.attr("class", "aboutmsg fullOpac");
    } else {
      aboutMsg.attr("class", "aboutmsg invisible");
    }
  }

  // Error Message (in case of non-existent csv data)
  function errorMessage() {
    // Checks foreignObject Support
    if (document.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#Extensibility", "1.1")) {
      errMsg.append("xhtml:div")
        .text("There seem to be no relevant tweets about this character. Sorry.")
        .attr("clip-path", "url(#clip)")
        .attr("class", "error");
    } else {
      // Adds non-resizable Error-Message for IE users.
      plot.append("text")
        .attr("class", "error noaction")
        .attr("x", 20)
        .attr("y", 30)
        .attr("clip-path", "url(#clip)")
        .text("No relevant tweets about this character.");
    }
    render();
  }

  return this;
}