var pad = function(unpadded) {
	if (unpadded < 10) {
		return "0" + unpadded;
	} else {
		return unpadded;
	}
}

exports.makeDateFromDateAndTime = function(dateAndTime) {
	if (!dateAndTime) {
		return "";
	}
	var date = new Date(dateAndTime);
	return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
};

exports.makeTimeFromDateAndTime = function(dateAndTime) {
	if (!dateAndTime) {
		return "";
	}
	var date = new Date(dateAndTime);
	return pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());
};

exports.makeAgeFromBirthday = function(birthday) {
	var diffMilliseconds = new Date() - new Date(birthday);
	var diffDays = diffMilliseconds / 1000 / (60 * 60 * 24);
	var age = Math.floor(diffDays / 365.25); // .25 to account for leap years
	return age;
};

exports.getCurrentTime = function() {
	var fullDate = new Date();
	var currentTime = pad(fullDate.getHours()) + ":" + pad(fullDate.getMinutes()) + ":" + pad(fullDate.getSeconds());
	return currentTime;
};

exports.getCurrentDate = function () {
	var fullDate = new Date();
	var currentDate = fullDate.getFullYear() + "-" + pad(fullDate.getMonth() + 1) + "-" + pad(fullDate.getDate());
	return currentDate;
};

exports.getCurrentDateAndTime = function() {
	var fullDate = new Date();
	var currentDateAndTime = fullDate.getFullYear() + "-" + pad(fullDate.getMonth() + 1) + "-" + pad(fullDate.getDate()) + " " +
							 pad(fullDate.getHours()) + ":" + pad(fullDate.getMinutes()) + ":" + pad(fullDate.getSeconds());
	return currentDateAndTime;
};