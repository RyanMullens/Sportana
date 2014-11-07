//This is where all the controllers will go for now... They will be refactored and split up into their own
//files for each page as we go though.

//Sidebar.js

app.controller("SearchbarController", function($scope, $state)
{
	this.searchQuery = '';

	$scope.submitSearch = function()
	{
		//alert("TEST: " + this.searchQuery);
		//console.log("TEST: " + this.searchQuery);
		$state.go('searchPlayer', {query: encodeURIComponent(this.searchQuery)});
	}

	$scope.escape

});

app.controller("SidebarController", function($scope, $location)
{
	this.currentTab = 'home';

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setTab = function(newTab)
	{
		this.currentTab = newTab;
	}

	$scope.isShown = function(tab)
	{
		return this.currentTab == tab;
	}
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
