var crypto = require('crypto'); // For generating secure tokens
var base64url = require('base64url'); // for base 64 encoding

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var makeAuthToken = function(size) {
    return base64url(crypto.randomBytes(size));
};

var serializeUser = function(username, callback) {
console.log("Serializing user");
  var auth = "";
  var uniqueAuthLoop = true;
  while (uniqueAuthLoop) {
  	auth = makeAuthToken(128);
  	dbc.putUserAuth(user, auth, function(err, success) {
  		if (err || (success === false)) {
  			// repeat loop
  		} else {
  			uniqueAuthLoop = false;
  		}
  	});
 }
  callback(undefined, auth);
};

exports.deserializeUser = function(id, done) {
  dbc.getUserByAuth(id, function(err, username) {
    done(err, username);
  });
};

exports.authenticate = function(username, password, callback) {
	dbc.getLogin(username, password, function(err, status) {
		if (err) {
			callback(err, "");
			console.log("Error was returned from getLogin");
		}
		if (status === true) {
			serializeUser(username, callback);
		} else {
			callback("Error with credentials", "");
		}
	});
}