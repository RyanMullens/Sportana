PROJECT SUMMARY: 
============

>Sportana is a web application that helps its users to stay active and enjoy the sports that they love to play. It will help them to easily create pickup games based around age and skill level, let them invite their friends to games, and will even find other players in a game's target age and skill level to reach the creator's ideal number of players.

External Frameworks
=====
<b>Angular: Brandon - 11/10</b>

>Front-end web application framework for developing single page, user-facing applications.  Angular provides support for 2-way-data-binding and complex modeling that helps separate the logic from views via view controllers and HTML partials.  The loose coupling of Angular helps the team scale our efforts horizontally without repeating ourselves.

<b>Angular-UI-Router: Brandon - 11/10</b>
>Instead of maintaining to flow of the application via URLs, UI-Router provides Finite-State-Machine management to the application.  This way, states can be managed and transitioned instead of URLs, making for a much more intuitive development experience.

<b>Bootstrap: Ryan - 11/12</b>
>Designing a website from scratch is very tricky, especially if you want to also accommodate mobile. Bootstrap makes both of those a breeze by providing a css base that makes it easy to make a responsive website. Bootstrap is a library of predefined classes which provide a nice looking UI by simply adding class names to html elements.

<b>PG: David - 11/11</b>
>PostgresSQL is our object oriented database management system for storing and handling  user data. Through connections and queries, data can be easily retrieved, updated, inserted, and deleted with minimal effort.

<b>Express: Jeff - 11/12</b>
>Express will be used to give a structure to the RESTful API in the backend of our application.  It will provide the middleware and structure that the routes in our backend will be written on.  We will use this library to help us easily structure the server which our application will run on.

<b>Base64url: Jeff - 11/12</b>
>Base64url will be used to encode a randomly generated sequence of bits from the crypto library into a string able to be stored in the database and sent to the front end to be used as an authentication token.

<b>Crypto: Jeff - 11/12</b>
>Crypto will be used to generate a secure random sequence of bits that will be encoded in a base64 string that can be used as a unique authentication token for each user.

HIGH LEVEL COMPONENT OVERVIEW:
=========

<b>David - 11/11</b>
>Sportana’s backend follows the structure of the express framework that easily allows the creation of an API and relative routes. The front-end portion of Sportana will make a RESTful request to the backend and the corresponding route will use the passed parameters and information to make the desired database query by use of our database controller functions. The database controller will access the requested information in the database and return results to the function handling the RESTful call.  The handler for this RESTful call will then take the results of the query and potentially add additional information based off conditionals and construct a JSON object from the result. This JSON object will be sent as a response back to the front end so that pages and profiles can be constructed on that end on the application.

>The database is vast and flexible; it can easily add rows and update information with automatic triggers that will handle complications such as averaging columns. The backend simply accesses it via prepared SQL commands to prevent incidents, and prior to fetching the actual desired data, each frontend request must pass an authentication layer to prove a user is online. The result is a JSON formatted object if the user passes.

<b>Brandon - 11/10</b>

>The front-end of Sportana is an Angular application which enables data-binding and separation of MVC logic into injectable components.  When a user navigates to our domain, the backend sends them the Angular application’s index.html which transfers the responsibility of handling further user interaction to the Angular portion of Sportana. This index is known as the ‘rootScope’ of our application and is where we include references to relevant .js library scripts and all of our Angular controllers and services, etc.  A single <ng-view></> tag exists on this page and it is in this tag that Angular will begin its recursive HTML-view injection.  

>Views in Sportana are separated into reusable components instead of repeated source-code which must be re-rendered on every refresh or interaction.  This separation is advantageous in that a single behavior can be embedded in a single file without compromising readability or polluting the filespace.  In Sportana, the application manages ‘states’ that are known only by the front-end via the UI-Router library.  This provides a structured way to compose our application

>Each state has the following properties:  a URL that will be shown to / shared by the user; the HTML template(s)  that are to be injected and displayed to the user; Angular Controllers that provide logic for manipulating the view and binding with data; and optionally, Angular Services that act as singletons that expose functionality such as API requests, user authentication, or temporary persistence to be shared among Controllers. 

>The HTML templates for a state use Angular ‘directive’ syntax to provide specific functionality, such as < ng-repeat></> which provides an easy way for populating a list of items.  It allows the developer to focus on the behavior of a single item such that the behavioral constraints will be applied to each of the repeated elements.  The HTML template also uses {{handlebar}} syntax for data binding.  The element inside of the handlebars is an ‘ng-model’ that interacts with the appropriate Controller.  The model in the handlebars is usually in ‘object.property’ notation that will dynamically display the property to the user for that object instance.  How does this work?  That is where Controllers come in.

