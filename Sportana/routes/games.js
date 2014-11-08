var express = require('express');
var router = express.Router();

var url = require('url'); // For parsing the query string in url

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

router.put('/games', function(req, res) {

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

router.post('/', function(req, res) {

});

router.get('/', function(req, res) {

});

router.get('/search', function(req, res) {
  var queryData = url.parse(request.url, true).query;
  var sport = queryData.sport;
  // Search for the sport
   
});

module.exports = router;
