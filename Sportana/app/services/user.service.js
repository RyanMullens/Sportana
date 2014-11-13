app.service('CurrentUser', function ($window) {

 this.getUser = function () {
   user = $window.sessionStorage["user"];
   if(user) {
     return JSON.parse(user);
   } else {
     return null;
   }
 };


 //This can be used by all pages to check if a specific user is the logged in one?
 //Was just gunna add it to profile controller but it seemed useful to be here
 this.isUser = function(userId)
 {
 	return this.getUser().id === userId;
 }

 // Creates a session and stores the auth Token
 this.setUser = function (user) {
   $window.sessionStorage["user"] = JSON.stringify(user);
 };

 this.destroyUser = function () {
   $window.sessionStorage["user"] = null;
 };

 return this;
})
