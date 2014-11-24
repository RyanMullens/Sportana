app.controller("CreateGameController", function($http, $scope)
{

	$scope.allSports = [];
	$scope.gameDate = new Date();
	$scope.gameTime = {
		start: 	new Date(2999,01,01,12,00,00),
		end: 		new Date(2999,01,01,15,00,00)
	};
	$scope.gameLocation = {
		city: "Amherst"
	};
	$scope.players = {
		minAge: "No Preference",
		maxAge: "No Preference",
		minAmount: "No Preference",
		maxAmount: "No Preference"
	};
	$scope.competitive = false;
	$scope.public = true;


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

	/********** AGE **********/

	$scope.playersMin = function() {
		return $scope.playerAmounts("min");
	}
	$scope.playersMax = function() {
		return $scope.playerAmounts("max");
	}

	$scope.toggleMinAmount = function(amount) {
		$scope.players.minAmount = amount;
	};
	$scope.toggleMaxAmount = function(amount) {
		$scope.players.maxAmount = amount;
	};

	$scope.playerAmounts = function(type) {

		var result = [];

		result.push("No Preference");
		for (var i = 2; i <= 9; i++) {
			if(type == "max") {
				if($scope.players.minAmount === "No Preference") {
					result.push(i);
				} else if(i >= $scope.players.minAmount) {
					result.push(i);
				}
			} else {
				if($scope.players.maxAmount === "No Preference") {
					result.push(i);
				} else if(i <= $scope.players.maxAmount) {
					result.push(i);
				}
			}
		}
		for (var i = 10; i <= 20; i+=2) {
			if(type == "max") {
				if($scope.players.minAmount === "No Preference") {
					result.push(i);
				} else if(i >= $scope.players.minAmount) {
					result.push(i);
				}
			} else {
				if($scope.players.maxAmount === "No Preference") {
					result.push(i);
				} else if(i <= $scope.players.maxAmount) {
					result.push(i);
				}
			}
		}

		return result;
	};

	$scope.getType = function(x) {
		return typeof x;
	};
	$scope.isDate = function(x) {
		return x instanceof Date;
	};

	$scope.selectedSport = {name:"Select a Sport",image:null};

	// When a Sport is selected
	$scope.toggleSport = function(sport) {
		$scope.selectedSport = sport;
	};

	$scope.isSelected = function(sport) {
		return (sport === $scope.selectedSport);
	};

	$scope.isReady = function() {
		return true;
	};

	$scope.create = function () {

		if($scope.isReady()) {

			Date.prototype.yyyymmdd = function() {
				var yyyy = this.getFullYear().toString();
				var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
				var dd  = this.getDate().toString();
				return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
			};

			Date.prototype.hhmmss = function() {
				var hh = this.getHours().toString();
				var mm = this.getMinutes().toString();
				var ss = this.getSeconds().toString();
				return (hh[1]?hh:"0"+hh[0]) + ":" + (mm[1]?mm:"0"+mm[0]) + ":" + (ss[1]?dd:"0"+ss[0]); // padding
			};

			var dateString = $scope.gameDate.yyyymmdd();
			var startString = $scope.gameTime.start.hhmmss();
			var endString = $scope.gameTime.end.hhmmss();

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

			var gameInformation = {
				sportID: 			$scope.selectedSport.sport,
				gameDate: 		dateString,
				startTime: 		startString,
				endTime: 			endString,
				location: 		$scope.gameLocation.city,
				minAge: 			($scope.players.minAge === "No Preference") ? 16 : $scope.players.minAge,
				maxAge: 			($scope.players.maxAge === "No Preference") ? 100 : $scope.players.maxAge,
				minPlayers: 	($scope.players.minAmount === "No Preference") ? 2 : $scope.players.minAmount,
				maxPlayers: 	($scope.players.maxAmount === "No Preference") ? 25 : $scope.players.maxAmount,
				type: 				($scope.competitive) ? 0 : 1,
				status: 			($scope.public) ? 1 : 0
			};

			console.log(gameInformation);

			$http.put('/api/games', gameInformation)
				.then(function (res) {
					if(res.data.success) {
						console.log(res.data);

						// TODO : Send friend invites

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
});
