var filename = process.argv[2];
var crypto = require('crypto');
var fs = require('fs');
var colors = require('colors');
var shasum = crypto.createHash('sha256');

var s = fs.ReadStream(filename);
s.on('data', function(d) {
    shasum.update(d);
});
s.on('end', function() {
    var d = shasum.digest('hex'); 
    states = fs.statSync(filename);  
    console.log((states.size.toString())['green'] + "-".green + d.green);
});
