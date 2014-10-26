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
app.controller("SportSelectionController", function($scope){

	var sports = [
		{icon: "/images/icon_73766.png", name: "Basketball", 	description: "A game about hoops and nets."},
		{icon: "/images/icon_73766.png", name: "Baseball", 		description: "A game about bases."},
		{icon: "/images/icon_73766.png", name: "Football", 		description: "A game about hands..."},
		{icon: "/images/icon_73766.png", name: "Soccer", 			description: "A game about feet..."},
		{icon: "/images/icon_73766.png", name: "Tennis", 			description: "A game about two-us."},
		{icon: "/images/icon_73766.png", name: "Billiards", 	description: "A game about sticks and geometry."},
		{icon: "/images/icon_73766.png", name: "Swimming", 		description: "Not a game.  Water thingy."},
		{icon: "/images/icon_73766.png", name: "Hiking", 			description: "Moving up mountains."},
		{icon: "/images/icon_73766.png", name: "Biking", 			description: "Moving up roads."},
	]; // TODO = $http.get('/api/sports')

	var selectedSports = [];

	this.finish = function() {

		// TODO : 
		// Add selected Sports to the Queue Service
		// Go to the next page in the queue process
	}

	this.toggle = function(sport) {
		
		var index = selectedSports.indexOf(sport);
		if(index === -1) {
			selectedSports.push(sport);
		} else {
			selectedSports.splice(index, 1);
		}
		return;
	}

	this.getSelectedSports = function() {
		return selectedSports;
	}

	this.hasSelectedSports = function() {
		return selectedSports.length > 0;
	}

	this.getSports = function() {
		return sports;
	}

	this.isSelected = function(sport) {
		return (selectedSports.indexOf(sport) != -1) ? true : false;
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