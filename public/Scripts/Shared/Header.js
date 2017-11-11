if("undefined" !== typeof app){
	app.controller("HeaderController", function($scope, $cookies) {
		$scope.username = $cookies.get("username") || "";
		$scope.logout = function(){
			$cookies.remove("username");
			$cookies.remove("password");
			location.href = "/";
		}
	});
}