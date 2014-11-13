app.controller("ViewProfileController", function($http, $stateParams, $scope, CurrentUser){


	/*
	{
		“user”: 				string (users login)
		“profilePhoto”:  		url (string)
		“firstName”:			string
		“lastName”:			string
		“dateOfBirth”:			string (mm-dd-yyyy)
		“city”:				string
		“favoriteSports”: [{
			“sportName”:		string
			“sportImage”:		 url (string)
		}]

		“rating”: {
			“friendliness”:		int (1-5)
			“timeliness”:		int (1-5)
			“skill”:			int (1-5)
		}
			“rated”:		boolean
	}
	*/

	$scope.user = {};
	/*$scope.user.login = "rmullens";
	$scope.user.firstname = "Ryan";
	$scope.user.lastname = "Mullens";
	$scope.user.dateOfBirth = "02-27-1994";
	$scope.user.city = "Holliston"
	$scope.user.favoriteSports = [{"sportName":"Frisbee","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Baseball","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Hockey","sportImage":"/assets/img/icon_73766.png"}];
	$scope.user.rating = {"friendliness":5,
				   "timeliness":4,
				   "skill": 3};

	$scope.user.rated = false;*/

	userId = $stateParams.userId;
	if(!userId) {
		userId = CurrentUser.getUser().id;
	}

	console.log("HELLO");

	$http.get('/api/users/' + userId)
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
	return 25;//return this.user.age;
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
