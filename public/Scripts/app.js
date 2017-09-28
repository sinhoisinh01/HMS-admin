if("undefined" !== typeof angular){
	var app = angular.module('HMS-admin', ['ui.router', 'ui.bootstrap', 'ngCookies', 'debounce', 'infinite-scroll'])
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
            .state('supplierDetail', {
              url: "supplier/:id?page&limit",
              parent : "main",
              views : {
                'content' : {
                  templateUrl : 'views/Resources/resources.html',
                  controller : 'ResourceController'
                }
              }
            })
            .state('supplier', {
              url: "supplier?page&limit",
              parent : "main",
              views : {
               'content' : {
                templateUrl : 'views/Supplier/suppliers.html',
                controller : 'SupplierController'
              }
            }
          }).state('work', {
            url: "work?page&limit",
            parent : "main",
            views : {
             'content' : {
              templateUrl : 'views/Work/works.html',
              controller : 'WorkController'
            }
          }
        }).state('quota', {
            url: "quota?page&limit",
            parent : "main",
            views : {
             'content' : {
              templateUrl : 'views/Quota/quota.html',
              controller : 'QuotaController'
            }
          }
        }).state('user', {
          url : "user?page&limit",
          parent : "main",
          views : {
            'content': {
              templateUrl : "views/User/user.html",
              controller : "UserController"
            }
          }
        })
        });

}