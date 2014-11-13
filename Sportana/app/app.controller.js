app.controller('ApplicationController', function ($scope, AuthenticationService) {

  $scope.currentUser = null;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
})
