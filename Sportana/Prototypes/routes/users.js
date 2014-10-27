var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana"; //postgres://user:pass@localhost:5432/database

/* POST users listing. */
router.post('/', function(req, res) 
{
	console.log(req.body);

	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;

	if(email && password && name)
	{		
		var client = new pg.Client(connString);
		client.connect();
		//pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("INSERT into users(email,name,password) VALUES('" + email + "','" + name + "','" + password + "')", function(err, result) {
			console.log(result);
		});
		//});
		res.end();
	}else{
		res.end();
		console.log("Not adding, bad email and/or password");
	}
});

/* GET users listing. */
router.get('/', function(req, res) 
{
	var client = new pg.Client(connString);
	client.connect();

	//pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	client.query('SELECT * FROM users', function(err, result) {
		console.log(JSON.stringify(result.rows));
		res.send(JSON.stringify(result.rows));
		res.end();
	});
	//});
});

/* GET user's profile. */
router.get('/', function(req, res) 
{
	var login = req.body.login;
	
	var client = new pg.Client(connString);
	client.connect();
	client.query('SELECT * FROM users where login = ' + login + '', function(err, result) {
		res.send(JSON.stringify(result.rows));
		res.end();
	});
});

module.exports = router;
