app.controller("QueueLocationController", function(queueService)
{
	var sportsArray = [];

	this.sports = function() {
		this.sportsArray = queueService.getSports();
		return this.sportsArray;
    }

    this.getSports = function() {
      return preferences.sports;
  }
});