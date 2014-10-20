var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana"; //postgres://user:pass@localhost:5432/database

/* GET team listing. */
router.get('/', function(req, res) 
{
	var client = new pg.Client(connString);
	client.connect();
	client.query('SELECT * FROM team', function(err, result) {
		res.send(JSON.stringify(result.rows));
		res.end();
	});
});

module.exports = router;