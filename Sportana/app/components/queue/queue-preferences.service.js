app.factory('QueueService', function($http) {

  return {
    sports: sports,
    selectedSports: selectedSports,
    init: this.init(),
    finish: finish(),
    toggle: toggle(),
    getSports: getSports()
  }

  var sports = [
  {icon: "/images/icon_73766.png", name: "Basketball", 	description: "A game about hoops and nets."},
  {icon: "/images/icon_73766.png", name: "Baseball", 		description: "A game about bases."},
  {icon: "/images/icon_73766.png", name: "Football", 		description: "A game about hands..."},
  {icon: "/images/icon_73766.png", name: "Soccer", 			description: "A game about feet..."},
  {icon: "/images/icon_73766.png", name: "Tennis", 			description: "A game about two-us."},
  {icon: "/images/icon_73766.png", name: "Billiards", 	description: "A game about sticks and geometry."},
  {icon: "/images/icon_73766.png", name: "Swimming", 		description: "Not a game.  Water thingy."},
  {icon: "/images/icon_73766.png", name: "Hiking", 			description: "Moving up mountains."},
  {icon: "/images/icon_73766.png", name: "Biking", 			description: "Moving up roads."},
  ];

  var selectedSports = [];

  // When the page is loaded
  this.init = function() {
    // selectedSports = QueueService.getSports();
  }

  // When moving to another section in the preferences
  this.finish = function() {
    // QueueService.setSports(selectedSports);
    // $state.go('queueLocation');
    // this.selectedSports = [];
  }

  // When a Sport is selected
  this.toggle = function(sport) {

    var index = selectedSports.indexOf(sport);
    if(index === -1) {
      selectedSports.push(sport);
    } else {
      selectedSports.splice(index, 1);
    }
    return;
  }

  this.getSelectedSports = function() {
    return selectedSports;
  }

  this.hasSelectedSports = function() {
    return selectedSports.length > 0;
  }

  this.getSports = function() {
    return sports;
  }

  this.isSelected = function(sport) {
    return (selectedSports.indexOf(sport) != -1) ? true : false;
  }

  this.addSport = function(sport) {
    if (selectedSports.indexOf(sport) != -1) return;
    selectedSports.push(sport);
  }

  this.removeSport = function(sport) {
    var index = selectedSports.indexOf(sport);
    if(index === -1) return;
    selectedSports.splice(index, 1);
  }

  /*******************************************************************************************/

  // $scope.gameLocation = {
  //   city: "Amherst"
  // };
  // $scope.players = {
  //   minAge: "No Preference",
  //   maxAge: "No Preference",
  // };
  // $scope.competitive = false;
  //
  // /********** AGE **********/
  //
  // $scope.agesMin = function() {
  //   return $scope.ages("min");
  // }
  // $scope.agesMax = function() {
  //   return $scope.ages("max");
  // }
  //
  // $scope.toggleMinAge = function(age) {
  //   $scope.players.minAge = age;
  // };
  // $scope.toggleMaxAge = function(age) {
  //   $scope.players.maxAge = age;
  // };
  //
  // $scope.ages = function(type) {
  //
  //   var result = [];
  //
  //   result.push("No Preference");
  //   for (var i = 16; i <= 30; i++) {
  //     if(type == "max") {
  //       if($scope.players.minAge === "No Preference") {
  //         result.push(i);
  //       } else if(i >= $scope.players.minAge) {
  //         result.push(i);
  //       }
  //     } else {
  //       if($scope.players.maxAge === "No Preference") {
  //         result.push(i);
  //       } else if(i <= $scope.players.maxAge) {
  //         result.push(i);
  //       }
  //     }
  //   }
  //   for (var i = 35; i <= 70; i+=5) {
  //     if(type == "max") {
  //       if($scope.players.minAge === "No Preference") {
  //         result.push(i);
  //       } else if(i >= $scope.players.minAge) {
  //         result.push(i);
  //       }
  //     } else {
  //       if($scope.players.maxAge === "No Preference") {
  //         result.push(i);
  //       } else if(i <= $scope.players.maxAge) {
  //         result.push(i);
  //       }
  //     }
  //   }
  //
  //   return result;
  // };
  //
  // $scope.isReady = function() {
  //   return true;
  // };
  //
  // $scope.updatePreferences = function () {
  //
  //   if($scope.isReady()) {
  //
  //
  //
  //     /**
  //     *****************************************************
  //     * PUT	/games
  //     * REQUEST:
  //     * {
  //     * 	“sportID"    : string
  //     *  "gameDate" 	 : date // yyyy-mm-dd
  //     *  "startTime"  : time // hh:mm:ss
  //     *  "endTime"    : time // hh:mm:ss
  //     *  "location"   : string
  //     *  "minAge"	 : int
  //     *  "maxAge"	 : int
  //     *  "minPlayers" : int
  //     *  "maxPlayers" : int
  //     *  "status"	 : int // 1: public, 0: not public
  //     * }
  //     *
  //     * RESPONSE:
  //     * {
  //     * 	“message”             : string // empty on success
  //     * 	“success”             : boolean
  //     * }
  //     *****************************************************
  //     */
  //
  //     var queuePreferences = {
  //       sportID: 			$scope.selectedSport.sport,
  //       location: 		$scope.gameLocation.city,
  //       minAge: 			($scope.players.minAge === "No Preference") ? 16 : $scope.players.minAge,
  //       maxAge: 			($scope.players.maxAge === "No Preference") ? 100 : $scope.players.maxAge,
  //       type: 				($scope.competitive) ? 0 : 1,
  //     };
  //
  //     console.log(queuePreferences);
  //
  //     $http.put('/api/games', queuePreferences)
  //     .then(function (res) {
  //       if(res.data.success) {
  //         console.log(res.data);
  //
  //         // TODO : Send friend invites
  //         // TODO : REDIRECT TO 'MY GAMES' PAGE
  //
  //       } else {
  //         console.log(res.data.message);
  //       }
  //     });
  //
  //   } else {
  //     // Not ready to create a game.
  //   }
  // };


  // $http.get('/api/sports')
  // .success(function(res) {
  //   $scope.allSports = res.sports;
  //   console.log($scope.allSports);
  //   $scope.selectedSport = $scope.allSports[1];
  // })
  // .error(function(res) {
  //
  // });


  this.init();

});
