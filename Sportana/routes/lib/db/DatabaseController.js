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
			var SQLQuery = "SELECT Users.password, Users.firstName, Users.lastName, Users.numNotifications, Users.profilePicture FROM Users " +
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
        		theUser.profilePicture = result.rows[0].profilepicture;
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

var CheckRatings = function(obj, callback){
	var result = obj;
	if(result.rows[0]["friendliness"] == null && result.rows[0]["timeliness"] == null && result.rows[0]["skilllevel"] == null){
		result.rows[0]["friendliness"] = 0;
		result.rows[0]["timeliness"] = 0;
		result.rows[0]["skilllevel"] = 0;
	}
	callback(result);
}

var ConcatSports = function(obj, callback){
	var sportsArray = [];
	var result = obj;
	if(result.rows.length > 0 && result.rows[0]["sport"] != null){ //Has at least one favorite sport
		for(i = 0; i < result.rows.length; i++){
			sportsArray.push({sportsName: result.rows[i]["sport"], sportImage: result.rows[i]["imageurl"]});
		}
		delete result.rows[0]["sport"];
		delete result.rows[0]["imageurl"];
		result.rows[0]["sportsArray"] = sportsArray;
		callback(result.rows[0]);
	}
	else{ //Has no favorite sports
		sportsArray.push({sportsName: "", sportImage: ""});
		delete result.rows[0]["sport"];
		delete result.rows[0]["imageurl"];
		result.rows[0]["sportsArray"] = sportsArray;
		callback(result.rows[0]);
	}
}

var hasRated = function(username, login, callback){
	pg.connect(connString, function(err, client, done){
		if(err){ pg.end(); callback(undefined, {message: "error"}); }
		else{
			var myRatings = [];
			var SQLQuery = "SELECT friendliness, timeliness, skilllevel from Ratings where userrated = $1 AND rater = $2";
			client.query({ text : SQLQuery, values : [login, username]},
				function(err, result){
				done(); //client.end();
				pg.end();
				if(err){ callback({message: "error"}); return;}
				else{
					if(result.rows[0]){
						myRatings.push({friendliness: result.rows[0]["friendliness"], timeliness: result.rows[0]["timeliness"], skilllevel: result.rows[0]["skilllevel"]});
						callback(myRatings);
						return;
					}
					else{
						myRatings.push({friendliness: 0, timeliness: 0, skilllevel: 0});
						callback(myRatings);
						return;
					}
				}
			});
		}
	});
}

var isFriend = function(username, login, callback) {
	pg.connect(connString, function(err, client, done) {
		var isFriend = 0; //0 - Not friend || 1 - Friend || 2 - Pending || 3 - Requested
		if(err) {
			pg.end();
			callback(undefined, {message: "error"});
		}
		else{
			//Friends?
			var SQLQuery = "SELECT Friends.userB from Friends WHERE Friends.userA = $1";
			client.query({ text : SQLQuery,
				values : [username]},
				function(err, result){
					done();
					if(err){
						client.end(); pg.end();
						callback(undefined, {message: "error"});
					}
					else {
						for(var i = 0; i < result.rows.length; i++){
							if(result.rows[i]["userb"] === login){
								isFriend = 1;
								client.end(); pg.end();
								callback(undefined, isFriend, undefined);
								return;
							}
						}
				       //Pending
				       var SQLQuery1 = "SELECT userTo, userFrom, type FROM Notifications WHERE userfrom = $1 AND type = " + '0' + "";
				       client.query({ text : SQLQuery1,
				       	values : [username]},
				       	function(err, result1){
				       		done();
				       		if(err){
				       			client.end(); pg.end();
				       			callback(undefined, {message: "error"});
				       		}
				       		else{
				       			for(var j = 0; j < result1.rows.length; j++){
				       				if(result1.rows[j]["userto"] === login){
				       					isFriend = 2;
				       					var nid = result1.rows[j]["nid"];
				       					client.end(); pg.end();
				       					callback(undefined, isFriend, nid);
				       					return;
				       				}
				       			}
							   	   //Requested
							   	   var SQLQuery2 = "SELECT userTo, userFrom, nid, type FROM Notifications WHERE userto = $1 AND type = " + '0' + "";
							   	   client.query({ text : SQLQuery2,
							   	   	values : [username]},
							   	   	function(err, result2){
							   	   		done();
							   	   		if(err){
							   	   			client.end(); pg.end();
							   	   			callback(undefined, {message: "error"});
							   	   		}
							   	   		else{
							   	   			for(var k = 0; k < result2.rows.length; k++){
							   	   				if(result2.rows[k]["userfrom"] === login){
							   	   					isFriend = 3;
							   	   					var nid = result2.rows[k]["nid"];
							   	   					client.end(); pg.end();
							   	   					callback(undefined, isFriend, nid);
							   	   					return;
							   	   				}
							   	   			}
		 									   if(k == result2.rows.length && j == result1.rows.length && i == result.rows.length){ // Not Friend
		 									   	client.end(); pg.end();
		 									   	callback(undefined, isFriend);
		 									   	return;
		 									   }
		 									}
		 								});
							   	}
							   });
}
});
}
});
}


