require('shelljs/global');
var rf = require("fs");
var data = rf.readFileSync(process.argv[2], "utf-8");

console.log('');
console.log(data);
