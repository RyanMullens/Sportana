var express = require('express');
var router = express.Router();

/* GET settings. */
router.get('/', function(req, res) {
  res.sendfile('./public/partials/settings.html');
});

module.exports = router;
