var app = angular.module('app', ['ui.bootstrap','ngRoute','ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
	$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
       
        .state("home", {
        	url: "/" ,
        	templateUrl: "../partials/index.html", 
        	controller: "HomeController" }) 
        .state("friends", {
        	url: "/friends" ,
        	templateUrl: "../partials/viewFriends.html", 
        	controller: "ViewFriendsController as friendCtrl" }) 
		.state("createGame", {
        	url: "/game/create" ,
        	templateUrl: "../partials/createGame.html", 
        	controller: "CreateGameController" }) 
        .state("joinGame", {
        	url: "/game/join" ,
        	templateUrl: "../partials/joinGame.html", 
        	controller: "SportSelectionController as sportCtrl" }) 
        .state("viewGame", {
        	url: "/game/:gameId" ,
        	templateUrl: "../partials/viewGame.html", 
        	controller: "ViewGameController" }) 
        .state("searchPlayer", {
        	url: "/user/search/:query" ,
        	templateUrl: "../partials/searchPlayer.html", 
        	controller: "SearchPlayerController" }) 
        .state("user", {
        	url: "/user/:userId" ,
        	templateUrl: "../partials/viewProfile.html", 
        	controller: "ViewProfileController" }) 
        .state("settings", {
        	url: "/settings" ,
        	templateUrl: "../partials/settings.html", 
        	controller: "SettingsController" })         
});


  /** * Configure the Routes */ 
  /*app.config(function ($stateProvider, $urlRouterProvider ,$locationProvider) 
  {
  	$locationProvider.html5Mode(true);

  	console.log($stateProvider);

  	 $urlRouterProvider.otherwise('/');


  	 $stateProvider.state("user", {url: "/user/:userId" ,templateUrl: "../partials/viewProfile.html", controller: "ViewProfileController"});
        /*.state("/", {templateUrl: "../partials/index.html"}) 
 // Pages 
 .state("/friends", {templateUrl: "../partials/viewFriends.html"}) 
 .state("/game/create", {templateUrl: "../partials/createGame.html"}) 
 .state("/game/join", {templateUrl: "../partials/joinGame.html"}) 
 .state("/game/:gameId", {templateUrl: "../partials/viewGame.html"}) 
 .state("/user/search/:query", {templateUrl: "../partials/searchPlayer.html"})*/ 
 //.state("user", {url: "/user/:userId" ,templateUrl: "../partials/viewProfile.html", controller: "ViewProfileController"}) 
 //.state("/settings", {templateUrl: "../partials/settings.html"});

 /*$routeProvider 
 // Home 
 .when("/", {templateUrl: "../partials/index.html"}) 
 // Pages 
 .when("/friends", {templateUrl: "../partials/viewFriends.html"}) 
 .when("/game/create", {templateUrl: "../partials/createGame.html"}) 
 .when("/game/join", {templateUrl: "../partials/joinGame.html"}) 
 .when("/game/:gameId", {templateUrl: "../partials/viewGame.html"}) 
 .when("/user/search/:query", {templateUrl: "../partials/searchPlayer.html"}) 
 .when("/user/:userId", {templateUrl: "../partials/viewProfile.html", controller: "ViewProfileController"}) 
 .when("/settings", {templateUrl: "../partials/settings.html"});
 // else go home*/
 /* });


$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});*/