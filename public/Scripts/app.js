if("undefined" !== typeof angular){
	var app = angular.module('HMS-admin', ['ui.router', 'ngCookies'])
		 			 .config(function ($stateProvider, $urlRouterProvider) {
		 			 	$urlRouterProvider.when('', '/');
				 		$urlRouterProvider.otherwise('/404');
				 		$stateProvider
				 			.state('main', {
                url: '/',
                views: {
                  'main-content': {
                    templateUrl: 'views/index.html',
                    controller: 'IndexController'
                  }
                }
            	})
            	.state('404', {
                url: '/404',
                views: {
                  'main-content': {
                     templateUrl: 'views/404.html'
                  }
                }
            	})
            	.state('supplier', {
            		url: "supplier",
            		parent : 'main',
            		views : {
            			'content' : {
            				templateUrl : 'views/Supplier/suppliers.html',
            				controller : 'SupplierController'
            			}
            		}
            	})
					});	
	 
}