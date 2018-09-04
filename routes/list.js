
// var monk = require('monk');
// var db1 = monk('localhost:27017/proj-plan');


module.exports = function (router) {
    router.get('/list', function(req, res) {
        console.log('list init');
        var username = req.session.username;
        var password = req.session.password;

        var ret = {
            username : username,
            password : password
        };

        var db = require('../common/dbconn')();
        // var db = a.acc();
        // var db = conn.init();
        var collection = db.get('project');
        collection.find({}, function(err, project) {
            console.log('find over 00 ');
            if (err) {
                throw err;
            }
            ret.project = project;
            res.render('list', ret);
        });
        // var monk = require('monk');
        // var db1 = monk('localhost:27017/proj-plan');
        // var collection1 = db1.get('project');
        // collection1.find({}, function(err, project) {
        //     console.log('find over 11 ');
        //     if (err) {
        //         throw err;
        //     }

        //     res.send(project);
        // });

        //res.end('no ret');
    });
};
