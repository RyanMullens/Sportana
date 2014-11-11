app.factory('AuthenticationService', function ($http, Session) {

  var authenticationService = {};

  authenticationService.login = function (credentials) {

    return;

    // UNCOMMENT WHEN BACKEND IS READY
    // return $http
    //   .post('/api/login', credentials)
    //   .then(function (res) {
    //     if(res.success) {
    //       Session.create(res.authenticationToken);
    //       // TODO : Return user's name and auth?  Not sure if anything needs to be returned...
    //       return res.authenticationToken;
    //     } else {
    //       return {error: res.message};
    //     }
    //   });
  };

  authenticationService.logout = function () {
    Session.destroy();
  };

  authenticationService.isAuthenticated = function () {
    return true;
    // UNCOMMENT WHEN SESSIONS ARE BEING SET
    // return !!Session.authenticationToken;
  };

  return authenticationService;
})
