# Project 4 Feedback

Your technical spec is incredibly thorough, as I expected! Well done!

Your insistence on being mobile is a great. Having your app be mobile-first is a necessity since you are facilitating real-world events where plans could change suddenly. Plus, given that mobile users are much more likely to share their geolocation with web apps than desktop/laptop users, I can imagine a platform where users traveling could spontaneously interact with new people in a much more friendly, casual, less creepy way? Airbnb brought humanity into travel, I think Sportana could potentially introduce humanity back into meeting new people. 

Addressing the challenges you mentioned:

You mentioned some interesting challenges you may face when implementing search, especially when searching for other players. I wonder if a social graph, like "I played soccer with so-and-so and so-and-so played (and enjoyed) baseball with some-other-player so some-other-player should be high on my results", could help players find both compatible people competitively, socially. I also wonder how users will behave using the player search: will a user want to find a specific person, where pages of users would be helpful, or would users want to find a few people that they could be very compatible with? I would monitor your user's activity in search and see.

On a similar note: you mentioned difficulty in displaying search results of available games around a particular user. Your current query, as I understand it, is location-based in "hubs", like "Boston games" or "Houston games." You didn't mention how you may incorporate Facebook/Google API integration, though I could imagine a query where available games are shown according to: friends of the user are attending this game, the game is of the user's interest, the game has participants that the user would be compatible with, and the game is in this user's area. This would definitely be a tricky query, especially determining the weight of each of these components. (like, is it more important that the user likes the sport, or if their friends are playing it would they be open to trying some new sport?) I don't think A/B testing is the end-all, but it could give you some interesting insight into these implicit weights. 

As I mentioned in my last feedback, you haven't been taking team notes since the beginning of November. However, your Trello activity is extremely high and admirable. 

Thumbs up, as usual, and I can't wait to see the final version of Sportana!

# Project 3 Feedback

I find your non-goal of not reminding the players of an upcoming game intriquing. I would speculate on whether or not users would remember the games they have joined, but perhaps you could do some A/B testing on this matter. (Participants would be split, half would be notified, half would not. I wonder how this would effect and not effect the rate of remembering and participating)

I really hope that the hilarious captions of the games on "Find Game 2" are final. Soccer, "the one that is actually played with feet". Genius. On a similar note, I find your icons quite well done and generally UI extremely well done. You are projecting this new, monochromatic, modern design onto centuries-old games tied to traditional design. I love this, I find it visually and conceptually intriguing.

Your scenarios are so detailed, my goodness! Your Trello activity is always spot-on as well.
However, you are missing some weeks of meeting notes.

(I thought I'd also add that, in the future, if you're looking for a SQL-like graph database, check out OrientDB. It supports relations and a document structure! It's mighty cool! I promise!)

In general, you did an incredible job on Project 3!  You get a big, wall-smashing, thumbs up!

<img src="http://fileinabox.com/files/2008/11/thumbs-up.jpg">

# Project 2 Feedback

I love the idea of a qualitative intelligent queuing system, chat, and the idea of a general "feedless" interface! For your chat feature, you should check out the Socket.io library, especially it's sample 6-line Hello World chat app! (http://socket.io) 

Hear me out, and I admit it is a *little* out there, but I think a graph database would be a really interesting implementation of your queue concept! Referring to your discussion on Trello regarding data with relation, if you use Neo4j, you can create players as nodes with properties (like timeliness, friendliness, competitiveness, and location) and connect nodes based on relationships such as "friends" etc. (Imagine creating a game by creating a relationship between two players like: `CREATE UNIQUE (player1: Player { competitiveness: "high", location: "Boston" })-[r:VERSUS]->(player2: Player { competitiveness: "high", location: "Boston" })`) 

Strange ideas aside, your budget breakdown is superb. In fact, I can't tell if you plan to buy that premium domain and actually launch, which I think you should! (*maybe* not spend $4,000, but definitely go live!)

Excellent work! You've been fully funded. **thumbs up**
 

# Project 1 Feedback

Whoa, I really dig this idea! The concept of an all-inclusive physical activity social network doesn't seem to be implemented. (Here's a Geocities-y, dead, and solely running-based social network: http://www.runnerslounge.com/ ) 

I think most sports-related social networks (Fancred, Sportlobster) target the sports fan and athletic social networks (Athlinks, sidenote: do y'all see the Comic Sans on Athlinks' page or is it just me?) target the professional athlete looking to break out. There isn't a site that targets the users between these extremes, users that want to meet new people through performing some activity.

Your Trello board is quite active, which is awesome! Facebook API integration, historically, has taken a fair amount of time to implement so if you decide to use it, make sure to start early! (but it's totally worth it) 

Awesome job on Project 1, can't wait to see your future progress!

P.S. I love your logo!
