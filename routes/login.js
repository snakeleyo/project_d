module.exports = function(router) {
    router.get('/login' , function(req, res){
        console.log('list init2');
        res.render('Top_PV'); 
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

    function test() {
        return "test...1";
        
    }
};