exports.getUserProfile = function (username, login, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error 250"});
		}
		else {
			var sqlStatement = "SELECT Users.login FROM Users WHERE Users.login = $1";
			client.query({ text : sqlStatement,
				values : [login]},
				function(err, result){
					if(err){
						done(); client.end(); pg.end();
						callback(undefined, {message: "error 259"});
					}
					else if(result.rows[0] == undefined){
						done(); client.end(); pg.end();
						callback(undefined, {message: "User does not exist"});
					}
					else{
					  //if(result.rows[0] !== undefined){
					  	var SQLQuery = "SELECT Users.login, Users.emailSuffix, Users.firstname, Users.lastname, Users.profilePicture, Users.city, Users.birthday, " +
					  	"round(Users.friendliness*100)/100 as friendliness, round(Users.timeliness*100)/100 as timeliness, round(Users.skilllevel*100)/100 as skilllevel, " +
					  	"FavoriteSports.sport, Sport.imageURL " +
					  	"FROM Users " +
					  	"LEFT JOIN FavoriteSports ON Users.login = FavoriteSports.login " +
					  	"LEFT JOIN Sport ON FavoriteSports.sport = Sport.sport " +
					  	"WHERE Users.login = $1 " +
					  	"GROUP BY Users.login, FavoriteSports.sport, Sport.imageURL";

					  	client.query({ text : SQLQuery,
					  		values : [login]},
					  		function(err, result){
					  			done();
					  			client.end();
					  			pg.end();
					  			if(err){
					  				callback(undefined, {message: "error 282"});
					  			}
					  			else {
					  				if(result.rows[0]["login"] === login){
					  					result.rows[0]["birthday"] = timeHelper.makeAgeFromBirthday(result.rows[0]["birthday"]);
					  					CheckRatings(result, function(checked){
					  						result = checked;
					  					});
					  					var temp;
					  					ConcatSports(result, function(concated){
					  						temp = concated;
					  					});
					  					result.rows[0] = temp;

					  					hasRated(username, login, function(myRatings){
					  						result.rows[0]["myRatings"] = myRatings;
					  					});

					  					isFriend(username, login, function(err, value, nid){
					  						if(err){
					  							callback(undefined, {message: "error 302"});
					  						}
			            				else{ //0 - Not friend || 1 - Friend || 2 - Pending || 3 - Requested
			            					result.rows[0]["isFriend"] = value;
			            					if(nid !== undefined)
			            						result.rows[0]["requestID"] = nid;
			            					callback(undefined, result.rows[0]);
			            				}
			            			});
					  				}
					  				else{
					  					callback(undefined, {message: "error 315"});
					  				}
					  			}
					  		});
					//}
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

exports.editPicture = function (username, picture, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
		else {
			var SQLQuery = "UPDATE Users SET profilepicture=$1 where login=$2";
			client.query({ text : SQLQuery,
				values : [picture, username]},
				function(err, result){
					done();
					client.end();
					pg.end();
					if(err){
						callback({message: "could not update"}, {success:false});
					}
					else{
						callback(undefined, {success:true,message: "success"});
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
			var SQLQuery = "Select sport from favoritesports where login = $1";
			client.query({ text: SQLQuery, values : [username]},
				function(err, result){
					done();
					if(err){
						client.end(); pg.end();
						callback(undefined, {message: "error"});
					}
					else{
						var boolean = false;
						for(var i = 0; i < result.rows.length; i++)
							if(result.rows[i]["sport"] == sport)
								boolean = true;
							if(!boolean){
								var SQLQuery = "INSERT INTO FavoriteSports (login, sport) VALUES ($1, $2)";
								client.query({ text : SQLQuery,
									values : [username, sport]},
									function(err, result){
										done();
										if(err){
											client.end(); pg.end();
											callback(undefined, {message: "Insert error"});
										}
										else{
											var SQLQuery = "SELECT Sport.sport, Sport.ImageURL from Sport left join FavoriteSports ON favoritesports.sport = sport.sport WHERE favoritesports.login = $1";
											client.query({ text : SQLQuery, values : [username]},
												function(err, result){
													done();
													client.end(); pg.end();
													if(err){
														callback(undefined, {message: "error"});
													}
													else{
														var sportsArray = [];
														for(i = 0; i < result.rows.length; i++){
															if(result.rows[i]["sport"] == sport)
																sportsArray.push({sportsName: result.rows[i]["sport"], sportImage: result.rows[i]["imageurl"]});
														}
														if(sportsArray.length < 1)
															callback(undefined, {message: "error"});
														var obj = {message: "success", sportsArray: sportsArray};
														callback(undefined, obj);
													}
												}
												)
										}
									});
}
else{
	client.end(); pg.end();
	callback(undefined, {message: "Exists"})
}
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

exports.rate = function(UserObject, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(undefined, {message: "error"});
		}
		else {
			var SQLQuery = "WITH upsert AS (UPDATE Ratings SET friendliness=$3, timeliness=$4, skilllevel=$5 WHERE userrated=$1 AND rater=$2 RETURNING *) " +
			"INSERT INTO Ratings (userrated, rater, friendliness, timeliness, skilllevel) SELECT $1, $2, $3, $4, $5 WHERE NOT EXISTS (SELECT * FROM upsert)";

			client.query({ text : SQLQuery, values : [UserObject.userRated, UserObject.rater, UserObject.friendliness, UserObject.timeliness, UserObject.skilllevel]},
				function(err, result){
					done();
					if(err){
						client.end(); pg.end();
						callback(undefined, {message: "insert/update error"});
					}
					else{
						var SQLQuery = "SELECT round(Users.friendliness*100)/100 as friendliness, " +
						"round(Users.timeliness*100)/100 as timeliness, " +
						"round(Users.skilllevel*100)/100 as skilllevel " +
						"FROM Users WHERE Users.login = $1";
						client.query({ text: SQLQuery, values : [UserObject.userRated]},
							function(err, result){
								done();	client.end(); pg.end();
								if(err){
									callback(undefined, {message: "error"});
								}
								else{
									callback(undefined, result.rows[0]);
								}
							});
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

exports.createGame = function(creator, sportID, startTime, endTime , gameDate, location, minAge, maxAge, minPlayers, maxPlayers, isCompetitive, reservedSlots, status, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err);
		}
		else {
			var SQLQuery = "INSERT INTO Game(creator, sport, gameDate, gameStart, gameEnd, location, minPlayers, maxPlayers, reservedSpots, minAge, maxAge, isPublic, isCompetitive) values "+
			"($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";
			client.query(SQLQuery, [creator, sportID, gameDate, startTime, endTime, location, minPlayers, maxPlayers, reservedSlots, minAge, maxAge, status, isCompetitive], function(err, result) {
              if(err){
              	callback(err);
              }
              else {
              	var SQLQuery = "SELECT max(gameID) AS gameid FROM Game WHERE Game.creator = $1";
					client.query(SQLQuery, [creator], function(err, result) {
						done();
						client.end();
						pg.end();
						if(err){
							callback(err);
						}	
						else {
                			var gameID = result.rows[0].gameid;
							callback(undefined, gameID);
						}
					});
              }
          });
		}
    });
};

exports.editPassword = function (username, password, callback) {
    pg.connect(connString, function(err, client, done) {
        if(err) {
            callback(undefined, {message: "error"});
        }
        else {
            var SQLQuery = "SELECT Users.password FROM Users WHERE Users.login = $1";
            client.query({ text : SQLQuery, values : [username]},
                function(err, result){
                done();
                if(result.rows && result.rows[0]["password"] != password && password != ''){
                    var SQLQuery = "UPDATE Users SET password = $2 WHERE login = $1";
                        client.query({ text : SQLQuery,
                                       values : [username, password]},
                            function(err, result){
                            done();
                            client.end();
                            pg.end();
                            if(err){
                                callback(undefined, {message: "error"});
                                }
                            else{
                                callback(undefined, {message: "success"});
                            }
                    });
                }
                else{
                    client.end(); pg.end();
                    callback(undefined, {message: "Password is same as current. Error"});
                }
            });
        }
    });
}

/**
 *****************************************************
 * getFriendsToInvite
 *
 * Get the invited users for a given game
 *
 *
 * Returns:
 * requests:
 *   [{
 *    "id"            : int
 *    "login" 	  : string // users login
 *    "firstName"  : string // users name
 *    "lastName"  : string // users name
 *    "profilepicture" : string // url
 *   }]
 *****************************************************
 */

 var getFriendsToInvite = function(gameInfo, username, callback) {
 	pg.connect(connString, function (err, client, done) {
 		if (err) {
 			callback(err, undefined);
 		}
 		else {
 			var SQLQuery = "SELECT u.login, u.firstname, u.lastname, u.profilepicture " +
 			"FROM Users as u, Friends as f  WHERE f.usera = $1 AND f.userb = u.login AND " +
 			//"NOT EXISTS (SELECT * FROM Notifications as n WHERE n.gameid = $2 AND n.creator = $3 AND f.userb = n.userto) AND "+
 			"NOT EXISTS (SELECT * FROM Participant p WHERE p.gameid = $2 AND p.creator = $3 AND f.userb = p.login)";
 			client.query({ text : SQLQuery,
 				values : [username, gameInfo.gameID, gameInfo.creator]},
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
        		if (!result.rows[0]) {
        			gameInfo.friends = [];
        		}
        		else{
        			gameInfo.friends = result.rows;
        		}
        		callback(undefined, gameInfo);
        	}
        });
 		}
 	});
};
/*
var getInvited = function(gameInfo, username, callback) {
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err, undefined);
		}
		else {
			var SQLQuery = "SELECT n.nid, u.login, u.firstname, u.lastname, u.profilepicture " +
			"FROM Notifications as n, Users as u " +
			"WHERE n.creator = $1 AND n.gameid = $2 AND n.userTo = u.login";
			client.query({ text : SQLQuery,
				values : [gameInfo.creator, gameInfo.gameID]},
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
        		if (!result.rows[0]) {
        			gameInfo.invited = [];
        		}
        		else{
        			gameInfo.invited = result.rows;
        		}

        		getFriendsToInvite(gameInfo, username, callback);
        	}
        });
		}
	});
};
*/
var getGamePlayers = function(gameInfo, username, callback) {
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err, undefined);
		}
		else {
			var SQLQuery = 	"SELECT u.login, u.firstname, u.lastname, u.profilepicture, p.status " +
			"FROM Participant as p, Users as u " +
			"WHERE p.gameid = $1 and p.creator = $2 and p.login = u.login";
			client.query({ text : SQLQuery,
				values : [gameInfo.gameID , gameInfo.creator]},
				function (err, result) {
					done();
					client.end();
					pg.end();
					if (err) {
						callback(err, undefined);
					}
					else {
						if (!result.rows[0]) {
							gameInfo.players = [];
						}
						else{
							gameInfo.players = result.rows;
						}

						getFriendsToInvite(gameInfo, username, callback);

					}
				});
		}
	});
};
/*
 *  "players"       : [{
 *	  "login"  : string
 *    "name"   : string
 *    "status" : int // 0: going, 1: queued (Sportana has added them to a game), 2: no response
 *   }]
 */
 exports.getGameInfo = function(gameCreator, gameID, username, callback) {
 	pg.connect(connString, function (err, client, done) {
 		if (err) {
 			callback(err, undefined);
 		}
 		else {
 			var SQLQuery = "SELECT * From Game where (gameID = $1 and creator = $2)";
 			client.query({ text : SQLQuery,
 				values : [gameID , gameCreator]},
 				function (err, result) {
 					if (err) {
 						callback(err, undefined);
 					}
 					else {
 						if (!result.rows[0]) {
 							callback("No result found", undefined);
 						}
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

 			SQLQuery = "SELECT Notifications.nid From Notifications where (gameID = $1) and (creator = $2) AND (userTo=$3)";
 			client.query({ text : SQLQuery,
 				values : [gameID , gameCreator, username]},
 				function (err, result) {
 					done();
 					client.end();
 					pg.end();
 					if (err) {
 						callback(err, undefined);
 					}
 					else {
 						if (result.rows[0]) {
 							gameInfo.requestID = result.rows[0].nid;
 						}

 						getGamePlayers(gameInfo, username, callback);
 					}
 				});
 					}
 				});
}
});
};

exports.getGamesList = function(username, callback) {
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err, undefined);
		}
		else {
			var SQLQuery = 	"SELECT g.creator, g.gameID, g.gameDate, g.gameStart, g.location, g.sport "+
			"From Game as g, Participant as p " +
			"WHERE p.login = $1 AND p.gameid = g.gameid AND p.creator = g.creator AND p.status != 2 ";
			client.query(SQLQuery, [username], function (err, result) {
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
          	if (!result.rows[0]) {
          		callback("No result found", undefined);
          	}
	        	var requests = [];
        		for( var i = 0; i < result.rows.length; i++ ) {
        			var request = {};
 					request.creator = result.rows[i].creator;
 					request.gameID = result.rows[i].gameid;
        			request.gameDate = timeHelper.makeDateFromDateAndTime(result.rows[i].gamedate);
        			request.gameStart = result.rows[i].gamestart;
        			request.location = result.rows[i].location;
        			request.sport = result.rows[i].sport;
        			requests.push(request);
        		}
        		callback(undefined, requests);
          	callback(undefined, result.rows);
          }
      });
		}
	});
};

exports.getGamesNotifications = function(username, callback) {
	pg.connect(connString, function (err, client, done) {
 		if (err) {
 			callback(err, undefined);
 		}
 		else {
 			var SQLQuery = "SELECT Notifications.userFrom, Notifications.nid, Notifications.type, " +
 			"Notifications.creator, Notifications.gameID, Game.sport, Game.location, Game.gameDate, Game.gameStart, Users.firstName, Users.lastName " +
 			"FROM Game INNER JOIN Notifications ON ((Notifications.creator=Game.creator) AND (Notifications.gameID=Game.gameID)) INNER JOIN Users ON (Notifications.userFrom = Users.login) " +
 			"WHERE (Notifications.userTo = $1) AND (Notifications.type=1) ORDER BY Notifications.timeSent DESC";
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
 					request.location = result.rows[i].location;
 					request.sport = result.rows[i].sport;
        			request.id = result.rows[i].nid;
        			request.invitedBy = result.rows[i].userfrom;
        			request.invitedByName = result.rows[i].firstname + " " + result.rows[i].lastname;
        			request.gameDate = timeHelper.makeDateFromDateAndTime(result.rows[i].gamedate);
        			request.gameStart = result.rows[i].gamestart;
        			request.creator = result.rows[i].creator;
        			request.gameID = result.rows[i].gameid;
        			requests.push(request);
        		}
        		callback(undefined, requests);
        	}
        });
	  }
	});
};

