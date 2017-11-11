if("undefined" !== typeof app){
	app.controller("LoginController", function($scope, API, $cookies, $state) {
		if($cookies.get("username") && $cookies.get("password")){
			location.href = "/index.html#!/";
		}
		$scope.login = function(){
			if(!$scope.username){
				$scope.error = "Không được bỏ trống tên đăng nhập!";
				return false;
			}
			if(!$scope.password){
				$scope.error = "Không được bỏ trống mật khẩu!";
				return false;
			}
			if($scope.username != "admin"){
				$scope.error = "Tên đăng nhập không đúng";
				return false;
			}
			if($scope.password != "123"){
				$scope.error = "Mật khẩu không đúng";
				return false;
			}
			$cookies.put("username", $scope.username);
			$cookies.put("password", $scope.password);
			location.href = "/index.html#!/";
		}
	});
}