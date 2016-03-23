// To consider:
// - caching

/* Generate CSV data for character. Format:
date,pos,neg
2016-03-07,1337,42
*/
module.exports = function(req, res) {
    res.type('text/plain');
    //res.type('text/csv');
    res.write('date,pos,neg\n');

    // for now just one month
    for (var i = 1; i <= 31; i++) {
        var pos = (Math.sin(i/5)+1)*(0.5+Math.random()/2)*1337;
        var neg = (Math.sin((i/5)+3)+1)*(0.5+Math.random()/2)*2000;
        res.write("2016-03-" + (i < 10 ? "0"+i : ""+i) + "," +
            Math.round(pos) + "," +
            Math.round(neg) + "\n"
        );
    }

    res.end();
};
