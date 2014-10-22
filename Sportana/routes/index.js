var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) 
{
  res.sendfile('mainApp.html');
});

module.exports = router;
