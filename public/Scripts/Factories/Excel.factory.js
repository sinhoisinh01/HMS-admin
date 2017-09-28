if("undefined" !== typeof app){
	app.factory('Excel',function(API, Helper){
        var apiName = {
            "export" : "excel/export",
            "import" : "excel/import"
        };
        var allowType = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/csv"
        ]
        var extension = [
            ".xls",".xlsx",".csv"
        ]
        return {
            export(source, fileType, cb){
                var data = {
                    "source" : source,
                    "type" : fileType
                }
                API.callAPI("post",apiName.export, data).then(function success(res){
                    var result = {
                        data : res.data,
                        type : res.headers("Content-Type").split(";")[0]
                    }
                    console.log(result.type);
                    for(var i = 0 ; i < allowType.length ; i++){
                        index = result.type.indexOf(allowType[i]);
                        if(index >= 0){
                            result["extension"] = extension[i];
                            break;
                        }
                    }
                    
                    cb(result);
                },function error(err){
                    cb([]);
                });
            },
            import(file, cb){
                API.callAPI("post",apiName.import, file, true).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb([])
                });
            }
        }
    })
}