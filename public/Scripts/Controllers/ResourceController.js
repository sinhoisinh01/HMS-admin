if("undefined" !== typeof app){
	app.controller("ResourceController", function($scope, $uibModal, Supplier, Resource, Excel, $stateParams, $state, debounce) {

		$scope.supplier = null;
		$scope.resources = [];
		$scope.searchResources = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.searchIndex = 0;
		$scope.choseResource = null;
		$scope.supplierId = $stateParams["id"]; 
		$scope.limit =  Number($stateParams["limit"]) || 10;
		$scope.searchLimit = 10;
		$scope.currentPage =  Number($stateParams["page"]) || 1;
		$scope.isLoading = false;
		$scope.isMatched = false;
		$scope.isNew = false;
		$scope.isSearching = true;
		$scope.endSearch = false;
		$scope.exportFileType = "csv"

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
			$('select#file-type').off('change');
			$('select#file-type').on('change', function (evt) {
				$scope.exportFileType = $('select#file-type').val();
			});
			$("input#import-excel").off("change");
			$("input#import-excel").on("change", function(evt){
				if($("input#import-excel").val()){
					Excel.prepare(evt.target.files[0],function(excel, sheetTitles){
						var needImport = [ "Mã vật tư", "Tên vật tư", "Giá vật tư", "Đơn vị" ];
						var excelModal = $uibModal.open({
							templateUrl : "./views/Modals/ExcelModal.html",
							windowClass: "excel-modal",
							controller: function($scope) {
								$scope.needImport = needImport;
								$scope.sheetTitles = sheetTitles;
								$scope.excel = excel; 
								$scope.result = {sheet : null, startRow : null, endRow : null, col : []};
								$scope.result.sheet = 0;
								$scope.chooseSheet = function(sheet){
									$scope.result.sheet = sheet;
								};
								$scope.goTop = function(){
									$('body,html').animate({
										scrollTop : 0                      
									}, 500);
								}
							}
						});
						excelModal.result.then(function (result) {
							var startRow = result.startRow - 1;
							var endRow = result.endRow;
							var columns = [];
							var length = result.col.length;
							for(var i = 0; i < length; i++){
								columns[i] = result.col[i].charCodeAt(0) - 65 + 1;
							}
							for(var i = startRow; i < endRow; i++){
								var resource = {
									code : "",
									name : "",
									unit : "",
									price : 0,
									supplierId : $scope.supplierId
								};
								var cols = ["code", "name", "unit", "price"];
								for(var j = 0; j < length; j++){
									resource[cols[j]] = excel[result.sheet].sheet[i][columns[j]];
								}
								let tempResource = Object.assign({},resource);
								resource = null;	
								Resource.getOne(tempResource.code,function(result){
									if(result){
										tempResource.id = result.id;
										Resource.addToSupplier(tempResource.id, tempResource.supplierId, tempResource.price, function(result){
											var length = $scope.resources.length;
											if(length < $scope.limit)
											{
												$scope.resources.push(result);
											}
											else{
												if($scope.resources.length === ($scope.pages.length * $scope.limit)){
													getPage();
												}
											}
										});
									}
									else{
										Resource.add(tempResource.name, tempResource.code, tempResource.unit, function(result){
											tempResource.id = result.id;
											Resource.addToSupplier(tempResource.id, tempResource.supplierId, tempResource.price, function(result){
												var length = $scope.resources.length;
												if(length < $scope.limit)
												{
													$scope.resources.push(result);
												}
												else{
													if($scope.resources.length === ($scope.pages.length * $scope.limit)){
														getPage();
													}
												}
											});
										});
									}
								});
							}
						}, function () {
							$("input#import-excel").val(null);
						});
						setTimeout(function(){
							$(".nav.nav-pills a").off("click");
							$(".nav.nav-pills a").on("click",function(e){
								e.preventDefault();
								$(this).tab("show");
							});
						},500);
						// $("input#import-excel").val(null);
					});
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
				var supplierId = $scope.resources[index].supplier_id;
				var resourceId = $scope.resources[index].resource_id;
				Resource.delete(supplierId, resourceId, function(isDeleted){
					$scope.isLoading = false;
					getPage(function next(isDone){
						if(isDone){
							getAll();
						}
					});	
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
				var resourceUnit = $scope.resourceUnit || null;
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
		$scope.export = function(){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				Resource.getAll($scope.supplierId, 0,$scope.pages.length * $scope.limit,function(resources){
					$scope.isLoading = false;
					Excel.export(resources, $scope.exportFileType, function(isDone){
						console.log(isDone);
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