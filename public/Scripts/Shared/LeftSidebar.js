if("undefined" !== typeof app){
	app.controller("LeftSidebarController", function($scope) {
		$scope.menus =[
		{ 
			title : "Công tác", iconClass : "fa fa-building-o",  subMenus : [
				{ title : "Xem công tác", iconClass : "", link : "#!/work"}
			]
		},
		{ 
			title : "Định mức", iconClass : "fa fa-calculator", subMenus : [
				{ title : "Xem định mức", iconClass : "", link : "#!/quota"}
			]
		},
		{ 
			title : "Vật  tư", iconClass : "fa fa-cubes", subMenus : [
				{ title : "Xem vật tư", iconClass : "", link : "#!/supplier" }
			]
		},
		{ 
			title : "Người dùng", iconClass : "fa fa-users", subMenus : [
				{ title : "Xem người dùng", iconClass : "", link : "#!/category"}
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