exports.removePlayer = function(username, gameID, creator, callback) {
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err, undefined);
		}
		else {
			var SQLQuery = 	"DELETE FROM Participant WHERE login = $1 AND gameid = $2 AND creator = $3";
			client.query(SQLQuery, [username, gameID, creator], function (err, result) {
				done();
				client.end();
				pg.end();
				if (err) {
					callback(err, undefined);
				}
				else {
					callback(undefined, result);
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
			var SQLQuery = "DELETE FROM Notifications WHERE (userTo=$1) AND (nid=$2)";
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

var joinGame = function(username, gameCreator, gameID, callback) {
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

exports.joinGame = joinGame;

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


exports.searchUsers = function(firstName, lastName, callback) {
	if (!firstName && !lastName) {
		callback('No search parameters given', undefined);
	}
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err, undefined);
		}
		else {
			var SQLQuery = "SELECT Users.login, Users.firstName, Users.lastName, Users.profilePicture, Users.birthday, Users.city, Users.timeliness, Users.friendliness, Users.skillLevel " +
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
        			user.timeliness = result.rows[i].timeliness;
        			user.friendliness = result.rows[i].friendliness;
        			user.competitiveness = result.rows[i].skilllevel;
        			users.push(user);
        		}
        		callback(undefined, users);
        	}
        });
}
});
};

