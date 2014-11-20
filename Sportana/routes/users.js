var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/* GET retrieves a user profile */
router.get('/:login', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	console.log("auth: " + auth);
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var login = req.params.login;
			dbc.getUserProfile(username, login, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

/* PUT creates a new user */
router.put('/', function(req, res) {
	var email = req.body.email.split("@");
	var login = email[0];
	var emailSuffix = email[1];
	var userObject = {
			login: login, emailSuffix: emailSuffix, password: req.body.password,
			firstname: req.body.firstname, lastname: req.body.lastname,
			dateOfBirth: req.body.dateOfBirth, city: req.body.city,
			};
	console.log("\n" + "Attempting to create user... " + JSON.stringify(userObject) + "\n");
	dbc.createUser(userObject, function(err, data){
		res.send(JSON.stringify(data));
	});
});

/* POST edits city */
router.post('/editCity', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var city = req.body.city;
			dbc.editCity(username, city, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

/* POST edits favorite sports, one at a time */
router.post('/addFavoriteSport', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var sport = req.body.sport;
			dbc.addFavoriteSport(username, sport, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

/* DELETE deletes a favorite sport, one at a time */
router.delete('/deleteFavoriteSport/:sport', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var sport = req.params.sport;
			dbc.deleteFavoriteSport(username, sport, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

/* POST edits profile picture */
// TO-DO

/* POST rates users */
// API says this is a PUT, I think either would be fine - POST might make more sense if we can change ratings at some point
router.post('/ratings', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var userRated = req.body.userRated;
			var friendliness = req.body.friendliness;
			var timeliness = req.body.timeliness;
			var skilllevel = req.body.skilllevel;
			if(rater != "" && userRated != "" && friendliness != "" && timeliness != "" && skilllevel != ""){
				var userObject = {
						rater: username, userRated: userRated,
						friendliness: friendliness, timeliness: timeliness, skilllevel: skilllevel
						};
			}
			dbc.rate(userObject, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

router.put('/password-reset', function (req, res) {
	var email = req.body.email.split("@");
	var login = email[0];
	var emailSuffix = email[1];

	res.send("not finished yet");
	//call function
});

router.post('/account/password', function (req, res) {
	res.send("not finished yet");
});

router.post('/account/status', function (req, res) {
	res.send("not finished yet");
});

module.exports = router;
