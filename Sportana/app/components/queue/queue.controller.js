app.controller('QueueController', function(QUEUE_CONST, $location, QueueService, $http, $scope, $state)
{

	$scope.preferences = {};
	$scope.hasPreferences = false;
	$scope.sports = [];

	var mode;
	// Sports that are visibly selected
	var selectedSports = [];
	// The sports that existed in the preferences that were retrieved
	var existingSports = [];

	$scope.joinedGames = [];

	// 1)	Runs on page load
	var initialize = function() {

		// Destroy any local queue settings so that we are
		// in normal mode and all placeholders are refreshed
		resetQueue();

		// 2)	Retreive all the sports and retrieve the queue preferences for the user
		QueueService.getSports()
		.then(function (res) {

			$scope.sports = res.data.sports;
			getPreferences();

		}, function (err) {
			console.log(err);
		});

	}

	// Clears the Edit Queue Preferences data and state -> Transitions to NORMAL mode
	var resetQueue = function() {

		initializePreferencePlaceholders();

		selectedSports = [];
		existingSports = [];

		mode = QUEUE_CONST.normal;
		$scope.hasPreferences = false;
	}

	// Clear all of the locally selected queue preferences
	var initializePreferencePlaceholders = function() {
		$scope.preferences.city = "Enter a city";
		$scope.preferences.ageMin = "No Preference";
		$scope.preferences.ageMax = "No Preference";
		$scope.preferences.competitive = false;
		$scope.preferences.sports = [];
	}

	// Retreive the user's Queue preferences
	var getPreferences = function() {

		resetQueue();

		QueueService.getPreferences()
		.then(function (preferences) {

			if(preferences && preferences.sports.length > 0) {

				$scope.preferences = preferences;
				$scope.hasPreferences = true;

				// Keep track of the existing sports
				for(var i=0; i<preferences.sports.length; i++) {

					var p = preferences.sports[i];
					existingSports.push(p);

					var sport = $.grep($scope.sports, function(obj){ return p.sport === obj.sport; });
					selectedSports.push(sport[0]);
				}

			}
			mode = QUEUE_CONST.normal;
			setInstructions();
		});
	}

	// Set the appropriate instructional text based on queue status and whether games are found
	var setInstructions = function() {
		if($scope.hasPreferences) {
			if($scope.isEditMode()) {

				$scope.instructions = "Update your game preferences.";
			} else {

				if($scope.matches() && $scope.matches().length > 0) {

					$scope.instructions = "Sportana has found these games that match your preferences.";
				} else {

					$scope.instructions = "There are currently no games matching your preferences.";
				}
			}
		} else {
			if($scope.isEditMode()) {

				$scope.instructions = "Choose your game preferences.";
			} else {

				$scope.instructions = "You are not currently looking for any games.  Choose your prefences and Sportana will look for games.";
			}
		}

	}

	/****************** FSA Functions ******************
	/*

	1) 	Land on page
	2) 	Get Queue Preferences
	3) 	Determine queue status

			A)	Not Queued 	-> 'Edit' + 'Create'
			B) 	Queued 			-> Search games + get queue requests

					i)	Results found 			->	'Edit' + 'Create' + 'Drop Queue' + SHOW THE GAMES
					ii)	Results not found 	->	'Edit' + 'Create' + 'Drop Queue'

						DROP_QUEUE 	->	A
						EDIT				->	EDIT MODE	->	SAVE	->	NORMAL MODE + Look for Games again with updated prefs
						CREATE 			-> 	CREATE GAME PAGE

						a)	// Games are shown that match preferences

								JOIN 	->	Hide games that are/is joined.
								VIEW 	->  Go to the page for that game

										(If a user joined the game from viewing it, we must delete the game from
										the list on the queue page when they navigate back)

										Pass params to state???
	*/


	/****************** BASIC LOGIC ******************/

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

	$scope.agesMin = function() {
		return ages("min");
	}
	$scope.agesMax = function() {
		return ages("max");
	}

	$scope.toggleMinAge = function(age) {
		$scope.preferences.ageMin = age;
	}
	$scope.toggleMaxAge = function(age) {
		$scope.preferences.ageMax = age;
	}

  var ages = function(type) {

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

	// TODO Do not call the server to update the preferences when finished.
	// Find a way to work with the arrays that currently exist.

	// Save the user's queue preferences by first dropping the queue entirely.
	// Then, find all of the sports added and removed, and update the local preferences.
	// Once the local preferences have been updated, join the queue with them.
	var savePreferences = function () {

		// Drop from queue entirely:
		QueueService.dropFromQueue().then(function(res) {

			// Remove any sports that were deselected
			var queueIDsToRemove = [];
			for(var i=0; i<existingSports.length; i++) {

				var s = $.grep(selectedSports, function(obj){ return existingSports[i].sport === obj.sport; });
				if(!s || s.length == 0) {
					queueIDsToRemove.push(existingSports[i].queueID);
				}
			}

			for(var i=0; i<$scope.preferences.sports.length; i++) {
				if(queueIDsToRemove.indexOf($scope.preferences.sports[i].queueID) > -1) {
					$scope.preferences.sports.splice(i, 1);
				}
			}

			// Add any newly selected sports to the preferences.
			for(var i=0; i<selectedSports.length; i++) {

				var sport = $.grep(existingSports, function(obj){ return selectedSports[i].sport === obj.sport; });

				if(!sport || sport.length == 0) {;
					$scope.preferences.sports.push({sport: selectedSports[i].sport});
				}
			}

			if($scope.preferences.sports.length > 0) {

				QueueService.joinQueue($scope.preferences).then(function (res) {

					resetQueue();
					getPreferences();

				}, function (err) {
					console.log(err);
				});
			} else {

				// Validation error

			}

		}, function(err) {
			console.log(err);
		});
	}

	$scope.isEditMode = function() {
		return mode === QUEUE_CONST.edit;
	}

	// @ONCLICK
	$scope.enterEditMode = function() {
		mode = QUEUE_CONST.edit;
		setInstructions();
	}

	// @ONCLICK
	$scope.createGame = function() {
		// TODO Perform any necessary cleanup
		$state.go('app.createGame');
	}

	// @ONCLICK
	$scope.updatePreferences = function() {
		// TODO Validate that the city and sports are not empty
		savePreferences();
	}

	// @ONCLICK
	$scope.cancelPreferenceChanges = function() {

		// TODO Revert preference object to what it was before editing
		mode = QUEUE_CONST.normal;
		setInstructions();
	}

	// @ONCLICK
	$scope.dropFromQueue = function() {
		QueueService.dropFromQueue().then(function(res) {
			resetQueue();
		}, function(err) {
			console.log(err);
		});
	}

	$scope.isViewingMatches = function() {
		return mode === QUEUE_CONST.normal;
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
		return joinedGames.indexOf(game.gameId) > -1;
	}

	// @ONCLICK
	$scope.joinGame = function(game) {

		// TODO PUT request for joining the given game -> add the game to the joined values
		$scope.joinedGames.push(game.gameId);
	}

	// TODO : Will not be able to show this due to the current setup of DBC
	// @ONCLICK
	$scope.declineGame = function(game) {
		// TODO PUT request for declining the given game
		// TODO Remove game from those matching the preferences
	}

	initialize();

});
