var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/**
 *****************************************************
 * GET /friends
 * Returns the list of friends of the requesting user
 *
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 *  “friends” : [{
 * 	 	“login”        :	login
 * 	 	“profilePhoto” :  	string // url of photo
 * 		“firstName”    :	string
 * 		“lastName”     :	string
 * 		“age”          :	int
 * 		“city”         :	string
 *  }]
 *  “message” : string    // empty on success
 *  “success” : boolean
 * }
 *
 *****************************************************
 */
router.get('/', function (req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getFriendsList(username, function(err, friends) {
				if (err) {
					response.success = false;
					response.message = err;
				} else {
					response.success = true;
					response.message = "";
					response.friends = friends;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * DELETE /friends/{friendID}
 *
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 *  “message” : string    // empty on success
 *  “success” : boolean
 * }
 *
 *****************************************************
 */
router.delete('/:friendID', function (req, res) {
	var friendLogin = req.params.friendID;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.removeFriend(username, friendLogin, function(err) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * DELETE /friends/request?friendID={user}
 *
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 *  “message” : string    // empty on success
 *  “success” : boolean
 * }
 *
 *****************************************************
 */
router.delete('/request', function (req, res) {
	var friendLogin = req.query.friendID;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.removeFriendRequest(username, friendLogin, function(err) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

module.exports = router;
