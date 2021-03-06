if("undefined" !== typeof app){
	app.factory('Supplier',function(API, Helper){
        var apiName = {
            "add" : "supplier",
            "edit" : "supplier/$1",
            "delete" : "supplier/$1",
            "getOne" : "supplier/$1",
            "getAll" : "supplier?index=$1&limit=$2",
            "getPage" : "supplier/page/$1"
        };
		return {
            getOne(supplierId, cb){
                console.log(apiName);
                API.callAPI("get",Helper.fixUrlAPI(apiName.getOne,[supplierId])).then(function success(res){
                    cb(res.data);
                }, function error(err){
                    cb([]);
                });    
            },
            getAll(index, limit, cb){
                API.callAPI("get",Helper.fixUrlAPI(apiName.getAll,[index,limit])).then(function success(res){
                    cb(res.data);
                }, function error(err){
                    cb([]);
                });
            },
            getPage(limit, cb){
                API.callAPI("get",Helper.fixUrlAPI(apiName.getPage,[limit])).then(function success(res){
                    cb(res.data);
                }, function error(err){
                    cb(0);
                });
            },
            edit(supplierId, supplierName, supplierAddress, cb){
                var data = {
                    name : supplierName,
                    address : supplierAddress,
                    user_id : 1
                }
                API.callAPI("put", Helper.fixUrlAPI(apiName.edit,[supplierId]), data).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb(err);
                });
            },
            add(supplierName, supplierAddress, cb){
                var data = {
                    name : supplierName,
                    address : supplierAddress,
                    user_id : 1
                }
                API.callAPI("post",apiName.add,data).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb(err);
                });
            },
            delete(supplierId, cb){
                API.callAPI("delete",Helper.fixUrlAPI(apiName.delete,[supplierId])).then(function success(res){
                    cb(true);
                }, function error(err){
                    cb(false);
                })
            }
		}
	})
}