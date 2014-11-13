app.service('Session', function ($window, $cookies) {

  this.isAuthenticated = function () {
    return $window.sessionStorage["authToken"] || $cookies["authToken"];
  }

  this.getAuthToken = function () {

    token = $window.sessionStorage["authToken"];
    if(token) {
      return JSON.parse(token);
    } else {
      return ($cookies["authToken"]) ? JSON.parse($cookies["authToken"]) : null;
    }
  };

  // Creates a session and stores the auth Token
  this.create = function (authenticationToken) {
    $window.sessionStorage["authToken"] = JSON.stringify(authenticationToken);
    $cookies["authToken"] = JSON.stringify(authenticationToken); // TODO : Only store the cookie if 'RememberMe' ?
  };

  // Destroy the session by deleting the auth Token
  this.destroy = function () {
    delete $window.sessionStorage["authToken"];
    delete $cookies["authToken"];
  };

  return this;
});
