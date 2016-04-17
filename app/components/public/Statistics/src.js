google.charts.setOnLoadCallback(drawNewCharactersIntroduced);

function drawNewCharactersIntroduced() {
  var data = new google.visualization.arrayToDataTable([
    ['Book No.', 'Men', 'Women'],
    ['Book 5', -64, 40],
    ['Book 4', -210, 181],
    ['Book 3', -210, 146],
    ['Book 2', -266, 171],
    ['Book 1', -271, 115]
  ]);

  var chart = new google.visualization.BarChart(document.getElementById('new_characters_introduced'));

  var options = {
    height: 400,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1F1F1F',
    legend: {
      position: 'top',
      maxLines: 3,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }
    },
    isStacked: true,
    bar: {
      groupWidth: '75%'
    },
    hAxis: {
      format: ';',
      title: "Number of characters",
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    vAxis: {
      direction: -1,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }
    }
  };

  var formatter = new google.visualization.NumberFormat({
    pattern: ';'
  });
  formatter.format(data, 1)
  chart.draw(data, options);

};

google.charts.setOnLoadCallback(drawCharactersPerEpisode);

function drawCharactersPerEpisode() {
  var data = new google.visualization.arrayToDataTable([
    ['Episode', 'All Characters', 'New Characters'],
    ['1S1E', 29, 29],
    ['1S2E', 31, 12],
    ['1S3E', 39, 8],
    ['1S4E', 30, 6],
    ['1S5E', 34, 2],
    ['1S6E', 31, 5],
    ['1S7E', 41, 7],
    ['1S8E', 39, 5],
    ['1S9E', 39, 3],
    ['1S10E', 45, 9],
    ['2S1E', 34, 6],
    ['2S2E', 34, 5],
    ['2S3E', 33, 3],
    ['2S4E', 39, 4],
    ['2S5E', 35, 5],
    ['2S6E', 32, 2],
    ['2S7E', 39, 1],
    ['2S8E', 19, 1],
    ['2S9E', 40, 1],
    ['2S10E', 36, 4],
    ['3S1E', 37, 7],
    ['3S2E', 46, 6],
    ['3S3E', 31, 1],
    ['3S4E', 37, 3],
    ['3S5E', 35, 1],
    ['3S6E', 39, 2],
    ['3S7E', 27, 3],
    ['3S8E', 27, 1],
    ['3S9E', 36, 0],
    ['3S10E', 36, 4],
    ['4S1E', 32, 3],
    ['4S2E', 43, 3],
    ['4S3E', 29, 0],
    ['4S4E', 31, 2],
    ['4S5E', 24, 1],
    ['4S6E', 29, 0],
    ['4S7E', 35, 6],
    ['4S8E', 14, 1],
    ['4S9E', 34, 2],
    ['4S10E', 38, 3],
    ['5S1E', 38, 3],
    ['5S2E', 31, 1],
    ['5S3E', 38, 3],
    ['5S4E', 28, 0],
    ['5S5E', 26, 1],
    ['5S6E', 33, 0],
    ['5S7E', 15, 0],
    ['5S8E', 34, 3],
    ['5S9E', 37, 0],
    ['5S10E', 55, 6]
  ]);

  var options = {
    curveType: 'function',
    legend: {
      position: 'top',
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }
    },
    height: 400,
    pointSize: 7,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1F1F1F',

    lineWidth: 4,
    hAxis: {
      title: "Season & Episode number",
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      slantedTextAngle: 60,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    vAxis: {
      title: "Number of characters",
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
      viewWindow: {
        max: 60,
        min: 0
      }
    }

  };
  var chart = new google.visualization.LineChart(document.getElementById('characters_per_episode'));
  chart.draw(data, options);
};

google.charts.setOnLoadCallback(drawDeadAndAlive);

