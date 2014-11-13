app.controller('Login', function (AUTH_EVENTS, AuthenticationService, $state, $scope, $rootScope) {

  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.login = function (credentials) {

    AuthenticationService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
