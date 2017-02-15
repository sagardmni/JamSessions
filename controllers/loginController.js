module.exports = function(app){

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser());
var db = require('../models/database');
var Users = db.Users;
var jwt = require('jsonwebtoken');

app.post('/authenticate', urlencodedParser, function(req,res){

  var postedUsername = req.body.username;
  var postedPwd = req.body.pwd;  
  console.log('Submitted username = ' + postedUsername);
  console.log('Submitted pwd = ' + postedPwd);

    Users.findOne({'username': postedUsername, 'password': postedPwd}, 'username', function (err, user) {
    if (err) return handleError(err);
    if(user)
    {
      console.log('Found user: ' + user.username);
      var token = jwt.sign({username: postedUsername, password: postedPwd}, "mysecretkey", {
      expiresIn: 60*60*24 // expires in 24 hours
      });
      res.json({token: token, login: "success"}).send();
      console.log("Logged in");
    }
    else
    {
      console.log("Login authentication failure");
      res.json({login: "error"}).send();
    }
  });
});
}