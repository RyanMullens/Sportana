var express = require('express');
var router = express.Router();

/* GET settings. */
router.get('/', function(req, res) {
  var gameId = req.param.gameId; 
  res.sendfile('./public/partials/viewGame.html');
});

module.exports = router;
