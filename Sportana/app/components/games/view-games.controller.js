app.controller("ViewGamesController", function($http, $scope){
	/*$http.get('/api/games').success(function(data, status, headers, config) {
		this.games = data;
	}).error(function(data, status, headers, config) {
		console.log('there was an error');
	});*/
	var games = [
		{id: 1, creator: 'mscott', sport: 'Football', sportImg: '/assets/img/icon_73766.png',
		playersJoined: 5,date: 'October 30 2014', 
		time: '5:30pm', location: 'Amherst', players: ['/assets/img/profile.png','/assets/img/profile.png','/assets/img/profile.png']}
	];

	var notifications = [
		{id: 1, creator: 'jbond', sport: 'Football', sportImg: '/assets/img/icon_73766.png', 
		invitedBy: 'jbond', playersJoined: 5, playersInvited: 4, 
		date: 'October 30 2014', time: '5:30pm', location: 'Amherst'},
		{id: 1, creator: 'ckent', sport: 'Football', sportImg: '/assets/img/icon_73766.png',
		invitedBy: 'myoda', playersJoined: 5, playersInvited: 4, 
		date: 'October 30 2014', time: '5:30pm', location: 'Amherst'}
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
		if(accepted){
			games.push(notification);
			
		}
		notifications.splice(notifications.indexOf(notification),1);
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
