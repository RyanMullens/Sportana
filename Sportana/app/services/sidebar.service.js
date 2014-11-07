app.service('sidebarService', function() 
{
	var isShown = false;

	this.setMenuShown = function(shown) {
    	isShown = shown;
  	}

  	this.toggleMenuShown = function() {
    	isShown = !isShown;
    	console.log("Set to " + isShown);
  	}

  	this.getMenuShown = function() 
  	{
    	return isShown;
  	}

});