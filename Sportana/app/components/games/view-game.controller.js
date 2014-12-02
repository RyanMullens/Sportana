app.controller("ViewGameController", function($http, $stateParams, $scope, CurrentUser)
{
	/*var game = {gameid:2, creator: 'myoda', gamedate:'Sunday, November 16',
	gamestart: '3:00pm', gameend: '5:00pm', location: 'Amherst MA', sport: 'Baseball',
	sportimg: '/assets/img/sports/baseball.png', numparticipants: 10, minplayers: 5,
	maxplayers: 15, reservedspots: 3, minage: 14, maxage:25, ispublic:false};
	*/
	$scope.game = {players: [], invited: [], friends: []};
	$scope.messages = [];
	$scope.gameLoaded = false;
	$scope.messagesLoaded = true;
	$scope.invites = [];
	$scope.user = (function(){
		var userInfo = CurrentUser.getUser();
		return {
			login: userInfo.id,
			firstname: userInfo.firstName,
			lastname: userInfo.lastName,
			profilepicture: userInfo.profilePicture
		};
	}());
	console.log($scope.user);


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
		return this;
	};

	this.getGame = function(){
		return $scope.game;
	};

	this.getFriends = function(){
		return $scope.game.friends;
	};

	this.getPlayers = function(){
		return $scope.game.players;
	};

	this.getInvites = function(){
		return $scope.invites;
	};

	this.getInvited = function(){
		return $scope.game.invited;
	};

	this.getUser = function(){
		return CurrentUser.getUser().id;
	};

	this.contains = function(type, login){
		for(var i = 0; i < type.length; i++){
			if(login === type[i].login){
				return type[i];
			}
		}
		return false;
	};

	this.isJoined = function(){
		return !!this.contains(this.getPlayers(), this.getUser());
	};


	this.isInvited = function(id){
		return !!this.contains(this.getInvited(), id);
	};

	this.isPublic = function(){
		return this.getGame().isPublic;
	};

	this.leaveGame = function(){
		var that = this;
		$http.post('/api/games/leave', {creator: that.getGame().creator, gameID: that.getGame().gameID})
		.success(function(data, status, headers, config){
			that.getPlayers().splice(that.getPlayers().indexOf(that.contains(that.getPlayers(), that.getUser())),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with leaving the game');
		});
	};

	this.joinGame = function(){
		var that = this;
		$http.post('/api/games/join', {creator: that.getGame().creator, gameID: that.getGame().gameID})
		.success(function(data, status, headers, config){
			that.getPlayers().push($scope.user);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with joining the game');
		});
	};

	this.acceptGame = function(){
		var that = this;
		var player = that.contains(that.getInvited(), that.getUser());
		$http.post('/api/requests/' + player.nid, {confirmed: 'true'})
		.success(function(data, status, headers, config){
			that.getPlayers().push(player);
			that.getInvited().splice(that.getInvited().indexOf(player),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with accepting the game');
		});
	};

	this.declineGame = function(){
		var that = this;
		var player = that.contains(that.getInvited(), that.getUser());
		$http.post('/api/requests/' + player.nid, {confirmed: 'false'})
		.success(function(data, status, headers, config){
			that.getInvited().splice(that.getInvited().indexOf(player),1);
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with leaving the game');
		});
	};

	this.isToggled = function(friend){
		var index = this.getInvites().indexOf(friend);
		if(index >= 0) return true;
		else return false;
	};

	this.toggleInvite = function(friend){
		var index = this.getInvites().indexOf(friend);
		if(index === -1){
			this.getInvites().push(friend);
		}
		else{
			this.getInvites().splice(index, 1);
		}
	};

	this.inviteFriends = function(){
		var that = this;

		console.log('invites');
		console.log(this.getInvites());
		console.log('friend');
		console.log(this.getFriends());
		for(var i = 0; i < this.getInvites().length; i++){
			var friend = that.getInvites()[i];
			$http.put('/api/requests/game', {userTo: friend.login, gameCreator: that.getGame().creator, gameID: that.getGame().gameID})
			.success(function(data, status, headers, config){
			})
			.error(function(data, status, headers, config) {
				console.log('There was an error with posting the message');
			});
			that.getInvited().push(friend);
			that.getFriends().splice(that.getFriends().indexOf(that.contains(that.getFriends(), friend.login)), 1);
		}
		this.getInvites().length = 0;
		console.log('invites');
		console.log(this.getInvites());
		console.log('friend');
		console.log(this.getFriends());
	};

	this.getMessages = function(){
		return $scope.messages;
	};

	this.postMessage = function(post){
		var that = this;


		$http.post('/api/games/messages', {creator: that.getGame().creator, gameID: that.getGame().gameID, message: post})
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