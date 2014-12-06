app.factory('QueueService', function($http, $q) {

  var queueService = {};

  /**
  *****************************************************
  * GET	/games/queue
  * Get queueing preferences
  * REQUEST:
  * {
  * }
  *
  * RESPONSE:
  * {
  * 	“message”       : string // empty on success
  * 	“success”       : boolean
  *  "profiles"      : [{
  *    "queueID"   : int
  *    "sport"       : string
  *	  "city"        : string
  *	  "ageMin"      : int
  *	  "ageMax"      : int
  *	  "competitive" : boolean
  *   }]
  * }
  *****************************************************
  */

  queueService.getPreferences = function() {

    return $http.get('/api/games/queue')
    .then(function (res) {
      if(res.data.success) {

        var preferences = {};
        preferences.sports = [];

        var profiles = res.data.profiles;
        if(profiles.length > 0) {

          preferences.city = profiles[0].city;
          preferences.ageMin = profiles[0].ageMin;
          preferences.ageMax = profiles[0].ageMax;
          preferences.competitive = profiles[0].competitive;

          for(var i=0; i<profiles.length; i++) {
            preferences.sports.push( {
              queueID: profiles[i].queueID,
              sport: profiles[i].sport
            });
          }

          return preferences;

        } else {

          // TODO : Nothing to return...  What should I return to the controller requesting?
        }

        return preferences;

      } else {
        console.log(res);
      }
    });
  }

  /**
  *****************************************************
  * PUT	/games/queue
  * Wait for a game
  *
  * REQUEST:
  * {
  *  "sports"       : [{
  *    "sport"      : string
  *  }]
  *	"city"         : string
  *	"ageMin"       : int
  *	"ageMax"       : int
  *	"competitive"  : boolean
  * }
  *
  * RESPONSE:
  * {
  * 	“message”  : string // empty on success
  * 	“success”  : boolean
  * }
  *****************************************************
  */

  queueService.joinQueue = function(preferences) {

    return $http.put('/api/games/queue', preferences)
    .success(function(res) {
      return res;
    })
    .error(function(err) {
      // TODO : Error...
      return err;
    });
  }

  /**
  *****************************************************
  * DELETE	/games/queue/
  * Delete given queue profiles
  * REQUEST:
  * {
  *	 "all"      : boolean // drop all queueing profiles from queue
  *   "profiles" : [{
  *		"queueID" : int
  *   }]
  * }
  *
  * RESPONSE:
  * {
  * 	“message”       : string // empty on success
  * 	“success”       : boolean
  * }
  *****************************************************
  */

  queueService.dropFromQueue = function() {
    return $http.post('/api/games/queue/delete', {all: true}) // Need to pass empty profiles?
    .success(function(res) {
      return res;
    })
    .error(function(err) {
      // TODO : Error...
      return err;
    });
  }

  queueService.removeSportsFromPreferences = function(queueIDs) {

    profiles = [];
    for(var i=0; i<queueIDs.length; i++) {
      profiles.push({queueID: queueIDs[i]});
    }

    req = {};
    req.all = false;
    req.profiles = profiles;

    return $http.post('/api/games/queue/delete', req)
    .success(function(res) {
      return res;
    })
    .error(function(err) {
      // TODO : Error...
      return err;
    });
  }


  /**
  *****************************************************
  * GET	/search/games?sport={currentSearchText}
  *					 &city={city}
  *					 &ageMin={min}
  *					 &ageMax={max}
  *					 &competitive={isCompetitive}
  *
  * RESPONSE:
  * {
  * 	“message”  : string    // empty on success
  * 	“success”  : boolean
  *  "results" :
  *   [{
  "creator"         : string
  "gameID"          : int
  "gameDate"		  : date // yyyy-mm-dd
  "gameStart"		  : time // hh:mm:ss
  "gameEnd"		  : time // hh:mm:ss
  "sport" 		  : string
  "sportImage"	  : string // imageURL
  "location"		  : string
  "numParticipants" : int
  "" 	  : int
  "maxPlayers" 	  : int
  "minAge" 		  : int
  "maxAge" 		  : int
  *   }]
  * }
  *****************************************************
  */
  queueService.getMatches = function(preferences) {

    var city = preferences.city;
    var ageMin = preferences.ageMin;
    var ageMax = preferences.ageMax;
    var competitive = preferences.competitive;
    var sports = preferences.sports;

    var params = {};

    if(ageMin && ageMin != "No Preference") {
      params['ageMin'] = ageMin;
    }
    if(ageMax && ageMax != "No Preference") {
      params['ageMax'] = ageMax;
    }
    params['competitive'] = competitive;

    // Generates a promise containing the results of all of the GET requests
    var deferred = $q.defer();
    var urlCalls = [];
    angular.forEach(preferences.sports, function(sport) {

      var newParams = {};
      for( var key in params ) {
        newParams[key] = params[key];
      }

      newParams['sport'] = sport.sport;
      urlCalls.push($http.get('/api/search/games', {params: newParams}));
    });

    return $q.all(urlCalls)
    .then(
      function(results) {
        console.log(results);
        deferred.resolve( results);
        return deferred.promise;
      },function(errors) {
        console.log(errors);
        deferred.reject(errors);
      });
  }


  /**
  *****************************************************
  * GET	/requests
  * REQUEST:
  * {
  * }
  *
  * RESPONSE:
  * {
  * 	message  : string    // empty on success
  * 	success  : boolean
  *  "requests" :
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
  * }
  *****************************************************
  // TODO




  /**
  *****************************************************
  * GET /sports
  * Returns a list of all sports
  *
  * REQUEST:
  * {
  * }
  *
  * RESPONSE:
  * {
  *  “sports” : [{
  * 	 	“sport”        :	string
  * 	 	“image” 	   :  	string // url of photo
  *  }]
  *  “message” : string    // empty on success
  *  “success” : boolean
  * }
  *
  *****************************************************
  */

  queueService.getSports = function() {
    return $http.get('/api/sports');
  }

  return queueService;

});
