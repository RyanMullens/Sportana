app.controller("CreateGameController", function($http, $scope)
{

	$scope.allSports = [];
	$scope.gameDate = new Date();
	$scope.gameTime = {
		start: 	new Date(2999,01,01,12,00,00),
		end: 		new Date(2999,01,01,15,00,00)
	};
	$scope.gameLocation = {
		city: 		"Amherst",
		details: 	"Mullens Center"
	};
	$scope.players = {
		minAge: 16,
		maxAge: 999,
		minAmount: 4,
		maxAmount: 20
	};
	$scope.status = 1;

	$scope.options = [{ name: "Casual", id: 1 }, { name: "Competitive", id: 2 }];
	$scope.selectedOption = $scope.options[1];

	$scope.getType = function(x) {
		return typeof x;
	};
	$scope.isDate = function(x) {
		return x instanceof Date;
	};

	$scope.selectedSport = {name:"Select a Sport",image:null};


	$scope.getNumber = function(num) {
		return new Array(num);
	};

	$scope.setDuration = function(duration) {
		$scope.duration = duration;
	};

	// When a Sport is selected
	$scope.toggle = function(sport) {
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

			var gameInformation = {
				sportID: 			$scope.selectedSport.sport,
				gameDate: 		dateString,
				startTime: 		startString,
				endTime: 			endString,
				location: 		$scope.gameLocation.city + " " +
											$scope.gameLocation.details,
				minAge: 			$scope.players.minAge,
				maxAge: 			$scope.players.maxAge,
				minPlayers: 	$scope.players.minAmount,
				maxPlayers: 	$scope.players.maxAmount,
				status: 			$scope.status
			};

			console.log(gameInformation);

			$http.put('/api/games', gameInformation)
				.then(function (res) {
					if(res.data.success) {
						console.log(res.data);
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
