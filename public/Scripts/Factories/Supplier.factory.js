if("undefined" !== typeof app){
	app.factory('Supplier',function(API){
        apiName = {
            "getAll" : "supplier"
        }
		return {
            getAll(cb){
                API.callAPI("get",apiName.getAll).then(function success(res){
                    cb(res.data);
                }, function error(err){
                    cb([]);
                });;
            }
		}
	})
}