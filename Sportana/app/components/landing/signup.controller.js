app.controller('Signup', function ($http, AUTH_EVENTS, AuthenticationService, $scope) {

	$scope.credentials = {
		email: '',
		password: '',
		firstname: '',
		lastname: '',
		city: '',
		dateOfBirth: '1992-09-20'
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
				} else {
					console.log(res.data.message);
					// Clear form and display errors
				}
			});
	};
});
