app.service('Session', function () {

  this.authenticationToken = null;

  this.getAuthToken = function () {
    return this.authenticationToken;
  };

  // Creates a session and stores the auth Token
  this.create = function (authenticationToken) {
    this.authenticationToken = authenticationToken;
  };

  // Destroy the session by deleting the auth Token
  this.destroy = function () {
    this.authenticationToken = null;
  };
  
  return this;
})
