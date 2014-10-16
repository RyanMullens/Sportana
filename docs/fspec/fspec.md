**Sportana Functional Specifications**
=======


>Create Date: September 30, 2014

>Last Modified Date: October 14, 2014

>Version 1.0

>Jeff Boutotte, Eli Sandler, Brandon Read, Ryan Mullens, Alec Hirsch, David Soohoo

>Team Kiwi Mango


![logo](https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/logo.png)


<img src="https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/companyLogo.png" width="250px"/>


Team Organization
-------
Jeff Boutotte
>Role: Back end + Design

>Responsibilities: Design and implement the database and RESTful API calls for the back end of the application.

---
Eli Sandler
>Role:  Back End support

>Responsibilities:  Helping to implement the database and RESTful API in the back end.

---
Brandon Read
>Role: Front End + Visual Design

>Responsibilities: Research and implement the front-end data-binding model using Angular.js.  Consume the RESTful API.  Style using HTML + CSS.

---
Ryan Mullens
>Role: Front End + Back End

>Responsibilities: Helping to implement the RESTful API in the Back End and also consume it in the Front End.

---
Alec Hirsch
>Role: Front End + Back End

>Responsibilities: 

---
David Soohoo
>Role: Front End + Back End

>Responsibilities: Implement functional features and corresponding RESTful API 

Overview
-------
Sportana is a brand new web based application that will help its users to stay active and enjoy the sports that they love to play.  It will help them to easily create pickup games based around age and skill level, let them invite their friends to games, and will even find other players in a game's target age and skill level to reach the creator's ideal number of players.  

Disclaimer
-------
This specification intends to profile the web based application Sportana.  It aims to describe the various ways in which a user is intended to interact with the application at a high level.  The screenshots and flow of the website included are what we as the developers currently see the website flow to be.  Although this document gives a general flow to the front end of the application it does not aim to provide a design for any API's or code that we will create in order to implement this application - these will come in further design documents.  Although the major use cases and general idea of the application will remain constant, this document and the details of use cases mentioned are not fixed and can be edited at the discretion of the developer to improve the quality of the application produced.

Scenarios
-------

**Create Account**

David Soohoo
>Alice, a sports enthusiast decides she wants to extend her reach in playing games and events and discovers Sportana, but she doesn't have an account. She sees in the top right corner a login and password field, and underneath that, a "Create Account" link and a "Connect with Facebook". Alice clicks on "Create Account" and is brought to a new field to register an account with Sportana.com. She enters her information correspondingly into the fields: email, password, first name, last name, birthday, and city. Alice then clicks a button at the bottom labeled "Create Account" at the bottom of the page. Alice's account is now created and she is redirected to her profile page where she can further edit information about herself such as the sports she likes.

**Connect With Facebook**

David Soohoo
>Carl discovers Sportana through Alice and decides he wants to join too. On visiting sportana.com, he realizes he has to make an account. In the top right corner, he sees a "Connect with Facebook" button next to a "Create Account" button. He decides he wants to connect via Facebook and clicks on that button, where he is redirected to the Facebook authentication portal and prompted to enter his Facebook credentials. After entering his email and password into Facebook and pressing "Login", Carl is prompted with a box that says Sportana would like to access his Facebook profile's information. Carl accepts and is afterwards, redirected to his profile page on sportana.com where he sees his email, city, birthday, and profile picture already filled in with data from his Facebook profile.

**Login**

David Soohoo
>Bob is a user of Sportana and decides he wants to login. In the top right corner are two input boxes that are labeled respectively "Email" and "Password". Bob clicks on the fields and enters his credentials and clicks the "Login" button next to it. The page is then refreshed and redirects Bob to his game homepage (game feed page). Bob now sees his email and a "Logout" button displayed in the top right corner of the page and knows he is logged in, and can now play around with his profile, begin looking for games, post to walls, find friends, and enjoy the many other features of Sportana.

**Logout**

David Soohoo
>Bob, a logged-in user of Sportana, is done doing his activities on Sportana.com and decides he now wants to logout. In the top right corner of any page, there is a clickable "Logout" text button next to his account email. Bob clicks on it and the page deletes his session and redirects Bob to the main page of sportana.com where he is no longer logged into his account.

**Forgot Password**

Alec Hirsch
>Alice has now recovered from her biking accident and is able to play the games she loves. She wants to reactivate her account, but she forgot the password that she used to create it. Alice notices a link that says 'forgot password' and clicks on it. She is prompted to provide her email address that she created her account with. After entering her address and clicking submit, she receives an email from sportana with a new randomly generated password that Alice can use to log in to her account.

