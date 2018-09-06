var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var session = require('express-session');
// var monk = require('monk');

var app = express();
var router = express.Router();

//global.glbPath = path();
// mgdb = monk('locolhost:27017/proj-plan');

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// page engine
app.engine('html', hbs.__express);

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, '/')));

app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false,
    cookie : 1000 * 60 * 30
}));

require('./routes')(router);

router.get('/', function(req, res) {
    res.render('index');
});

app.use('/', router);

app.listen(7617);


