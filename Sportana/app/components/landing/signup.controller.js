app.controller("Signup", function($http)
{
	$scope.credentials = {
		email: '',
		password: '',
		fname: '',
		lname: '',
		city: '',
		dob: '1992-09-20'
	};

	$scope.signup = function (credentials) {

		$http
			.put('/api/users/', credentials)
			.then(function (res) {
				if(res.data.message == "success") {
					AuthenticationService.login(credentials).then(function (user) {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				}, function () {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
			});
	};

});
