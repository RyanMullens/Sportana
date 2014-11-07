var crypto = require('crypto'); // For generating secure tokens
var base64url = require('base64url'); // for base 64 encoding

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var makeAuthToken = function(size) {
    return base64url(crypto.randomBytes(size));
};

var serializeUser = function(username, callback) {
  var auth = "";
  var uniqueAuthLoop = true;
  while (uniqueAuthLoop) {
  	auth = makeAuthToken(64);
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

exports.authenticateUser = function(username, password, callback) {
	dbc.getLogin(username, password, function(err, status) {
		if (err) {
			
		}
		if (status === true) {
			serializeUser(username, callback);
		} else {
			callback("Error with credentials", "");
		}
	});
}