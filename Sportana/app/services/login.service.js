app.factory("authentication", function($http, $q, $window) {

  return { login: login };

  var authToken;

  function login(email, password) {

    var deferred = $q.defer();

    $http.post("/api/login", {
      email: email,
      password: password
    }).then(function(result) {

      authToken = result.authenticationToken;
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(authToken);

    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }
});
