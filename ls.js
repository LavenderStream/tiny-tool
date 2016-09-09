require('shelljs/global');
var colors = require('colors');
var fs = require('fs');

var colorsMap = {
    'dir': 'cyan',
    'bin': 'green',
    'cmd': 'green',
    'apk': 'green',
    'js': 'yellow',
    'java': 'yellow',
    'py': 'yellow',
    'xml': 'yellow',
    'json': 'yellow',
    'txt': 'white',
    'md': 'white',
    'order': 'grey'
};

var param = process.argv[2];

if (param == '-R' || param == '-r' ||
    param == 'r' || param == 'R') {
    param = '-R';
}

ls(param).forEach(function(file) {
    var fileName = file.toString();
    var color;
    fs.stat(fileName, function(err, stat) {
        if (err)
            return;

        if (stat.isFile()) {
            if (fileName.indexOf('.') >= 0) {
                var ex = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
                color = colorsMap[ex];
            } else {
                color = colorsMap['order'];
            }
        } else {
            var color = colorsMap['dir'];
        }

        if (color == undefined)
            color = colorsMap['order'];

        console.log(fileName[color]);

    });
});
