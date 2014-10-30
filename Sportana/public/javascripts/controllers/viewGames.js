app.controller("ViewGamesController", function($http){
	/*$http.get('/api/games').success(function(data, status, headers, config) {
		this.games = data;
	}).error(function(data, status, headers, config) {
		console.log('there was an error');
	});*/
	this.games = [
		{sport: 'Football', sportImg: '/images/icon_73766.png', playersJoined: 5, playersInvited: 4, date: 'October 30 2014', time: '5:30pm', location: 'Amherst'}
	];

	this.hasGames = function(){
		return this.games.length;
	}
});

app.controller("Notification Controller", function($http){
	this.notifications = [{}];
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