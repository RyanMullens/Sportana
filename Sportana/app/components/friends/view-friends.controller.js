app.controller("ViewFriendsController", function($scope, $http){

	$scope.friends = [];
	$scope.requests = [];

	$http.get('/api/friends').success(function(data, status, headers, config) {
		$scope.friends = data.friends;
		console.log(data);
	}).

	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	$http.get('/api/request/friends').success(function(data, status, headers, config) {
		$scope.requests = data.requests;
		console.log(data);
	}).

	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	$scope.hasRequests = function(){
		return !!$scope.requests.length;
	};

	$scope.accept = function(request){
		$http.post('/api/requests/' + request.id, {confirmed: 'true'})
		.success(function(data, status, headers, config){
			$scope.friends.push(request);
			$scope.request.splice($scope.request.indexOf(reuest),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with accepting the game');
		});
	};

	$scope.decline = function(request){
		$http.post('/api/requests/' + request.id, {confirmed: 'false'})
		.success(function(data, status, headers, config){
			$scope.request.splice($scope.request.indexOf(reuest),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with accepting the game');
		});
	};

});
