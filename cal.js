// 日历小程序
var colors = require('colors');
var date = new Date()
var paramSize = process.argv.length - 2;
var cal = new Array();
var out = '';

var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

function CalObj() {
    var value = [];
    var type = '';
}


if (paramSize == 1) {
    month = process.argv[2];
    day = 1;
}


var dater = new Dater(year, month, day);

// Fixme 怎么添加这三个数组
for (var i = 0; i < dater.monthDays.preMonthDays.length; i++) {
    var calObj = new CalObj();
    calObj.value = dater.monthDays.preMonthDays[i];
    calObj.value = pad(calObj.value, 2);
    calObj.type = 'pre';

    cal.push(calObj);
}

for (var i = 0; i < dater.monthDays.thisMonthDays.length; i++) {
    var calObj = new CalObj();
    calObj.value = dater.monthDays.thisMonthDays[i];
    calObj.value = pad(calObj.value, 2);
    calObj.type = 'this';

    cal.push(calObj);
}


for (var i = 0; i < dater.monthDays.nextMonthDays.length; i++) {
    var calObj = new CalObj();
    calObj.value = dater.monthDays.nextMonthDays[i];
    calObj.value = pad(calObj.value, 2);
    calObj.type = 'next';

    cal.push(calObj);
}

console.log('su mo tu we th fr sa');
for (var i = 0; i < cal.length; i++) {
    var color;
    calObj = cal[i];
    switch (calObj.type) {
        case 'pre':
            color = 'grey';
            break;
        case 'this':
            color = 'white';

            if (calObj.value == date.getDate() &&
                month == date.getMonth() + 1) {
                color = 'green';
            }
            break;
        case 'next':
            color = 'grey';
            break;
    }

    switch (i % 7) {
        case 0:
            if (calObj.type != 'pre' && calObj.type != 'next')
                color = 'yellow';
            out += cal[i].value.toString()[color] + ' ';
            break;
        case 6:
            if (calObj.type != 'pre' && calObj.type != 'next')
                color = 'yellow';
            out += cal[i].value.toString()[color];
            console.log(out);
            out = '';
            break;
        default:
            out += cal[i].value.toString()[color] + ' ';
            break;
    }

}

/* 质朴长存法  by lifesinger */
function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

function Dater(y, m, d) {
    var date = new Date();
    var y = y || date.getFullYear(),
        m = m || date.getMonth() + 1,
        d = d || date.getDate();
    var isLeapYear = function(years) {
        return (years % 4 == 0 && years % 100 != 0) || (years % 400 == 0) ? true : false;
    }
    var getFirstDay = function(y, m, d) {
        var d = new Date(y, m, d);
        d.setDate(1);
        return d.getDay();
    }
    var getMonthDay = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var prem = [],
        im = [],
        nextm = [],
        lastmd = getMonthDay[m - 1 - 1];

    if (getFirstDay(y, m - 1, d) == 0) {
        for (var i = 6; i >= 0; i--) {
            prem[6 - i] = lastmd - i;
        }
    } else {
        for (var i = getFirstDay(y, m - 1, d); i > 0; i--) {
            prem[getFirstDay(y, m - 1, d) - i] = lastmd - i + 1;
        }
    }
    for (var i = 0; i < getMonthDay[m - 1]; i++) {
        im[i] = i + 1;
    }
    var nextlen = 42 - (prem.length + getMonthDay[m - 1]);
    for (var i = 0; i < nextlen; i++) {
        nextm[i] = i + 1;
    }
    this.monthDays = {
        preMonthDays: prem,
        thisMonthDays: im,
        nextMonthDays: nextm
    }
};
