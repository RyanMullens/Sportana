app.controller("ViewProfileController", function($http, $stateParams){
	

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

	this.user = {};
	this.user.user = "rmullens";
	this.user.firstName = "Ryan";
	this.user.lastName = "Mullens";
	this.user.dateOfBirth = "02-27-1994";
	this.user.city = "Holliston"
	this.user.favoriteSports = [{"sportName":"Frisbee","sportImage":"/images/icon_73766"}
							,{"sportName":"Soccer","sportImage":"/images/icon_73766"}
							,{"sportName":"Baseball","sportImage":"/images/icon_73766"}
							,{"sportName":"Hockey","sportImage":"/images/icon_73766"}];
	this.user.rating = {"friendliness":5,
				   "timeliness":4,
				   "skill": 3};

	this.user.rated = false;


	$http.get('/api/users/' + $stateParams.userId)
		.success(function(data, status, headers, config) 
		{
    		//this.user = data;
		})
		.error(function(data, status, headers, config) {
    		console.log('There was an error retrieving user profile');
		});
});





this.getFullName = function()
{
	return this.user.firstName + " " + this.user.lastName;
}

this.getUsername = function()
{
	return this.user.user;
}

this.getCity = function()
{
	return this.user.city;
}

this.getAge = function()
{
	return 21;//return this.user.age;
}

this.getFavoriteSports = function()
{
	return this.user.favoriteSports;
}

this.getRatings = function()
{
	return this.user.rating;
}

this.isRated = function()
{
	return this.user.rated;
}

this.isSelf = function()
{
	return true; // this.user.self?
}