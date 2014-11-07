var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/* POST logs in user */
router.post('', function(req, res) {

	var email = req.body.email;
	var password = req.body.password;
	var arr = email.split("@");
	var username = arr[0]; // Username is part before the @
	
   authenticator.authenticate(username, password, function(err, authenticationToken) {
    	  var response = {};
    	  if (err) {
    	    response.message = err;	
    	    response.authenticationToken = "";
    	  } else {
    	  	response.message = "";
    	  	response.authenticationToken = authenticationToken;
    	  }
    	  console.log(authenticationToken);
    	  var json = JSON.stringify(response);
          res.write(json);
          res.end();
    });
});


module.exports = router;