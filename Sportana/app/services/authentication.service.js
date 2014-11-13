app.factory('AuthenticationService', function ($http, Session, CurrentUser) {

  var authenticationService = {};

  authenticationService.login = function (credentials) {

    return $http
      .post('/api/login', credentials)
      .then(function (res) {
        if(res.data.message == "") {
          Session.create(res.data.authenticationToken);
          console.log("WHAT");
          user = {
            id: res.data.login,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            numNotifications: res.data.numNotifications
          }

          CurrentUser.setUser(user);
          return user;
        } else {
          return {error: res.data.message};
        }
      });
  };

  authenticationService.logout = function () {
    Session.destroy();
    CurrentUser.destroyUser();
  };

  authenticationService.isAuthenticated = function () {
    return !!Session.isAuthenticated();
  };

  return authenticationService;
})
