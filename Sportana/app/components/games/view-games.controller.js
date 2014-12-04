app.controller("ViewGamesController", function($http, $scope){

	$scope.games = [];
	$scope.notifications = [];

	var that = this;
	$http.get('/api/requests/games').
	success(function(data, status, headers, config) {
		console.log(data);
		if(data.success){
			for(var notification in data.notifications){
				data.notifications[notification].sportImg = '/assets/img/sports/' + data.notifications[notification].sport.toLowerCase() + '.png';
			}
			$scope.notifications = data.notifications;
		}
		else{
			console.log("No notifications were found");
		}
		
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	$http.get('/api/games/').
	success(function(data, status, headers, config) {
		console.log(data);
		if(data.success){
			for(var game in data.games){
				data.games[game].sportImg = '/assets/img/sports/' + data.games[game].sport.toLowerCase() + '.png';
			}
			$scope.games = data.games;
		}
		else{
			console.log("No games were found");
		}
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	this.hasGames = function(){
		return $scope.games.length > 0;
	};

	this.getGames = function(){
		return $scope.games;
	};

	this.acceptGame = function(notification){
		console.log(notification);
		$http.post('/api/requests/' + notification.nid, {confirmed: 'true'})
		.success(function(data, status, headers, config){
			$scope.games.push(notification);
			$scope.notifications.splice($scope.notifications.indexOf(notification),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with accepting the game');
		});
	};

	this.declineGame = function(notification){
		$http.post('/api/requests/' + notfication.nid, {confirmed: 'false'})
		.success(function(data, status, headers, config){
			$scope.notifications.splice($scope.notifications.indexOf(notification),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with leaving the game');
		});
	};

	this.hasNotifications = function(){
		return $scope.notifications.length;
	};

	this.getNotifications = function(){
		return $scope.notifications;
	};

});