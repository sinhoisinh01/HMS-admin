if("undefined" !== typeof app){
	app.controller("PaginationController", function($scope, $state){
		var interval = setInterval(function(){
			if($scope.pages.length > 0){
				clearInterval(interval);
				$scope.isHavingMiddle = ($scope.middle > $scope.pages.length) ? false : true;
				init();
			}
		},100);
		$scope.numberOfPages = 38;
		$scope.middle = $scope.currentPage + Math.floor($scope.numberOfPages/ 2);
		$scope.isHavingMiddle = ($scope.middle > $scope.pages.length) ? false : true;
		$scope.hiddenPages = [];
		function init(){
			for(var i = $scope.middle - 5; i <= $scope.middle + 5; i++){
				if(i <= $scope.pages.length)
					$scope.hiddenPages.unshift(i);
			}
			setTimeout(function(){
				$(window).off("mouseover.hidden-page");
				$(window).on("mouseover.hidden-page", function(e){
					if($(e.target).is(".hidden-page") || $(e.target).parents(".hidden-page").length > 0 || $(e.target).parents(".show-hidden-page").length > 0 || $(e.target).is(".show-hidden-page")){
						$(".hidden-page").show();
						$(".hidden-page").css("left",($(".show-hidden-page").position().left - $(".hidden-page").width() / 4) + "px");	
					}
					else
						$(".hidden-page").hide();	
				});
			},200);
		}
		$scope.back = function(){
			$scope.currentPage = $scope.currentPage - 10 >= 1 ? $scope.currentPage - 10 : 1;
			$state.go(".",{ page : $scope.currentPage, limit : $scope.limit });
		}
		$scope.next = function(){
			$scope.currentPage += 10;
			$state.go(".",{ page : $scope.currentPage, limit : $scope.limit });
		}
	});
}