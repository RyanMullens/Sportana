app.controller("SearchPlayerController", function()
{
	//   /user/search/{{query}}

$http.get('/user/search/' + ).success(function(data, status, headers, config) {
		this.friends = data;
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});


});