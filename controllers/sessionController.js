module.exports = function(app){

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser());
var db = require('../models/database');
var Session = db.sessions;

app.get('/loadsessions', urlencodedParser, function(req,res){
  Session.find({}, function (err, sessions) {
    res.status(200).send({sessions: sessions});
    console.log(sessions);
  });
});

app.post('/createsession', urlencodedParser, function(req,res){
  sessionInfo = req.body.sessionInfo;
  
  var session = new Session({location: sessionInfo.location, genre: sessionInfo.genre, required: [sessionInfo.musician]});

  session.save(function(err, data) {
    if (err) console.log(err);
    else console.log('Saved ', data);
  });

  res.status(200).send();
});

}