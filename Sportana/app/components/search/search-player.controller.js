app.controller("SearchPlayerController", function($http,$stateParams)
{
	//Decodes from url encoded (aka %20 for spaces)
	this.query = decodeURIComponent($stateParams.query);

	$http.get('/api/search/users?name=' + this.query)
		.success(function(data, status, headers, config)
		{
			console.log("It worked! " + JSON.stringify(data));
		});
	this.results = [

	{firstName:"Master", lastName:"Yoda", city:"Holliston", age:"20", profileImg:"/assets/img/icon_73766.png",user:"myoda",favoriteSports:[{"sportName":"Frisbee","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/assets/img/icon_73766.png"}]},


	{firstName:"James", lastName:"Bond", city:"Sharon", age:"50", profileImg:"/assets/img/icon_73766.png",user:"jbond",favoriteSports:[{"sportName":"Frisbee","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Basketball","sportImage":"/assets/img/icon_73766.png"}]},



	{firstName:"Bruce", lastName:"Wayne",  city:"Amherst", age:"22", profileImg:"/assets/img/icon_73766.png",user:"bwayne",favoriteSports:[{"sportName":"Baseball","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/assets/img/icon_73766.png"}]}





	];



$http.get('/user/search/').success(function(data, status, headers, config) {
		//this.results = data;
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});


});