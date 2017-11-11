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
        templateUrl: 'Views/index.html',
        controller: 'IndexController'
      }
    }
  })
  .state('login',{
    url: '/login',
    views : {
      'main-content' :{
        templateUrl : 'Views/login.html',
        controller : 'LoginController'
      }
    }
  })
  .state('404', {
    url: '/404',
    views: {
      'main-content': {
       templateUrl: 'Views/404.html'
     }
   }
 })
  .state('supplierDetail', {
    url: "supplier/:id?page&limit",
    parent : "main",
    views : {
      'content' : {
        templateUrl : 'Views/Resources/resources.html',
        controller : 'ResourceController'
      }
    }
  })
  .state('supplier', {
    url: "supplier?page&limit",
    parent : "main",
    views : {
     'content' : {
      templateUrl : 'Views/Supplier/suppliers.html',
      controller : 'SupplierController'
    }
  }
}).state('work', {
  url: "work?page&limit",
  parent : "main",
  views : {
   'content' : {
    templateUrl : 'Views/Work/works.html',
    controller : 'WorkController'
  }
}
}).state('quota', {
  url: "quota?page&limit",
  parent : "main",
  views : {
   'content' : {
    templateUrl : 'Views/Quota/quota.html',
    controller : 'QuotaController'
  }
}
}).state('user', {
  url : "user?page&limit",
  parent : "main",
  views : {
    'content': {
      templateUrl : "Views/User/user.html",
      controller : "UserController"
    }
  }
})
});
}