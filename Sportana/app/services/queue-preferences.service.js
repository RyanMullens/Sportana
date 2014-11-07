// Created by: @bread on 10/25
// TODO : Use nested services (eg. Scheduling should be a separate service)
app.service('queueService', function() {

  // The object the stores all current queue preferences
  // Send/Restore from DB when leaving/entering preferences page
  var preferences = {
    sports: []
  };

  // SPORTS: Sets the current sport preferences for the queue
  this.setSports = function(sports) {
      preferences.sports = sports;
  }
  this.getSports = function() {
      return preferences.sports;
  }

  // LOCATION: Sets the current location preferences for the queue
  this.setLocation = function(location) {
  	preferences.location = locaiton;
  }
  this.getLocation = function() {
  	return preferences.location;
  }

  // TODO : Handle low-level checking within controller.  Pass/Get full objects from this service

  // PLAYER
  var setPlayer = function(minAge, maxAge){
  		var DEFAULT_MIN = 18;
  		var DEFAULT_MAX = 100;
      preferences.minAge = (minAge) ? minAge : DEFAULT_MIN;
      preferences.maxAge = (maxAge) ? maxAge : DEFAULT_MAX;
  }
  var getAgeRange = function(){
  		return {minAge : preferences.minAge, maxAge : preferences.maxAge};
  }
  var setNumberOfPlayers = function(min, max){

  		var DEFAULT_MIN = 2;
  		var DEFAULT_MAX = 30;

  		preferences.minNumberOfPlayers = (min) ? min : DEFAULT_MIN;
      preferences.maxNumberOfPlayers = (max) ? max : DEFAULT_MAX;
  }
  var getNumberOfPlayers = function(){
  		return {min : preferences.minNumberOfPlayers, max : preferences.maxNumberOfPlayers};
  }

  // SCHEDULE
  var addTime = function(start, end) {
  	preferences.times[start + end] = {start: start, end : end};
  }
  var removeTime = function(start, end) {
  	preferences.times.push({start: start, end : end});
  }

  // OTHER
  var setIntensity = function(intensity){
  		var DEFAULT = "CASUAL"; 
      preferences.intensity = (intensity) ? intensity : DEFAULT;
  }
  var getIntensity = function(){
  		return preferences.intensity;
  }

  // TODO: AVAILABILITY + INVITES

});