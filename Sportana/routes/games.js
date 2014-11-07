var express = require('express');
var router = express.Router();

var url = require('url'); // For parsing the query string in url

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

router.put('/', function(req, res) {

});

router.post('/', function(req, res) {

});

router.get('/', function(req, res) {

});

router.get('/search', function(req, res) {
  var queryData = url.parse(request.url, true).query;
  var sport = queryData.sport;
  // Search for the sport
   
});

module.exports = router;
