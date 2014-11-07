var crypto = require('crypto'); // For generating secure tokens
var base64url = require('base64url'); // for base 64 encoding

var makeAuthToken = function(size) {
    return base64url(crypto.randomBytes(size));
};

var serializeUser = function(user, done) {
  var auth = "";
  var uniqueAuthLoop = true;
  while (uniqueAuthLoop) {
  	auth = makeAuthToken(64);
  	dbc.putUserAuth(user, auth, function(err, success) {
  		if (err || (success === false)) {
  			// repeat loop
  		} else {
  			uniqueAuthLoop = false;
  		}
  	});
 }
  done(null, auth);
};

var deserializeUser = function(id, done) {
  dbc.getUserByAuth(id, function(err, username) {
    done(err, username);
  });
};
