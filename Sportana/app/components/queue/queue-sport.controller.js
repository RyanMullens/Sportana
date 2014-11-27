app.controller('QueueSportController', function(QUEUE_CONST, $location, QueueService, $http, $scope, $state)
{
	$scope.preferences = {};
	// All Sports
	$scope.sports = [];
	// Sports that are visibly selected
	var selectedSports = [];
	// The sports that existed in the preferences that were retrieved
	$scope.existingSports = [];

	$scope.hasPrefs = false;

	// When the page is loaded
	this.initialize = function() {

		QueueService.getSports()
		.then(function (res) {

			$scope.sports = res.data.sports;

			QueueService.getPreferences()
			.then(function (preferences) {

				if(preferences && preferences.sports.length > 0) {

					console.log(preferences);
					$scope.preferences = preferences;
					$scope.hasPrefs = true;

					// Keep track of the existing sports
					for(var i=0; i<preferences.sports.length; i++) {

						var p = preferences.sports[i];
						// $scope.existingSports[p.sport] = p.queueID;
						$scope.existingSports.push(p);

						var sport = $.grep($scope.sports, function(obj){ return p.sport === obj.sport; });
						selectedSports.push(sport[0]);
					}


				} else {

					// TODO : Initialize default preferences
					$scope.preferences.city = "Anytown";
					$scope.preferences.ageMin = "No Preference";
					$scope.preferences.ageMax = "No Preference";
					$scope.preferences.competitive = false;
					$scope.hasPrefs = false;
					$scope.preferences.sports = [];
				}

				$scope.mode = QUEUE_CONST.normal;
				$scope.setInstructions();

			});
		}, function (err) {
			console.log(err);
		});

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
		return $scope.sports;
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

	/********** AGE **********/

	$scope.agesMin = function() {
		return $scope.ages("min");
	}
	$scope.agesMax = function() {
		return $scope.ages("max");
	}

	$scope.toggleMinAge = function(age) {
		$scope.preferences.ageMin = age;
	}
	$scope.toggleMaxAge = function(age) {
		$scope.preferences.ageMax = age;
	}

	$scope.ages = function(type) {

		var result = [];

		result.push("No Preference");
		for (var i = 16; i <= 30; i++) {
			if(type == "max") {
				if($scope.preferences.ageMin === "No Preference") {
					result.push(i);
				} else if(i >= $scope.preferences.ageMin) {
					result.push(i);
				}
			} else {
				if($scope.preferences.ageMax === "No Preference") {
					result.push(i);
				} else if(i <= $scope.preferences.ageMax) {
					result.push(i);
				}
			}
		}
		for (var i = 35; i <= 70; i+=5) {
			if(type == "max") {
				if($scope.preferences.ageMin === "No Preference") {
					result.push(i);
				} else if(i >= $scope.preferences.ageMin) {
					result.push(i);
				}
			} else {
				if($scope.preferences.ageMax === "No Preference") {
					result.push(i);
				} else if(i <= $scope.preferences.ageMax) {
					result.push(i);
				}
			}
		}

		return result;
	}

	var savePreferences = function () {

		console.log("UPDATING PREFS");


		// TODO : OR - Drop from all queue and requeue with all selected sports...
		// Add any newly selected sports to the preferences.
		console.log("TO ADD");
		for(var i=0; i<selectedSports.length; i++) {

			var sport = $.grep($scope.existingSports, function(obj){ console.log(selectedSports[i].sport);return selectedSports[i].sport === obj.sport; });
			console.log(sport);
			if(!sport || sport.length == 0) {
				console.log("ADDING");
				$scope.preferences.sports.push({sport: selectedSports[i].sport});
			}
		}

		console.log("TO REMOVE");

		var queueIDsToRemove = [];
		for(var i=0; i<$scope.existingSports.length; i++) {

			var s = $.grep(selectedSports, function(obj){ return $scope.existingSports[i].sport === obj.sport; });
			console.log(s);
			if(!s || s.length == 0) {
				console.log("REMOVING");
				queueIDsToRemove.push($scope.existingSports[i].queueID);
			}
		}

		// TODO Update existing profiles with the new info in the text fields etc

		// $scope.preferences.city = "Anytown";
		// $scope.preferences.ageMin = ($scope.preferences.ageMin == "No Preference") ? 16 : $scope.preferences.ageMin;
		// $scope.preferences.ageMax = ($scope.preferences.ageMax == "No Preference") ? 999 : $scope.preferences.ageMax;

		console.log($scope.preferences);

		if($scope.preferences.sports.length > 0) {

			QueueService.joinQueue($scope.preferences).then(function (res) {

				if(queueIDsToRemove.length > 0) {
					console.log(queueIDsToRemove);
					QueueService.removeSportsFromPreferences(queueIDsToRemove).then( function(res) {
						console.log(res);
						$scope.hasPrefs = true;
						$scope.mode = QUEUE_CONST.normal;
						$scope.setInstructions();
					}, function(err) {
						console.log(err);
					});
				} else {
					$scope.hasPrefs = true;
					$scope.mode = QUEUE_CONST.normal;
					$scope.setInstructions();
				}

			}, function (err) {
				console.log(err);
			});
		} else {

			if(queueIDsToRemove.length > 0) {
				QueueService.removeSportsFromPreferences(queueIDsToRemove).then( function(res) {
					console.log(res);
					$scope.hasPrefs = true;
					$scope.mode = QUEUE_CONST.normal;
					$scope.setInstructions();
				}, function(err) {
					console.log(err);
				});
			}

		}
	}

	/**********************************************************************/
	/************************        UPDATES      *************************/
	/**********************************************************************/

	$scope.isEditMode = function() {
		console.log("IN IT");
		return $scope.mode === QUEUE_CONST.edit;
	}

	$scope.setInstructions = function() {
		if(!$scope.hasPreferences()) {

			if(!$scope.isEditMode()) {
				$scope.instructions = "You are not currently looking for any games.  Choose your prefences and Sportana will look for games.";
			} else {
				$scope.instructions = "Choose your game preferences.";
			}

		} else {

			if(!$scope.isEditMode()) {

				if($scope.matches() && $scope.matches().length > 0) {
					$scope.instructions = "Sportana has found these games that match your preferences.";
				} else {
					$scope.instructions = "There are currently no games matching your preferences.";
				}

			} else {
				$scope.instructions = "Update your game preferences.";
			}

		}

	}

	// @ONCLICK
	$scope.enterEditMode = function() {
		$scope.mode = QUEUE_CONST.edit;
		$scope.setInstructions();
	}

	// @ONCLICK
	$scope.createGame = function() {

		// TODO Perform any necessary cleanup

		$state.go('app.createGame');
	}

	// @ONCLICK
	$scope.updatePreferences = function() {
		// TODO SHADOWS EXISTING METHOD
		savePreferences();
	}

	// @ONCLICK
	$scope.cancelPreferenceChanges = function() {

		// TODO Revert preference object to what it was before editing

		$scope.mode = QUEUE_CONST.normal;
		$scope.setInstructions();
	}

	$scope.hasPreferences = function() {
		// TODO SHADOWS EXISTING METHOD
		return $scope.hasPrefs;
	}

	// @ONCLICK
	$scope.dropFromQueue = function() {
		QueueService.dropFromQueue().then(function(res) {

			// TODO Reset the local preferences to undefined
			$scope.hasPrefs = false;
			$scope.setInstructions();

		}, function(err) {
			console.log(err);
		});
	}

	$scope.isViewingMatches = function() {
		return $scope.mode === QUEUE_CONST.normal;
	}

	$scope.gameType = function() {
		return ($scope.preferences.competitive) ? "Competitive" : "Casual";
	}

	$scope.matches = function() {
		// TODO GET the matches for the current preferences
	}

	// @ONCLICK
	$scope.viewGame = function(game) {

		// TODO Perform any necessary cleanup

		$state.go('app.viewGame', {creatorId: game.creator, gameId: game.gameID});
	}

	$scope.isJoined = function(game) {
		return $scope.joinedGames.indexOf(game.gameId) > -1;
	}

	// @ONCLICK
	$scope.joinGame = function(game) {

		// TODO PUT request for joining the given game -> add the game to the joined values
		$scope.joinedGames.push(game.gameId);
	}

	// @ONCLICK
	$scope.declineGame = function(game) {
		// TODO PUT request for declining the given game
		// TODO Remove game from those matching the preferences
	}

	this.initialize();

});