**Look for a Game**

Brandon Read

>A user navigates to their 'Games' page.  Because they have not yet queued up for a game or created their own, the page displays some text recommending they join the Game Queue or Create a Game.  Two large buttons will be prominently centered underneath the prompt text.  One for 'Look for Game' and another for 'Create Game'.  The user clicks 'Look for Game' and the page pops up a card that will used to collect information about their queueing preferences.  The user currently has no game history, so there are no 'recent preferences' available to pick and they must proceed manually.  For each piece of information Sportana asks for, only that information and a 'Next' button is present on the card.  This engages the user so that they emphasize what they really want so that Sportana curates only relevant games.  For optional information beyond the basics (eg. basics == sport, age range preference), another button will be available on the card with 'Look for Game!' that the user may click to finish the queueing process.  One of the most important parameters is the player's availability for the game.  The user will be shown a 'week view' range of days and they may select whole days for availability, or click and drag between the desired hours on a specific day.  They may then manually adjust the time-frame as desired.  They may continue entering more information such as 'location suggestions,' 'competitive level,' and more.  Once they click 'Look for Game,' Sportana will begin the search for players and some text will be displayed to let the player know that they will be notified when a game is found.

>Consider another case where the user has previously played some games.  When they decide to join a game,  They will be shown recent profiles to start the queueing with.  For example, if they recently queued for basketball with an age range of 18-24, then the user may select that profile and modify the optional parameters as they desire.  This speeds things up for the user while giving them control to make modifications as they see fit.

**Create a game**

Brandon Read
>The user navigates to the 'Games' page and clicks the 'Create Game' button.  A new card sequence appears as styled like the preferences scenario for queuing to join a game.  The user selects the sport they want to play and then selects other parameters such as location, tentative time frame, etc.  They may choose to invite friends to the game during the event creation. This will notify friends of the game which they may accept or decline.  Once they press the 'Create' button, Sportana will ask if they wish to make the game public.  If they choose yes, this allows Sportana to search for players to add to the game.  One conflict with this is that other players may be discovered before friends respond.  This means that their slots may fill up!  To combat this, Sportana allows you to reserve a desired number of slots for friends and then will work to discover players for the remaining slots.  Once the user completes the final steps, the game is created and the card sequence goes away, adding the new game to the list of games in the content view of the 'Games' page that they are currently in.

**Modify Queueing Preferences**

Brandon Read
>From the 'Games' page, the user may choose to adjust their queueing preferences.  If the user selects a queue that they are currently waiting in, they will be able to make changes to their time availability, age preferences, etc.  If they decide they no longer want to be looking for that particular game, they can choose to delete the queue by hovering over and and selecting the 'X' which will prompt the user, asking if they really want to drop from that queue.

**View a players profile**

