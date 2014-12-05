app.controller("ViewFriendsController", function($scope, $http){

	$scope.friends = [];
	$scope.requests = [];

	$http.get('/api/friends').success(function(data, status, headers, config) {
		if(data.success){
			$scope.friends = data.friends;
			console.log(data);
		}
		else{
			console.log("You have no friends");
		}
	}).

	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	$http.get('/api/requests/friends').success(function(data, status, headers, config) {
		if(data.success){
			$scope.requests = data.requests;
			console.log(data);
		}
		else{
			console.log("You have no requests");
		}
	}).

	error(function(data, status, headers, config) {
		console.log('there was an error');
	});

	$scope.hasRequests = function(){
		return $scope.requests.length;
	};

	$scope.accept = function(request){
		$http.post('/api/requests/' + request.id, {confirmed: 'true'})
		.success(function(data, status, headers, config){
			$scope.friends.push(request);
			$scope.requests.splice($scope.requests.indexOf(request),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with accepting the game');
		});
	};

	$scope.decline = function(request){
		$http.post('/api/requests/' + request.id, {confirmed: 'false'})
		.success(function(data, status, headers, config){
			$scope.requests.splice($scope.requests.indexOf(request),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with accepting the game');
		});
	};

});
