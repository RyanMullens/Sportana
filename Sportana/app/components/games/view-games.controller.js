'use strict';
app.controller("ViewGamesController", function($http, $scope){

	var games = [
	{id: 1, creator: 'mscott', sport: 'Football', sportImg: '/assets/img/icon_73766.png',
	playersJoined: 5,date: 'October 30 2014', 
	time: '5:30pm', location: 'Amherst', players: ['/assets/img/profile.png','/assets/img/profile.png','/assets/img/profile.png']}
	];

/*
	var notifications = [
	{id: 1, creator: 'jbond', sport: 'Football', sportImg: '/assets/img/icon_73766.png', 
	invitedBy: 'jbond', playersJoined: 5, playersInvited: 4, 
	date: 'October 30 2014', time: '5:30pm', location: 'Amherst'},
	{id: 1, creator: 'ckent', sport: 'Football', sportImg: '/assets/img/icon_73766.png',
	invitedBy: 'myoda', playersJoined: 5, playersInvited: 4, 
	date: 'October 30 2014', time: '5:30pm', location: 'Amherst'}
	];
	*/
	$scope.notifications = [];

	$http.get('/api/requests/').
	success(function(data, status, headers, config) {
		console.log(data.requests);
		var that = this;
		for(var i = 0; i < data.requests.length; i++){
			that.httpGetGame(data.requests[i].gameCreator, data.requests[i].gameID);
		}
		
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	this.httpGetGame = function(gameCreator, gameID){
		$scope = $scope;
		$http.get('/api/games/' + gameCreator + '/' + gameID)
		.success(function(data, status, headers, config){
			data.sportImg = '/assets/img/sports/' + data.sport.toLowerCase() + '.png';
			console.log(data);
			$scope.notification.push(data);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error retrieving game information');
		});
	};

	this.hasGames = function(){
		return games.length;
	};

	this.getGames = function(){
		return games;
	};

	this.acceptGame = function(notification, accepted){
		this.acceptGame = $http.post('/requests/'+notification.id, {confirmed:accepted+''}).
		success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	}).
		error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});

		if(accepted){
			games.push(notification);

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
