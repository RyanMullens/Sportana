var app = angular.module('app', []);

var users = [];//[{"email":"ryan@mullens.com","password":"12345"},{"email":"john@doe.com","password":"password"},{"email":"jane@doe.com","password":"secret"},{"email":"james@smith.com","password":"weeeee"}] ;

app.controller("UserController", function($http){
	this.refresh = function(){
		$http.get('/users/').
		success(function(data, status, headers, config) 
		{
		  	//Due to data binding, you CANNOT just replace the old array
		  	users.length = 0;
		  	for(user in data)
		  	{
		  		this.users.push(data[user]);
		  	}
  		}).
		error(function(data, status, headers, config) 
		{
    // called asynchronously if an error occurs
    // or server returns response with an error status.
		});
	};



	this.users = users;
	this.refresh();
});

app.controller("SignupController", function($http)
{
	this.user = {};

	this.user.email = "";
	this.user.password = "";

	this.createUser = function()
	{
		users.push(this.user);
		
		$http({
			url: '/users/',
			method: "POST",
			data: this.user });

		this.user = {};

		//console.log(JSON.stringify(users));
	}

});