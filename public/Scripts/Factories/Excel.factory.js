if("undefined" !== typeof app){
	app.factory('Excel',function(API, Helper){
        var apiName = {
            "export" : "excel/export",
            "import" : "excel/import",
            "prepare" : "excel/prepare"
        };
        return {
            export(source, fileType, cb){
                var data = {
                    "source" : source,
                    "type" : fileType
                }
                API.callAPI("post",apiName.export, data).then(function success(res){
                    var hiddenElement = document.createElement('a');
                    hiddenElement.href = res.data.file
                    hiddenElement.target = "_blank";
                    hiddenElement.download = res.data.name;
                    hiddenElement.click();
                    cb(true);
                },function error(err){
                    cb(false);
                });
            },
            import(file, cb){
                API.callAPI("post",apiName.import, file, true).then(function success(res){
                    cb(res.data);
                },function error(err){
                    cb([])
                });
            },
            prepare(file, cb){
                API.callAPI("post",apiName.prepare, file, true).then(function success(res){
                    var result = res.data.excel;
                    var excel = [];
                    var numberOfSheets = res.data.sheetTitle.length;
                    var sheetTitles = res.data.sheetTitle;
                    for(var i = 0; i < numberOfSheets; i++){
                        var excelSheet = [];
                        var headings = [""];
                        var numberOfRows = 0;
                        if(numberOfSheets > 1)
                            numberOfRows = result[i].length;
                        else
                            numberOfRows = result.length;
                        for(var j = 0; j < numberOfRows; j++){
                            excelSheet[j] = [];
                            var numberOfCols = 0;
                            if(numberOfSheets > 1)
                                numberOfCols = result[i][j].length;
                            else
                                numberOfCols = result[i].length;
                            for(var k = 0; k < numberOfCols; k++){
                                if(numberOfSheets > 1){
                                    excelSheet[j][k] = result[i][j][k];
                                } 
                                else{
                                    excelSheet[j][k] = result[j][k];
                                }
                                if(!excelSheet[j][k])
                                    excelSheet[j][k] = "";    
                            }
                        }
                        for(var j = 0; j < numberOfCols; j++){
                            headings.push(String.fromCharCode(65 + j));
                        }
                        for(var j = 0; j < numberOfRows; j++){
                            excelSheet[j].unshift(j+1);  
                        }
                        excel.push({sheet : excelSheet, heading : headings}); 
                    }
                    cb(excel, sheetTitles);
                },function error(err){
                    cb([]);
                });
            }
        }
    })
}