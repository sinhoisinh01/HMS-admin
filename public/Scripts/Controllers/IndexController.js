if("undefined" !== typeof app){
	app.controller("IndexController", function($scope, API, $cookies, $state) {
		if(!$cookies.get("username") || !$cookies.get("password")){
			location.href = "./index.html#!/login";
		}
	});
}