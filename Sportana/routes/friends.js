var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

/* 
 * /friends
 * Returns the list of friends of the requesting user
 */
router.get('/', function (req, res) {
	  res.send('respond with a resource');
});

router.delete('/:friendID', function (req, res) {
	res.send('respond with a resource');
});

module.exports = router;
