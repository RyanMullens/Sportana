var express = require('express');
var router = express.Router();

/* temporary */
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

/* PUT creates a new user */
router.get('/users/:login/:firstname/:lastname', function(req, res) { //should be router.put
	var login = req.params.login;
	var firstname = req.params.firstname;
	var lastname = req.params.lastname;
/*	
	if(login && firstname && lastname){
	var client = new pg.Client(connString);
	client.connect();
	client.query("INSERT into users(login,firstname,lastname) VALUES('" + login + "','" + firstname + "','" + lastname + "')", function(err, result){
		console.log(result);
		console.log("got here");
	});
	res.end();
	}
	else{
		console.log("error");
		res.send("error");
		res.end();
	}
*/
	res.send("login, firstname, lastname: " + login + firstname + lastname);
});

/* GET retrieves user profile */
router.get('/users/:login', function(req, res) {
	res.send("lkasdad");
});

/* POST rates users */
router.post('/ratings', function(req, res) {
	res.send("lkasdad");
});

/* PUT password reset */
router.put('/password-reset', function(req, res) {
	res.send("lkasdad");
});

/* DELETE remove user */
//THIS IS FOR TESTING PURPOSES, SHOULD BE router.delete
router.get('/users/delete/:login', function(req, res) {
	var login = req.params.login;
/*
	if(login){
	var client = new pg.Client(connString);
	client.connect();
	client.query("SELECT * from users where login = " + login + ""), function(err, result){
		console.log(result);
		client.query("DELETE * from users where login = " + login + ""), function(err, result2){
			console.log("deleted!");
		}
	}
	res.end();
	}
	else{
		console.log("error");
		res.send("error");
		res.end();
	}
*/
	res.send("login: " + login);
});

/* GET friends of requesting user */
router.get('/friends', function(req, res) {
	res.send("lkasdad");
});

/* PUT user requests to be friends with ID */
router.get('/requests/:friendID', function(req, res) {
	res.send("lkasdad");
});

/* DELETE user deletes friendID */
router.delete('/friends/:friendID', function(req, res) {
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

/* POST request a friend to join a game */
router.post('/requests/game', function(req, res) {
	res.send("lkasdad");
});

//search

module.exports = router;
