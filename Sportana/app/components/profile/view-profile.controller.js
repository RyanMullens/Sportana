app.controller("ViewProfileController", function($http, $state, $stateParams, $scope, CurrentUser){


	$scope.allSports = [];
	$scope.allSportsImgs = [];

	$scope.user = {};

	$scope.photoSelected = false;
	$scope.photoEditing = false;

	this.editing = false;
	$scope.loaded = false;

	this.editingCity = false;
	this.tempCity = "";

	this.rating = false;

	userId = $stateParams.userId;
	if(!userId) {
		//Temp hack... sorry. This may loop indefinetly. Especially if not logged in
		userId = $state.go('app.user', {userId:  CurrentUser.getUser().id});//CurrentUser.getUser().id;
	}

	$scope.user = {};

	var that = this;

	$http.get('/api/users/' + userId)
		.success(function(data, status, headers, config)
		{
			//Debug object in console
			console.log(data);
    		
    		$scope.user = data;
    		$scope.loaded = true;
    		$scope.oldTempPic = $scope.user.profilepicture;
    		

    		if(data != undefined && data.myRatings.length > 0)
    		{
				that.rateValues = [data.myRatings[0].friendliness,data.myRatings[0].timeliness,data.myRatings[0].skilllevel];
				that.tempRateValues = [data.myRatings[0].friendliness,data.myRatings[0].timeliness,data.myRatings[0].skilllevel];
			}
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

			$scope.user.friendliness = data.friendliness;
			$scope.user.skilllevel = data.skilllevel;
			$scope.user.timeliness = data.timeliness;

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
			$scope.user.requestID = data.requestID;
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
	console.log("Pending Friend... " + $scope.user.login);

	var login = $scope.user.login;

	$http.delete('/api/friends/request/' + login)
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
//Will refactor into directive when i have free time(aka never... lol) 

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



this.startPhoto = function()
{
	$scope.photoEditing = true;
}

this.cancelPhoto = function()
{
	if($scope.oldTempPic != undefined)
	{
		$scope.user.profilepicture = $scope.oldTempPic;
	}

	$scope.photoEditing = false;
	$scope.clearPhotoLoad();
}

$scope.clearPhotoLoad = function()
{
	$('#file').val(""); 
}

this.isPhotoEditing = function()
{
	return $scope.photoEditing;
}

this.isPhotoSelected = function()
{
	return $scope.photoSelected;
}

$scope.fileNameChanged = function()
{
	$scope.photoSelected = document.getElementById('file').files.length > 0;


	var $file = document.getElementById('file').files[0]
    if (document.getElementById('file').files[0] != undefined && window.FileReader && $file.type.indexOf('image') > -1) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL($file);

        fileReader.onload = function(e) {
        	$scope.user.profilepicture = e.target.result;
        	$scope.$apply();
        }
    }    
}

/*Photo Upload*/

$scope.addPhoto = function()
{
  var f = document.getElementById('file').files[0],
      r = new FileReader();

    var fd = new FormData();
        fd.append('file', f);
        $http.post('/api/users/photoUpload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data, status, headers, config)
		{
			if(data != undefined)
			{
				if(data.success)
				{
					$scope.oldTempPic = $scope.user.profilepicture;
					$scope.user.profilepicture = data.img;
					$scope.photoEditing = false;
					$scope.clearPhotoLoad();
					return;
				}
			}

			if($scope.oldTempPic != undefined)
			{
				$scope.user.profilepicture = $scope.oldTempPic;
			}

			alert("Failed to upload image :(");
		});



    /*$http.uploadFile({
        url: '/api/users/photoUpload',
        file: data
      })

    $http.post('/api/users/photoUpload',{ 'img' : data  })
		.success(function(data, status, headers, config)
		{
			console.log(data);
		});*/

    //send you binary data via $http or $resource or do anything else with it
}




});