>Controllers are really ‘Models’ that may be queried or updated or manipulated in order to retrieve user input or respond to user requests.  Controllers expose objects and functionality to their scope (eg, their partial in which they are contained).  For example, the {{object.property}} syntax in the template will be populated with the correct information based on an object that exists in the scope via the Controller.  There may be syntax such as $scope.object = { property: ‘someValue’ } in the controller which tells the view template to render the value of the property.  The cool thing is that this is two-way:  the object in the $scope may be modified through some user interaction which will change it in the controller model.  The controller may also provide models that must be retrieved from the backend by querying a function exposed in a Service.

>Services (along with the superset - Factories) do not interact with views; instead they provide reusable functionality that may be injected anywhere in the system.  A built-in Angular example is the $http service that gives the developer an easy way to make RESTful transactions.  This service is included in a Controller that needs access to its functionality.  A custom service in Sportana, ‘data.service.js’ will hold all of the backend API requests so that any controller requiring backend data may do so through the functions exposed in the service.


<b>Index Jeff - 11/12</b>
>The index route of our application will simply respond with the index.html page which will be rendered by the front end team.  From here the control transfers to the front end, which will make subsequent requests to the API running in the backend of our server.

<b>DatabaseController Jeff - 11/12</b>
>The database controller will be responsible for all interaction with the database.  The routes presented by the server will not interact directly with the database for the purposes of encapsulation.  The database controller will therefore provide a different function for each action that the handlers for our RESTful API might want to perform on the database and will use callback functions to those handlers to pass back the results of the interaction with the database.

<b>Authentication Jeff - 11/11</b>
>For this application we will create authentication middleware to handle the creation and assignment of authentication tokens.  It will provide the functionality of authenticating users for the rest of the backend including the creation and assignment of an authentication token for a user, deserializing a passed authentication token to get the user associated with that token back, and providing a login portal to handle the load of logging in a user from a given username and password and then assigning that user a login token all in one call to this middleware.  It will communicate this information to the routes calling it through callback functions passed to the middleware and will also communicate with the database controller using functions that the database controller will provide.  Some implementation challenges that I see are enforcing the uniqueness property of authentication tokens.  They will be generated randomly so I don’t expect many collisions - especially on a smaller scale initially, but ensuring that tokens are unique is necessary and may take some thought.

<b>Friends Jeff</b>
>The friends part of our application will handle all routes beginning with /friends - which are responsible for handling all of the actions that could be performed with a users friends on Sportana.  The routes supported by this are:

><b> GET /friends</b> - which will return a list of all of the friends of the user requesting in an array in a JSON object including values for login, profile photo, first name, last name, age, and city for each friend in the array.

><b> DELETE /friends/{friendID}</b> - which will remove the friend whose login is in the {friendID} portion of the route from the requesting user’s friend list and will also remove the user requesting from the given friend’s friend list as well.  This call will reply with a JSON object including “message” which will include an error message if the operation is unsuccessful and “success” which will be true if and only if the operation is successful.

<b>Login Jeff</b>
>The login portion of our application will handle routes beginning with /login.  Currently there will only be one /login function which will be responsible for matching a given username and password in database of users and then assigning an authentication token to the newly logged in/authenticated user.  The routes supported for this are:

><b>POST /login</b> - which consumes a username/email and password from the body of the request, tries to match the username and password to a known username and password in the database, and when successful returns the users new authentication token, login, first name, last name, and number of unresponded to notifications - so the front end can use these in the page rendered.

<b>Requests Jeff</b>
>The requests portion of our application will handle routes beginning with /requests.  These routes will be responsible for any interactions involving notifications/requests between users.  Currently the types of requests supported are - friend requests, game invitations, queue invitations, and game reminders (which will be generated by the backend).  The routes supported for this are:

 ><b>GET /requests</b> - which will return a list of requests that the user requesting has not yet responded to.  The requests returned will be in an array and each request will include information such as the id number of the request, the login of the user the request is from, the name of the user the request is from, the profile picture of the user the request is from, the type of request, the date the request was generated, the time the request was generated, and additionally the creator of the game and id number of the game that the request references if the request relates to either a queue or a game (i.e. is not a friend request).

 ><b>PUT /requests/game</b> - this will consume the username of the user to send the request to, and the creator and game id of the game referenced by this request.  It will give the notification a timestamp and put it in the database so that the user it is for can then retrieve it.

 ><b>PUT /requests/friend</b> - this will consume the username of the user to send the request to.  It will generate a notification, give the notification a timestamp, and put the notification in the database so the user it is to can then retrieve the notification and reply to it.

><b> POST /requests/{requestID} </b>- this will consume a boolean value for whether or not the request was accepted or denied.  If denied, the handler will simply delete the notification from the database.  If accepted, the handler will determine the type of notification and will handle the acceptance of the notification accordingly.  If the request was a friend request then the user the request is from and the user the request is for will be added as friends in the database.  If the request was a game or a queue request then the user the notification was for will be added to that game or queue referenced in the notification.  Once the notification acceptance is handled it will also be removed from the database so that the user doesn’t have to see and respond to the same notification twice.

