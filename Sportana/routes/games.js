var express = require('express');
var router = express.Router();

var url = require('url'); // For parsing the query string in url
var dbc = require('./lib/db/DatabaseController.js'); // Database Controller
var authenticator = require('./authentication'); // Authentication Handler

/**
 *****************************************************
 * PUT	/games
 * REQUEST:
 * {
 * 	“sportID"    : string
 *  "gameDate" 	 : date // yyyy-mm-dd
 *  "startTime"  : time // hh:mm:ss
 *  "endTime"    : time // hh:mm:ss
 *  "location"   : string
 *  "minAge"	 : int
 *  "maxAge"	 : int
 *  "minPlayers" : int
 *  "maxPlayers" : int
 *  "status"	 : int // 1: public, 0: not public
 * }
 *
 * RESPONSE:
 * {
 * 	“message”             : string // empty on success
 * 	“success”             : boolean
 * }
 *****************************************************
 */
router.put('', function(req, res) {

	var sportID = req.body.sportID;
	var gameDate = req.body.gameDate;
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;
	var location = req.body.location;
	var minAge = req.body.minAge;
	var maxAge = req.body.maxAge;
	var minPlayers = req.body.minPlayers;
	var maxPlayers = req.body.maxPlayers;
	var status = req.body.status;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, creator) {
		var response ={};
		if (err || (!creator)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.createGame(creator, sportID, startTime, endTime , gameDate, location, minAge, maxAge, minPlayers, maxPlayers, status, function(err) {
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
 * POST	/games/join
 * Join a game
 *
 * REQUEST:
 * {
 *  "creator" : string
 *  "gameID"  : int
 * }
 *
 * RESPONSE:
 * {
 * 	“message”  : string // empty on success
 * 	“success”  : boolean
 * }
 *****************************************************
 */
router.post('/join', function(req, res) {
	var creator = req.body.creator;
	var gameID = req.body.gameID;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!creator)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.joinGame(username, creator, gameID, function(err) {
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
 * POST	/games/queue
 * Wait for a game
 *
 * REQUEST:
 * {
 *  "sport"        : string
 *	"city"         : string
 *	"ageMin"       : int
 *	"ageMax"       : int
 *	"competitive"  : boolean
 *  "availability" :
 *  [{
 *	  "date"       : date
 *    "startTime"  : time
 *    "endTime"    : time
 *  }]
 * }
 *
 * RESPONSE:
 * {
 * 	“message”  : string // empty on success
 * 	“success”  : boolean
 * }
 *****************************************************
 */
router.post('/queue', function(req, res) {
	var sport = req.body.sport;
	var city = req.body.city;
	var ageMin = req.body.ageMin;
	var ageMax = req.body.ageMax;
	var isCompetitive = req.body.competitive;
	var availability = req.body.availability;
	response.success = false;
	response.message = "Not yet implemented";
	res.write(JSON.stringify(response));
    res.end();
});

/**
 *****************************************************
 * GET	/games/messages?creator={creator}
 *					   &gameID={gameID}
 * Get messages in game wall
 *
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	“message”   : string // empty on success
 * 	“success”   : boolean
 *  "posts"     : [{
 *    "from"       : string // login
 *    "fromName"   : string // users name
 *    "message"    : string
 *	  "datePosted" : date // yyyy-mm-dd
 *    "timePosted" : time // hh:mm:ss
 *  }]
 * }
 *****************************************************
 */
router.get('/messages', function(req, res) {
	var creator = req.query.creator;
	var gameID = req.query.gameID;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getMessages(creator, gameID, function(err, messages) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
					response.posts = messages;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * POST	/games/messages
 * Post a message to message wall
 *
 * REQUEST:
 * {
 *  "creator"    	: string
 *  "gameID"        : int
 * 	“message”    	: string 
 * }
 *
 * RESPONSE:
 * {
 * 	“message”  : string // empty on success
 * 	“success”  : boolean
 * }
 *****************************************************
 */
router.post('/messages', function(req, res) {
    var creator = req.body.creator;
    var gameID = req.body.gameID;
    var message = req.body.message;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.postMessage(username, creator, gameID, message, function(err) {
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
 * GET	/games/{gameCreator}/{gameID}
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	“message”    	: string // empty on success
 * 	“success”    	: boolean
 *  "creator"    	: string
 *  "gameID"        : int
 *  "gameDate" 	 	: date // yyyy-mm-dd
 *  "gameStart"  	: time // hh:mm:ss
 *  "gameEnd"    	: time // hh:mm:ss
 *  "location"   	: string
 * 	“sport"      	: string 
 *  "minAge"   	    : int
 *  "maxAge"	    : int
 *  "minPlayers"    : int
 *  "maxPlayers"    : int
 *  "reservedSpots" : int
 *  "isPublic"	 	: boolean
 * }
 *****************************************************
 */
router.get('/:gameCreator/:gameID', function (req, res) {
	//given the gameID
	var gameCreator = req.params.gameCreator;
	var gameID = req.params.gameID;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
		  response.message = "Error with authentication";
		  response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getGameInfo(gameCreator, gameID, function(err, jsonGameInfo) {
				if (err) {
					response.success = false;
					response.message = err;
				} else {
					response = jsonGameInfo; 
					response.success = true;
					response.message = "";
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

module.exports = router;
