// Created by: @bread on 10/25
app.controller("QueuePreferencesController", function($location, queueService, $state)
{
	var selectedSports = [];

	// When the page is loaded
	this.init = function() {
		selectedSports = queueService.getSports();
	}

	this.getSelectedSports = function() {
		return selectedSports;
	}

	this.init();
});