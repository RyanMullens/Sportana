var express = require('express');
var router = express.Router();

/* GET friends list. */
router.get('/', function(req, res) {
  res.sendfile('./public/partials/viewFriends.html');
});

module.exports = router;
