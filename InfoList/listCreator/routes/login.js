var express = require('express');
var users = require('../model/users');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var crypto = require('crypto');

var array = [];

var upload = multer({
    dest: "uploads/images"
});

var type = upload.single('file');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.session.isVisit);
    array = [];
    if (true) {
        //res.render('login', { title: 'login' });
        res.render('index', {
            info_array: []
        });
    } else {
        res.render('login');
    }
});

// 判断用户登入身份
router.post('/users', function(req, res) {
    users.checkuser(req.param('username'), req.param('password'), function(result) {
        if (result) {
            req.session.isVisit = 1;
            res.render('index', {
                info_array: []
            });
        } else {
            res.render('login', {
                color: 'btn-danger'
            });
        }
    });
});

router.post('/form', type, function(req, res, next) {
    if (!req.file) {
        color: 'btn-danger';
        return;
    }

    router.get('/json', function(req, res, next) {
        var array_map = [];

        for (var i = 0; i < array.length; i++) {
          var json_map = {
              'type': 'image',
              'describe': []
          };
            json_map.describe.push(array[i]);
            array_map.push(json_map);
        }
                var time = Date.now();
        fs.writeFileSync('./public/json/' + time + '.json', JSON.stringify(array_map));
        var JsonObj = JSON.parse(fs.readFileSync('./public/json/' + time + '.json'));
        console.log(JsonObj);
    })


    var tmp_path = req.file.path;
    console.log("tmp_path: " + tmp_path);
    var target_path = 'public/images/' + req.file.originalname;
    console.log("target_path: " + target_path);

    fs.readFile(tmp_path, function(err, data) {
        var shasum = crypto.createHash('sha256');
        shasum.update(data, "utf-8");

        var fileLength = data.length;
        var fileSha = shasum.digest('hex');
        var newName = 'public/images/' + fileLength + "-" + fileSha
        console.log("name： " + newName);
        fs.rename(tmp_path, newName, function(err) {
            if (err)
                return;
            array.push(fileLength + "-" + fileSha)
            res.render('index', {
                info_array: array
            });
        });
        // var s = fs.ReadStream(tmp_path);
        // s.on('data', function(d) {
        //     shasum.update(d);
        // });
        // s.on('end', function() {
        // var d = shasum.digest('hex');
        // console.log("d: " + d);
        //   fs.rename(tmp_path, 'uploads/images/' +data.length + "-" + d, function(err){});
        //   });

    });

    //var s = fs.ReadStream(req.file.originalname);
    // s.on('data', function(d) {
    //     shasum.update(d);
    // });
    //  s.on('end', function() {
    //      var d = shasum.digest('hex');
    //       //states = fs.statSync(req.file.originalname);  
    //        var target_path_sha = 'uploads/images/' + d;
    //        console.log(target_path_sha);
    //        fs.readFile(tmp_path, function(err, data) {
    //
    //          fs.rename(tmp_path, target_path, function(err){});
    //        });
    //  });
});


module.exports = router;
