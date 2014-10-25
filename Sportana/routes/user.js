var express = require('express');
var router = express.Router();

/* GET friends list. */
// temporary db connection
var connString = "postgres://student:student@localhost:5432/sportana"; //postgres://user:pass@localhost:5432/database

// /users	Adds a user to Sportana (creates an account)
router.get('/', function(req, res) { //should be post
	res.sendfile('./public/partials/viewProfile.html');
//	console.log(req.body);
//
//	var email = req.body.email;
//	var password = req.body.password;
//	var name = req.body.name;
//
//	if(email && password && name)
//	{		
//		var client = new pg.Client(connString);
//		client.connect();
//		client.query("INSERT into users(email,name,password) VALUES('" + email + "','" + name + "','" + password + "')", function(err, result) {
//			console.log(result);
//		});
//		res.end();
//	}else{
//		res.end();
//		console.log("Not adding, bad email and/or password");
//	}
});

// /users/{login}	Retrieves a user profile
router.get('/:login', function(req, res) {
  console.log(req.params.login);
  var login = req.params.login;
  
//  var client = new pg.Client(connString);
//  client.connect();
//  client.query("SELECT * FROM users where login = " + login + "", function(req, res, result) {
//		res.send(JSON.stringify(result.rows));
//		res.end();
//	});
//  
  res.sendfile('./public/partials/viewProfile.html');
});

module.exports = router;
