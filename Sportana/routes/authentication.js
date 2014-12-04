var crypto = require('crypto'); // For generating secure tokens
var base64url = require('base64url'); // for base 64 encoding

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var AUTHENTICATION_TOKEN_SIZE = 64;

/**
 *****************************************************
 * makeAuthToken(size)
 *
 * Creates a new random authentication token
 *
 * Input:
 *  size : the size of the authentication token you want
 *
 * Return : a random string of characters to use as 
 *			an authentication token
 *
 *****************************************************
 */
var makeAuthToken = function(size) {
    return base64url(crypto.randomBytes(size));
};

/**
 *****************************************************
 * serializeUser(username, callback)
 *
 * Associates a user with a new authentication token
 *
 * Input:
 *  username : the user to associate an authentication
 *			   token with
 *  callback : function(error, authentication)
 *			   passes back an error explanation in error if
 *			   an error occurs and passes back the authentication
 *				token in authentication if successful
 *
 *****************************************************
 */

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

/**
 *****************************************************
 * serializeUserHelper(username, auth, callback)
 *
 * Creates a looping function for adding authentication
 * tokens to the database and maintaining their uniqueness
 *
 * Inputs:
 *  username : the user to associate an authentication
 *			   token with
 *  auth : the authentication token
 *  callback : function(success)
 *				success is a boolean value that returns
 *				true if and only if the authentication is
 *				successfully associated with the user in the
 *				database.
 *****************************************************
 */
var serializeUserHelper = function(username, auth, callback) {
  dbc.putUserAuth(username, auth, function(status) {
  	callback(status);
  });
};

/**
 *****************************************************
 * deserializeUser(id, callback)
 *
 * Gets a user from an authentication token
 *
 * Input:
 *  id : the authentication token of the user
 *  callback : function(error, username)
 *			    passes back an error explanation in error if
 *			    an error occurs and passes back the username
 *				associated with the given authentication token
 *				if successful
 *
 *****************************************************
 */
exports.deserializeUser = function(id, callback) {
  console.log("AuthToken: " + id);
  dbc.getUserByAuth(id, function(err, username) {
    callback(err, username);
  });
};

/**
 *****************************************************
 * authenticate(username, password, callback)
 *
 * Checks a users log in credentials and assigns them
 * a new authentication token.
 *
 * Input:
 *  username : the user log in
 *  password : the password of the user
 *  callback : function(error, user)
 *			   passes back an error explanation in error if
 *			   an error occurs and passes back the user with authentication,
 *			   login, firstName, lastName, and numNotifications
 *
 *****************************************************
 */
exports.authenticate = function(username, password, callback) {
		dbc.getLogin(username, password, function(err, user, status) {
		if (err) {
			callback(err, "");
		}
		if (status === true) {
			serializeUser(username, function(err, auth) {
				user.authenticationToken = auth;
				if (err) {
					callback(err, undefined);
				} else {
					callback(undefined, user);
				}
			});
		} else {
			callback("Error with credentials", "");
		}
	});
};