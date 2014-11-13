app.service('Session', function ($window) {

  this.isAuthenticated = function () {
    token = $window.sessionStorage["authToken"];
    if(token) {
      return JSON.parse(token) != null;
    } else {
      return false;
    }
  }

  this.getAuthToken = function () {

    token = $window.sessionStorage["authToken"];
    if(token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  };

  // Creates a session and stores the auth Token
  this.create = function (authenticationToken) {
    $window.sessionStorage["authToken"] = JSON.stringify(authenticationToken);
  };

  // Destroy the session by deleting the auth Token
  this.destroy = function () {
    $window.sessionStorage["authToken"] = null;
  };

  return this;
})
