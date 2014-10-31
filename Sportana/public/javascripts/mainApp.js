var app = angular.module('app', ['ui.bootstrap','ngRoute','ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
	$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
       
        .state("home", {
        	url: "/" ,
        	templateUrl: "../partials/index.html", 
        	controller: "HomeController as homeCtrl" }) 
        .state("friends", {
            url: "/friends" ,
            templateUrl: "../partials/viewFriends.html", 
            controller: "ViewFriendsController as friendCtrl" }) 
        .state("games", {
            url: "/games" ,
            templateUrl: "../partials/viewGames.html", 
            controller: "ViewGamesController as viewGamesCtrl" }) 

		.state("createGame", {
        	url: "/game/create" ,
        	templateUrl: "../partials/createGame.html", 
        	controller: "CreateGameController as createGameCtrl" }) 
        .state("joinGame", {
        	url: "/game/join" ,
        	templateUrl: "../partials/queueSport.html", 
        	controller: "QueueSportController as sportCtrl" })
        .state("queueLocation", {
            url: "/game/queueLocation" ,
            templateUrl: "../partials/queueLocation.html", 
            controller: "QueueLocationController as locCtrl" })
        .state("viewGame", {
        	url: "/game/:gameId" ,
        	templateUrl: "../partials/viewGame.html", 
        	controller: "ViewGameController as viewGameCtrl" }) 
        .state("searchPlayer", {
        	url: "/user/search/:query" ,
        	templateUrl: "../partials/searchPlayer.html", 
        	controller: "SearchPlayerController as searchPlayerCtrl" }) 
        .state("user", {
        	url: "/user/:userId" ,
        	templateUrl: "../partials/viewProfile.html", 
        	controller: "ViewProfileController as viewProfileCtrl" }) 
        .state("settings", {
        	url: "/settings" ,
        	templateUrl: "../partials/settings.html", 
        	controller: "SettingsController as settingsCtrl" })         
});


$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});