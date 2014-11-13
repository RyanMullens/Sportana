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
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	“message”  : string    // empty on success
 * 	“success”  : boolean
 *  "results" :
 *   [{
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
	
	response.success = false;
	response.message = 'Not yet implemented';
	res.write(JSON.stringify(response));
    res.end();
});

/**
 *****************************************************
 * GET	/search/users?name={currentSearchText}
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 * 	“message”  : string    // empty on success
 * 	“success”  : boolean
 *  "results" :
 *   [{
 *   }]
 * }
 *****************************************************
 */
router.get('/users', function(req, res) {
	var name = req.query.name;
	var response = {};
	
	response.success = false;
	response.message = 'Not yet implemented';
	res.write(JSON.stringify(response));
    res.end();
});

module.exports = router;
