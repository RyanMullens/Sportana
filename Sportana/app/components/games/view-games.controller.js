app.controller("ViewGamesController", function($http, $scope){
	/*$http.get('/api/games').success(function(data, status, headers, config) {
		this.games = data;
	}).error(function(data, status, headers, config) {
		console.log('there was an error');
	});*/
	var games = [
		{id: 7, sport: 'Football', sportImg: '/assets/img/icon_73766.png', playersJoined: 5, playersInvited: 4, date: 'October 30 2014', time: '5:30pm', location: 'Amherst'},
		{id: 8, sport: 'Baseball', sportImg: '/assets/img/icon_73766.png', playersJoined: 5, playersInvited: 4, date: 'Novermber 1 2014', time: '5:30pm', location: 'Sharon'},
	];

	var notifications = [
		{id: 9, sport: 'Football', sportImg: '/assets/img/icon_73766.png', invitedBy: 'Alec', playersJoined: 5, playersInvited: 4, date: 'October 30 2014', time: '5:30pm', location: 'Amherst'},
		{id: 10, sport: 'Football', sportImg: '/assets/img/icon_73766.png', invitedBy: 'Ryan', playersJoined: 5, playersInvited: 4, date: 'October 30 2014', time: '5:30pm', location: 'Amherst'}
	];

	this.hasGames = function(){
		return games.length;
	};

	this.getGames = function(){
		return games;
	};

	this.acceptGame = function(notification, accepted){
		/*
		this.acceptGame = $http.post('/requests/'+notification.id, {confirmed:accepted}).
		success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
		}).
		error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
		});
*/
		delete notifications[];
		console.log(notifications);
	};

	this.hasNotifications = function(){
		return notifications.length;
	};

	this.getNotifications = function(){
		return notifications;
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
