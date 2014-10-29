app.controller("ViewGamesController", function($http){
	$http.get('/api/games').success(function(data, status, headers, config) {
		this.games = data;
	}).error(function(data, status, headers, config) {
		console.log('there was an error');
	});
});