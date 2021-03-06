var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/**
 *****************************************************
 * GET	/requests
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	message  : string    // empty on success
 * 	success  : boolean
 *  "requests" :
 *   [{
 *    "id"            : int
 *    "userFrom" 	  : string // users login
 *    "userFromName"  : string // users name
 *    "userFromImage" : string // url
 *    "type"          : int // 0: friend, 1: game, 2: queue, 3: game reminder
 *    "date"          : date // yyyy-mm-dd format
 *    "time"          : time // hh:mm:ss - 24 hour format (ex. 13:00:00 vs 1:00pm)
 *    "gameCreator"   : string // for types 1, 2, and 3
 *    "gameID"        : int // for types 1, 2, and 3
 *   }]
 * }
 *****************************************************
 */
router.get('', function (req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getRequests(username, function(err, requests) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
					response.requests = requests;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * GET	/requests/friends
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	message  : string    // empty on success
 * 	success  : boolean
 *  "requests" :
 *   [{
// *    "id"            : int
// *    "userFrom" 	  : string // users login
// *    "userFromName"  : string // users name
// *    "userFromImage" : string // url
// *    "type"          : int // 0: friend, 1: game, 2: queue, 3: game reminder
// *    "date"          : date // yyyy-mm-dd format
// *    "time"          : time // hh:mm:ss - 24 hour format (ex. 13:00:00 vs 1:00pm)
// *    "gameCreator"   : string // for types 1, 2, and 3
// *    "gameID"        : int // for types 1, 2, and 3
 *   }]
 * }
 *****************************************************
 */
router.get('/friends', function (req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getFriendRequests(username, function(err, requests) {
				console.log("getFriendRequests called");
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
					response.requests = requests;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * PUT	/requests/game
 * REQUEST:
 * {
 * 	userToID    : string
 *	gameCreator : string
 *	gameID      : int
 * }
 *
 * RESPONSE:
 * {
 * 	Ã¢â‚¬Å“messageÃ¢â‚¬ï¿½ : string    // empty on success
 * 	Ã¢â‚¬Å“successÃ¢â‚¬ï¿½ : boolean
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
 * GET	/requests/games/
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	â€œmessageâ€�    	: string // empty on success
 * 	â€œsuccessâ€�    	: boolean
 *  "creator"    	: string
 *  "gameID"        : int
 *  "gameDate" 	 	: date // yyyy-mm-dd
 *  "gameStart"  	: time // hh:mm:ss
 *  "location"   	: string
 * 	â€œsport"      	: string
 *  "invitedBy"		: string
 *  "invitedByName" : string
 *  "id"			: int
 * }
 *****************************************************
 */

router.get('/games', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getGamesNotifications(username, function(err, jsonGameInfo) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.notifications = jsonGameInfo;
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
 * 	Ã¢â‚¬Å“userToIDÃ¢â‚¬ï¿½ : string
 * }
 *
 * RESPONSE:
 * {
 * 	Ã¢â‚¬Å“messageÃ¢â‚¬ï¿½ : string    // empty on success
 * 	Ã¢â‚¬Å“successÃ¢â‚¬ï¿½ : boolean
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
			dbc.addRequest(username, userTo, "friend", undefined, undefined, function(err, nid) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
					if(nid >= 0)
						response.requestID = nid;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * POST	/requests/{requestID}
 * REQUEST:
 * {
 * 	confirmed: boolean
 * }
 *
 * RESPONSE:
 * {
 * 	message : string    // empty on success
 * 	success : boolean
 * }
 *
 * NOTE: This will also remove the request from the database
 *		 as it has been seen/responded to.
 *
 *****************************************************
 */
router.post('/:requestID', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	var confirmed = req.body.confirmed;
	var requestID = req.params.requestID;
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			if (confirmed === 'true') {
				dbc.acceptRequest(username, requestID, function(err) {
					if (err) {
						response.message = err;
						response.success = false;
						res.write(JSON.stringify(response));
          				res.end();
					} else {
						dbc.removeRequest(username, requestID, function(err) {
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
			} else if (confirmed === 'false') {
				dbc.removeRequest(username, requestID, function(err) {
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
			} else {
					response.message = "Value for key 'confirmed' was not given as a boolean";
					response.success = false;
					res.write(JSON.stringify(response));
          			res.end();
			}
		}
	});
});

module.exports = router;
