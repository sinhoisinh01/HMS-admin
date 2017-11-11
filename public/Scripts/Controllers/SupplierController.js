if("undefined" !== typeof app){
	app.controller("SupplierController", function($scope, $uibModal, Supplier, Excel, $stateParams, $state) {

		$scope.suppliers = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.limit =  Number($stateParams["limit"]) || 10;
		$scope.currentPage =  Number($stateParams["page"]) || 1;
		$scope.isLoading = false;
		$scope.exportFileType = "csv"
		function init(){
			$scope.index = ($scope.currentPage - 1) * $scope.limit;
			$.getScript("./js/init/initSupplier.js").then(function(){
				$('select#number-of-supplier').on('change', function (evt) {
					$scope.limit = $('select#number-of-supplier').val();
					getPage();
				});
				$('select#file-type').off('change');
				$('select#file-type').on('change', function (evt) {
					$scope.exportFileType = $('select#file-type').val();
				});
				$("input#import-excel").off("change");
				$("input#import-excel").on("change", function(evt){
					if($("input#import-excel").val()){
						Excel.prepare(evt.target.files[0],function(excel, sheetTitles){
							var needImport = [ "Tên nhà cung cấp", "Địa chỉ" ];
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
								console.log(excel);
								for(var i = startRow; i < endRow; i++){
									var supplier = {
										name : "",
										address : ""
									};
									var cols = ["name", "address"];
									for(var j = 0; j < length; j++){
										supplier[cols[j]] = excel[result.sheet].sheet[i][columns[j]];
									}
									Supplier.add(supplier.name, supplier.address, function(supplier){
										var length = $scope.suppliers.length;
										if(length < $scope.limit)
										{
											$scope.suppliers.push(supplier);
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
					Excel.export(suppliers, $scope.exportFileType, function(isDone){
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