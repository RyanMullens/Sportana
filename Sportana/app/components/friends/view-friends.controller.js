app.controller("ViewFriendsController", function($http){
	$http.defaults.headers.common.SportanaAuthentication = 'luinkel9la';
	$http.get('/api/friends').success(function(data, status, headers, config) {
		this.friends = data;
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});
});