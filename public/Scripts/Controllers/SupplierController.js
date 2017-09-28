if("undefined" !== typeof app){
	app.controller("SupplierController", function($scope, $uibModal, Supplier, Excel, $stateParams, $state) {

		$scope.suppliers = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.limit = $stateParams["limit"] || 10;
		$scope.currentPage = $stateParams["page"] || 1;
		$scope.isLoading = false;
		$scope.exportFileType = "csv"
		function init(){
			$scope.index = ($scope.currentPage - 1) * $scope.limit;
			$.getScript("./js/init/initSupplier.js").then(function(){
				$('select#number-of-supplier').on('change', function (evt) {
					$scope.limit = $('select#number-of-supplier').val();
					getPage();
				});
				$('select#file-type').on('change', function (evt) {
					$scope.exportFileType = $('select#file-type').val();
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
				Supplier.getPage($scope.limit,function(pages){
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
				Supplier.getAll($scope.index,$scope.limit,function(suppliers){
					$scope.isLoading = false;
					$scope.suppliers = suppliers;
					if(cb && typeof cb === "function"){
						cb(true);
					}
				});
			}
		}
		$scope.addSupplier = function(){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				Supplier.add($scope.supplierName, $scope.supplierAddress, function(supplier){
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
				Supplier.delete(id, function(isDeleted){
					$scope.isLoading = false;
					getAll();	
				});
			}
		}
		$scope.export = function(){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				Supplier.getAll(0,$scope.pages.length * $scope.limit,function(suppliers){
					$scope.isLoading = false;
					Excel.export(suppliers, $scope.exportFileType, function(excel){
						var blob = new Blob([excel.data], {type: excel.type});
						var objectUrl = URL.createObjectURL(blob);
						var hiddenElement = document.createElement('a');
						hiddenElement.href = objectUrl;
						hiddenElement.target = '_blank';
						hiddenElement.download = (+new Date()).toString() + excel.extension;
						hiddenElement.click();
					});
				});
			}
		}
		$scope.import = function(excel){
			Excel.import($(excel)[0].files[0],function(result){
				console.log(result);
			});
		}
		init();
		getPage(function next(isDone){
			if(isDone){
				getAll();
			}
		});
	});
}