exports.searchGames = function(username, sport, city, ageMin, ageMax, isCompetitive, callback) {
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
				SQLQuery += " AND (lower(Game.sport) = lower($"+(searchValues.length+1)+"))";
				searchValues.push(sport);
			}

			if (city) {
				SQLQuery += " AND (lower(Game.location) = lower($" + (searchValues.length + 1) +"))";
				searchValues.push(city);
			}

			if (ageMin) {
				SQLQuery += " AND (Game.minAge >= $" + (searchValues.length + 1) +")";
				searchValues.push(ageMin);
			}

			if (ageMax) {
				SQLQuery += " AND (Game.maxAge <= $" + (searchValues.length + 1) +")";
				searchValues.push(ageMax);
			}

			if (isCompetitive) {
				SQLQuery += " AND (Game.isCompetitive = $" + (searchValues.length + 1) +")";
				searchValues.push(isCompetitive);
			}

			SQLQuery += " AND ((Game.creator, Game.gameID) NOT IN (SELECT Participant.creator, Participant.gameID FROM Participant WHERE Participant.login=$"+(searchValues.length+1)+"))";
			searchValues.push(username);
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

exports.postMessage = function(username, creator, gameID, message, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err);
		}
		else {
			var now = timeHelper.getCurrentDateAndTime();
			var SQLQuery = "INSERT INTO GameWallPost(userPosting, gameCreator, gameID, post, timePosted) VALUES ($1, $2, $3, $4, $5)";
			client.query(SQLQuery, [username, creator, gameID, message, now], function(err, result) {
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

exports.getMessages = function(creator, gameID, callback) {
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err, undefined);
		}
		else {
			var SQLQuery = "SELECT GameWallPost.post, GameWallPost.timePosted, Users.firstName, Users.lastName, Users.login " +
			"FROM GameWallPost INNER JOIN Users ON (GameWallPost.userPosting = Users.login) " +
			"WHERE (GameWallPost.gameCreator = $1) AND (GameWallPost.gameID = $2) ORDER BY GameWallPost.timePosted";
			client.query({ text : SQLQuery,
				values : [creator, gameID]},
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
        		var messages = [];
        		for( var i = 0; i < result.rows.length; i++ ) {
        			var message = {};
        			message.message = result.rows[i].post;
        			message.from = result.rows[i].login;
        			message.fromName = result.rows[i].firstname + " " + result.rows[i].lastname;
        			message.time = timeHelper.makeDateFromDateAndTime(result.rows[i].timeposted) + " " + timeHelper.makeTimeFromDateAndTime(result.rows[i].timeposted);
        			messages.push(message);
        		}
        		callback(undefined, messages);
        	}
        });
		}
	});

};

