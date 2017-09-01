if("undefined" !== typeof app){
	app.factory('Quota',function(API, Helper){
        var apiName = {
            "add" : "quota",
            "edit" : "work/$1/resrouce/$2/quota",
            "delete" : "work/$1/resource/$2/quota/$1",
            "getOne" : "work/$1/quota",
            "getAll" : "quota?index=$1&limit=$2",
            "getPage" : "quota/page/$1"
        };
		return {
            getOne(workId, cb){
                API.callAPI("get",Helper.fixUrlAPI(apiName.getOne,[workId])).then(function success(res){
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
            edit(workId, resourceId, quotaValue, cb){
                var data = {
                    value : quotaValue
                }
                API.callAPI("put", Helper.fixUrlAPI(apiName.edit,[workId, resourceId]), data).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb(err);
                });
            },
            add(workId, resrouceId, value, cb){
                var data = {
                    work_id : workId,
                    resource_id : resrouceId,
                    value : value
                }
                API.callAPI("post",apiName.add,data).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb(err);
                });
            },
            delete(workId, resrouceId , cb){
                API.callAPI("delete",Helper.fixUrlAPI(apiName.delete,[workId, resourceId])).then(function success(res){
                    cb(true);
                }, function error(err){
                    cb(false);
                })
            }
		}
	})
}