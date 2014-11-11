app.service('Session', function () {

  this.create = function (authenticationToken) {
    this.authenticationToken = authenticationToken;
    $window.sessionStorage["authToken"] = JSON.stringify(authToken);
  };
  this.destroy = function () {
    this.authenticationToken = null;
    $window.sessionStorage["authToken"] = null;
  };
  return this;
})
