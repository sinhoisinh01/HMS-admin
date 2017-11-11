if("undefined" !== typeof app){
	app.factory('Work',function(API, Helper){
        var apiName = {
            "add" : "work",
            "edit" : "work/$1",
            "delete" : "work/$1",
            "getOne" : "work/$1",
            "getAll" : "work?index=$1&limit=$2",
            "getPage" : "work/page/$1"
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
            edit(workId, workName, workUnit, cb){
                var data = {
                    name : workName,
                    unit : workUnit
                }
                API.callAPI("put", Helper.fixUrlAPI(apiName.edit,[workId]), data).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb(err);
                });
            },
            add(workName, workCode, workDocument, workUnit, cb){
                var data = {
                    name : workName,
                    code : workCode,
                    document : workDocument,
                    unit : workUnit,
                    construction_id : 1
                }
                API.callAPI("post",apiName.add,data).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb(err);
                });
            },
            delete(workId, cb){
                API.callAPI("delete",Helper.fixUrlAPI(apiName.delete,[workId])).then(function success(res){
                    cb(true);
                }, function error(err){
                    cb(false);
                })
            }
		}
	})
}