Jeff Boutotte
>At this point in the application our fictitious user Alice has logged in and selected a user that she is friends with, we'll call him Bob.  This will bring Alice to Bob's profile page where she will see information about him including his first and last name, the city he has told Sportana he lives in, his age, sports he has told Sportana he is interested in, his profile picture, and his overall rating.  Alice will also be able to see a list of past games that Bob has attended under a tabbed view.  If she clicks the "upcoming events" tab, this view of events will switch to the events that Bob has elected to attend that will happen in the future (his upcoming events).  Also on this page, Alice will see an option labeled "my rating" which will be the rating that she specifically has given Bob (n/a if she hasn't rated him yet).  Alice will be able to adjust this rating and press a "rate" button to send the information to the backend.  Alice will notice Bob's average rating update to reflect this new rating when she presses this button.

>If Alice was not friends with Bob, she would be able to see all of this information except for Bob's upcoming events and age.  She would also see a request friend button, which would send Bob a friend request (see Request friend use case).

**Manage your own profile**

Jeff Boutotte

>At this point in the application our fictitious user Alice has created an account and wants to change some of her information.  She navigates to her profile and presses a settings button, which takes her to the manage profile page.  On the manage profile page Alice will see all of the information she has previously entered for her profile in editable fields including:
- name
- current city
- sports she is interested in
- profile picture
- birthday

>Alice will be able to edit any of these fields as she likes before pressing a "confirm changes" button at the bottom of the page.  On pressing this button, all of her information will be updated to the new values she has input into the fields on the page and she will be redirected back to her profile page - which will reflect the changes that Alice has just made.
Alice will also see a "change password" button on her manage profile page, which when clicked will bring up a prompt for her to enter in her old password, enter a new password, and confirm the new password with a "confirm" button at the bottom of the prompt.  Alice can change her password by typing in her old password correctly and a new password matching in both the "enter a new password" field and the "confirm new password" fields.  These will be sent to the backend and if the old password matches and the two new password are the same then Alice will receive confirmation that her password has been changed.  If any of those conditions are not met, then Alice will be shown an error prompt with the reason her password was unable to be changed.  

**View notifications**

Eli Sandler
>Alice is a user logged into Sportana on her home page. She wants to see if any of her friends have invited her to a game so she clicks on the "notifications" button at the top of her home page. This opens a drop down menu that displays a list of the notifications she has not yet responded to from most recent to oldest. Alice can click on any of the notifications to respond to them appropriate to the type of notification (respond to friend request, respond to game invitation, and respond to queue invitation use cases).  

**Send friend request**

Jeff Boutotte
>At this point in the application, Alice is on a users profile who she is not friends with - "Carl Casey".  Alice wants to request Carl as a friend and notices a "request friend" button on his profile page and clicks it.  The button shows a check mark to confirm that the request has been sent to Carl.

**Respond to friend request**

Jeff Boutotte
>Carl logs in to his account on Sportana and notices that he has some notifications.  He navigates to the notifications page and sees that Alice has sent him a friend request.  On this notification, he will see options for "accept", "deny", and "view profile".  On pressing "accept", Carl would be shown a confirmation that he and Alice are now friends and Alice would appear on his friends list when he next navigated to that page.  On pressing "deny" Carl would receive confirmation that the friend request was denied and he would not see Alice in his friends list when he next navigated to that page.  On pressing "view profile" Carl would be navigated to Alice's user page and shown the information there as described in the "view a players profile" use case as if he and Alice were not friends (they aren't at this point in the scenario) with the only difference being the button for "request friend" would instead read "respond to request".  If Carl were to click this button a pop up selection would appear above the button with options "accept" and "deny".  On clicking "accept", he and Alice would become friends and he would be shown confirmation of this.  On clicking "deny", he and Alice would not become friends and he would be shown confirmation of this.

**Invite friends to a game**

Eli Sandler
>Alice is a user logged into Sportana. She has navigated to a game page that was previously created from the "create game" use case, in order to play a game of Ultimate Frisbee. Alice clicks on the button "Invite Friends" which opens a list of friends, in the format described in the "view a list of friends use case" with a checkable box next to each user. Alice can then select one or more friends that she wants to invite to the game by checking the box in that users row. When she is done selecting the friends she wants to invite Alice will scroll down to the bottom of the prompt that is open and click on "Invite" or "Cancel". Invite will send notifications to those friends that she indicated and close the prompt bringing her back to the game page. Cancel will not send notifications to any of her friends and also bring her back to the game page.  

**Respond to game invitation**

Jeff Boutotte
>Carl logs in to his account on Sportana and notices that he has some notifications.  He navigates to the notifications page and sees that Alice has sent him an invitation to a game.  On this notification, he will see options for "accept", "deny", and "view game".  On pressing "accept", Carl would be shown a confirmation that he has joined that game.  On pressing "deny" Carl would receive confirmation that he has not joined the game.  On pressing "view game" Carl would be navigated to the Game's page and shown the information there as described in the "view a game" use case.  He will see a button on this page for "Join Game".  If Carl were to click this button a pop up selection would appear above the button with options "accept" and "deny".  On clicking "accept", he would join the game and be shown confirmation of this.  On clicking "deny", he would not join the game and would be shown confirmation of this.

**Respond to Queue Invitation**

Jeff Boutotte
>This use case will look identical to the "respond to game invitation" use case only it will be for games that have not yet reached the minimum number of players specified by the creator.  The user will have all of the same options as someone who is responding to a game invitation and will see the same information, but will be shown a message on the game page that the game has not yet reached the minimum players needed for the game.  Upon the game reaching the minimum players needed for the game players who responded to queue invitations will be given subsequent notifications that the game they have joined is actually going to be played.

**Deactivate account**

Alec Hirsch
>Alice is no longer interested in having an account on Sportana because she got injured from falling off of her bike.  Under her account settings she finds buttons to deactivate her account and delete her account. She is still interested in some day coming back to sportana after her recovery, so she choses to deactivate. If she instead chose to delete her account, she would not be able to reactivate it; all of her profile information would be lost forever. After she deactivates the account, none of her friends can find her or invite her to games. However, her account still exists so she can reactivate it by simply logging in.

**Reactivate account**

Alec Hirsch
>Now that Alice knows the password to her account, she logs in to her account and goes to her settings, where she finds a button to reactivate the account. After she click the button to reactivate, she finds that all of her profile information and account settings have not changed from the last time that she logged on. Now she is able to create or be invited to a game.

