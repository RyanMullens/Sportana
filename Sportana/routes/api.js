var express = require('express');
var router = express.Router();

/* temporary */

/*
var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller


var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

var crypto = require('crypto'); // For generating secure tokens
var base64url = require('base64url'); // for base 64 encoding

//localhost:8888/api/route
//example: localhost:8888/api/friends

passport.use(new LocalStrategy(
  function(username, password, done) {
    dbc.getLogin(username, password, function (err, success) {
      if (err) { return done(err); }
      if (success === false) {
        return done(null, false);
      } else {
	      return done(null, true);
	  }
    });
  }
));

function makeAuthToken(size) {
    return base64url(crypto.randomBytes(size));
}

passport.serializeUser(function(user, done) {
  var auth = "";
  var uniqueAuthLoop = true;
  while (uniqueAuthLoop) {
  	auth = makeAuthToken(64);
  	dbc.putUserAuth(user, auth, function(err, success) {
  		if (err || (success === false)) {
  			// repeat loop
  		} else {
  			uniqueAuthLoop = false;
  		}
  	});
 }
  done(null, auth);

});

passport.deserializeUser(function(id, done) {
  dbc.getUserByAuth(id, function(err, username) {
    done(err, username);
  });
});

*/

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* POST logs in user */
router.post('/login', function(req, res) {
   passport.authenticate('local', function(err, username, info) {
    if (err) {

    }
    if (!username) {
    	return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + username);
    });
  })(req, res, next);
});

/* GET retrieves user profile */
router.get('/users/:login', function(req, res) {
	var login = req.params.login;
	var json = getUserProfile(login);
	res.send(json);
});

/* PUT creates a new user */
//router.get('/users/:login/:firstname/:lastname', function(req, res) { //should be router.put
router.get('/users/', function(req, res) {
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
router.post('/ratings', function(req, res) {
	var auth = req.body.auth;
	var targetID = req.body.targetID;
	var friendliness = req.body.friendliness;
	var timeliness = req.body.timeliness;
	var skill = req.body.skill;
	
	//call db method and pass params, get back json object (boolean?)
	//console.log(JSON.parse(data);
	//res.send(data);
});

/* PUT password reset */
router.put('/password-reset', function(req, res) {
	var email = req.body.email;
	email = email.split("@");
	var login = email[0];
	emailSuffix = email[1];
	
	//pass parameters to db method, get back json object
	//console.log(JSON.parse(data);
	//res.send(json);
});

/* GET friends of requesting user */
router.get('/friends', function(req, res) {
	var auth = req.body.auth;
	
	//send to db method, get back list of friends as json object
	//console.log(JSON.parse(data));
	//res.send(data);
});

/* DELETE user deletes friendID */
router.get('/friends/:friendID', function(req, res) {
	
//	console.log("req.body: " + req.body.toString() + " , req.params: " + req.params.friendID);
//	res.send("req.body: " + req.body + " , req.params: " + req.params);
	var auth = req.body.params;
	var login = req.body.login;
	var friendID = req.body.friendID;
	
	//send to db controller, get back json object (success?)
	//console.log(JSON.parse(data));
	//res.send(data);
});

/* POST request a friend to join a game */
router.post('/requests/game', function(req, res) {
	res.send("lkasdad");
});

/* PUT user requests to be friends with ID */
router.get('/requests/:friendID', function(req, res) {
	res.send("lkasdad");
});


/* POST requestID of notification*/
router.post('/requests/:requestID', function(req, res) {
	res.send("lkasdad");
});

/* PUT creates a game */
router.put('/games', function(req, res) {
	res.send("lkasdad");
});

//search

module.exports = router;

