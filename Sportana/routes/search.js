var express = require('express');
var router = express.Router();

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/**
 *****************************************************
 * GET	/search/games?sport={currentSearchText}
 *					 &city={city}
 *					 &ageMin={min}
 *					 &ageMax={max}
 *					 &competitive={isCompetitive}
 *
 * RESPONSE:
 * {
 * 	“message”  : string    // empty on success
 * 	“success”  : boolean
 *  "results" :
 *   [{
        "creator"         : string 
        "gameID"          : int
        "gameDate"		  : date // yyyy-mm-dd
        "gameStart"		  : time // hh:mm:ss
        "gameEnd"		  : time // hh:mm:ss
        "sport" 		  : string
        "sportImage"	  : string // imageURL
        "location"		  : string
        "numParticipants" : int
        "minPlayers" 	  : int
        "maxPlayers" 	  : int
        "minAge" 		  : int
        "maxAge" 		  : int
 *   }]
 * }
 *****************************************************
 */
router.get('/games', function(req, res) {
	var sport = req.query.sport;
	var city = req.query.city;
	var ageMin = req.query.ageMin;
	var ageMax = req.query.ageMax;
	var isCompetitive = req.query.competitive;
	var auth = req.get('SportanaAuthentication');

	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.searchGames(sport, city, ageMin, ageMax, isCompetitive, function(err, games) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
					response.results = games;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

/**
 *****************************************************
 * GET	/search/users?name={currentSearchText}
 *
 * RESPONSE:
 * {
 * 	“message”  : string    // empty on success
 * 	“success”  : boolean
 *  "results"  :
 *   [{
 *		"login"   : string
 *		"name"    : string
 *		"picture" : string
 *		"city"    : string
 *   }]
 * }
 *****************************************************
 */
router.get('/users', function(req, res) {
	var name = req.query.name.split(" ");
	var firstName = name[0];
	var lastName = name[1];
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.searchUsers(firstName, lastName, function(err, users) {
				if (err) {
					response.message = err;
					response.success = false;
				} else {
					response.message = "";
					response.success = true;
					response.results = users;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

module.exports = router;
