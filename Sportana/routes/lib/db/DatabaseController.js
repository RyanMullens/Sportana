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
        else if (!result.rows[0]) {
          callback("User not found");
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

exports.getUserProfile = function (username, login, callback) {
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
						callback(undefined, {message: "User does not exist"});
						}
					else{
					  if(result.rows[0] !== undefined){
					  var SQLQuery = "SELECT Users.login, Users.emailSuffix, Users.firstname, Users.lastname, Users.profilePicture, Users.city, Users.birthday, " +
						"Users.friendliness, Users.timeliness, Users.skilllevel, " +
						"FavoriteSports.sport, Sport.imageURL " +
						"FROM Users " +
						"LEFT JOIN Ratings ON Users.login = Ratings.userRated " +
						"LEFT JOIN FavoriteSports ON Users.login = FavoriteSports.login " +
						"LEFT JOIN Sport ON FavoriteSports.sport = Sport.sport " +
						"WHERE Users.login = $1 " +
						"GROUP BY Users.login, Ratings.friendliness, Ratings.timeliness, Ratings.skilllevel, FavoriteSports.sport, Sport.imageURL";

						client.query({ text : SQLQuery,
			            			   values : [login]},
			             function(err, result){
			            	done();
			            	//client.end();
			            	//pg.end();
			            	if(err){
								callback(undefined, {message: "error"});
			            	}
			            	else {
	            				var sportsArray = [];
			            		if(result.rows[0]["login"] === login){
			            			result.rows[0]["birthday"] = timeHelper.makeAgeFromBirthday(result.rows[0]["birthday"]);
			            			if(result.rows[0]["friendliness"] == null && result.rows[0]["timeliness"] == null && result.rows[0]["skilllevel"] == null){
			            				result.rows[0]["friendliness"] = 0;
			            				result.rows[0]["timeliness"] = 0;
			            				result.rows[0]["skilllevel"] = 0;
			            			}
			            			if(result.rows.length > 0){
			            				for(i = 0; i < result.rows.length; i++){
			            					sportsArray.push({sportsName: result.rows[i]["sport"], sportImage: result.rows[i]["imageurl"]});
					            			delete result.rows[i]["sport"];
					            			delete result.rows[i]["imageurl"];
			            				}
			            			}
			            			else if(result.rows.length == 0){
			            				sportsArray.push({sportsName: result.rows[0]["sport"], sportImage: result.rows[0]["imageurl"]});
			            				delete result.rows[0]["sport"];
			            				delete result.rows[0]["imageurl"];
			            			}
			            			else{ //null
			            				sportsArray.push({sportsName: null, sportImage: null});
			            				delete result.rows[0]["sport"];
			            				delete result.rows[0]["imageurl"];
			            			}
		            				result.rows[0]["sportsArray"] = sportsArray;
		            				//check if friends finally
		            				console.log("checking friends");
		            				var SQLQuery = "SELECT Friends.userB from Friends where Friends.userA = $1";
		    						client.query({ text : SQLQuery,
		    			            			   values : [username]},
		    			             function(err, friends){
		    			            	done();
		    			            	client.end();
		    			            	pg.end();
		    			            	if(err){
		    								callback(undefined, {message: "error"});
		    			            	}
		    			            	else {
		    			            		console.log("here");
		    			            	if(friends.rows[0]){ //has at least one friend
		    			            		if(friends.rows.length > 0){
		    			            			console.log("amount of friends: " + friends.rows.length);
		    			            			var i = 0; var j = true;
		    			            			while(j){
		    			            				if(friends.rows[i]){ //if first friend, check
			    			            				if(friends.rows[i]["userb"] == login){
			    			            					console.log(friends.rows[i]["userb"]);
			    			            					result.rows[0]["isFriend"] = true;
			    			            					j = false;
			    			            				}
		    			            				}
		    			            				else{
		    			            					console.log("no friends after checking all i");
		    			            					result.rows[0]["isFriend"] = false;
		    			            					j = false;
		    			            				}
		    			            				i++;
		    			            			}
		    			            			}
		    			            		console.log(result.rows[0]);
			    			            	callback(undefined, result.rows[0]);
		    			            		}
		    			            		else{ //no friends
		    			            			console.log("no friends");
		    			            			result.rows[0]["isFriend"] = false;
		    			            			console.log(result.rows[0]);
		    			            			callback(undefined, result.rows[0]);
		    			            		}
		    			            	}
		    			            	});
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

exports.createUser = function(UserObject, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
	  else
    {
			var sqlStatement = "SELECT Users.login FROM Users WHERE Users.login = $1"
			client.query({ text : sqlStatement,
					         values : [UserObject.login] },

            function(err, result) {
	             done();
			         if(err){
			           callback(undefined, {message: "error"});
				       }
               else if (!result.rows[0])
               {
                 // TODO : INSERT HERE -- No user exists with that name, so go ahead and create it
                 var SQLQuery = "INSERT INTO Users(login, emailSuffix, password, firstName, lastName, city, birthday) VALUES (" +
                   "$1, $2, $3, $4, $5, $6, $7)";

                 client.query({
                       text : SQLQuery,
                       values : [
                         UserObject.login,
                         UserObject.emailSuffix,
                         UserObject.password,
                         UserObject.firstname,
                         UserObject.lastname,
                         UserObject.city,
                         UserObject.dateOfBirth]
                         //'abcdefgffewqrr']
                 //No auth token when creating user. Auth token is generated upon logging in.
                 }, function(err, result){
                   done();
                   client.end();
                   pg.end();
                   if(err){
                     callback(undefined, {message: "database INSERT error"});
                   }
                   else
                   {
                     callback(undefined, {message: "success"});
                   }
                 });
             }
             else
             {
               // TODO : Return an error since that username is already taken

               callback(undefined, {message: "User already exists"});
             }
			});
		}
	});
};

exports.editCity = function (username, city, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
		else {
			var SQLQuery = "UPDATE Users SET city=$1 WHERE login = $2";
				client.query({ text : SQLQuery,
							   values : [city, username]},
					function(err, result){
					done();
					client.end();
					pg.end();
					if(err){
						callback(undefined, {message: "could not update"});
						}
					else{
						callback(undefined, {message: "success"});
					}
			});
		}
	});
}

exports.addFavoriteSport = function (username, sport, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
		else {
			var SQLQuery = "INSERT INTO FavoriteSports (login, sport) VALUES ($1, $2)";
				client.query({ text : SQLQuery,
							   values : [username, sport]},
					function(err, result){
					done();
					client.end();
					pg.end();
					if(err){
						callback(undefined, {message: "could not insert"});
						}
					else{
						callback(undefined, {message: "success"});
					}
			});
		}
	});
}

exports.deleteFavoriteSport = function (username, sport, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
		else {
			var SQLQuery = "DELETE FROM FavoriteSports WHERE login = $1 AND sport = $2";
				client.query({ text : SQLQuery,
							   values : [username, sport]},
					function(err, result){
					done();
					client.end();
					pg.end();
					if(err){
						callback(undefined, {message: "could not delete"});
						}
					else{
						callback(undefined, {message: "success"});
					}
			});
		}
	});
}

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

