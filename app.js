var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

var loginController = require('./controllers/loginController');
loginController(app);
var sessionController = require('./controllers/sessionController');
sessionController(app);
var sessionSpecController = require('./controllers/sessionSpecController');
sessionSpecController(app);

var db = require('./models/database');

app.get('/', function(req, res){
  res.render('login', {});
});

app.get('/home', function(req, res){
  console.log("home");
  res.render('home', {});
});

app.listen(3000);
console.log("Listening to port 3000");

