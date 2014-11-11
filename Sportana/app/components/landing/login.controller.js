app.controller('Login', function (AUTH_EVENTS, AuthenticationService, $state, $scope, $rootScope) {

  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.login = function (credentials) {

    AuthenticationService.login(credentials);
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

    // AuthenticationService.login(credentials).then(function (user) {
    //   $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    //   $scope.setCurrentUser(user);
    // }, function () {
    //   $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    // });
  };
})
