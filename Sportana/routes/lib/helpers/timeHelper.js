var pad = function(unpadded) {
	if (unpadded < 10) {
		return "0" + unpadded;
	} else {
		return unpadded;
	}
}
exports.makeAgeFromBirthday = function(birthday) {
	var diffMilliseconds = new Date() - new Date(birthday);
	var diffDays = diffMilliseconds / 1000 / (60 * 60 * 24);
	var age = Math.floor(diffDays / 365.25); // .25 to account for leap years
	return age;
};

exports.getCurrentTime = function() {
	var fullDate = new Date();
	var currentTime = fullDate.getHours() + ":" + fullDate.getMinutes() + ":" + fullDate.getSeconds();
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
							 fullDate.getHours() + ":" + fullDate.getMinutes() + ":" + fullDate.getSeconds();
	return currentDateAndTime;
};