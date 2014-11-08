
exports.makeAgeFromBirthday = function(birthday) {
	var diffMilliseconds = new Date() - new Date(birthday);
	var diffDays = diffMilliseconds / 1000 / (60 * 60 * 24);
	var age = Math.floor(diffDays / 365.25); // .25 to account for leap years
	return age;
};