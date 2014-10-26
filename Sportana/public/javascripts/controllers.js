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

	$scope.selectedSports = [];

	this.finish = function() {

		// TODO : 
		// Add selected Sports to the Queue Service
		// Go to the next page in the queue process
	}

	this.getSports = function() {
		return sports;
	}

	// Currently unused
	this.addSport = function(sport) {
		if (selectedSports.indexOf(sport) != -1) return;
		selectedSports.push(sport);
	}

	this.removeSport = function(sport) {
		var index = $scope.selectedSports.indexOf(sport);
		if(index === -1) return;
		$scope.selectedSports.splice(index, 1);
	}

});

app.directive('checkList', function() {
  return {
    scope: {
      list: '=checkList',
      value: '@'
    },
    link: function(scope, elem, attrs) {
      var handler = function(setup) {
        var checked = elem.prop('checked');
        var index = scope.list.indexOf(scope.value);

        if (checked && index == -1) {
          if (setup) elem.prop('checked', false);
          else scope.list.push(scope.value);
        } else if (!checked && index != -1) {
          if (setup) elem.prop('checked', true);
          else scope.list.splice(index, 1);
        }
      };

      var setupHandler = handler.bind(null, true);
      var changeHandler = handler.bind(null, false);

      elem.bind('change', function() {
        scope.$apply(changeHandler);
      });
      scope.$watch('list', setupHandler, true);
    }
  };
});