**View Game List**

Ryan Mullens
>Alice, being forgetful as she normally is, can't remember what games she signed up for 2 minutes ago. No fear! "View Games" is here! She clicks on the link in the main menu called "View Games" and bam, a list of every single game Alice has signed up for appears. This list of games will be separated into tabs for "Current" vs. "Past" games so whether Alice wants to find a game thats coming up or look at one from the past, she is all set.  In the row next to each game Alice will see a number-badge with the number of posts on the wall of that game that Alice has not yet seen.

**View Game**

Ryan Mullens
>Alice has just signed up for an awesome game of Ultimate Frisbee and is ready to play! The only problem is that she still can't remember anything and doesn't know where the game is. Luckily, she can just view the game. To do this, she can go to her "View Games" page and find the game. When she clicks on the link of the game, it will then bring her to the "View Game" page. From here she will be able to view what sport the game is, when it is, where it will be played, who is going to it, and players in the queue for the game who haven't yet responded. Now that Alice knows everything about the game, she is ready to start tossing some disc!

**Post To Game Wall**

Ryan Mullens
>Alice has once again signed up for an Ultimate Frisbee game. She's remembered when and where it is (huge accomplishment!) but she has a question... Should she bring her set of cones? Well once again, Alice doesn't have to worry! She can just go to her "View Games" page and find and click on the appropriate game. Once she gets to the "View Game" page, she can just go over to the "Wall", type her question into a text field, and click the "Post" button. This post will be displayed to all the other players participating in the game for them to write replies to. Alice is so happy this crisis was averted! Now she doesn't have to lug the whole ¼ pound extra weight a whole 100 yards from her dorm to the field. 

**View a list of friends**

Eli Sandler
>Alice is a user logged into Sportana.  She clicks the "friends" button on the navigation tab and is brought to her friends list page.  On the friends list Alice will see a list of all of the users she is friends with including a profile picture and the friends name for each player in the list.  Alice will be able to click on a friend and be brought to that friends home page (view a players profile use case).

**Remove a friend**

Eli Sandler
>Alice is a user logged into Sportana. Alice decides that she no longer wants to be friends with Bob, so she navigates to Bob's profile page and clicks on the button "Remove Friend". This will bring up a prompt asking Alice to confirm her decision to remove Bob as a friend. If she clicks on 'Remove' Bob will be removed from her list of friends and she will be redirected to her home page. If Alice clicks on 'Cancel' then the prompt will close, she will stay on Bob's homepage, and Bob will not be removed from her friends list.

**Search for a player**

Eli Sandler
>Sportana will include a search page.  Alice can navigate to the search page where there will be a search bar where Alice can enter a search term into and a "Search" button next to the search bar.  This search button will trigger a query including the text of the search bar to be sent to the backend. The backend will then return a list of potential matches to Alice which will be displayed on the search page underneath the search bar.  The rows of results displayed will include a profile picture of the user, the users first and last name, and a button titled "Request Friend".  If Alice clicks on any of these users then she will be directed to that players profile (view a players profile use case).  If Alice clicks on the "Request Friend" button then a friend request from Alice will be sent to that user (request friend use case).  Alice can also enter another search into the search bar at the top of this page and click "Search" to repeat this use case for a different query as many times as she likes.


Non-goals
---------

>Sportana's goals are listed above.  Features that we currently do not plan to support and actions that Sportana will not do are as follows:
Sportana will not support chat directly between users. Users who wish to communicate will be able to do so through posts on the game wall for particular games. 

>To find a game the user will have to tell Sportana that they are looking for a game - Sportana will not just suggest games to users based on past history, number of friends in a game, or any other parameters.

>Sportana will not verify that any of the information a user has entered is correct, except for email.

>Sportana will not separate players in a game into teams.  The players are intended to do that themselves upon arrival at a game.

>Sportana will not send email to the user of the application except when the user requests a password reset or to verify the users email upon account creation.

>Sportana will not remind users of an upcoming game they have signed up for - it will be the users responsibility to keep track of games that they have signed up to play in.

Flow Diagram
------------
![flowDiagram](https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/flowDiagram.png)

Screen By Screen
----------------

###View Profile
![screen1](https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/image00.png)
###View Friends List
![screen2](https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/image01.png)
###Landing Page
![screen3](https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/image02.png)
###View Friend
![screen4](https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/image03.png)
###Find Game
![screen5](https://raw.githubusercontent.com/umass-cs-326/team-kiwi-mango/master/docs/images/image04.png)


Revision History
----------------
????????????????


Open Issues
----------------
????????????????
