var crypto = require('crypto'); // For generating secure tokens
var base64url = require('base64url'); // for base 64 encoding

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var AUTHENTICATION_TOKEN_SIZE = 64;


var makeAuthToken = function(size) {
    return base64url(crypto.randomBytes(size));
};
function loop(cursor) {
  getFriends(cursor, function(cursor) {
    if (cursor != 0) loop(cursor);
    else return;
  });
}


var serializeUser = function(username, callback) {
  var auth = makeAuthToken(AUTHENTICATION_TOKEN_SIZE);
  serializeUserHelper(username, auth, function(success) {
  	if (success !== true) {
  		serializeUser(username, callback);
  	} else {
  		callback(undefined, auth);
  	}
  });
};

var serializeUserHelper = function(username, auth, callback) {
  dbc.putUserAuth(username, auth, function(status) {
  	callback(status);
  });
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
		}
		if (status === true) {
			serializeUser(username, callback);
		} else {
			callback("Error with credentials", "");
		}
	});
};