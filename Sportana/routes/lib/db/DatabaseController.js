var pg = require('pg');
var timeHelper = require('../helpers/timeHelper');

//connectionString = process.env.DATABASE_URL || allows for deployed app db connection
var connString = process.env.DATABASE_URL || 'postgres://student:student@localhost/sportana';

exports.getLogin = function(login, password, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
    	var SQLQuery = "SELECT Users.password, Users.firstName, Users.lastName, Users.numNotifications FROM Users " +
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
          callback(err, undefined, false);
        }
        else {
          if (result.rows[0].password === password) {
          	var theUser = {};
          	theUser.login = login;
          	theUser.firstName = result.rows[0].firstname;
          	theUser.lastName = result.rows[0].lastname;
          	theUser.numNotifications = result.rows[0].numnotifications;
            callback(undefined, theUser, true);
          } else {
            callback(undefined, undefined, false);
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
        else if (!result.rows[0]) {
        	callback("User not found");
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
			callback(undefined, {message: "error"});
		}
		else {
			var sqlStatement = "SELECT Users.login FROM Users WHERE Users.login = $1";
				client.query({ text : sqlStatement,
							   values : [login]},
					function(err, result){
					done();
					//client.end();
					//pg.end();
					if(err){
						callback(undefined, {message: "error"});
						}
					else{
					  if(result.rows[0] !== undefined){
//							var SQLQuery = "SELECT Users.login, Users.emailSuffix, Users.firstname, Users.lastname, Users.profilePicture, Users.city, Users.birthday, " +
//							"round(avg(ratings.friendliness)) as friendliness, round(avg(ratings.timeliness)) as timeliness, round(avg(ratings.skilllevel)) as skilllevel, " +
//							"FavoriteSports.sport " +
//							"FROM Users " +
//							"LEFT JOIN Ratings ON Users.login = Ratings.userRated " +
//							"LEFT JOIN FavoriteSports ON Users.login = FavoriteSports.login " +
//							"WHERE Users.login = $1 " +
//							"GROUP BY Users.login, FavoriteSports.sport";
					  var SQLQuery = "SELECT Users.login, Users.emailSuffix, Users.firstname, Users.lastname, Users.profilePicture, Users.city, Users.birthday, " +
						"Users.friendliness, Users.timeliness, Users.skilllevel, " +
						"FavoriteSports.sport " +
						"FROM Users " +
						"LEFT JOIN Ratings ON Users.login = Ratings.userRated " +
						"LEFT JOIN FavoriteSports ON Users.login = FavoriteSports.login " +
						"WHERE Users.login = $1";// +
						//"GROUP BY Users.login, FavoriteSports.sport";
					  
						client.query({ text : SQLQuery,
			            			   values : [login]},
			             function(err, result){
			            	done();
			            	client.end();
			            	pg.end();
			            	if(err){
								callback(undefined, {message: "error"});
			            	}
			            	else {
			            		if(result.rows[0]["login"] === login){
			            			result.rows[0]["birthday"] = timeHelper.makeAgeFromBirthday(result.rows[0]["birthday"]);
			            			if(result.rows[0]["friendliness"] == null && result.rows[0]["timeliness"] == null && result.rows[0]["skilllevel"] == null){
			            				result.rows[0]["friendliness"] = 0;
			            				result.rows[0]["timeliness"] = 0;
			            				result.rows[0]["skilllevel"] = 0;
			            			}
			            			if(result.rows[0]["sport"] == null)
			            				result.rows[0]["sport"] = "Unselected";
			            			callback(undefined, result.rows[0]);
			            		}
			            		else{
			            			console.log("user does not exist");
			    					callback(undefined, {message: "error"});
			            		}
			            	}
			            });
						}
				else{
					callback(undefined, {message: "error"});
				}
			}});
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
 * friends : [{
 * 		login: 			login
 * 		profilePhoto:  	string // url of photo
 * 		firstName:		string
 * 		age:			int
 * 		city:			string
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
  					friend.age = timeHelper.makeAgeFromBirthday(result.rows[i].birthday);
  					friends.push(friend);
		  		}
          		callback(undefined, friends);
        	}
      });
    }
  });
};

