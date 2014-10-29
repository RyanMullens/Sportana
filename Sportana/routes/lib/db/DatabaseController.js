var pg = require('pg');

var connString = 'postgres://student:student@localhost/sportana';

function getLogin(callback, login, password) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
    	var SQLQuery = "SELECT Users.password FROM Users " +
                     "WHERE Users.login = $1";
    	client.query({ text : SQLQuery,
                     values [login]},
        function (err, result) {
        // Ends the "transaction":
        done();
        // Disconnects from the database:
        client.end();
        if (err) {
          callback(err);
        }
        else {
          if (result.rows["password"] === password) {
            callback(undefined, true);
          } else {
            callback(undefined, false);
          }
        }
      });
    }
  });
}

function getUserByAuth(id, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
    	var SQLQuery = "SELECT Users.login FROM Users " +
                     "WHERE Users.auth = $1";
      	client.query({ text : SQLQuery,
                     values [id]},
        function (err, result) {
        // Ends the "transaction":
        done();
        // Disconnects from the database:
        client.end();
        if (err) {
          callback(err);
        }
        else {
          if (result.rows["login"] === password) {
            callback(undefined, result.rows["login"]);
          } else {
            callback(undefined, undefined);
          }
        }
      });
    }
  });
}

function getUserProfile(login, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err)
		}
		else {
			var SQLQuery = "SELECT * FROM Users " +
            "WHERE Users.login = $1";
			client.query({ text : SQLQuery,
            values [login]},
            function(err, result){
            	done();
            	client.end();
            	if(err){
            		callback(err);
            	}
            	else {
            		console.log("Database returned: \n" + result.rows);
            		return JSON.stringify(result.rows);
            	}
            }
		});
	});
}

exports.getLogin = getLogin;