exports.getGameInfo = function(gameCreator, gameID, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err, undefined);
    }
    else {
      var SQLQuery = "SELECT * From Game where (gameID = $1 and creator = $2)";
      client.query({ text : SQLQuery,
                     values : [gameID , gameCreator]},
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
          else {/*
            var gameInfo = {};
            gameInfo.creator = result.rows[0].creator;
            gameInfo.gameID = result.rows[0].gameid;
            gameInfo.gameDate = timeHelper.makeDateFromDateAndTime(result.rows[0].gamedate);
            gameInfo.gameStart = result.rows[0].gamestart;
            gameInfo.gameEnd = result.rows[0].gameend;
            gameInfo.sport = result.rows[0].sport;
            gameInfo.location = result.rows[0].location;
            gameInfo.minPlayers = result.rows[0].minplayers;
            gameInfo.maxPlayers = result.rows[0].maxplayers;
            gameInfo.reservedSpots = result.rows[0].reservedspots;
            gameInfo.minAge = result.rows[0].minage;
            gameInfo.maxAge = result.rows[0].maxage;
            gameInfo.isPublic = result.rows[0].ispublic;
*/
              callback(undefined, result.rows[0]);
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
		pg.connect(connString, function(err, client, done) {
    	if(err) {
    	  callback(err);
    	}
    	else {
    	  var SQLQuery = "INSERT INTO Participant(login, creator, gameID, status) VALUES ($1, $2, $3, 0)";
    	  client.query(SQLQuery, [username, gameCreator, gameID], function(err, result) {
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

exports.joinQueue = function(username, gameCreator, gameID, callback) {
	pg.connect(connString, function(err, client, done) {
    	if(err) {
    	  callback(err);
    	}
    	else {
    	  var SQLQuery = "INSERT INTO Participant(login, creator, gameID, status) VALUES ($1, $2, $3, 1)";
    	  client.query(SQLQuery, [username, gameCreator, gameID], function(err, result) {
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

exports.getAllSports = function(callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err, undefined);
    }
    else {
    	var SQLQuery = "SELECT Sport.sport, Sport.imageURL FROM Sport ORDER BY Sport.sport ASC";
    	client.query({ text : SQLQuery,
                     values : []},
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
          		var sports = [];
          		for( var i = 0; i < result.rows.length; i++ ) {
          			var sport = {};
  					sport.sport = result.rows[i].sport;
  					sport.image = result.rows[i].imageurl;
  					sports.push(sport);
		  		}
          		callback(undefined, sports);
        	}
      });
    }
  });
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

exports.rate = function(UserObject, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
		else {
			var SQLQuery = "INSERT INTO Ratings(userRated, rater, friendliness, timeliness, skilllevel) VALUES ($1, $2, $3, $4, $5)";
			client.query({ text : SQLQuery,
 			   values : [UserObject.userRated, UserObject.rater, UserObject.friendliness, UserObject.timeliness, UserObject.skilllevel]},
 			function(err, result){
			 	done();
			 	client.end();
			 	pg.end();
			 	if(err){
			 		callback(undefined, {message: "insert error"});
			 	}
			 	else {
			 		callback(undefined, {message: "success"});
			 	}
 			   });
		}
	});
};


exports.searchUsers = function(firstName, lastName, callback) {
  if (!firstName && !lastName) {
  	callback('No search parameters given', undefined);
  }
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err, undefined);
    }
    else {
    	var SQLQuery = "SELECT Users.login, Users.firstName, Users.lastName, Users.profilePicture, Users.birthday, Users.city " +
    				   "FROM Users ";
    	var searchValues = [];
    	if (firstName) {
    		SQLQuery += "WHERE lower(Users.firstName) = lower($1)";
    		searchValues.push(firstName);
    	}
    	if (lastName) {
    		if (!firstName) {
    			SQLQuery += "WHERE lower(Users.lastName) = lower($1)";
    		} else {
	    		SQLQuery += " AND lower(Users.lastName) = lower($2)";
	    	}
	    	searchValues.push(lastName);
    	} else {
    		SQLQuery += " OR lower(Users.lastName) = lower($2)";
    		searchValues.push(firstName);
    	}

    	client.query({ text : SQLQuery,
                     values : searchValues},
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
          		var users = [];
          		for( var i = 0; i < result.rows.length; i++ ) {
          			var user = {};
  					user.login = result.rows[i].login;
  					user.profilePhoto = result.rows[i].profilepicture;
  					user.firstName = result.rows[i].firstname;
  					user.lastName = result.rows[i].lastname;
  					user.city = result.rows[i].city;
  					user.age = timeHelper.makeAgeFromBirthday(result.rows[i].birthday);
  					users.push(user);
		  		}
          		callback(undefined, users);
        	}
      });
    }
  });
};

exports.searchGames = function(sport, city, ageMin, ageMax, isCompetitive, callback) {
  if (!sport && !city && !ageMin && !ageMax && !isCompetitive) {
  	callback('No search parameters given', undefined);
  }
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err, undefined);
    }
    else {
    	var SQLQuery = "SELECT Game.creator, Game.gameID, Game.gameDate, Game.gameStart, Game.gameEnd, Game.sport, Game.location, Game.numParticipants, Game.minPlayers, Game.maxPlayers, Game.minAge, Game.maxAge, Sport.imageURL " +
    				   "FROM Game INNER JOIN Sport ON (Game.sport = Sport.sport) WHERE (Game.isPublic = true)";
    	var searchValues = [];
    	if (sport) {
    		SQLQuery += " AND lower(Game.sport) = lower($"+(searchValues.length+1)+")";
    		searchValues.push(sport);
    	}

    	if (city) {
    	    SQLQuery += " AND lower(Game.location) = lower($" + (searchValues.length + 1) +")";
    		searchValues.push(city);
    	}

    	if (ageMin) {
    	    SQLQuery += " AND (Game.minAge > $" + (searchValues.length + 1) +")";
    		searchValues.push(ageMin);
    	}

    	if (ageMax) {
    	    SQLQuery += " AND (Game.maxAge < $" + (searchValues.length + 1) +")";
    		searchValues.push(ageMax);
    	}

    	if (isCompetitive) {
    	    SQLQuery += " AND (Game.isCompetitive = $" + (searchValues.length + 1) +")";
    		searchValues.push(isCompetitive);
    	}

    	var currentDate = timeHelper.getCurrentDate();
    	SQLQuery += " AND (Game.gameDate > $" + (searchValues.length+1) + ")";
    	searchValues.push(currentDate);
    	SQLQuery += " OR ((Game.gameDate = $" + (searchValues.length+1) + ")";
    	searchValues.push(currentDate);
    	SQLQuery += " AND (Game.gameStart > $" + (searchValues.length+1) + "))";
    	searchValues.push(timeHelper.getCurrentTime());
    	SQLQuery += " ORDER BY Game.gameDate, Game.gameStart ASC";

		client.query({ text : SQLQuery,
                     values : searchValues},
        function (err, result) {
            //console.log(result);
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
          		var games = [];
          		for( var i = 0; i < result.rows.length; i++ ) {
          			var game = {};
          			game.creator = result.rows[i].creator;
          			game.gameID  = result.rows[i].gameid;
          			game.gameDate = timeHelper.makeDateFromDateAndTime(result.rows[i].gamedate);
          			game.gameStart = result.rows[i].gamestart;
          			game.gameEnd = result.rows[i].gameend;
          			game.sport = result.rows[i].sport;
          			game.location = result.rows[i].location;
          			game.numParticipants = result.rows[i].numparticipants;
          			game.minPlayers = result.rows[i].minplayers;
          			game.maxPlayers = result.rows[i].maxplayers;
          			game.minAge = result.rows[i].minage;
          			game.maxAge = result.rows[i].maxage;
          			game.sportImage = result.rows[i].imageurl;
  					games.push(game);
		  		}
          		callback(undefined, games);
        	}
      });
    }
  });
};