function drawDeadAndAlive() {
  var data = new google.visualization.arrayToDataTable([
    ['Category', 'Men', 'Women'],
    ['Dead', -366, 129],
    ['Alive', -839, 612],
    ['Peasants', -576, 473],
    ['Nobles', -629, 268]
  ]);
  var chart = new google.visualization.BarChart(document.getElementById('dead_and_alive'));

  var options = {
    height: 400,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1F1F1F',
    legend: {
      position: 'top',
      maxLines: 3,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }

    },
    isStacked: true,
    bar: {
      groupWidth: '75%'
    },
    hAxis: {
      format: ';',
      title: "Number of characters",
      titleTextStyle: {
        color: '#AAAAAA'
      },
      titleFontSize: 17,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    vAxis: {
      direction: -1,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },

    }
  };


  var formatter = new google.visualization.NumberFormat({
    pattern: ';'
  });
  formatter.format(data, 1)
  chart.draw(data, options);

};


google.charts.setOnLoadCallback(drawDistributionPLODs);

function drawDistributionPLODs() {
  var data = new google.visualization.arrayToDataTable([
    ['Likelihood of Death', 'Men', {
      'type': 'string',
      'role': 'style'
    }, 'Women', {
      'type': 'string',
      'role': 'style'
    }],
    [0, 100, null, 100, null],
    [1, 95, null, 92, null],
    [2, 87, null, 78, null],
    [3, 85, null, 73, null],
    [4, 82, null, 71, null],
    [5, 80, null, 69, null],
    [6, 79, null, 68, null],
    [7, 78, null, 67, null],
    [8, 76, null, 66, null],
    [9, 75, null, 65, null],
    [10, 74, null, 64, null],
    [11, 73, null, 63, null],
    [12, 72, null, 62, null],
    [13, 71, null, 61, null],
    [14, 70, null, 61, null],
    [15, 70, null, 60, null],
    [16, 69, null, 59, null],
    [17, 68, null, 58, null],
    [18, 67, null, 54, null],
    [19, 64, null, 51, null],
    [20, 63, null, 48, null],
    [21, 60, null, 45, null],
    [22, 59, null, 43, null],
    [23, 59, null, 41, null],
    [24, 56, null, 38, null],
    [25, 52, null, 34, null],
    [26, 51, null, 31, null],
    [27, 49, null, 29, null],
    [28, 46, null, 27, null],
    [29, 44, null, 24, null],
    [30, 40, null, 22, null],
    [31, 39, null, 21, null],
    [32, 38, null, 20, null],
    [33, 37, null, 18, null],
    [34, 36, null, 17, null],
    [35, 35, null, 17, null],
    [36, 35, null, 17, null],
    [37, 34, null, 16, null],
    [38, 34, null, 16, null],
    [39, 33, null, 16, null],
    [40, 33, null, 15, null],
    [41, 32, null, 15, null],
    [42, 32, null, 14, null],
    [43, 31, null, 14, null],
    [44, 31, null, 14, null],
    [45, 30, null, 13, null],
    [46, 30, null, 13, null],
    [47, 30, null, 13, null],
    [48, 29, null, 12, null],
    [49, 29, null, 12, null],
    [50, 29, null, 12, null],
    [51, 27, null, 12, null],
    [52, 26, null, 11, null],
    [53, 25, null, 11, null],
    [54, 24, null, 11, null],
    [55, 23, null, 10, null],
    [56, 23, null, 10, null],
    [57, 22, null, 10, null],
    [58, 22, null, 9, null],
    [59, 22, null, 9, null],
    [60, 21, 'point { size: 13; shape-type: star; dent: 0.5;}', 9, 'point { size: 13; shape-type: star; dent: 0.5;}'],
    [61, 20, null, 9, null],
    [62, 19, null, 8, null],
    [63, 19, null, 8, null],
    [64, 19, null, 8, null],
    [65, 18, null, 8, null],
    [66, 18, null, 8, null],
    [67, 18, null, 8, null],
    [68, 18, null, 8, null],
    [69, 17, null, 7, null],
    [70, 16, null, 7, null],
    [71, 15, null, 7, null],
    [72, 15, null, 6, null],
    [73, 14, null, 6, null],
    [74, 14, null, 6, null],
    [75, 14, null, 6, null],
    [76, 13, null, 6, null],
    [77, 13, null, 6, null],
    [78, 12, null, 5, null],
    [79, 11, null, 5, null],
    [80, 10, null, 4, null],
    [81, 9, null, 4, null],
    [82, 8, null, 4, null],
    [83, 7, null, 4, null],
    [84, 7, null, 3, null],
    [85, 7, null, 3, null],
    [86, 6, null, 3, null],
    [87, 5, null, 3, null],
    [88, 5, null, 3, null],
    [89, 5, null, 2, null],
    [90, 5, null, 2, null],
    [91, 4, null, 2, null],
    [92, 4, null, 2, null],
    [93, 3, null, 2, null],
    [94, 3, null, 2, null],
    [95, 2, null, 1, null],
    [96, 2, null, 1, null],
    [97, 1, null, 0, null],
    [98, 1, null, 0, null],
    [99, 0, null, 0, null],
    [100, 0, null, 0, null]
  ]);
  var options = {
    height: 400,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1F1F1F',
    lineWidth: 3,
    pointSize: 1,
    dataOpacity: 0.9,
    hAxis: {
      title: 'Likelihood of Death (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },

    vAxis: {
      title: 'Percentage of Characters (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      viewWindow: {
        min: 0,
        max: 100
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    curveType: 'function',
    legend: {
      position: 'top',
      maxLines: 3,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }

    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('distribution_plods'));
  chart.draw(data, options);
};
google.charts.setOnLoadCallback(drawDistributionNoblesPLODs);

function drawDistributionNoblesPLODs() {
  var data = new google.visualization.arrayToDataTable([
    ['PLOD', 'Nobles', 'Peasants'],
    [0, 100, 100],
    [1, 95, 93],
    [2, 86, 81],
    [3, 82, 78],
    [4, 80, 76],
    [5, 77, 74],
    [6, 76, 73],
    [7, 75, 72],
    [8, 73, 71],
    [9, 72, 70],
    [10, 71, 68],
    [11, 70, 68],
    [12, 69, 67],
    [13, 68, 66],
    [14, 68, 65],
    [15, 67, 65],
    [16, 65, 64],
    [17, 63, 63],
    [18, 63, 60],
    [19, 60, 57],
    [20, 59, 55],
    [21, 57, 51],
    [22, 56, 50],
    [23, 55, 48],
    [24, 53, 45],
    [25, 49, 41],
    [26, 48, 38],
    [27, 46, 36],
    [28, 44, 33],
    [29, 41, 31],
    [30, 39, 28],
    [31, 38, 27],
    [32, 37, 26],
    [33, 35, 24],
    [34, 35, 23],
    [35, 34, 22],
    [36, 33, 22],
    [37, 32, 22],
    [38, 32, 22],
    [39, 31, 21],
    [40, 31, 21],
    [41, 30, 21],
    [42, 29, 20],
    [43, 29, 20],
    [44, 28, 20],
    [45, 28, 20],
    [46, 27, 20],
    [47, 27, 19],
    [48, 26, 19],
    [49, 26, 19],
    [50, 26, 18],
    [51, 24, 18],
    [52, 24, 17],
    [53, 23, 16],
    [54, 22, 16],
    [55, 20, 16],
    [56, 20, 16],
    [57, 19, 15],
    [58, 18, 15],
    [59, 18, 15],
    [60, 18, 15],
    [61, 17, 14],
    [62, 16, 14],
    [63, 16, 14],
    [64, 15, 13],
    [65, 15, 13],
    [66, 15, 13],
    [67, 14, 13],
    [68, 14, 13],
    [69, 14, 12],
    [70, 13, 11],
    [71, 13, 11],
    [72, 12, 11],
    [73, 12, 11],
    [74, 11, 10],
    [75, 11, 10],
    [76, 10, 10],
    [77, 10, 10],
    [78, 10, 9],
    [79, 9, 8],
    [80, 8, 8],
    [81, 8, 6],
    [82, 7, 6],
    [83, 7, 5],
    [84, 6, 5],
    [85, 6, 5],
    [86, 6, 4],
    [87, 5, 4],
    [88, 5, 4],
    [89, 5, 3],
    [90, 5, 3],
    [91, 4, 3],
    [92, 4, 3],
    [93, 3, 2],
    [94, 3, 2],
    [95, 2, 2],
    [96, 1, 1],
    [97, 1, 1],
    [98, 1, 0],
    [99, 0, 0],
    [100, 0, 0]
  ]);
  var options = {
    height: 400,
    lineWidth: 3,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1F1F1F',
    pointSize: 1,
    dataOpacity: 0.9,
    hAxis: {
      title: 'Likelihood of Death (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },

    vAxis: {
      title: 'Percentage of Characters (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      viewWindow: {
        min: 0,
        max: 100
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    curveType: 'function',
    legend: {
      position: 'top',
      maxLines: 3,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }

    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('distribution_nobles_plods'));
  chart.draw(data, options);
};
google.charts.setOnLoadCallback(drawDistributionPLODsAgeDistribution);

function drawDistributionPLODsAgeDistribution() {
  var data = new google.visualization.arrayToDataTable([
    ['Age Distribution', 'Averaged Likelihood of Death'],
    ['0-10', 34],
    ['11-20', 30],
    ['21-30', 41],
    ['31-40', 45],
    ['41-50', 35],
    ['51-60', 42],
    ['61-70', 35],
    ['71-80', 27],
    ['81-90', 25],
    ['91-100', 19]
  ]);
  var options = {
    height: 400,
    colors: ['#2196f3'],
    backgroundColor: '#1F1F1F',

    legend: {
      position: 'none'
    },
    vAxis: {
      title: 'Averaged Likelihood of Death (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      viewWindow: {
        max: 50,
        min: 0
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    hAxis: {
      title: 'Age Group',
      slantedText: true,
      slantedTextAngle: 60,
      titleFontSize: 15,
      titleTextStyle: {
        color: '#AAAAAA'
      },

      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    bar: {
      groupWidth: '75%'
    },
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('distribution_plods_age_distribution'));
  chart.draw(data, options);
};
google.charts.setOnLoadCallback(drawAvgPLODPerEpisode);

function drawAvgPLODPerEpisode() {
  var data = new google.visualization.arrayToDataTable([
    ['EpisodeE', 'Average PLOD per episode'],
    ['1S1E', 73],
    ['1S2E', 73],
    ['1S3E', 76],
    ['1S4E', 77],
    ['1S5E', 75],
    ['1S6E', 71],
    ['1S7E', 74],
    ['1S8E', 76],
    ['1S9E', 71],
    ['1S10E', 71],
    ['2S1E', 74],
    ['2S2E', 70],
    ['2S3E', 74],
    ['2S4E', 69],
    ['2S5E', 71],
    ['2S6E', 68],
    ['2S7E', 72],
    ['2S8E', 75],
    ['2S9E', 65],
    ['2S10E', 66],
    ['3S1E', 60],
    ['3S2E', 68],
    ['3S3E', 67],
    ['3S4E', 65],
    ['3S5E', 59],
    ['3S6E', 60],
    ['3S7E', 69],
    ['3S8E', 63],
    ['3S9E', 63],
    ['3S10E', 70],
    ['4S1E', 59],
    ['4S2E', 73],
    ['4S3E', 65],
    ['4S4E', 63],
    ['4S5E', 66],
    ['4S6E', 68],
    ['4S7E', 60],
    ['4S8E', 62],
    ['4S9E', 62],
    ['4S10E', 65],
    ['5S1E', 62],
    ['5S2E', 60],
    ['5S3E', 64],
    ['5S4E', 56],
    ['5S5E', 58],
    ['5S6E', 58],
    ['5S7E', 56],
    ['5S8E', 60],
    ['5S9E', 60],
    ['5S10E', 60]
  ]);
  var options = {

    curveType: 'function',
    legend: {
      position: 'none'
    },
    height: 400,
    colors: ['#2196f3'],
    backgroundColor: '#1F1F1F',
    pointSize: 7,
    lineWidth: 4,
    hAxis: {
      title: "Season & Episode number",
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      slantedTextAngle: 60,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    vAxis: {
      title: "Average PLOD per episode (%)",
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
      viewWindow: {
        max: 80,
        min: 50
      }
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('avgPLOD_per_episode'));
  chart.draw(data, options);
};
