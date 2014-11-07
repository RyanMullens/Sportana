var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler


router.get('/requests', function (req, res) {

});

router.put('/game', function(req, res) {

});

router.put('/friend', function(req, res) {


});

// NOTE: This will also remove the request from the database as it has been seen/responded to
router.post('/:requestID', function(req, res) {

});

module.exports = router;

