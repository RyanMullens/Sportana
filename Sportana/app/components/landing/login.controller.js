app.controller('Login', function (Authentication, $state, $scope) {

  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.login = function (credentials) {
    Authentication.login(credentials.email, credentials.password).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
