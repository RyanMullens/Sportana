app.controller("SearchPlayerController", function($scope,$state,$http,$stateParams)
{
	//Decodes from url encoded (aka %20 for spaces)
	$scope.query = decodeURIComponent($stateParams.query);

	$scope.results = [];


	$http.get('/api/search/users?name=' + $scope.query)
		.success(function(data, status, headers, config)
		{
			console.log(data);
			if(data.success)
			{
				$scope.results = data.results;
				console.log($scope.results);
			}
			else
			{
				console.log("Error: " + data.message);
			}

		});


	$scope.goToUser = function(login)
	{
		userId = $state.go('app.user', {userId: login});
	}

});