
// var monk = require('monk');
// var db1 = monk('localhost:27017/proj-plan');


module.exports = function (router) {
    router.get('/home', function(req, res) {
        res.render('home');
    });
};
