app.controller("ViewFriendsController", function($http){
	$http.get('/api/friends').success(function(data, status, headers, config) {
		this.friends = data;
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});
});