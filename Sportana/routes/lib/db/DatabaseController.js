var pg = require('pg');
var ageHelper = require('../helpers/ageHelper');

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
        // This cleans up connected clients to the database and allows subsequent requests to the database
        pg.end();
        if (err) {
          callback(err, false);
        }
        else {
          if (result.rows[0].password === password) {
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
        // This cleans up connected clients to the database and allows subsequent requests to the database
        pg.end();
        if (err) {
          callback(err);
        }
        else {
            callback(undefined, result.rows[0].login);
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
            	pg.end();
            	if(err){
            		callback(err);
            	}
            	else {
            		console.log("Database returned: \n" + result.rows[0]);
            		callback(undefined, result.rows[0]);
            	}
             });
		}
	});
};

exports.putUserAuth = function(login, auth, callback) {
	pg.connect(connString, function(err, client, done) {
	    if(err) {
			callback(false);
		}
		else {
			var SQLQuery = "UPDATE Users SET auth=$1 WHERE login = $2";
			client.query(SQLQuery, [auth, login], function(err, result) {
             	done();
             	client.end();
             	// This cleans up connected clients to the database and allows subsequent requests to the database
        		pg.end();
            	if(err){
					callback(false);
            	}
            	else {
					callback(true);
            	}
             });
		}
	});
};

/**
 *****************************************************
 * getFriendsList
 * Returns the list of friends of the given username
 *
 * â€œfriendsâ€� : [{
 * 		â€œloginâ€�: 			login
 * 		â€œprofilePhotoâ€�:  	string // url of photo
 * 		â€œfirstNameâ€�:		string
 * 		â€œlastNameâ€�:			string
 * 		â€œageâ€�:				int
 * 		â€œcityâ€�:				string
 * }]
 *
 *****************************************************
 */
exports.getFriendsList = function(username, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err, undefined);
    }
    else {
    	var SQLQuery = "SELECT Users.login, Users.firstName, Users.lastName, Users.profilePicture, Users.birthday, Users.city " +
    					"FROM Users INNER JOIN Friends ON (Friends.userB=Users.login) WHERE (Friends.userA=$1) ORDER BY Users.firstName ASC";
    	client.query({ text : SQLQuery,
                     values : [username]},
        function (err, result) {
        	// Ends the "transaction":
        	done();
        	// Disconnects from the database:
        	client.end();
        	// This cleans up connected clients to the database and allows subsequent requests to the database
        	pg.end();
        	if (err) {
         	 callback(err, undefined);
        	}
        	else {
          		var friends = [];
          		for( var i = 0; i < result.rows.length; i++ ) {
          			var friend = {};
  					friend.login = result.rows[i].login;
  					friend.profilePhoto = result.rows[i].profilepicture;
  					friend.firstName = result.rows[i].firstname;
  					friend.lastName = result.rows[i].lastname;
  					friend.city = result.rows[i].city;
  					friend.age = ageHelper.makeAgeFromBirthday(result.rows[i].birthday);
  					friends.push(friend);
		  		}
          		callback(undefined, friends);
        	}
      });
    }
  });
};


exports.removeFriend = function(username, friendLogin, callback) {
	pg.connect(connString, function(err, client, done) {
	    if(err) {
			callback(err);
		}
		else {
			var SQLQuery = "DELETE FROM Friends WHERE ((userA=$1) AND (userB=$2)) OR ((userB=$3) AND (userA=$4))";
			client.query(SQLQuery, [username, friendLogin, username, friendLogin], function(err, result) {
             	done();
             	client.end();
             	// This cleans up connected clients to the database and allows subsequent requests to the database
        		pg.end();
            	if(err){
					callback(err);
            	}
            	else {
					callback(undefined);
            	}
             });
		}
	});
};

exports.createUser = function(UserObject, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err)
		}
		else {
			//check if user exists
			var SQLQuery = "SELECT * FROM Users " +
            "WHERE Users.login = $1";
			client.query({ text : SQLQuery,
            values : [UserObject.login]},
            function(err, result){
            	done();
            	client.end();
            	if(err){
            		callback(err);
            	}
            	else {
            		if(result.rows == "" || results.rows == null){
            		console.log("Database did not find User with login: " + UserObject.login + ". Creating new User.");
					var SQLQuery = "INSERT INTO Users(login, emailSuffix, password, firstname, lastname, dateOfBirth, city) VALUES (" +
							"$1, $2, $3, $4, $5, $6, $7)";
					client.query({ text : SQLQuery,
		            values : [UserObject.login,
		            UserObject.emailSuffix,
		            UserObject.password,
		            UserObject.firstname,
		            UserObject.lastname,
		            UserObject.dateOfBirth,
		            UserObject.city]
					},
		            function(err, result){
		            	done();
		            	client.end();
		            	if(err){
		            		callback(err);
		            	}
		            	else {
		            		console.log("Database insert succeeded");
		            		//return JSON.stringify(result.rows);
		            		callback(undefined, result.rows);
		            	}
		            });
            	}
            }
		}
	);
	}
	});
}