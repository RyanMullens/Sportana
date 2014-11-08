var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

router.get('', function (req, res) {
	
});

/**
 *****************************************************
 * PUT	/requests/game
 * REQUEST:
 * {
 * 	“userToID” : string
 *	“gameCreator” : string
 *	“gameID” : int
 * }	
 *
 * RESPONSE:
 * {
 * 	“message” : string    // empty on success
 * 	“success” : boolean
 * }
 *****************************************************
 */
router.put('/game', function(req, res) {
	var userTo = req.body.userTo;
	var gameCreator = req.body.gameCreator;
	var gameID = req.body.gameID;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.addRequest(username, userTo, "game", gameCreator, gameID, function(err) {
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
 * PUT	/requests/friend
 * REQUEST:
 * {
 * 	“userToID” : string
 * }	
 *
 * RESPONSE:
 * {
 * 	“message” : string    // empty on success
 * 	“success” : boolean
 * }
 *****************************************************
 */
router.put('/friend', function(req, res) {
	var userTo = req.body.userTo;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.addRequest(username, userTo, "friend", undefined, undefined, function(err) {
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

// NOTE: This will also remove the request from the database as it has been seen/responded to
router.post('/:requestID', function(req, res) {
	
});

module.exports = router;

