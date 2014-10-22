var app = angular.module('app', ['ui.bootstrap','ngRoute']);


console.log("WOOOOOOO");



  /** * Configure the Routes */ 
  app.config(function ($routeProvider,$locationProvider) 
  {
  	$locationProvider.html5Mode(true);

  	console.log($locationProvider);

 $routeProvider 
 // Home 
 .when("/", {templateUrl: "../partials/index.html"}) 
 // Pages 
 .when("/friends", {templateUrl: "../partials/viewFriends.html"}) 
  .when("/game/create", {templateUrl: "../partials/createGame.html"}) 
   .when("/game/join", {templateUrl: "../partials/joinGame.html"}) 
    .when("/game/:gameId", {templateUrl: "../partials/viewGame.html"}) 
     .when("/user/search/:query", {templateUrl: "../partials/searchPlayer.html"}) 
      .when("/user/:userId", {templateUrl: "../partials/viewProfile.html"}) 
       .when("/settings", {templateUrl: "../partials/settings.html"})
 // else go home 
 .otherwise({redirectTo :'/'});
  });
