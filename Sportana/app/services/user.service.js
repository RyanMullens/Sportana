app.service('CurrentUser', function ($window) {

 this.getUser = function () {
   return JSON.parse($window.sessionStorage["user"]);
 };

 // Creates a session and stores the auth Token
 this.setUser = function (user) {
   $window.sessionStorage["user"] = JSON.stringify(user);
 };

 this.destroyUser = function () {
   $window.sessionStorage["user"] = null;
 };

 return this;
})
