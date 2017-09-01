if("undefined" !== typeof app){
	app.controller("ResourceController", function($scope, $uibModal, Supplier, Resource, $stateParams, $state, debounce) {

		$scope.supplier = null;
		$scope.resources = [];
		$scope.searchResources = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.searchIndex = 0;
		$scope.choseResource = null;
		$scope.supplierId = $stateParams["id"]; 
		$scope.limit = $stateParams["limit"] || 10;
		$scope.searchLimit = 10;
		$scope.currentPage = $stateParams["page"] || 1;
		$scope.isLoading = false;
		$scope.isMatched = false;
		$scope.isNew = false;
		$scope.isSearching = true;
		$scope.endSearch = false;

		function init(){
			$scope.index = ($scope.currentPage - 1) * $scope.limit;
			$scope.$watch('resourceName', function(newValue, oldValue) {
				if(newValue !== oldValue){
					$scope.searchIndex = 0;
					$scope.searchLimit = 10;
					$scope.endSearch = false;
					if($scope.isSearching){
						$scope.choseResource = null;
						searchResources(true, $scope.resourceName, $scope.searchIndex, $scope.searchLimit);
					}
					else{
						$scope.isSearching = true;
					}
				}
			});
			Supplier.getOne($scope.supplierId,function(supplier){
				$scope.supplier = supplier;
			});
			$.getScript("./js/init/initResource.js").then(function(){
				$('select#number-of-resource').on('change', function (evt) {
					$scope.limit = $('select#number-of-resource').val();
					getPage();
				});
			});
			$('.search-result').off("scroll");
			$('.search-result').on("scroll",function(){
				if(Math.floor($(this)[0].scrollTop) >= Math.floor($(this)[0].scrollHeight - $(this).outerHeight()) - 10){
					if(!$scope.isLoading){
						$scope.searchIndex += $scope.searchLimit;
						searchResources(false, $scope.resourceName, $scope.searchIndex, $scope.searchLimit);
					}		
				}

			});
		}
		function searchResources(isReloaded, keyword, index, limit){
			if($scope.isLoading === false && !$scope.endSearch){
				$scope.isLoading = true;
				if(isReloaded)
					$scope.searchResources = [];
				Resource.search($scope.supplierId, keyword, index, limit, function(resources){
					if(resources && Array.isArray(resources)){
						if(resources.length < $scope.limit){
							$scope.endSearch = true;
						}
						$scope.isLoading = false;
						if(isReloaded)
							$scope.searchResources = resources;
						else{
							var length = resources.length;
							for(var i = 0; i < length; i++){
								$scope.searchResources.push(resources[i]);
							}
						}
						if($scope.searchResources.length > 0){
							$scope.isNew = false;
							var length = $scope.searchResources.length;
							for(var i = 0; i < length; i++){
								if($scope.searchResources[i].name.toLowerCase() === $scope.resourceName.toLowerCase())
								{
									$scope.isMatched = true;
								}
							}
						}
						else{
							$scope.isNew = true;
							$scope.isMatched = true;
						}
					}
				})
			}
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
				Resource.getPage($scope.supplierId, $scope.limit,function(pages){
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
				Resource.getAll($scope.supplierId,$scope.index,$scope.limit,function(resources){
					$scope.isLoading = false;
					$scope.resources = resources;
					if(cb && typeof cb === "function"){
						cb(true);
					}
				});
			}
		}
		$scope.deleteResource = function(index){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				var id = $scope.resources[index].id;
				Resource.delete(id, function(isDeleted){
					$scope.isLoading = false;
					getAll();	
				});
			}
		}
		$scope.editSupplier = function(){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				Supplier.edit($scope.supplier.id,$scope.supplier.name,$scope.supplier.address, function(supplier){
					$scope.supplier = supplier;
					$scope.isLoading = false;
				});
			}	
		}
		$scope.chooseResource = function(index){
			$scope.choseResource = $scope.searchResources[index];
			$scope.resourceName = $scope.choseResource.name;
			$scope.searchResources = [];
			$scope.isSearching = false;
		}
		$scope.addNewResource = function(){
			$scope.isNew = true;
			$scope.searchResources = [];
		}
		$scope.addResource = function(){
			var resourceName = $scope.resourceName || null;
			var resourcePrice = $scope.resourcePrice || 0;
			var resourceSupplier = {};
			if($scope.isNew){
				var resourceCode = $scope.resourceCode || null;
				console.log($scope.resourceCode);
				var resourceUnit = $scope.resourceUnit || null;
				console.log($scope.resourceUnit);
				Resource.add(resourceName, resourceCode, resourceUnit, function(resource){
					resourceSupplier = resource;
					Resource.addToSupplier(resource.id, $scope.supplier.id, resourcePrice, function(_resourceSupplier){
						resourceSupplier.id = _resourceSupplier.id;
						resourceSupplier.resource_id = _resourceSupplier.resrouce_id;
						resourceSupplier.supplier_id = _resourceSupplier.supplier_id;	
						resourceSupplier.price = _resourceSupplier.price;
						$scope.resources.push(resourceSupplier);
					});					
				});
			}
			else{
				resourceSupplier.code = $scope.choseResource.code;
				resourceSupplier.name = $scope.choseResource.name;
				resourceSupplier.unit = $scope.choseResource.unit; 
				Resource.addToSupplier($scope.choseResource.id, $scope.supplier.id, resourcePrice, function(_resourceSupplier){
					resourceSupplier.id = _resourceSupplier.id;
					resourceSupplier.resource_id = _resourceSupplier.resource_id;
					resourceSupplier.supplier_id = _resourceSupplier.supplier_id;	
					resourceSupplier.price = _resourceSupplier.price;
					$scope.resources.push(resourceSupplier);
				});		
			}
			$scope.choseResource = null;
		}
		init();
		getPage(function next(isDone){
			if(isDone){
				getAll();
			}
		});
	});
}