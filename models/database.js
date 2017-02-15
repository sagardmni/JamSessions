var mongoose = require('mongoose');

var connection_string = require('./db_config.js');

mongoose.connect(connection_string);

mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");
});

var Schema = mongoose.Schema;
var Users = mongoose.model('Users', new Schema({ username: String, password: String}), 'user');
module.exports.Users = Users;

var Sessions = mongoose.model('Sessions', new Schema({ location: String, genre: String, required: [String]}), 'sessions');
module.exports.sessions = Sessions;
