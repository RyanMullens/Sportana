//This is where all the controllers will go for now... They will be refactored and split up into their own
//files for each page as we go though.

app.controller("SidebarController", function($scope, $location, sidebarService, Session, CurrentUser)
{
	this.currentTab = 'home';
	this.showMenu = false;
	this.userId = CurrentUser.getUser().id;


	$scope.userId = function () {
		return this.userId;
	};
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setTab = function(newTab)
	{
		this.currentTab = newTab;
	}

	$scope.isTabShown = function(tab)
	{
		return this.currentTab == tab;
	}

	$scope.isMenuActive = function()
	{
		return sidebarService.getMenuShown();
	}
});


/*app.controller("ViewFriendsController", function($http){
	$http.get('/api/friends').success(function(data, status, headers, config) {
    this.friends = data;
}).
	error(function(data, status, headers, config) {
    console.log('there was an error');
});
});*/

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
