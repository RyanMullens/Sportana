app.controller("ViewProfileController", function($http, $state, $stateParams, $scope, CurrentUser){


	$scope.allSports = [];
	$scope.allSportsImgs = [];

	$scope.user = {};


	this.editing = false;
	$scope.loaded = false;

	this.editingCity = false;
	this.tempCity = "";

	this.rating = false;
	this.tempRating = {friendliness : 1, timeliness:1, skilllevel:1};

	userId = $stateParams.userId;
	if(!userId) {
		//Temp hack... sorry. This may loop indefinetly. Especially if not logged in
		userId = $state.go('app.user', {userId:  CurrentUser.getUser().id});//CurrentUser.getUser().id;
	}

	$scope.user = {};

	$http.get('/api/users/' + userId)
		.success(function(data, status, headers, config)
		{
			//Debug object in console
			console.log(data);
    		
    		$scope.user = data;
    		$scope.loaded = true;

    		//Hack to prevent empty sport from showing
    		/*if($scope.user.sportsArray.length == 1 && $scope.user.sportsArray[0].sportName == null)
    		{
    			$scope.user.sportsArray = [];
    		}	*/


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

	$http.get('/api/sports')
		.success(function(data, status, headers, config)
		{
			//Debug object in console
			console.log(data);
    		
			//$scope.allSports = [];

    		for(var sport in data.sports)
    		{
    			$scope.allSports.push(data.sports[sport].sport);
    			$scope.allSportsImgs.push(data.sports[sport].image);
    		}

    		console.log($scope.allSports);
		})
		.error(function(data, status, headers, config) {
    		console.log('There was an error retrieving all sports');
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
	return $scope.user.isFriend == 1;
}

this.isAddFriend = function()
{
	return $scope.user.isFriend == 0 && this.isSelf() == false;
}

this.isRemoveFriend = function()
{
	return this.isFriend();
}
 
this.isAcceptFriend = function()
{
	return $scope.user.isFriend == 3;
}
 
this.isPendingFriend = function()
{
	return $scope.user.isFriend == 2;
}
 



this.isEditing = function()
{
	return this.isSelf();
}

this.isEditingCity = function()
{
	return this.editingCity;
}

this.isEditingSports = function()
{
	return this.editingSports;
}

this.isRating = function()
{
	return this.rating;
}

this.cloneUser = function(user)
{
	var newUser = Object.create(user);

	newUser.sportsArray = user.sportsArray.slice(0);
	return newUser;
}

this.getCurrentSports = function()
{
	return $scope.user.sportsArray;
}


//Actions

this.rate = function()
{
	this.rating = true;
}

this.saveRate = function()
{
	var thisTemp = this;

	$http.post('/api/users/ratings',{ 'userRated':$scope.user.login  , 'friendliness' : thisTemp.rateValues[0],'timeliness' : thisTemp.rateValues[1],'skilllevel' : thisTemp.rateValues[2]  })
		.success(function(data, status, headers, config)
		{
			console.log(data);
			thisTemp.rating = false;
		})
		.error(function(data, status, headers, config) 
		{
    		console.log('There was an error editing city :(');
		});
}

this.cancelRate = function()
{
	this.rating = false;
}


this.editSport = function()
{
	this.editingSports = true;
}

this.hideSport = function()
{
	this.editingSports = false;
}


this.editCity = function()
{
	console.log("Edit City")
	this.tempCity = $scope.user.city;
	this.editingCity = true;
}

this.saveCity = function()
{
	console.log("Save City")

	var thisTemp = this;

	$http.post('/api/users/editCity',{ 'city' : thisTemp.tempCity  })
		.success(function(data, status, headers, config)
		{
			console.log(data);

			$scope.user.city = thisTemp.tempCity;

			thisTemp.editingCity = false;
		})
		.error(function(data, status, headers, config) 
		{
    		console.log('There was an error editing city :(');
		});
}

this.cancelCity = function()
{
	console.log("Canceling City")
	this.editingCity = false;
}

this.addFriend = function()
{
	console.log("Add Friend " + userId);

	$http.put('/api/requests/friend', {userTo:userId} )
	
	.success(function(data, status, headers, config)
	{
		console.log(JSON.stringify(data));

		if(data != undefined && data.success == true)
		{
			$scope.user.isFriend = 2;
		}
	});
}

this.removeFriend = function()
{
	console.log("Remove Friend");

	$http.delete('/api/friends/' + userId)
	
	.success(function(data, status, headers, config)
	{
		console.log(JSON.stringify(data));

		if(data != undefined && data.success == true)
		{
			$scope.user.isFriend = 0;
		}
	});	
}

this.acceptFriend = function()
{
	console.log("Accept Friend... " + $scope.user.requestID);

	var id = $scope.user.requestID;

	$http.post('/api/requests/' + id, {'confirmed':'true'} )
	
	.success(function(data, status, headers, config)
	{
		console.log(JSON.stringify(data));

		if(data != undefined && data.success == true)
		{
			$scope.user.isFriend = 1;
		}
	});
}

this.pendingFriend = function()
{
	console.log("Pending Friend... " + $scope.user.requestID);

	var id = $scope.user.requestID;

	$http.post('/api/requests/' + id, {'confirmed':'false'} )
	
	.success(function(data, status, headers, config)
	{
		console.log(JSON.stringify(data));

		if(data != undefined && data.success == true)
		{
			$scope.user.isFriend = 0;
		}		
	});
}


/*START RATING*/
//Will refactor into directive when i have free time 

this.rateValues = [0,0,0];
this.tempRateValues = [0,0,0];


this.ratePlayerMove = function(value,idx)
{
	console.log(value);
	this.tempRateValues[idx] = value;
}

this.getCurrentRate = function(value,idx)
{
	return value > this.tempRateValues[idx];
}

this.setCurrentRate = function(value,idx)
{
	console.log("Set rating: " + value);
	this.rateValues[idx] = value; 
}

this.resetCurrentRate = function(idx)
{
	this.tempRateValues[idx] = this.rateValues[idx];
}

this.getTempRateValue = function(idx)
{
	return this.tempRateValues[idx];
}

/*END RATING*/


/*START SPORTS*/

$scope.selectedSport = "";


$scope.addSportLocal = function(sport, img)
{
	console.log("Add Sport!");

	var sportObj = {sportImage: img, sportsName: sport};

	$scope.user.sportsArray.unshift(sportObj);
}

$scope.deleteSportLocal = function(name)
{
	var index = $scope.user.sportsArray.indexOf(name);
	$scope.user.sportsArray.splice(index, 1);
}

$scope.isSportSelected = function()
{
	if($scope.allSports != undefined)
	{
		return $scope.allSports.indexOf($scope.selectedSport) != -1;
	}
	return false;
}

$scope.addFavoriteSport = function()
{
	var sportToAdd = $scope.selectedSport;

	console.log("Adding " + sportToAdd + "!");

	$http.post('/api/users/addFavoriteSport',{ 'sport' : sportToAdd  })
		.success(function(data, status, headers, config)
		{
			console.log(data);

			if(data.message === "could not insert")
			{
				console.alert("Sport was already there");
			}
			else{
				console.log("Added remotely!");

				var index = $scope.allSports.indexOf(sportToAdd);

				$scope.addSportLocal(sportToAdd,$scope.allSportsImgs[index]);
			}

		})
		.error(function(data, status, headers, config) 
		{
    		console.log('There was an error adding sport :(');
		});
}


$scope.deleteFavoriteSport = function(sport)
{
	var sportToDelete = sport.sportsName;

	console.log("Deleting " + sportToDelete + "!");

	$http.delete('/api/users/deleteFavoriteSport/' + sportToDelete)
		.success(function(data, status, headers, config)
		{
			console.log(data);

				console.log("Deleted remotely!");
				$scope.deleteSportLocal(sport);
		})
		.error(function(data, status, headers, config) 
		{
    		console.log('There was an error adding sport :(');
		});
}

/*END SPORTS*/




});