exports.removeFriendRequest = function(username, friendLogin, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err);
		}
		else {
			var SQLQuery = "DELETE FROM Notifications WHERE (userTO=$1) AND (userFrom=$2) AND (type=0)";
			client.query(SQLQuery, [friendLogin,username], function(err, result) {
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

exports.waitForGame = function(login, sports, city, ageMin, ageMax, isCompetitive, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err);
		}
		else {
			var now = timeHelper.getCurrentDateAndTime();
			var queriesCompleted = 0;
			var SQLQuery = "INSERT INTO Queue(login, sport, location, minAge, maxAge, isCompetitive, timeQueued) VALUES ($1, $2, $3, $4, $5, $6, $7)";
			for (var i = 0; i < sports.length; i++) {
				var sport = sports[i].sport;
				client.query(SQLQuery, [login, sport, city, ageMin, ageMax, isCompetitive, now], function(err, result) {
					if(err){
						callback(err);
					}
					else {
						queriesCompleted++;
						if (queriesCompleted >= sports.length) {
							done();
							client.end();
               		// This cleans up connected clients to the database and allows subsequent requests to the database
               		pg.end();
               		callback(undefined);
               	}
               }
           });
			}
		}
	});
};

exports.findUsersForGame = function(creator, gameID, sportID, location, minAge, maxAge, competitive, openSlots, callback) {
	var now = timeHelper.getCurrentDateAndTime();
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err);
		}
		else {
			var	SQLQuery = "INSERT INTO Notifications (userTo, type, timeSent, creator, gameID) " +
						"(SELECT Queue.login, 2, $7, $8, $9 FROM Queue " +
						"WHERE ((Queue.sport=$1) OR (Queue.sport IS NULL)) " +
						"AND ((Queue.location=$2) OR (Queue.location IS NULL)) " +
						"AND ((Queue.minAge >= $3) OR (Queue.minAge IS NULL)) " +
						"AND ((Queue.maxAge <= $4) OR (Queue.maxAge IS NULL )) " +
						"AND ((Queue.isCompetitive = $5) OR (Queue.isCompetitive IS NULL)) ORDER BY Queue.timeQueued ASC LIMIT $6)";
			client.query(SQLQuery, [sportID, location, minAge, maxAge, competitive, openSlots, now, creator, gameID], function(err, result) {
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

exports.getQueueProfile = function(username, callback) {
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err, undefined);
		}
		else {
			var SQLQuery = "SELECT Queue.pid, Queue.sport, Queue.location, Queue.minAge, Queue.maxAge, Queue.isCompetitive FROM Queue " +
			"WHERE (Queue.login = $1)";
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
        		var profiles = [];
        		for( var i = 0; i < result.rows.length; i++ ) {
        			var profile = {};
        			profile.queueID = result.rows[i].pid;
        			profile.sport = result.rows[i].sport;
        			profile.city = result.rows[i].location;
        			profile.ageMin = result.rows[i].minage;
        			profile.ageMax = result.rows[i].maxage;
        			profile.competitive = result.rows[i].iscompetitive;
        			profiles.push(profile);
        		}
        		callback(undefined, profiles);
        	}
        });
		}
	});
};

