app.controller("SearchPlayerController", function($http,$stateParams)
{
	this.query = decodeURIComponent($stateParams.query);

	this.results = [

	{firstName:"Ryan", lastName:"Mullens", city:"Holliston", age:"20", profileImg:"/images/icon_73766.png",user:"rmullens",favoriteSports:[{"sportName":"Frisbee","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/images/icon_73766.png"}]},


	{firstName:"Alec", lastName:"Hirsch", city:"Sharon", age:"20", profileImg:"/images/icon_73766.png",user:"ahirsch",favoriteSports:[{"sportName":"Frisbee","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Basketball","sportImage":"/images/icon_73766.png"}]},



	{firstName:"Brandon", lastName:"Read",  city:"Amherst", age:"22", profileImg:"/images/icon_73766.png",user:"bread",favoriteSports:[{"sportName":"Baseball","sportImage":"/images/icon_73766.png"}
							,{"sportName":"Soccer","sportImage":"/images/icon_73766.png"}]}





	];



$http.get('/user/search/').success(function(data, status, headers, config) {
		//this.results = data;
	}).
	error(function(data, status, headers, config) {
		console.log('there was an error');
	});


});