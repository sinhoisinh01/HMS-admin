if("undefined" !== typeof app){
	app.constant("CONFIG",{
		"apiEndPoint" : "http://127.0.0.1:8000/api"
	});
	app.run(function($rootScope, $transitions) {
		$transitions.onStart({ to: 'main' }, function(trans) {
			// var auth = trans.injector().get('AuthService');
			console.log($rootScope);
			// if (!auth.isAuthenticated()) {
			// 	return trans.router.stateService.target('login');
			// }
		});
	})
}