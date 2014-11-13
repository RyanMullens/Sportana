var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/**
 *****************************************************
 * POST	/login
 * REQUEST:
 * {
 * 	“email"    : string
 *  "password" : string
 * }
 *
 * RESPONSE:
 * {
 * 	“message”             : string // empty on success
 * 	“success”             : boolean
 *  "authenticationToken" : string // users authentication token
 * 	“login”               : string
 * 	“firstName”           : string
 *  "lastName" 	          : string
 *  "numNotifications"    : int
 * }
 *****************************************************
 */
router.post('', function(req, res) {

	var email = req.body.email;
	var password = req.body.password;
	var arr = email.split("@");
	var username = arr[0]; // Username is part before the @

	//response is authentication token
   authenticator.authenticate(username, password, function(err, user) {
    	  var response = {};
    	  if (err) {
    	    response.message = err;
    	    response.authenticationToken = "";
    	  } else {
    	  	response.message = "";
    	  	response.authenticationToken = user.authenticationToken;
    	  	response.login = user.login;
    	  	response.firstName = user.firstName;
    	  	response.lastName = user.lastName;
    	  	response.numNotifications = user.numNotifications;
    	  }
    	  var json = JSON.stringify(response);
          res.write(json);
          res.end();
    });
});


module.exports = router;
