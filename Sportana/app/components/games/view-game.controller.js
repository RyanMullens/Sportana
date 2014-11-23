app.controller("ViewGameController", function($http, $stateParams, $scope, CurrentUser)
{
	/*var game = {gameid:2, creator: 'myoda', gamedate:'Sunday, November 16',
	gamestart: '3:00pm', gameend: '5:00pm', location: 'Amherst MA', sport: 'Baseball',
	sportimg: '/assets/img/sports/baseball.png', numparticipants: 10, minplayers: 5,
	maxplayers: 15, reservedspots: 3, minage: 14, maxage:25, ispublic:false};
	*/
	$scope.game = {};
	$scope.messages;
	$scope.gameLoaded = false;
	$scope.messagesLoaded = true;

	var players = [{login: 'bwayne', firstname:'Bruce', lastname:'Wayne', img: 'http://cdn.wegotthiscovered.com/wp-content/uploads/THE-DARK-KNIGHT.jpeg'},
	{login: 'jbond', firstname: 'James', lastname: 'Bond', img: 'http://cbsnews1.cbsistatic.com/hub/i/r/2012/10/13/09d9d6e1-a645-11e2-a3f0-029118418759/thumbnail/620x350/2edfb0193dd29f2393297d20949a5109/JamesBondWide.jpg'},
	{login: 'ckent', firstname: 'Clark', lastname: 'Kent', img: 'http://www.scifinow.co.uk/wp-content/uploads/2014/07/Batman-V-Superman2.jpg'}
	];

	$scope.friends = [{login: 'jbond', firstname:'James', lastname:'Bond', img: 'http://cbsnews1.cbsistatic.com/hub/i/r/2012/10/13/09d9d6e1-a645-11e2-a3f0-029118418759/thumbnail/620x350/2edfb0193dd29f2393297d20949a5109/JamesBondWide.jpg'},
	{login: 'ckent', firstname: 'Clark', lastname: 'Kent', img: 'http://www.scifinow.co.uk/wp-content/uploads/2014/07/Batman-V-Superman2.jpg'}
	];

	var invited = [{login: 'myoda', firstname: 'Master', lastname: 'Yoda', img: 'http://static.comicvine.com/uploads/scale_medium/0/2532/156856-39717-yoda.jpg'}];




	$http.get('/api/games/' + $stateParams.creatorId + '/' + $stateParams.gameId)
	.success(function(data, status, headers, config){
		data.sportImg = '/assets/img/sports/' + data.sport.toLowerCase() + '.png';
		console.log(data);
		$scope.game = data;
		$scope.gameLoaded = true;
	})
	.error(function(data, status, headers, config) {
		console.log('There was an error retrieving game information');
	});

	$http.get('/api/games/messages?creator=' + $stateParams.creatorId + '&gameID=' + $stateParams.gameId)
	.success(function(data, status, headers, config){
		console.log(data);
		$scope.messages = data.posts;
		$scope.messagesLoaded = true;
	})
	.error(function(data, status, headers, config) {
		console.log('There was an error retrieving messages');
	});


	this.isGameLoaded = function(){
		return $scope.gameLoaded;
	};

	this.isMessagesLoaded = function(){
		return $scope.messagesLoaded;
	};

	this.getThis = function(){
		var that = this;
		return that;
	};

	this.getGame = function(){
		return $scope.game;
	};

	this.getFriends = function(){
		return $scope.friends;
	};

	this.getPlayers = function(){
		return players;
	};

	this.getInvited = function(){
		return invited;
	};

	this.getUser = function(){
		return CurrentUser.getUser().id;
	};

	this.contains = function(type){
		for(i = 0; i < type.length; i++){
			if(this.getUser() === type[i].login){
				return type[i];
			}
		}
		return false;
	};

	this.isJoined = function(){
		return !!this.contains(this.getPlayers());
	};


	this.isInvited = function(){
		return !!this.contains(this.getInvited());
	};
	this.isPublic = function(){
		return this.getGame().ispublic;
	};

	this.leaveGame = function(){
		this.getPlayers().splice(this.getPlayers().indexOf(this.contains(this.getPlayers())),1);
	};

	this.joinGame = function(){
		that = this;
		$http.post('/api/games/join', {creator: that.getGame().creator, gameID: that.getGame().gameid})
		.success(function(data, status, headers, config){
			if(that.isInvited()){
				players.push(that.contains(that.getInvited()));
				that.getInvited().splice(that.getInvited().indexOf(that.contains(that.getInvited())),1);
			}
			else{
				players.push({login: that.getUser(), firstname: 'John', lastname: 'Doe', img: '/assets/img/profile.png'});
			}
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with joining the game');
		});
	};

	this.declineGame = function(){
		this.getInvited().splice(this.getInvited().indexOf(this.contains(this.getInvited())),1);
	};
/*
	this.requestJoin = function(){

	};
	*/
	this.inviteFriends = function(){
		console.log("does this work?");
	};

	this.getMessages = function(){
		return $scope.messages;
	};

	this.postMessage = function(post){
		that = this;

		
		$http.post('/api/games/messages', {creator: that.getGame().creator, gameID: that.getGame().gameid, message: post})
		.success(function(data, status, headers, config){
			$scope.messages.push({from: that.getUser(), message: post, time: Date.now()});
			$scope.message = '';
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with posting the message');
		});
	};
});


/*
 creator         | character varying(50)  | not null
 gameid          | integer                | not null
 gamedate        | date                   | 
 gamestart       | time without time zone | 
 gameend         | time without time zone | 
 sport           | character varying(50)  | 
 location        | character varying(100) | 
 numparticipants | integer                | 
 minplayers      | integer                | 
 maxplayers      | integer                | 
 reservedspots   | integer                | 
 minage          | integer                | 
 maxage          | integer                | 
 ispublic        | boolean              
 */