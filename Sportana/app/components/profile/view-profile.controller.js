app.controller("ViewProfileController", function($http, $state, $stateParams, $scope, CurrentUser){

	$scope.user = {};
	$scope.editUser = {};

	this.editing = false;
	$scope.loaded = false;

	userId = $stateParams.userId;
	if(!userId) {
		//Temp hack... sorry. This may loop indefinetly. Especially if not logged in
		userId = $state.go('app.user', {userId:  CurrentUser.getUser().id});//CurrentUser.getUser().id;
	}

	$http.get('/api/users/' + userId)
		.success(function(data, status, headers, config)
		{
			//Debug object in console
			console.log(data);
    		
    		$scope.user = data;
    		$scope.loaded = true;
    		/*$scope.user.favoriteSports = [{"sportName":"Frisbee","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Baseball","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Hockey","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Hockey","sportImage":"/assets/img/icon_73766.png"}
							,{"sportName":"Hockey","sportImage":"/assets/img/icon_73766.png"}];*/

		})
		.error(function(data, status, headers, config) {
    		console.log('There was an error retrieving user profile');
		});


this.isLoaded = function()
{
	return $scope.loaded;
}

this.getLastName = function()
{
	return $scope.user.lastname;
}

this.getFirstName = function()
{
	return $scope.user.firstname;
}

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
	return $scope.user.sportsArray;
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
	return CurrentUser.isUser(userId);
}

this.isFriend = function()
{
	return false;
}

this.isEditing = function()
{
	return this.editing;
}


this.cloneUser = function(user)
{
	var newUser = Object.create(user);

	newUser.sportsArray = user.sportsArray.slice(0);
	return newUser;
}

this.getCurrentSports = function()
{
	if(this.isEditing())
	{
		return $scope.editUser.sportsArray;
	}
	else{
		return $scope.user.sportsArray;
	}
}


//Actions
this.editProfile = function()
{
	console.log("Edit Profile");

	$scope.editUser = this.cloneUser($scope.user);

	this.editing = true;
}

this.saveProfile = function()
{
	console.log("Saved Profile!");

	$scope.user = $scope.editUser;

	this.editing = false;
}

this.cancelProfile = function()
{
	console.log("Cancel Profile!");

	$scope.editUser = null;

	this.editing = false;
}

this.addSport = function()
{
	console.log("Add Sport!");

	var testSportObj = {sportImage: "/assets/img/sports/baseball.png", sportsName: "Table Tennis"};

	$scope.editUser.sportsArray.unshift(testSportObj);
}


this.addFriend = function()
{
	alert("Add Friend " + userId);

	$http.put('/api/requests/friend', {userTo:userId} )
	
	.success(function(data, status, headers, config)
	{
		console.log(JSON.stringify(data));
	});
}

this.removeFriend = function()
{
	alert("Remove Friend");
}


});



app.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                console.log("Where are you tooltip.... why cant i find yoooou?");
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});