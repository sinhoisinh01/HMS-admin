if("undefined" !== typeof angular){
	var app = angular.module('HMS-admin', ['ui.router', 'ngCookies'])
									 .config(function ($stateProvider, $urlRouterProvider) {
									 		$urlRouterProvider.otherwise('/404');
									 		$stateProvider
									 			.state('home', {
					                url: '/',
					                views: {
					                    'content': {
					                        templateUrl: 'views/index.html',
					                        controller: 'IndexController'
					                    }
					                }
					            	})
					            	.state('404', {
					                url: '/404',
					                views: {
					                    'content': {
					                        templateUrl: 'views/404.html'
					                    }
					                }
					            	})
									 });	
}