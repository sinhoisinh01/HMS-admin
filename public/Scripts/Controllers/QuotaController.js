if("undefined" !== typeof app){
	app.controller("QuotaController", function($scope, $uibModal, Quota, $stateParams, $state) {

		$scope.quotas = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.limit = $stateParams["limit"] || 10;
		$scope.currentPage = $stateParams["page"] || 1;
		$scope.isLoading = false;
		$scope.mView = true;
		$scope.nView = true;
		$scope.vView = true;
		function init(){
			$scope.index = ($scope.currentPage - 1) * $scope.limit;
			$.getScript("./js/init/initQuota.js").then(function(){
				$('select#number-of-quota').on('change', function (evt) {
					$scope.limit = $('select#number-of-quota').val();
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
				Quota.getPage($scope.limit,function(pages){
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
				$scope.suppliers = [];
				$scope.isLoading = true;
				Quota.getAll($scope.index,$scope.limit,function(quotas){
					$scope.isLoading = false;
					$scope.quotas = quotas;
					if(cb && typeof cb === "function"){
						cb(true);
					}
				});
			}
		}
		$scope.addSupplier = function(){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				Quota.add($scope.supplierName, $scope.supplierAddress, function(supplier){
					$scope.isLoading = false;
					var length = $scope.suppliers.length;
					if(length < $scope.limit)
					{
						$scope.suppliers.push(supplier);
					}
				});	
			}
		}
		$scope.deleteSupplier = function(index){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				var id = $scope.suppliers[index].id;
				Quota.delete(id, function(isDeleted){
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