if("undefined" !== typeof app){
	app.factory('User',function(API, Helper){
        var apiName = {
            "login" : "login",
            "add" : "user",
            "edit" : "user/$1",
            "delete" : "user/$1",
            "getOne" : "user/$1",
            "getAll" : "user?index=$1&limit=$2",
            "getPage" : "user/page/$1"
        };
		return {
            getOne(userId, cb){
                API.callAPI("get",Helper.fixUrlAPI(apiName.getOne,[userId])).then(function success(res){
                    cb(res.data);
                }, function error(err){
                    cb([]);
                });    
            },
            getAll(index, limit, cb){
                API.callAPI("get",Helper.fixUrlAPI(apiName.getAll,[index,limit])).then(function success(res){
                    var users = res.data;
                    var length = users.length;
                    for(var i = 0; i < length; i++){
                        if(!users[i].pictureURL){
                            users[i].pictureURL = "./images/default-avatar.png";
                        }
                    }
                    cb(users);
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
            edit(userId, quotaValue, cb){
                var data = {
                    value : quotaValue
                }
                API.callAPI("put", Helper.fixUrlAPI(apiName.edit,[userId]), data).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb(err);
                });
            },
            add(resrouceId, value, cb){
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
            delete(userId, cb){
                API.callAPI("delete",Helper.fixUrlAPI(apiName.delete,[userId])).then(function success(res){
                    cb(true);
                }, function error(err){
                    cb(false);
                })
            }
		}
	})
}