><b>Games Eli</b>

>This part of the application handles routes starting with /games. These routes will handle putting a new game into the database, getting a list of all the games available and information associated with those games, and requests for games. More specifically here is a list of the routes: 

><b>PUT /games</b> - this will take in as parameters all of the information necessary to creating a game, sport, game date, start time, end time, max number of players , min number of players, max age of players, min age of players, location, and whether the game is public or private. it will then input this information into the games table of the database. 

><b>GET /games </b>- this will take in a game and the profile pictures of the other players in the game as well as the sport id, the sport, the number of players going, the location, and the date and time as  parameters. It will query the database through the database controller and return a json object with a list of games and a list of profile pictures associated with that game.


<b>Users David</b>
>The Users portion will handle all requests related to the user’s interactions throughout Sportana by extension of /users in the route request. The current implemented interaction is navigating to user profiles. Future feature implementation are planned as follows:

><b>GET /users/:login</b> - this will use the passed login parameter to select the login and email, first name, last name, profile picture, city, age, friendliness, timeliness, skilllevel, favorite sports and their relative images, and whether or not this user is a friend to the requesting user. 


><b>PUT /users</b> - this will use the passed body parameters to create a new user by inserting login, emailSuffix, first name, last name, birthdate, and city into the database if there doesn’t exist a user with a similar email address.

><b>POST /users/ratings</b> - this will insert passed in ratings of the logged in user against the user rated which will trigger an automatic averaging of the user rated’s ratings.

><b>Login/Signup + Authentication Brandon 11/14</b>

>Signing up a user is the first step for interacting with Sportana.  The signup generates a user account which will be used for storing user preferences, friends, games, and all other account-related material.  This consists of an email, password, name, city, and birthday.  After the user enters the form information, an HTTP PUT request is sent to the back-end /users/ route where the user will be created if the email is not already in use.  On a successful response, the user is authenticated and taken to their dashboard.

>Authentication plays a critical role in keeping our application and our users’ data secure.  On the front-end, after a user logs in, an authentication token received from the back-end response, along with some minimal user information, is stored in a cookie via an Angular Service.  The Session and User Services are singletons that can be referenced anywhere in the controller so long as they are injected as dependencies.  They contain CRUD operations for dealing with the cookies.  

>In order to make use of the cookies, an Authentication Service is instantiated that contains methods for login, logout, and checking if the user is authenticated.  The login and logout methods are used once per application lifecycle, whereas the authentication verification is fired on every page transition.  For every state change, if a user is not verified, an authentication failure event is broadcast and caught by an observer which redirects to login.  

>In the case that a user is attempting to access an API call, their authentication token is passed in the header so that the backend may verify.  If the token does not match, an error message is returned and this message will be intercepted, redirecting the user to login.  The interceptor mechanism is also used for appending the auth token to the header in every request, reducing code duplication, and centralizing http metadata logic.

>Users may also log out at any time.  Once they press the ‘Logout’ button from the top-bar, the Authentication Service is notified and the user and authentication cookies are cleared, which redirects to the login page.

>The login, authenticate on each request and transition, and logout functionality are currently fully functional.  User creation is nearly complete and there are no foreseen difficulties with this implementation.


><b>Find / Create Game Brandon 11/14</b>

>The main feature in Sportana is finding and creating games to play with friends.  To find a game, a user navigates to the ‘Find Games’ page which will prompt them to begin the queueing process.  This process will collect data from the user to help find games--specifically, Sportana will want to know the following:  Sports, age range, availability, city (radius / geolocation in V2), game type (casual or competitive), and number of players.  To make this process intuitive, the current preference is shown in the main content area of the screen and a ‘Preferences’ sidebar will show all of their choices throughout the queueing process.  The user will complete each bit of information before proceeding to the next, and may choose to modify previous preferences by clicking the ‘Edit’ buttons next to each preference label in the sidebar.  The choices are captured using a Controller for each preference page, and stored via a Queue Service that keeps the preferences in memory while the user has not navigated away from the application.  

>When a user provides all of the necessary information, they may click ‘Find Games’ which will send a request to the back-end that will add the player’s queue preferences to a search table where matches will be made.  If a match is made, the server responds with the game and the user may click to view that game, accept, or decline it.  However, if no game is found, the user will be asked if they would like to create and host a game.  If so, they are dropped from the search queue and instead they proceed to create a game that will become available to those searching for a game.  The Queue Service will be cleared so that they may queue up for other games.  If they decline, they will stay in the queue and receive a notification when a game is found.  The Queue Service will retain the information and will make the appropriate HTTP requests to populate the preferences when a user navigates back to their ‘Find Game’ page when they are still in the queue.

