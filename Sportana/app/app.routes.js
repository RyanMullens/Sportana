app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // UNCOMMENTING LEADS TO INFINITE DIGEST LOOP BUG.
  // $locationProvider.html5Mode(true);

  $urlRouterProvider
    .when('', '/login')
    .when('/', '/login')
    .otherwise('/');

  $stateProvider

  .state("landing", {
    abstract: true,
    views: {
      "root@": {
        templateUrl: "/components/landing/landing.html"
      }
    }
  })
  .state("login", {
    url: "/login" ,
    parent: "landing",
    views: {
      "credentials@landing": {
        templateUrl: "/components/landing/login.html",
        controller: "Login"
      }
    },
    data: {
      "noAuth": true
    }
  })
  .state("signup", {
    url: "/signup" ,
    parent: "landing",
    views: {
      "credentials@landing": {
        templateUrl: "/components/landing/signup.html",
        controller: "Signup"
      }
    },
    data: {
      "noAuth": true
    }
  })

  // This is the ROOT of authenticated user's application.
  .state("main", {
    abstract: true,
    views: {
      "root@": {
        templateUrl: "/shared/app.html",
      }
    }
  })

  .state("app",
  {
    parent: "main",
    abstract: true,
    views: {
      "sidebar@main": {
        templateUrl: "/shared/sidebar/sidebar.html",
        controller: "SidebarController as sidebar"
      },
      "searchbar@main": {
        templateUrl: "/shared/searchbar/searchbar.html",
        controller: "SearchbarController as searchbar"
      }
    }
  })

  .state("app.home", {
   url: "/dashboard" ,
   views: {
    "content@main": {
      templateUrl: "/components/home/home.html",
      controller: "HomeController as home"
    }
  }
})

  .state("app.friends", {
    url: "/friends" ,
    views: {
      "content@main": {
        templateUrl: "/components/friends/view-friends.html",
        controller: "ViewFriendsController as viewFriends"
      }
    }
  })


  .state("app.games", {
    url: "/games" ,
    views: {
      "content@main": {
        templateUrl: "/components/games/view-games.html",
        controller: "ViewGamesController as viewGames"
      }
    }
  })

  .state("app.createGame", {
   url: "/game/create" ,
   views: {
    "content@main": {
    	templateUrl: "/components/games/create-game.html",
    	controller: "CreateGameController as createGame"
    }
  }
})

  .state("app.queue", {
   url: "/queue",
   views: {
    "content@main": {
      templateUrl: "/components/queue/queue.html"
    }
  }
})
  .state("app.queue.preferences", {
    views: {
      "content@main": {
        templateUrl: "/components/queue/queue-preferences.html",
        controller: "PreferencesController as preferences"
      }
    }
  })

  .state("app.queue.content", {
    views: {
      "content@main": {
        templateUrl: "/components/queue/queue-content.html"
      }
    }
  })
  .state("app.queue.content.sports", {
    url: "/queue/preferences/sports" ,
    views: {
      "content@main": {
        templateUrl: "/components/queue/queue-sports.html",
        controller: "QueueSportController as sports"
      }
    }
  })

  .state("app.queue.content.location", {
    url: "/queue/preferences/location" ,
    views: {
      "content@mainmain": {
        templateUrl: "/components/queue/queue-location.html",
        controller: "QueueLocationController as location"
      }
    }
  })

  .state("app.viewGame", {
   url: "/game/:gameId" ,
   views: {
    "content@main": {
    	templateUrl: "/components/game/view-game.html",
    	controller: "ViewGameController as viewGame"
    }
  }
})

  .state("app.searchPlayer", {
   url: "/user/search/:query" ,
   views: {
    "content@main": {
    	templateUrl: "/components/search/search-player.html",
    	controller: "SearchPlayerController as searchPlayer"
    }
  }
})

  .state("app.user", {
   url: "/user/:userId" ,
   views: {
    "content@main": {
    	templateUrl: "/components/profile/view-profile.html",
    	controller: "ViewProfileController as viewProfile"
    }
  }
})

  .state("app.settings", {
   url: "/settings" ,
   views: {
    "content@main": {
    	templateUrl: "/components/settings/settings.html",
    	controller: "SettingsController as settings"
    }
  }
})
});
