app.factory('QueueService', function($http) {

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

        console.log("getPreferences Data:");
        console.log(res.data);
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

    console.log("HTTP PUT Preferences");
    console.log(preferences);
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
    return $http.delete('/api/games/queue', {all: true})
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
    console.log("REQ");
    console.log(req);

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
    // .success(function(res) {
    //   return res.sports;
    // })
    // .error(function(err) {
    //   // TODO : Error...
    //   return err;
    // });
  }

  return queueService;

});
