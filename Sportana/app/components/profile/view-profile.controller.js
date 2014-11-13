app.controller("ViewProfileController", function($http, $stateParams, $scope){


	$scope.user = {};


	$http.get('/api/users/' + $stateParams.userId)
		.success(function(data, status, headers, config)
		{
			console.log(data);
    		$scope.user = data;

    		$scope.user.favoriteSports = [{"sportName":"Frisbee","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Baseball","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Hockey","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Hockey","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Hockey","sportImage":"/assets/img/icon_73766.png"}];

		})
		.error(function(data, status, headers, config) {
    		console.log('There was an error retrieving user profile');
		});




this.getFullName = function()
{
	return $scope.user.firstname + " " + $scope.user.lastname;
}

this.getUsername = function()
{
	return $scope.user.login;
}

this.getCity = function()
{
	return $scope.user.city;
}

this.getAge = function()
{
	return $scope.user.birthday;
}

this.getProfilePicture = function()
{
	return $scope.user.profilepicture
}

this.getFavoriteSports = function()
{
	return $scope.user.favoriteSports;
}

/*this.getRatings = function()
{
	return $scope.user.rating;
}*/

this.getFriendliness = function()
{
	return $scope.user.friendliness;
}
this.getSkill = function()
{
	return $scope.user.skilllevel;
}
this.getTimeliness = function()
{
	return $scope.user.timeliness;
}

this.isRated = function()
{
	return $scope.user.rated;
}

this.isSelf = function()
{
	return true; // this.user.self?
}

});
