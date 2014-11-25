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
  *    "profileID"   : int
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

    $http.get('/api/queue')
    .then(function (res) {
      if(res.data.success) {

        console.log(res.data.profiles);
        var preferences = {};

        var profiles = res.data.profiles;
        if(profiles.length > 0) {

          preferences.city = profile[0].city;
          preferences.ageMin = profile[0].ageMin;
          preferences.ageMax = profile[0].ageMax;
          preferences.competitive = profile[0].competitive;

          for(int i=0; i<profiles; i++) {
            preferences.sports.push( {
              profileID: profiles[i].profileID;
              sport: profiles[i].sport;
            });
          }
        } else {

          // TODO : Nothing to return...  What should I return to the controller requesting?
        }

        return preferences;

      } else {
        console.log(res.data.message);
      }
    });
  }

  queueService.getSports = function() {

    return $http.get('/api/sports')
    .success(function(res) {
      return res.sports;
    })
    .error(function(err) {
      // TODO : Error...
      return err;
    });
  }

  return queueService;

});
