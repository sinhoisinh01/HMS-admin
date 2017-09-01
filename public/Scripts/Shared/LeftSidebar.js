if("undefined" !== typeof app){
	app.controller("LeftSidebarController", function($scope) {
	    $scope.menus =[
	    	{ 
	    		title : "Công tác", iconClass : "fa fa-building-o",  subMenus : [
	    			{ title : "Xem công tác", iconClass : "", link : "#!/work"},
	    			{ title : "Thêm công tác", iconClass : "", link : "#!/work/add"}
	    		]
	    	},
	    	{ 
	    		title : "Định mức", iconClass : "fa fa-calculator", subMenus : [
	    			{ title : "Xem định mức", iconClass : "", link : "#!/quota"},
	    			{ title : "Thêm định mức", iconClass : "", link : "#!/quota/add"}
	    		]
	    	},
	    	{ 
	    		title : "Hạng mục", iconClass : "fa fa-tasks", subMenus : [
	    			{ title : "Xem hạng mục", iconClass : "", link : "#!/category"},
	    			{ title : "Thêm hạng mục", iconClass : "", link : "#!/category/add"},
	    		]
	    	},
	    	// { 
	    	// 	title : "V", iconClass : "fa fa-archive", subMenus : [
	    	// 		{ title : "Xem nhà cung cấp", iconClass : "",link : "#!/supplier" },
	    	// 		{ title : "Thêm nhà cung cấp", iconClass : "",link : "#!/supplier/add" }
	    	// 	]
	    	// },
	    	{ 
	    		title : "Vật  tư", iconClass : "fa fa-cubes", subMenus : [
	    			{ title : "Xem vật tư", iconClass : "", link : "#!/supplier" },
	    			{ title : "Thêm vật tư", iconClass : "", link : "#!/supplier/add" },
	    		]
	    	},
	    ]
		$scope.onChose = function(event){
			var ele = event.target;
			var checkParent = $(ele).parents("ul.treeview-menu").length > 0 ? true : false;
			if(!checkParent){
				if(!$(ele).is("li.treeview")){
					ele = $(ele).parents("li.treeview");
				}
				if(ele){
					if($(ele).hasClass("menu-open")){
						$(ele).removeClass("menu-open");
					}	
					else{
						$("aside.main-sidebar li.treeview.menu-open").removeClass("menu-open");
						$(ele).addClass("menu-open");
					}
				}
			}
			else{
				$("aside.main-sidebar li.sub-treeview").find("i.active").removeClass("active fa-circle").addClass("fa-circle-o");
				if(!$(ele).is("li.sub-treeview")){
					ele = $(ele).parents("li.sub-treeview");
				}
				if(ele){
					if(!$(ele).hasClass("active")){
						$("aside.main-sidebar li.sub-treeview.active").find("i.active").removeClass("active fa-circle").addClass("fa-circle-o");
						$("aside.main-sidebar li.sub-treeview.active").removeClass("active");
						$(ele).addClass("active");
						$(ele).find("i").addClass("active fa-circle");
					}
				}	
			}
		}
	});
}