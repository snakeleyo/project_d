module.exports = function(router) {
    router.get('/showlist' , function(req, res){
        res.render('goods_list');
    });

    router.get('/showlist/getdata' , function(req, res){
        var goods = getdata();
        res.send(goods);
    });

    router.get('/top' , function(req, res){
        res.render('admin_top');
    });

    router.get('/top/getdata' , function(req, res){
        var goods = getdata();
        res.send(goods);
    });

    router.get('/edit' , function(req, res){
        res.render('admin_edit');
    });

    router.get('/edit/getdata' , function(req, res){
        var goods = getdata();
        res.send(goods);
    });

    router.post('/edit/savedata' , function(req, res){
        console.log("stand by");
        var store = JSON.stringify(req.body);
        console.log(store);

        var fs = require("fs");
        var file = "./data/goods.json";

        fs.writeFile(file, store,  function(err) {
            if (err) {
                console.log("something wrond...");
                console.error(err);
                res.send(false);
            }
         });

         console.log("write in over");
         res.send(true);
    });

    router.post('/login', function(req, res) {
        console.log("post success");
        var t = test();
        console.log(t);
        var username = req.body.username;
        var password = req.body.password;

        if (username == 'snake' && password == 'pwd') {
            //res.render('list', {"username" : "sna", "password": "123"});
            //res.render('list', ret);
            //res.end(JSON.stringify(ret) + 'abc');
            req.session.username = username;
            req.session.password = password;
            //res.redirect('/list');
            res.redirect('/home');
        } else {
            res.end('wrong gry');
        }
    });

    function getdata() {
        var fs = require('fs');
        var file = "./data/goods.json";
        var goods = JSON.parse(fs.readFileSync(file));
        return goods;
    }
};
