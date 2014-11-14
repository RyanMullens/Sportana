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
	/*$scope.results = [

	{firstName:"Master", lastName:"Yoda", city:"Holliston", age:"20", profileImg:"/assets/img/icon_73766.png",user:"myoda",favoriteSports:[{"sportName":"Frisbee","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/assets/img/icon_73766.png"}]},


	{firstName:"James", lastName:"Bond", city:"Sharon", age:"50", profileImg:"/assets/img/icon_73766.png",user:"jbond",favoriteSports:[{"sportName":"Frisbee","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Basketball","sportImage":"/assets/img/icon_73766.png"}]},



	{firstName:"Bruce", lastName:"Wayne",  city:"Amherst", age:"22", profileImg:"/assets/img/icon_73766.png",user:"bwayne",favoriteSports:[{"sportName":"Baseball","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/assets/img/icon_73766.png"}]}





	];*/


	$scope.goToUser = function(login)
	{
		userId = $state.go('app.user', {userId: login});
	}

});