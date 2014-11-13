app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.run(function ($rootScope, $state, AUTH_EVENTS, AuthenticationService, CurrentUser) {

  // Check authentication status on every transition
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    if (toState.name != "app.login" && !AuthenticationService.isAuthenticated()) {
      event.preventDefault();
      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    }
  });

  // Redirect to the dashboard when a user successfully logs in
  $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
    $state.go('app.user', { userId : CurrentUser.getUser().id});
  });

  $rootScope.$on(AUTH_EVENTS.loginFailed, function (event, args) {
    console.log('Login Failed')
    // Provide any logic for failed login.
  });

  // Redirect the user to login if they are not authenticated
  $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event, args) {
    event.preventDefault();
    $state.go('app.login');
  });

});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});

app.factory('httpInterceptor', ['$rootScope', 'Session', function($rootScope, Session) {
    return {
        request: function($config) {
            $config.headers['SportanaAuthentication'] = Session.getAuthToken();
            return $config;
        }
    };
}]);
