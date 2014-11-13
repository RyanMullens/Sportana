app.service('CurrentUser', function ($window) {

 this.getUser = function () {
   user = $window.sessionStorage["user"];
   if(user) {
     return JSON.parse(user);
   } else {
     return null;
   }
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
