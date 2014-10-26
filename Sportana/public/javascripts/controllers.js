//This is where all the controllers will go for now... They will be refactored and split up into their own
//files for each page as we go though.


//Sidebar.js

app.controller("SidebarController", function($scope, $location)
{
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
});

app.controller("ViewFriendsController", function($http){
	$http.get('/api/friends').success(function(data, status, headers, config) {
    this.friends = data;
}).
	error(function(data, status, headers, config) {
    console.log('there was an error');
});
});

// Created by: @bread on 10/25
// DISCOVERED GAMES (QUEUE) TODO
app.controller("DiscoveredGamesController", function($http){

	this.games = [];
});

app.controller("QueueController", function(){

	this.gamesFound = false;

	this.gamesFound = function(){
		return this.gamesFound;
	};

	this.startQueue = function(){	
		this.gamesFound = true;
		return;
	};

});

// Created by: @bread on 10/25
app.controller("SportSelectionController", function(){

	var sports = [
		{icon: "icon", name: "Basketball", 	description: "A game about hoops and nets."},
		{icon: "icon", name: "Baseball", 		description: "A game about bases."},
		{icon: "icon", name: "Football", 		description: "A game about hands..."},
		{icon: "icon", name: "Soccer", 			description: "A game about feet..."},
		{icon: "icon", name: "Tennis", 			description: "A game about two-us."},
		{icon: "icon", name: "Billiards", 	description: "A game about sticks and geometry."},
		{icon: "icon", name: "Swimming", 		description: "Not a game.  Water thingy."},
		{icon: "icon", name: "Hiking", 			description: "Moving up mountains."},
		{icon: "icon", name: "Biking", 			description: "Moving up roads."},
	]; // TODO = $http.get('/api/sports')

	var selectedSports = [];

	this.finish = function() {

		// TODO : 
		// Add selected Sports to the Queue Service
		// Go to the next page in the queue process
	}

	this.getSports = function() {
		return sports;
	}

	this.selectedSports = function() {
		return selectedSports;
	}

	this.addSport = function(sport) {
		if (selectedSports.indexOf(sport) != -1) return;
		selectedSports.push(sport);
	}

	this.removeSport = function(sport) {

		var index = selectedSports.indexOf(sport);
		if(index === -1) return;
		selectedSports.splice(index, 1);
	}

});

/*==================================================*/
/*											SERVICES 										*/
/*==================================================*/
// TODO : Move this into its own file

// Created by: @bread on 10/25
// TODO : Use nested services (eg. Scheduling should be a separate service)
app.service('queueService', function() {

  var preferences = {};

  // SPORTS
  this.setSports = function(sports) {
      preferences.sports = sports;
  }
  this.getSports = function() {
      return preferences.sports;
  }

  // LOCATION
  this.setLocation = function(location) {
  	preferences.location = locaiton;
  }
  this.getLocation = function() {
  	return preferences.location;
  }

  // TODO : Handle low-level checking within controller.  Pass/Get full objects from this service

  // PLAYER
  var setPlayer = function(minAge, maxAge){
  		var DEFAULT_MIN = 18;
  		var DEFAULT_MAX = 100;
      preferences.minAge = (minAge) ? minAge : DEFAULT_MIN;
      preferences.maxAge = (maxAge) ? maxAge : DEFAULT_MAX;
  }
  var getAgeRange = function(){
  		return {minAge : preferences.minAge, maxAge : preferences.maxAge};
  }
  var setNumberOfPlayers = function(min, max){

  		var DEFAULT_MIN = 2;
  		var DEFAULT_MAX = 30;

  		preferences.minNumberOfPlayers = (min) ? min : DEFAULT_MIN;
      preferences.maxNumberOfPlayers = (max) ? max : DEFAULT_MAX;
  }
  var getNumberOfPlayers = function(){
  		return {min : preferences.minNumberOfPlayers, max : preferences.maxNumberOfPlayers};
  }

  // SCHEDULE
  var addTime = function(start, end) {
  	preferences.times[start + end] = {start: start, end : end};
  }
  var removeTime = function(start, end) {
  	preferences.times.push({start: start, end : end});
  }

  // OTHER
  var setIntensity = function(intensity){
  		var DEFAULT = "CASUAL"; 
      preferences.intensity = (intensity) ? intensity : DEFAULT;
  }
  var getIntensity = function(){
  		return preferences.intensity;
  }

  // TODO: AVAILABILITY + INVITES

  return {
    setRadius : setRadius
  };

});