var addFriend = function(username, friendUsername, callback) {
	pg.connect(connString, function(err, client, done) {
	    if(err) {
			callback(err);
		}
		else {
			var SQLQuery = "INSERT INTO Friends(userA, userB) VALUES ($1, $2)";
			client.query(SQLQuery, [username, friendUsername], function(err, result) {
             	done();
            	if(err){
            		client.end();
             		// This cleans up connected clients to the database and allows subsequent requests to the database
        			pg.end();
					callback(err);
            	}
            	else {
   	          		client.query(SQLQuery, [friendUsername, username], function(err, result) {
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
			callback(undefined, {message: "error"});
		}
		else {
			var sqlStatement = "SELECT Users.login FROM Users WHERE Users.login = $1"
				client.query({ text : sqlStatement,
							   values : [UserObject.login]},
					function(err, result){
					done();
					if(err){
						callback(undefined, {message: "error"});
						}
					else{
						if(result.rows[0]["login"] === UserObject.login){
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
			            	pg.end();
			            	if(err){
								callback(undefined, {message: "error"});
			            	}
			            	else {
			            		callback(undefined, {message: "success"});
			            	}
			            });
						}
				else{
					callback(undefined, {message: "error"});
				}
			}});
		}
	});
};

exports.createGame = function(email, sportID, startTime, endTime , gameDate, location, minAge, maxAge, minPlayers, maxPlayers, status, callback) {
  pg.connect(connString, function(err, client, done) {
      if(err) {
      callback(err);
    }
    else {
      var SQLQuery = "INSERT INTO Game(creator , gameDate, gameStart, gameEnd, sport , location , maxPlayers, minPlayers, reservedSpots, minAge, maxAge , isPublic) values "+
      "($1 , $2,$3 , $4,$5 , $6,$7 , $8, $9 ,$10 , $11, $12)";
      client.query(SQLQuery, [email, sportID, startTime, endTime, gameDate, location, minAge, maxAge, minPlayers, maxPlayers, status], function(err, result) {
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

exports.addRequest = function(username, friendLogin, reqType, gameCreator, gameID, callback) {
	var type;
	if (reqType === "friend") {
		type = 0;
	} else if (reqType === "game") {
		type = 1;
	} else if (reqType === "queue") {
		type = 2;
	} else if (reqType === "reminder") {
		type = 3;
	} else {
		callback("Unsupported type of notification sent");
	}
	var now = timeHelper.getCurrentDateAndTime();
	pg.connect(connString, function(err, client, done) {
    	if(err) {
    	  callback(err);
    	}
    	else {
    	  var SQLQuery = "INSERT INTO Notifications(userTo, userFrom, type, timeSent, creator, gameID) VALUES "+
    	  "($1, $2, $3, $4, $5, $6)";
    	  client.query(SQLQuery, [friendLogin, username, type, now, gameCreator, gameID], function(err, result) {
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


exports.acceptRequest = function(username, requestID, callback) {
	pg.connect(connString, function(err, client, done) {
	    if(err) {
			callback(err);
		}
		else {
			var SQLQuery = "SELECT userFrom, type, creator, gameID FROM Notifications " +
					       "WHERE (userTO=$1) AND (nid=$2)";
			client.query(SQLQuery, [username, requestID], function(err, result) {
             	done();
             	client.end();
             	// This cleans up connected clients to the database and allows subsequent requests to the database
        		pg.end();
            	if(err){
					callback(err);
            	}
            	else {
            	console.log(result);
					var from = result.rows[0].userfrom;
					var type = result.rows[0].type;
					var gameCreator = result.rows[0].creator;
					var gameID = result.rows[0].gameid;
					if (type === 0) { // Friend
						addFriend(username, from, callback);
					} else if (type === 1) { // Game
						joinGame(username, gameCreator, gameID, callback);
					} else if (type === 2) { // Queue
						joinQueue(username, gameCreator, gameID, callback);
					} else if (type === 3) { // Game reminder
						callback("You do not need to reply to game reminders");
					} else { // Not defined
						callback("Type of notification not recognized");
					}
            	}
             });
		}
	});
};

exports.removeRequest = function(username, requestID, callback) {
	pg.connect(connString, function(err, client, done) {
	    if(err) {
			callback(err);
		}
		else {
			var SQLQuery = "DELETE FROM Notifications WHERE (userTO=$1) AND (nid=$2)";
			client.query(SQLQuery, [username, requestID], function(err, result) {
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

exports.joinGame = function(username, gameCreator, gameID, callback) {
	callback("Not yet implemented");
};

exports.joinQueue = function(username, gameCreator, gameID, callback) {
	callback("Not yet implemented");
};

/**
 *****************************************************
 * getRequests
 *
 * Get the requests for the given user
 *
 *
 * Returns:
 * requests:
 *   [{
 *    "id"            : int
 *    "userFrom" 	  : string // users login
 *    "userFromName"  : string // users name
 *    "userFromImage" : string // url
 *    "type"          : int // 0: friend, 1: game, 2: queue, 3: game reminder
 *    "date"          : date // yyyy-mm-dd format
 *    "time"          : time // hh:mm:ss - 24 hour format (ex. 13:00:00 vs 1:00pm)
 *    "gameCreator"   : string // for types 1, 2, and 3
 *    "gameID"        : int // for types 1, 2, and 3
 *   }]
 *****************************************************
 */
exports.getRequests = function(username, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err, undefined);
    }
    else {
    	var SQLQuery = "SELECT Notifications.userFrom, Notifications.nid, Notifications.type, Notifications.timeSent, " +
    	"Notifications.creator, Notifications.gameID, Users.firstName, Users.lastName, Users.profilePicture " +
    	"FROM Notifications INNER JOIN Users ON (Notifications.userFrom = Users.login) " +
    	"WHERE (Notifications.userTo = $1) ORDER BY Notifications.timeSent DESC";
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
          		var requests = [];
          		for( var i = 0; i < result.rows.length; i++ ) {
          			var request = {};
  					request.id = result.rows[i].nid;
  					request.userFrom = result.rows[i].userfrom;
  					request.userFromName = result.rows[i].firstname + " " + result.rows[i].lastname;
  					request.userFromImage = result.rows[i].profilepicture;
  					request.type = result.rows[i].type;
  					request.date = timeHelper.makeDateFromDateAndTime(result.rows[i].timesent);
  					request.time = timeHelper.makeTimeFromDateAndTime(result.rows[i].timesent);
  					request.gameCreator = result.rows[i].creator;
  					request.gameID = result.rows[i].gameid;
  					requests.push(request);
		  		}
          		callback(undefined, requests);
        	}
      });
    }
  });
};

exports.rateUser = function(UserObject, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
		else {
			var sqlStatement = "SELECT Users.login FROM Users WHERE Users.login = $1"
				client.query({ text : sqlStatement,
							   values : [UserObject.login]},
					function(err, result){
					done();
					if(err){
						callback(undefined, {message: "error"});
						}
					else{
						if(result.rows[0]["login"] === login){
						var SQLQuery = "INSERT INTO Ratings(userRated, rater, friendliness, timeliness, skilllevel) VALUES ($1, $2, $3, $4, $5)";
						client.query({ text : SQLQuery,
			            			   values : [UserObject.userRated, UserObject.rater, UserObject.friendliness, UserObject.timeliness, UserObject.skilllevel]},
			             function(err, result){
			            	done();
			            	client.end();
			            	pg.end();
			            	if(err){
								callback(undefined, {message: "error"});
			            	}
			            	else {
			            		callback(undefined, {message: "success"});
			            	}
			            });
						}
				else{
					callback(undefined, {message: "error"});
				}
			}});
		}
	});
};
