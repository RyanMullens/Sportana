app.controller('QueueSportController', function($location, QueueService, $http, $scope, $state)
{
	// console.log($scope);
	$scope.preferences = {};

	// All Sports
	$scope.sports = [];
	// Sports that are visibly selected
	var selectedSports = [];

	/**********************************************************************/

	// The sports that existed in the preferences that were retrieved
	$scope.existingSports = [];

	// Sports that are added to the queueing preferences
	$scope.addedSports = [];

	// Sports that are removed from the queueing preferences
	$scope.removedSports = [];

	/**********************************************************************/

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
					$scope.preferences.sports = [];
				}

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

	$scope.isReady = function() {
		return true;
	}

	this.updatePreferences = function () {

		console.log("UPDATING PREFS");

		if($scope.isReady()) {

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

			$scope.preferences.city = "Anytown";
			$scope.preferences.ageMin = ($scope.preferences.ageMin == "No Preference") ? 16 : $scope.preferences.ageMin;
			$scope.preferences.ageMax = ($scope.preferences.ageMax == "No Preference") ? 999 : $scope.preferences.ageMax;

			console.log($scope.preferences);

			if($scope.preferences.sports.length > 0) {

				QueueService.joinQueue($scope.preferences).then(function (res) {

					if(queueIDsToRemove.length > 0) {
						console.log(queueIDsToRemove);
						QueueService.removeSportsFromPreferences(queueIDsToRemove).then( function(res) {
							console.log(res);
						}, function(err) {
							console.log(err);
						});
					}

				}, function (err) {
					console.log(err);
				});
			} else {

				if(queueIDsToRemove.length > 0) {
					QueueService.removeSportsFromPreferences(queueIDsToRemove).then( function(res) {
						console.log(res);
					}, function(err) {
						console.log(err);
					});
				}

			}

		} else {
			// Not ready to create a game. Validation errors
		}
	}

	this.initialize();

});
