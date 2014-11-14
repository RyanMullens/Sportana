app.controller("SearchbarController", function($scope, $state, sidebarService, AuthenticationService)
{
	this.searchQuery = '';

	$scope.submitSearch = function()
	{
		//alert("TEST: " + this.searchQuery);
		//console.log("TEST: " + this.searchQuery);
		$state.go('app.searchPlayer', {query: encodeURIComponent(this.searchQuery)});
	}

	$scope.toggleMenu = function()
	{
		console.log("TOGGLE! :D");
		sidebarService.toggleMenuShown()
	}

	$scope.logout = function () {
		AuthenticationService.logout();
		$state.go('login');
	};

	//$scope.escape

});
