if("undefined" !== typeof app){
	app.factory('Resource',function(API, Helper){
    var apiName = {
      "add" : "resource",
      "addToSupplier" : "supplier/$1/resources",
      "search" : "resource/search?of=$1&keyword=$2&index=$3&limit=$4",
      "delete" : "supplier/$1/resources",
      "getAll" : "supplier/$1/resources?index=$2&limit=$3",
      "getPage" : "supplier/$1/resources/page/$2"
    }
    return {
      getAll(supplierId, index, limit, cb){
        console.log(supplierId);
        API.callAPI("get",Helper.fixUrlAPI(apiName.getAll,[supplierId, index, limit])).then(function success(res){
          cb(res.data);
        }, function error(err){
          cb([]);
        });
      },
      getPage(supplierId, limit, cb){
        API.callAPI("get",Helper.fixUrlAPI(apiName.getPage,[supplierId, limit])).then(function success(res){
          cb(res.data);
        }, function error(err){
          cb(0);
        });
      },
      search(supplierId, keyword, index, limit, cb){
        API.callAPI("get",Helper.fixUrlAPI(apiName.search,[supplierId, keyword, index, limit])).then(function success(res){
          cb(res.data);
        }, function error(err){
          cb([]);
        });
      },
      add(resourceName, resourceCode, resourceUnit, cb){
        var data = {
          name : resourceName,
          code : resourceCode,
          unit : resourceUnit,
          user_id : 1
        }
        API.callAPI("post",apiName.add,data).then(function success(res){
          cb(res.data);
        },function error(err){
          cb(err);
        });
      },
      addToSupplier(resource_id, supplier_id, price, cb){
        var data = {
          resource_id : resource_id,
          supplier_id : supplier_id,
          price : price
        }
        API.callAPI("post",Helper.fixUrlAPI(apiName.addToSupplier,[supplier_id]),data).then(function success(res){
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