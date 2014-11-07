angular.module("app")
  .run(function ($rootScope, $state, Authentication) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !Authentication.isAuthenticated()){
        // User isn’t authenticated
        $state.transitionTo("landing.login");
        event.preventDefault();
      }
    });
  });
