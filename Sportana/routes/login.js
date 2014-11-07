var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/* POST logs in user */
router.post('/', function(req, res) {
   authenticator.authenticate(user, function(err, username, info) {
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


module.exports = router;