if("undefined" !== typeof app){
	app.controller("UserController", function($scope, User, $state, $stateParams) {
		$scope.users = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.limit = Number($stateParams["limit"]) || 10;
		$scope.currentPage =  Number($stateParams["page"]) || 1;
		$scope.isLoading = false;

		function init(){
			$scope.index = ($scope.currentPage - 1) * $scope.limit;
			$.getScript("./js/init/initUser.js").then(function(){
				$('select#number-of-user').on('change', function (evt) {
					$scope.limit = $('select#number-of-user').val();
					getPage();
				});
			});
		}
		function getPage(cb = null){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				// var loadingModal = $uibModal.open({
				// 	templateUrl : "./views/Modals/LoadingModal.html",
				// 	scope : $scope,
				// 	size : "md"
				// });
				$scope.pages = [];
				User.getPage($scope.limit,function(pages){
					$scope.isLoading = false;
					// loadingModal.close();
					var numberOfPage = pages.pages;
					if($scope.currentPage > numberOfPage){
						$scope.currentPage = numberOfPage;				
					}
					$state.go(".",{ page : $scope.currentPage, limit : $scope.limit });
					for(var i = 0; i < numberOfPage; i++){
						$scope.pages.push(i+1);	
					}
					if(cb && typeof cb === "function"){
						cb(true);
					}
				});	
			}	
		}
		function getAll(cb = null){
			if($scope.isLoading === false){
				$scope.users = [];
				$scope.isLoading = true;
				User.getAll($scope.index,$scope.limit,function(users){
					$scope.isLoading = false;
					$scope.users = users;
					if(cb && typeof cb === "function"){
						cb(true);
					}
				});
			}
		}


		init();
		getPage(function next(isDone){
			if(isDone){
				getAll();
			}
		});
	});
}