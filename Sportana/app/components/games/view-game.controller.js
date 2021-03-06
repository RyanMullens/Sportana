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
	$scope.invites = [];
	$scope.user = (function(){
		var userInfo = CurrentUser.getUser();
		return {
			login: userInfo.id,
			firstname: userInfo.firstName,
			lastname: userInfo.lastName,
			profilepicture: userInfo.profilePicture,
			status: -1
		};
	}());

	$scope.contains = function(type, login){
		for(var i = 0; i < type.length; i++){
			if(login === type[i].login){
				return type[i];
			}
		}
		return false;
	};

	$http.get('/api/games/' + $stateParams.creatorId + '/' + $stateParams.gameId)
	.success(function(data, status, headers, config){
		if(data.success){
			data.sportImg = '/assets/img/sports/' + data.sport.toLowerCase() + '.png';
			$scope.game = data;
			var tempUser = $scope.contains($scope.game.players, $scope.user.login);
			if(tempUser){
				$scope.user = tempUser;
			}
			$scope.gameLoaded = true;
			console.log($scope.game);
		}
		else console.log("This game does not exist");
	})
	.error(function(data, status, headers, config) {
		console.log('There was an error retrieving game information');
	});

	$http.get('/api/games/messages?creator=' + $stateParams.creatorId + '&gameID=' + $stateParams.gameId)
	.success(function(data, status, headers, config){
		console.log(data);
		if(data.success){
			$scope.messages = data.posts;
		}
		else{
			console.log("there are not messages");
		}
	})
	.error(function(data, status, headers, config) {
		console.log('There was an error retrieving messages');
	});

	this.isGameLoaded = function(){
		return $scope.gameLoaded;
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

	$scope.getUser = function(){
		return $scope.user;
	};

	$scope.isJoined = function(player){
		if(player){
			return player.status === 0 || player.status === 1;
		}
		else return false;
	};

	$scope.isInvited = function(player){
		if(player){
			return player.status === 2;
		}
		else return false;
	};

	$scope.hasInvited = function(){
		for(player in $scope.game.players){
			if($scope.game.players[player].status === 2) return true;
		}
		return false;
	};
	
	this.isPublic = function(){
		return this.getGame().isPublic;
	};

	this.leaveGame = function(){
		var that = this;
		$http.post('/api/games/leave', {creator: that.getGame().creator, gameID: that.getGame().gameID})
		.success(function(data, status, headers, config){
			that.getPlayers().splice(that.getPlayers().indexOf($scope.getUser()),1);
			$scope.getUser().status = -1;
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with leaving the game');
		});
	};

	this.joinGame = function(){
		var that = this;
		$http.post('/api/games/join', {creator: that.getGame().creator, gameID: that.getGame().gameID})
		.success(function(data, status, headers, config){
			$scope.getUser().status = 0;
			that.getPlayers().push($scope.getUser());
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with joining the game');
		});
	};

	this.acceptGame = function(){
		var that = this;
		console.log($scope.getUser());
		$http.post('/api/requests/' + that.getGame().requestID, {confirmed: 'true'})
		.success(function(data, status, headers, config){
			$scope.getUser().status = 0;
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with accepting the game');
		});
	};

	this.declineGame = function(){
		var that = this;
		$http.post('/api/requests/' + that.getGame().requestID, {confirmed: 'false'})
		.success(function(data, status, headers, config){
			that.getPlayers().splice(that.getPlayers().indexOf($scope.getUser()),1);
			$scope.getUser().status = -1;
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
		for(var i = 0; i < this.getInvites().length; i++){
			var friend = that.getInvites()[i];
			$http.put('/api/requests/game', {userTo: friend.login, gameCreator: that.getGame().creator, gameID: that.getGame().gameID})
			.success(function(data, status, headers, config){
				console.log("success!");
			})
			.error(function(data, status, headers, config) {
				console.log('There was an error with inviting the user');
			});
			that.getFriends().splice(that.getFriends().indexOf(friend), 1);
			friend.status = 2;
			that.getPlayers().push(friend);
		}
		this.getInvites().length = 0;
	};

	this.getMessages = function(){
		return $scope.messages;
	};

	this.postMessage = function(post){
		var that = this;


		$http.post('/api/games/messages', {creator: that.getGame().creator, gameID: that.getGame().gameID, message: post})
		.success(function(data, status, headers, config){
			that.getMessages().push({from: $scope.getUser().login, message: post, time: Date.now()});
			$scope.message = '';
		})
		.error(function(data, status, headers, config) {
			console.log('There was an error with posting the message');
		});
	};
});