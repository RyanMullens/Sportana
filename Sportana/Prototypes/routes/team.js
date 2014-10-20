var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana"; //postgres://user:pass@localhost:5432/database

/* GET team listing. */
router.get('/', function(req, res) 
{
	var client = new pg.Client(connString);
	client.connect();
	//pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	client.query('SELECT * FROM team', function(err, result) {
		res.send(JSON.stringify(result.rows));
		res.end();
	});
	//});
});

module.exports = router;