app.controller("SearchbarController", function($scope, $state)
{
	this.searchQuery = '';

	$scope.submitSearch = function()
	{
		//alert("TEST: " + this.searchQuery);
		//console.log("TEST: " + this.searchQuery);
		$state.go('app.searchPlayer', {query: encodeURIComponent(this.searchQuery)});
	}

	//$scope.escape

});