>If a user chooses to create a game, they are then required to choose a location, a start and end time, and whether or not they want it to be public or private.  A public game allows other users the opportunity to match this game and join up, whereas private means invites to friends are required.  In either case, the creator may invite friends.  An ‘Invite Friends’ button will be shown and clicking this will show a modal with a list of their friends.  Selecting a friend will add them to a temporary list, and once they have selected all of them, they can click ‘Invite’, which will send out invites once the game creation is complete.  The user will be able to review and make changes to the game before they finish creation, but afterward, the game cannot be changed aside from adding friends.  This again will take advantage of a Service that POSTs the game information and retrieves and restores information about the game when they return to this page--this will include who is going and and posts on the game wall (see View Game).

>One of the most difficult challenges for queueing and creating a game will be the style and user experience of the ‘Availability’ page.  We had planned for an iCal’esque click-and-drag along a week-view, but this may require more time than is available.  Additionally, we had hoped to use location data and run queries over a radius for game discovery, but this may have to be a V2 implementation due to time constraints.  Instead, cities will be used for the query.

><b>Games List Alec</b>

>The games list is a view where a user can view the games where they are currently joined as well as the notifications for being invited to a game. The games list is retrieved by making an http request to the server and then renders the information in the view. The same is true for the notifications except there is an accept and decline button. When a user hits “Accept” on any game notification, the game moves to the current games list below and then sends a post request to the server to add the game to the users list in the database. If a user click “Decline” then the notification is removed from the list and a post request is sent to remove the notification from the database.

>The information that is displayed for each game includes the name of the sport, date, location, a link to the game itself, and how many people are going and invited. Likewise, the notifications include all of the above in addition to the player that invited the user.

<b>View Game Alec</b>

>A user can find the view of a game they are in from the Games List view. All of the information that is displayed on the page will have been rendered from a http GET request to the server. This page includes all of the information about a specific game including but not limited to the name, sport, who is going, date, and location. The page would also include buttons to leave the game and invite other players. Another main feature of this page is the chat board, this will be the main communication between the players of a game. For the implementation of the chat board we will be using websockets\*\*.

\*\* Websockets have not yet been implemented in the final submission.

<b>Friends Alec</b>

>The friends list is a view where a user can look at a list of all their friends. The information to be rendered comes from an http GET request to the server and includes the name, profile picture, age, city, and link to the profile. A user can click on the link which will send the user to the corresponding profile view.

<b>View Profile Ryan 11/14</b>

>The view profile component allows one to view the details of another player. This includes name, profile picture, age, current city, ratings, and favorite sports. This page will also alter itself based on the relationship of the user that is logged in vs the user who's profile page it is. If it is your own profile, you will have a button that allows you to edit your profile. This will alter the page to have input fields for your profile details and save and cancel buttons. If the profile is of and friend, an unfriend button and possibly invite to game button will appear. If the profile is of a non-friend, a request friend button will appear.

>When a user visits a profile page, the profile component is loaded via an Ajax get command. The page section will not render until that is complete. Calls such as request friend, unfriend, and saving the profile will be making Ajax post calls. One complete, the user will be notified on the page.

>One of the biggest difficulties with profiles is going to be ensuring data is consistent and that the user is properly notified if a request fails. Another challenge will be juggling the various states that the page can be in(editing, is own page, is a friend, not a friend) though angular makes this a lot more manageable. 

<b>Searchbar Ryan 11/14</b>

>Once a user is logged in, they will have access to the searchbar on the top of every page they visit. For our first version, this will only allow for searching players by name. A user can type in a name and press enter and then will be redirected to a search results page which is described in the next section.

>The toughest part of this component is primarily styling it correctly that it is modular and available on every page while not being a hindrance to the actual page content

<b>Search Results Ryan 11/14</b>

>The search results page is accessed when when a user enters a name into the searchbar and presses enter. When the page is requested, it reads in the query parameter from the URL and sends an Ajax get request to the server. The server then returns a list of all matching users. Each one of these results will give a brief overview of a user (profile picture, name, age, city, sports they play) and when clicked will redirect to that users profile page.

>Some of the problems we may encounter on this page is listing too many results. Once the amount if users becomes larger, we will need to implement pagination to reduce strain on the server and client.

><b>Sidebar Ryan 11/14</b>

>Much like the search bar, once a user is logged in, they will see the sidebar on every page they visit(Mobile users will have a button on the search bar that expands/hides the menu). The sidebar is a very important feature of the site as it is needed to get from page to page since it handles the major navigation. It will have links to the dashboard, profile of current user, joining as game, viewing current games, settings, and a logout button.

>The biggest problems the sidebar creates are mainly view based. Making the sidebar responsive and mobile friendly is very tricky even with bootstrap. 
