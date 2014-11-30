'use strict';
app.controller("ViewGamesController", function($http, $scope){

	$scope.games = [];
	$scope.notifications = [];

	var that = this;
	$http.get('/api/requests/games').
	success(function(data, status, headers, config) {
		
		console.log(data);
		for(var notification in data){
			data[notification].sportImg = '/assets/img/sports/' + data[notification].sport.toLowerCase() + '.png';
		}
		$scope.notifications = data;
		
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	$http.get('/api/games/').
	success(function(data, status, headers, config) {
		for(var game in data){
			data[game].sportImg = '/assets/img/sports/' + data[game].sport.toLowerCase() + '.png';
		}
		console.log(data);
		$scope.games = data;
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	this.httpGetGame = function(gameCreator, gameID){
		$http.get('/api/games/' + gameCreator + '/' + gameID)
		.success(function(data, status, headers, config){
			data.sportImg = '/assets/img/sports/' + data.sport.toLowerCase() + '.png';
			$scope.notifications.push(data);
			console.log($scope.notifications);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error retrieving game information');
		});
	};

	this.hasGames = function(){
		return $scope.games.length > 0;
	};

	this.getGames = function(){
		return $scope.games;
	};

	this.acceptGame = function(notification, accepted){
		this.acceptGame = $http.post('api/requests/'+notification.id, {confirmed:accepted+''}).
		success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			console.log("There was an error with accepting the game");
		});

		$http.post('/api/games/join', {creator: notification.gameCreator, gameID: notification.gameID})
		.success(function(data, status, headers, config){
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with joining the game');
		});

		if(accepted){
			$scope.games.push(notification);

		}
		$scope.notifications.splice($scope.notifications.indexOf(notification),1);
	};

	this.hasNotifications = function(){
		return $scope.notifications.length;
	};

	this.getNotifications = function(){
		return $scope.notifications;
	};

});

/*
Game info:
-sport (name and icon)
-# players joined
-# players invited
-Date
-Time
-location

INvitation info:
invited by
invited by photo
game info
*/
