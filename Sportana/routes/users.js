var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/* GET retrieves a user profile */
router.get('/:login', function(req, res) {
	//var auth = req.body.auth;
	var login = req.params.login;
	//res.send("hello");
	dbc.getUserProfile(login, function(err, data){
		res.send(JSON.stringify(data));
	});
});

/* PUT creates a new user */
router.put('/', function(req, res) {
	var email = req.body.email.split("@");
	var login = email[0];
	var emailSuffix = email[1];

	var userObject = {
			login: login, emailSuffix: emailSuffix,
			firstname: req.body.firstname, lastname: req.body.lastname,
			dateOfBirth: req.body.dateOfBirth, city: req.body.city
			};
	console.log("\n" + "userobject: " + JSON.parse(JSON.stringify(userobject)) + "\n");
	dbc.createUser(userObject, function(err, data){
		res.send(JSON.stringify(data));
	});
});

/* POST rates users */
// API says this is a PUT, I think either would be fine - POST might make more sense if we can change ratings at some point
router.post('/ratings', function(req, res) {
	//var auth = req.body.auth;
	var rater = req.body.login;
	var userRated = req.body.userRated;
	var friendliness = req.body.friendliness;
	var timeliness = req.body.timeliness;
	var skilllevel = req.body.skilllevel;
	if(rater != "" && userRated != "" && friendliness != "" && timeliness != "" && skilllevel != ""){
		var userObject = {
				rater: login, userRated: userRated,
				friendliness: friendliness, timeliness: timeliness, skilllevel: skilllevel
				};
	}
	dbc.rateUser(userObject, function(err, data){
		res.send(JSON.stringify(data));
	});
});

router.put('/password-reset', function (req, res) {
	var email = req.body.email.split("@");
	var login = email[0];
	var emailSuffix = email[1];

	res.send("not finished yet");
	//call function
});

//	.../users/profile
router.post('/profile', function (req, res) {
	var auth = req.body.auth;
	var login = req.body.login;

	res.send("not finished yet");
	//unknown what we will do with this.
	//post to your profile? post what?

});

router.post('/account/password', function (req, res) {
	res.send("not finished yet");
});

router.post('/account/status', function (req, res) {
	res.send("not finished yet");
});

module.exports = router;
