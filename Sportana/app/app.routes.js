var app = angular.module('app', ['ui.bootstrap','ngRoute','ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state("landing", {
      url: "/" ,
      templateUrl: "/components/landing/landing.html",
      controller: "HomeController as home"
    })

    .state("home", {
    	url: "/home" ,
    	templateUrl: "/components/home/home.html",
    	controller: "HomeController as home"
    })

    .state("friends", {
      url: "/friends" ,
      templateUrl: "/components/friends/view-friends.html",
      controller: "ViewFriendsController as viewFriends"
    })

    .state("games", {
      url: "/games" ,
      templateUrl: "/components/games/view-games.html",
      controller: "ViewGamesController as viewGames"
    })

    .state("createGame", {
    	url: "/game/create" ,
    	templateUrl: "/components/games/create-game.html",
    	controller: "CreateGameController as createGame"
    })

    .state("queue", {
    	url: "/queue",
      templateUrl: "/components/queue/queue.html"
    })
        .state("queue.preferences", {
          templateUrl: "/components/queue/queue-preferences.html",
          controller: "PreferencesController as preferences"
        })

        .state("queue.content", {
          templateUrl: "/components/queue/queue-content.html",
        })
            .state("queue.content.sports", {
                url: "/queue/preferences/sports" ,
                templateUrl: "/components/queue/queue-sports.html",
                controller: "QueueSportController as sports"
            })

            .state("queue.content.location", {
                url: "/queue/preferences/location" ,
                templateUrl: "/components/queue/queue-location.html",
                controller: "QueueLocationController as location"
            })

    .state("viewGame", {
    	url: "/game/:gameId" ,
    	templateUrl: "/components/game/view-game.html",
    	controller: "ViewGameController as viewGame"
    })

    .state("searchPlayer", {
    	url: "/user/search/:query" ,
    	templateUrl: "/components/search/search-player.html",
    	controller: "SearchPlayerController as searchPlayer"
    })

    .state("user", {
    	url: "/user/:userId" ,
    	templateUrl: "/components/profile/view-profile.html",
    	controller: "ViewProfileController as viewProfile"
    })

    .state("settings", {
    	url: "/settings" ,
    	templateUrl: "/components/settings/settings.html",
    	controller: "SettingsController as settings"
    })
});


// TODO : Does this really belong here?
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});
