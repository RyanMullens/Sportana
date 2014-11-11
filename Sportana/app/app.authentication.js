app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.run(function ($rootScope, $state, AUTH_EVENTS, AuthenticationService) {

  // Check authentication status on every transition
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (!AuthenticationService.isAuthenticated()) {
      event.preventDefault();
      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    }
  });

  $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
    event.preventDefault();
    $state.go('app.home');
  });

  $rootScope.$on(AUTH_EVENTS.loginFailed, function (event, args) {
    event.preventDefault();
    $state.go('app.login');
  });

  $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event, args) {
    event.preventDefault();
    $state.go('app.login');
  });

})
