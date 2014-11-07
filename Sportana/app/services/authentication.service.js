app.factory("Authentication", function($http, $q, $window) {

  var authToken;

  function login(email, password) {

    var deferred = $q.defer();

    $http.post("/api/login", {
      email: email,
      password: password
    }).then(function(result) {

      authToken = result.authenticationToken;
      $window.sessionStorage["authToken"] = JSON.stringify(authToken);
      deferred.resolve(authToken);

    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function logout() {

    var deferred = $q.defer();

    $window.sessionStorage["authToken"] = null;
    authToken = null;

    deferred.resolve(true);
    deferred.reject(undefined);

    return deferred.promise;
  }

  function isAuthenticated() {

    var deferred = $q.defer();

    authToken.then(function(result) {
      deferred.resolve(true);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function init() {
    if ($window.sessionStorage["authToken"]) {
      authToken = JSON.parse($window.sessionStorage["authToken"]);
    }
  }

  init();

  return { login: login };

});
