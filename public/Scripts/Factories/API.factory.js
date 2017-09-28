if("undefined" !== typeof app){
	app.factory('API',function($http, Helper){
		return {
			callAPI : function (method, path, data = null, isUploadFile = false){
				var call;
				var apiEndPoint = Helper.getAPIEndPoint(path);
                var headers = {};
                var input = null;
                if(isUploadFile && method.toLowerCase() === "post"){
                    headers = {headers : {'Content-Type' : undefined}};
                    input = new FormData();
                    if(Array.isArray(data)){
                        for(var i = 0; i < data.length; i++){
                            input.append("files[]",data[i]);
                        }   
                    }
                    else{
                        input.append("file",data);
                    }
                }
                else{
                    headers = { headers : {'Content-Type': 'application/json'} };
                    input = data;
                }
                switch (method) {
                    case 'get':
                    call = $http.get(apiEndPoint,headers);
                    break;
                    case 'post':
                    call = $http.post(apiEndPoint,input,headers);
                    break;
                    case 'put':
                    call = $http.put(apiEndPoint,input,headers);
                    break;
                    case 'delete':
                    call = $http.delete(apiEndPoint,input,headers);
                    break;
                    default: // GET
                    call = $http.get(apiEndPoint,headers);
                    break;
                }
                return call;	
            },

        }
    })
}