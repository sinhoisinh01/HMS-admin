if("undefined" !== typeof app){
	app.controller("WorkController", function($scope, $uibModal, Work, Excel, $stateParams, $state) {

		$scope.works = [];
		$scope.pages = [];
		$scope.index = 0;
		$scope.limit = Number($stateParams["limit"]) || 10;
		$scope.currentPage = Number($stateParams["page"]) || 1;
		$scope.isLoading = false;
		$scope.exportFileType = "csv"
		function init(){
			$scope.index = ($scope.currentPage - 1) * $scope.limit;
			$.getScript("./js/init/initWork.js").then(function(){
				$('select#number-of-work').on('change', function (evt) {
					$scope.limit = $('select#number-of-work').val();
					getPage();
				});
			});
			$('select#file-type').off('change');
			$('select#file-type').on('change', function (evt) {
				$scope.exportFileType = $('select#file-type').val();
			});
			$("input#import-excel").off("change");
			$("input#import-excel").on("change", function(evt){
				if($("input#import-excel").val()){
					Excel.prepare(evt.target.files[0],function(excel, sheetTitles){
						var needImport = [ "Mã công tác", "Tên công tác", "Đơn vị" ];
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
								var work = {
									code : "",
									document : "1776-BXD/VP",
									name : "",
									unit : ""
								};
								var cols = ["code", "name", "unit"];
								for(var j = 0; j < length; j++){
									work[cols[j]] = excel[result.sheet].sheet[i][columns[j]];
								}
								let tempWork = Object.assign({},work);
								work = null;	
								Work.add(tempWork.name, tempWork.code, tempWork.document, tempWork.unit, function(result){
									var length = $scope.works.length;
									if(length < $scope.limit)
									{
										$scope.works.push(result);
									}
									else{
										if($scope.works.length === ($scope.pages.length * $scope.limit)){
											getPage();
										}
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
		$scope.export = function(){
			if($scope.isLoading === false){
				$scope.isLoading = true;
				Work.getAll(0,$scope.pages.length * $scope.limit,function(works){
					$scope.isLoading = false;
					Excel.export(works, $scope.exportFileType, function(isDone){

					});
				});
			}
		}
		$scope.import = function(excel){
			Excel.import($(excel)[0].files[0],function(result){
				
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