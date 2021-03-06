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
 * 	“sportID"       : string
 *  "gameDate" 	    : date // yyyy-mm-dd
 *  "startTime"     : time // hh:mm:ss
 *  "endTime"       : time // hh:mm:ss
 *  "location"      : string
 *  "minAge"	    : int
 *  "maxAge"	    : int
 *  "minPlayers"    : int
 *  "maxPlayers"    : int
 *  "reservedSpots" : int
 *  "public"	    : boolean
 *  "competitive"   : boolean
 * }
 *
 * RESPONSE:
 * {
 * 	“message”       : string // empty on success
 * 	“success”       : boolean
 *  "gameCreator"   : string
 *  "gameID"		: int
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
	var reservedSlots = req.body.reservedSpots;
	var isPublic = req.body.public;
	var isCompetitive = req.body.competitive;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, creator) {
		var response ={};
		if (err || (!creator)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.createGame(creator, sportID, startTime, endTime , gameDate, location, minAge, maxAge, minPlayers, maxPlayers, isCompetitive, reservedSlots, isPublic, function(err, gameID) {
				if (err) {
					response.message = err;
					response.success = false;
					res.write(JSON.stringify(response));
          			res.end();
				} else {
					var openSlots = maxPlayers - reservedSlots;
					if ((openSlots > 0) && (isPublic === 'true')) {
						dbc.findUsersForGame(creator, gameID, sportID, location, minAge, maxAge, isCompetitive, openSlots, function(err) {
							if (err) {
								response.message = err;
								response.success = false;
							} else {
								response.message = "";
								response.success = true;
								response.gameCreator = creator;
								response.gameID = gameID;
							}
							res.write(JSON.stringify(response));
          					res.end();
						});
					} else {
						response.message = "";
						response.success = true;
						response.gameCreator = creator;
						response.gameID = gameID;
						res.write(JSON.stringify(response));
          				res.end();
					}
				}

			});
		}
	});

});


/**
 *****************************************************
 * GET	/games/
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
 *  "location"   	: string
 * 	“sport"      	: string
 * }
 *****************************************************
 */
router.get('', function (req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
		  response.message = "Error with authentication";
		  response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getGamesList(username, function(err, jsonGameInfo) {
				if (err) {
					response.success = false;
					response.message = err;
				} else {
					response.games = jsonGameInfo;
					response.success = true;
					response.message = "";
				}
				console.log(response);
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
 * POST	/games/queue/delete
 * Delete given queue profiles
 * REQUEST:
 * {
 *	 "all"      : boolean // drop all queueing profiles from queue
 *   "profiles" : [{
 *		"queueID" : int
 *   }]
 * }
 *
 * RESPONSE:
 * {
 * 	“message”       : string // empty on success
 * 	“success”       : boolean
 * }
 *****************************************************
 */
router.post('/leave', function (req, res) {
	var gameID = req.body.gameID;
	var creator = req.body.creator;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
		  response.message = "Error with authentication";
		  response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.removePlayer(username, gameID, creator, function(err) {
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
	console.log("GET /games/messages?creator="+creator+"&gameID="+gameID);
	console.log("Auth = " + auth);
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
				console.log("Response: " + JSON.stringify(response));
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
 *  "players"       : [{
 *	  "login"  : string
 *    "name"   : string
 *    "status" : int // 0: going, 1: queued (Sportana has added them to a game), 2: no response
 *   }]
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
			dbc.getGameInfo(gameCreator, gameID, username, function(err, jsonGameInfo) {
				if (err) {
					response.success = false;
					response.message = err;
				} else {
					response = jsonGameInfo;
					response.success = true;
					response.message = "";
				}
				console.log(JSON.stringify(response));
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});


/**
 *****************************************************
 * GET	/games/queue
 * Get queueing preferences
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	“message”       : string // empty on success
 * 	“success”       : boolean
 *  "profiles"      : [{
 *    "queueID"   : int
 *    "sport"       : string
 *	  "city"        : string
 *	  "ageMin"      : int
 *	  "ageMax"      : int
 *	  "competitive" : boolean
 *   }]
 * }
 *****************************************************
 */
router.get('/queue', function (req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
		  response.message = "Error with authentication";
		  response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.getQueueProfile(username, function(err, profiles) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
					response.profiles = profiles;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * POST	/games/queue/delete
 * Delete given queue profiles
 * REQUEST:
 * {
 *	 "all"      : boolean // drop all queueing profiles from queue
 *   "profiles" : [{
 *		"queueID" : int
 *   }]
 * }
 *
 * RESPONSE:
 * {
 * 	“message”       : string // empty on success
 * 	“success”       : boolean
 * }
 *****************************************************
 */
router.post('/queue/delete', function (req, res) {
	var all = req.body.all;
	var profiles = req.body.profiles;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
		  response.message = "Error with authentication";
		  response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.removeQueueProfiles(username, all, profiles, function(err) {
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
 * PUT	/games/queue
 * Wait for a game
 *
 * REQUEST:
 * {
 *  "sports"       : [{
 *    "sport"      : string
 *  }]
 *	"city"         : string
 *	"ageMin"       : int
 *	"ageMax"       : int
 *	"competitive"  : boolean
 * }
 *
 * RESPONSE:
 * {
 * 	“message”  : string // empty on success
 * 	“success”  : boolean
 * }
 *****************************************************
 */
router.put('/queue', function(req, res) {
	var sports = req.body.sports;
	var city = req.body.city;
	var ageMin = req.body.ageMin;
	var ageMax = req.body.ageMax;
	var isCompetitive = req.body.competitive;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.waitForGame(username, sports, city, ageMin, ageMax, isCompetitive, function(err) {
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
 * Update queueing preferences
 *
 * REQUEST:
 * {
 *  "queueID"	   : int
 *	"city"         : string
 *	"ageMin"       : int
 *	"ageMax"       : int
 *	"competitive"  : boolean
 * }
 *
 * RESPONSE:
 * {
 * 	“message”  : string // empty on success
 * 	“success”  : boolean
 * }
 *****************************************************
 */
router.put('/queue', function(req, res) {
	var queueID = req.body.queueID;
	var city = req.body.city;
	var ageMin = req.body.ageMin;
	var ageMax = req.body.ageMax;
	var isCompetitive = req.body.competitive;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response ={};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.adjustQueueProfile(username, queueID, city, ageMin, ageMax, competitive, function(err) {
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
