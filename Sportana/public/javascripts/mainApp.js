var app = angular.module('app', ['ui.bootstrap','ngRoute','ui.router']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
       
    .state("home", {
    	url: "/" ,
    	templateUrl: "../partials/index.html", 
    	controller: "HomeController as homeCtrl" 
    }) 

    .state("friends", {
      url: "/friends" ,
      templateUrl: "../partials/viewFriends.html", 
      controller: "ViewFriendsController as friendCtrl" 
    }) 

    .state("games", {
      url: "/games" ,
      templateUrl: "../partials/viewGames.html", 
      controller: "ViewGamesController as gameCtrl" 
    }) 

    .state("createGame", {
    	url: "/game/create" ,
    	templateUrl: "../partials/createGame.html", 
    	controller: "CreateGameController as createGameCtrl" 
    }) 

    /*****************************************************************************/
    .state("queue", {
    	url: "/queue",
      templateUrl: "../partials/queue.html"
    })
        .state("queue.preferences", {
          templateUrl: "../partials/queue-preferences.html",
        })

        .state("queue.content", {
          templateUrl: "../partials/queue-content.html",
        })
            .state("queue.content.sports", {
                url: "/queue/preferences/sports" ,
                templateUrl: "../partials/queue-sports.html", 
                controller: "QueueLocationController as locCtrl" 
            })

            .state("queue.content.location", {
                url: "/queue/preferences/location" ,
                templateUrl: "../partials/queue-location.html", 
                controller: "QueueLocationController as locCtrl" 
            })

    .state("viewGame", {
    	url: "/game/:gameId" ,
    	templateUrl: "../partials/viewGame.html", 
    	controller: "ViewGameController as viewGameCtrl" 
    }) 

    .state("searchPlayer", {
    	url: "/user/search/:query" ,
    	templateUrl: "../partials/searchPlayer.html", 
    	controller: "SearchPlayerController as searchPlayerCtrl" 
    }) 

    .state("user", {
    	url: "/user/:userId" ,
    	templateUrl: "../partials/viewProfile.html", 
    	controller: "ViewProfileController as viewProfileCtrl" 
    }) 

    .state("settings", {
    	url: "/settings" ,
    	templateUrl: "../partials/settings.html", 
    	controller: "SettingsController as settingsCtrl" 
    })         
});


$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});