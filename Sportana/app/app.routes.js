var app = angular.module('app', ['ui.bootstrap','ngRoute','ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state("app",
  {
    url: "",
    abstract: true,
    views: {
      "sidebar@": {
        templateUrl: "/shared/sidebar/sidebar.html",
        controller: "SidebarController"
      },
      "searchbar@": {
        templateUrl: "/shared/searchbar/searchbar.html",
        controller: "SearchbarController"
      }
    }
  })
  .state("app.landing", {
    url: "/landing" ,
    views: {
      "content@": {
        templateUrl: "/components/landing/landing.html",
        controller: "HomeController as home"
      }
    }
  })

  .state("app.home", {
   url: "/" ,
   views: {
    "content@": {
      templateUrl: "/components/home/home.html",
      controller: "HomeController as home"
    }
  }
})

  .state("app.friends", {
    url: "/friends" ,
    views: {
      "content@": {
        templateUrl: "/components/friends/view-friends.html",
        controller: "ViewFriendsController as viewFriends"
      }
    }
  })


  .state("app.games", {
    url: "/games" ,
    views: {
      "content@": {
        templateUrl: "/components/games/view-games.html",
        controller: "ViewGamesController as viewGames"
      }
    }
  })

  .state("app.createGame", {
   url: "/game/create" ,
   views: {
    "content@": {
    	templateUrl: "/components/games/create-game.html",
    	controller: "CreateGameController as createGame"
    }
  }
})

  .state("app.queue", {
   url: "/queue",
   views: {
    "content@": {
      templateUrl: "/components/queue/queue.html"
    }
  }
})
  .state("app.queue.preferences", {
    views: {
      "content@": {
        templateUrl: "/components/queue/queue-preferences.html",
        controller: "PreferencesController as preferences"
      }
    }
  })

  .state("app.queue.content", {
    views: {
      "content@": {
        templateUrl: "/components/queue/queue-content.html"
      }
    }
  })
  .state("app.queue.content.sports", {
    url: "/queue/preferences/sports" ,
    views: {
      "content@": {
        templateUrl: "/components/queue/queue-sports.html",
        controller: "QueueSportController as sports"
      }
    }
  })

  .state("app.queue.content.location", {
    url: "/queue/preferences/location" ,
    views: {
      "content@": {
        templateUrl: "/components/queue/queue-location.html",
        controller: "QueueLocationController as location"
      }
    }
  })

  .state("app.viewGame", {
   url: "/game/:gameId" ,
   views: {
    "content@": {
    	templateUrl: "/components/game/view-game.html",
    	controller: "ViewGameController as viewGame"
    }
  }
})

  .state("app.searchPlayer", {
   url: "/user/search/:query" ,
   views: {
    "content@": {
    	templateUrl: "/components/search/search-player.html",
    	controller: "SearchPlayerController as searchPlayer"
    }
  }
})

  .state("app.user", {
   url: "/user/:userId" ,
   views: {
    "content@": {
    	templateUrl: "/components/profile/view-profile.html",
    	controller: "ViewProfileController as viewProfile"
    }
  }
})

  .state("app.settings", {
   url: "/settings" ,
   views: {
    "content@": {
    	templateUrl: "/components/settings/settings.html",
    	controller: "SettingsController as settings"
    }
  }
})
});


// TODO : Does this really belong here?
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});
