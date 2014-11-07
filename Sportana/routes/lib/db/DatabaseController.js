var pg = require('pg');

//connectionString = process.env.DATABASE_URL || allows for deployed app db connection
var connString = process.env.DATABASE_URL || 'postgres://student:student@localhost/sportana';

exports.getLogin = function(login, password, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
    	var SQLQuery = "SELECT Users.password FROM Users " +
                     "WHERE Users.login = $1";
    	client.query({ text : SQLQuery,
                     values : [login]},
        function (err, result) {
        // Ends the "transaction":
        done();
        // Disconnects from the database:
        client.end();
        if (err) {
          callback(err, false);
        }
        else {
        console.log("Password in db: " + result.rows["password"]);
        console.log("Password given: " + password);
          if (result.rows["password"] === password) {
            callback(undefined, true);
          } else {
            callback(undefined, false);
          }
        }
      });
    }
  });
};

exports.getUserByAuth = function(id, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
    	var SQLQuery = "SELECT Users.login FROM Users " +
                     "WHERE Users.auth = $1";
      	client.query({ text : SQLQuery,
                     values : [id]},
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
};

exports.getUserProfile = function (login, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err)
		}
		else {
			var SQLQuery = "SELECT * FROM Users " +
            "WHERE Users.login = $1";
			client.query({ text : SQLQuery,
            			   values : [login]},
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
             });
		}
	});
};

exports.putUserAuth = function(user, auth, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err, false)
		}
		else {
			var SQLQuery = "UPDATE Users SET auth=$1 WHERE Users.login = $2";
			client.query({ text : SQLQuery,
            			   values : [auth, login]},
             function(err, result){
            	done();
            	client.end();
            	if(err){
            		callback(err, false);
            	}
            	else {
            		callback(undefined, true);
            	}
             });
		}
	});

};

