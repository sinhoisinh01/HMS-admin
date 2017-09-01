if("undefined" !== typeof app){
	app.controller("WorkController", function($scope, $uibModal, Work, $stateParams, $state) {

		$scope.suppliers = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.limit = $stateParams["limit"] || 10;
		$scope.currentPage = $stateParams["page"] || 1;
		$scope.isLoading = false;
		function init(){
			$scope.index = ($scope.currentPage - 1) * $scope.limit;
			$.getScript("./js/init/initWork.js").then(function(){
				$('select#number-of-work').on('change', function (evt) {
					$scope.limit = $('select#number-of-work').val();
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
				Work.getPage($scope.limit,function(pages){
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
				$scope.works = [];
				$scope.isLoading = true;
				Work.getAll($scope.index,$scope.limit,function(works){
					$scope.isLoading = false;
					$scope.works = works;
					if(cb && typeof cb === "function"){
						cb(true);
					}
				});
			}
		}
		$scope.addWork = function(){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				Work.add($scope.workName, $scope.workCode, $scope.workDocument, $scope.workUnit, function(work){
					$scope.isLoading = false;
					var length = $scope.works.length;
					if(length < $scope.limit)
					{
						$scope.works.push(work);
					}
				});	
			}
		}
		$scope.deleteWork = function(index){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				var id = $scope.works[index].id;
				Work.delete(id, function(isDeleted){
					$scope.isLoading = false;
					getAll();	
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