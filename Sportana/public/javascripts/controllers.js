//This is where all the controllers will go for now... They will be refactored and split up into their own
//files for each page as we go though.


//Sidebar.js

app.controller("SidebarController", function($scope, $location)
{
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});