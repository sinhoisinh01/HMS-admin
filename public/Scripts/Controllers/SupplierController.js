if("undefined" !== typeof app){
	app.controller("SupplierController", function($scope, Supplier) {
		$scope.suppliers = [];
		function load(){
			Supplier.getAll(function(suppliers){
				$scope.suppliers = suppliers;
				console.log(suppliers);
			});
		}
		load();
	});
}