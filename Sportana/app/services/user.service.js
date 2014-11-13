app.service('CurrentUser', function ($window, $cookies) {

 this.getUser = function () {

   user = $window.sessionStorage["user"];
   if(user) {
     return JSON.parse(user);
   } else {
     return ($cookies["user"]) ? JSON.parse($cookies["user"]) : null;
   }
 };

 // Creates a session and stores the auth Token
 this.setUser = function (user) {
   $window.sessionStorage["user"] = JSON.stringify(user);
   $cookies["user"] = JSON.stringify(user);
 };

 this.destroyUser = function () {
   delete $window.sessionStorage["user"];
   delete $cookies["user"];
 };

 return this;
})
