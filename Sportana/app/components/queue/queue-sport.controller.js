// Created by: @bread on 10/25
app.controller("QueueSportController", function($location, QueueService, $http, $scope, $state)
{

	$scope.queue = QueueService;
	console.log($scope.queue);

	var sports = $scope.queue.getSports();

	var selectedSports = $scope.queue.getSelectedSports();

	// When the page is loaded
	this.init = function() {
		$scope.queue.init();
	}

	// When moving to another section in the preferences
	this.finish = function() {
		// TODO
  }

    // When a Sport is selected
	this.toggle = function(sport) {
		$scope.queue.toggle(sport);
	}

	this.getSelectedSports = function() {
		return 	$scope.queue.getSelectedSports();
	}

	this.hasSelectedSports = function() {
		return 	$scope.queue.hasSelectedSports();
	}

	this.getSports = function() {
		return 	$scope.queue.sports;
	}

	this.isSelected = function(sport) {
		return 	$scope.queue.isSelected(sport);
	}

	this.addSport = function(sport) {
		$scope.queue.addSport(sport);
	}

	this.removeSport = function(sport) {
		$scope.queue.removeSport(sport);
	}

	/*******************************************************************************************/

	$scope.gameLocation = {
		city: "Amherst"
	};
	$scope.players = {
		minAge: "No Preference",
		maxAge: "No Preference",
	};
	$scope.competitive = false;

	/********** AGE **********/

	$scope.agesMin = function() {
		return $scope.ages("min");
	}
	$scope.agesMax = function() {
		return $scope.ages("max");
	}

	$scope.toggleMinAge = function(age) {
		$scope.players.minAge = age;
	};
	$scope.toggleMaxAge = function(age) {
		$scope.players.maxAge = age;
	};

	$scope.ages = function(type) {

		var result = [];

		result.push("No Preference");
		for (var i = 16; i <= 30; i++) {
			if(type == "max") {
				if($scope.players.minAge === "No Preference") {
					result.push(i);
				} else if(i >= $scope.players.minAge) {
					result.push(i);
				}
			} else {
				if($scope.players.maxAge === "No Preference") {
					result.push(i);
				} else if(i <= $scope.players.maxAge) {
					result.push(i);
				}
			}
		}
		for (var i = 35; i <= 70; i+=5) {
			if(type == "max") {
				if($scope.players.minAge === "No Preference") {
					result.push(i);
				} else if(i >= $scope.players.minAge) {
					result.push(i);
				}
			} else {
				if($scope.players.maxAge === "No Preference") {
					result.push(i);
				} else if(i <= $scope.players.maxAge) {
					result.push(i);
				}
			}
		}

		return result;
	};

	$scope.isReady = function() {
		return true;
	};

	$scope.updatePreferences = function () {

		if($scope.isReady()) {



			/**
			*****************************************************
			* PUT	/games
			* REQUEST:
			* {
			* 	“sportID"    : string
			*  "gameDate" 	 : date // yyyy-mm-dd
			*  "startTime"  : time // hh:mm:ss
			*  "endTime"    : time // hh:mm:ss
			*  "location"   : string
			*  "minAge"	 : int
			*  "maxAge"	 : int
			*  "minPlayers" : int
			*  "maxPlayers" : int
			*  "status"	 : int // 1: public, 0: not public
			* }
			*
			* RESPONSE:
			* {
			* 	“message”             : string // empty on success
			* 	“success”             : boolean
			* }
			*****************************************************
			*/

			var queuePreferences = {
				sportID: 			$scope.selectedSport.sport,
				location: 		$scope.gameLocation.city,
				minAge: 			($scope.players.minAge === "No Preference") ? 16 : $scope.players.minAge,
				maxAge: 			($scope.players.maxAge === "No Preference") ? 100 : $scope.players.maxAge,
				type: 				($scope.competitive) ? 0 : 1,
			};

			console.log(queuePreferences);

			$http.put('/api/games', queuePreferences)
			.then(function (res) {
				if(res.data.success) {
					console.log(res.data);

					// TODO : Send friend invites
					// TODO : REDIRECT TO 'MY GAMES' PAGE

				} else {
					console.log(res.data.message);
				}
			});

		} else {
			// Not ready to create a game.
		}
	};


	$http.get('/api/sports')
	.success(function(res) {
		$scope.allSports = res.sports;
		console.log($scope.allSports);
		$scope.selectedSport = $scope.allSports[1];
	})
	.error(function(res) {

	});


	this.init();
});
