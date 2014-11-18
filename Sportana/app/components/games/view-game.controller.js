app.controller("ViewGameController", function($http, CurrentUser)
{
	var game = {gameid:2, creator: 'myoda', gamedate:'Sunday, November 16',
	gamestart: '3:00pm', gameend: '5:00pm', location: 'Amherst MA', sport: 'Baseball',
	sportimg: '/assets/img/sports/baseball.png', numparticipants: 10, minplayers: 5,
	maxplayers: 15, reservedspots: 3, minage: 14, maxage:25, ispublic:false};

	var players = [{name: 'bwayne', firstname:'Bruce', lastname:'Wayne', img: 'http://cdn.wegotthiscovered.com/wp-content/uploads/THE-DARK-KNIGHT.jpeg'},
	{name: 'jbond', img: 'http://cbsnews1.cbsistatic.com/hub/i/r/2012/10/13/09d9d6e1-a645-11e2-a3f0-029118418759/thumbnail/620x350/2edfb0193dd29f2393297d20949a5109/JamesBondWide.jpg'},
	{name: 'ckent', img: 'http://www.scifinow.co.uk/wp-content/uploads/2014/07/Batman-V-Superman2.jpg'}];

	var friends = [{id: 'jbond', firstname:'James', lastname:'Bond'},
	{id: 'myoda', firstname:'Master', lastname:'Yoda'}];

	var invited = [{name: 'myoda', img: 'http://static.comicvine.com/uploads/scale_medium/0/2532/156856-39717-yoda.jpg'}];


	this.getGame = function(){
		return game;
	};

	this.getFriends = function(){
		return friends;
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
			if(this.getUser() === type[i].name){
				return true;
			}
		}
		return false;
	};

	var joined = this.contains(this.getPlayers());

	this.isJoined = function(){
		return joined;
	};

	var invited = this.contains(this.getInvited());

	this.isInvited = function(){
		return invited;
	};


	this.leaveGame = function(){

	};

	this.joinGame = function(){

	};

	this.declineGame = function(){

	};

	this.inviteFriends = function(){

	};
});

app.directive('tooltip', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			$(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
		}
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