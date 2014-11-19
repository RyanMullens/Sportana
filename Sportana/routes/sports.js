var express = require('express');
var router = express.Router();

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/**
 *****************************************************
 * GET /sports
 * Returns a list of all sports
 *
 * REQUEST:
 * {
 * }
 *
 * RESPONSE:
 * {
 *  “sports” : [{
 * 	 	“sport”        :	string
 * 	 	“image” 	   :  	string // url of photo
 *  }]
 *  “message” : string    // empty on success
 *  “success” : boolean
 * }
 *
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
			dbc.getAllSports(function(err, sports) {
				if (err) {
					response.success = false;
					response.message = err;
				} else {
					response.success = true;
					response.message = "";
					response.sports = sports;
				}
				res.write(JSON.stringify(response));
          		res.end();
			});
		}
	});
});

module.exports = router;