exports.removeQueueProfiles = function(username, all, profiles, callback) {
	pg.connect(connString, function (err, client, done) {
		if (err) {
			callback(err);
		}
		else {
			if (all) {
				var SQLQuery = "DELETE FROM Queue WHERE Queue.login = $1";
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
        		callback(err);
        	}
        	else {
        		callback(undefined);
        	}
        });
			} else {
				var queriesCompleted = 0;
				var SQLQuery = "DELETE FROM Queue WHERE (Queue.login = $1) AND (Queue.pid = $2)";
				for (var i = 0; i < profiles.length; i++) {
					var id = profiles[i].queueID;
					client.query(SQLQuery, [username, id], function(err, result) {
						if(err){
							callback(err);
						}
						else {
							queriesCompleted++;
							if (queriesCompleted >= profiles.length) {
								done();
								client.end();
               		// This cleans up connected clients to the database and allows subsequent requests to the database
               		pg.end();
               		callback(undefined);
               	}
               }
           });
				}
			}
		}
	});
};

exports.adjustQueueProfile = function(username, queueID, city, ageMin, ageMax, competitive, callback) {
	pg.connect(connString, function(err, client, done) {
		if(err) {
			callback(err);
		}
		else {
			var now = timeHelper.getCurrentDateAndTime();
			var queriesCompleted = 0;
			var SQLQuery = "UPDATE Queue SET location=$1, minAge=$2, maxAge=$3, isCompetitive=$4 WHERE Queue.login=$5 AND Queue.pid=$6";
			client.query(SQLQuery, [city, ageMin, ageMax, competitive, username, queueID], function(err, result) {
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
