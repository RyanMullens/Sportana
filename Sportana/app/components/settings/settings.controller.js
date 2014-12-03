app.controller("SettingsController", function($scope,$http)
{
	$scope.password = "";
	$scope.passwordVerify = "";

	$scope.changePass = false;
	$scope.errorMessage = "";

	$scope.updatePassword = function()
	{
		console.log("Update Password!! " + $scope.password + " : " + $scope.passwordVerify);

		$http.post('/api/users/editPassword',{password:$scope.password })
		.success(function(data, status, headers, config)
		{
			if(data.message == "success")
			{
				$scope.changePass = true;
				$scope.password = "";
				$scope.passwordVerify = "";
				$scope.changePass = true;
				$scope.errorMessage = "";
			}
			else
			{
				$scope.changePass = false;
				$scope.errorMessage = data.message;
			}
		});
	}

	$scope.arePasswordsSame = function()
	{
		return $scope.passwordVerify != "" && $scope.passwordVerify === $scope.password;
	}

	$scope.wasPassChanged = function()
	{
		return $scope.changePass;
	}

	$scope.wasError = function()
	{
		return $scope.errorMessage != "";
	}
});
