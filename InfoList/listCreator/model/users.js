exports.checkuser = function(name, passwd, callback) {

if (name = "tiny" && passwd == "tiny"){
callback(true);
  return;
}
  callback(false);
}
