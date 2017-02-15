module.exports = function(app){

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser());
var db = require('../models/database');
var User = db.Users;

app.post('/session', urlencodedParser, function(req,res){
  var session = req.body.session;
  var o_id = new mongoose.mongo.ObjectID(session.creator);
  console.log(session);
  User.findOne({'_id': o_id}, function (err, user) {
    if(err)
      console.log(err);
    console.log("found user: " + user);
    res.status(200).send({user: user});
  });
});

app.get('/session', urlencodedParser, function(req, res){
  console.log("Here")
  res.render('session');
});



}