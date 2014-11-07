// Created by: @bread on 10/25
app.controller("QueueSportController", function($location, queueService, $state)
{
	var sports = [
		{icon: "/images/icon_73766.png", name: "Basketball", 	description: "A game about hoops and nets."},
		{icon: "/images/icon_73766.png", name: "Baseball", 		description: "A game about bases."},
		{icon: "/images/icon_73766.png", name: "Football", 		description: "A game about hands..."},
		{icon: "/images/icon_73766.png", name: "Soccer", 			description: "A game about feet..."},
		{icon: "/images/icon_73766.png", name: "Tennis", 			description: "A game about two-us."},
		{icon: "/images/icon_73766.png", name: "Billiards", 	description: "A game about sticks and geometry."},
		{icon: "/images/icon_73766.png", name: "Swimming", 		description: "Not a game.  Water thingy."},
		{icon: "/images/icon_73766.png", name: "Hiking", 			description: "Moving up mountains."},
		{icon: "/images/icon_73766.png", name: "Biking", 			description: "Moving up roads."},
	];

	var selectedSports = [];

	// When the page is loaded
	this.init = function() {
		selectedSports = queueService.getSports();
	}

	// When moving to another section in the preferences
	this.finish = function() {
		queueService.setSports(selectedSports);
		$state.go('queueLocation');
		this.selectedSports = [];
    }

    // When a Sport is selected 
	this.toggle = function(sport) {
		
		var index = selectedSports.indexOf(sport);
		if(index === -1) {
			selectedSports.push(sport);
		} else {
			selectedSports.splice(index, 1);
		}
		return;
	}

	this.getSelectedSports = function() {
		return selectedSports;
	}

	this.hasSelectedSports = function() {
		return selectedSports.length > 0;
	}

	this.getSports = function() {
		return sports;
	}

	this.isSelected = function(sport) {
		return (selectedSports.indexOf(sport) != -1) ? true : false;
	}

	this.addSport = function(sport) {
		if (selectedSports.indexOf(sport) != -1) return;
		selectedSports.push(sport);
	}

	this.removeSport = function(sport) {
		var index = selectedSports.indexOf(sport);
		if(index === -1) return;
		selectedSports.splice(index, 1);
	}

	this.init();
});