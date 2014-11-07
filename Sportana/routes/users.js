var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/* GET retrieves user profile */
router.get('/:login', function(req, res) {
	var login = req.params.login;
	var json = getUserProfile(login);
	res.send(json);
});

/* PUT creates a new user */
//router.get('/users/:login/:firstname/:lastname', function(req, res) {
router.put('/', function(req, res) {
	var email = req.body.email.split("@");
	var login = email[0];
	var emailSuffix = email[1];
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var dateOfBirth = req.body.dateOfBirth;
	var city = req.body.city;

	//pass parameters to method, get back json object
	//console.log(JSON.parse(data));
	//res.json(data);
	res.json({login: login , firstname: firstname , lastname: lastname});
});

/* POST rates users */
// API says this is a PUT, I think either would be fine - POST might make more sense if we can change ratings at some point
router.post('/ratings', function(req, res) {
	var auth = req.body.auth;
	var targetID = req.body.targetID;
	var friendliness = req.body.friendliness;
	var timeliness = req.body.timeliness;
	var skill = req.body.skill;
});

router.put('/password-reset', function (req, res) {

});

router.post('/profile', function (req, res) {

});

router.post('/account/password', function (req, res) {

});

router.post('/account/status', function (req, res) {

});

module.exports = router;


