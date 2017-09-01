if("undefined" !== typeof app){
	app.factory('API',function($http, Helper){
		return {
			callAPI : function (method, path, data = null){
				var call;
				var apiEndPoint = Helper.getAPIEndPoint(path);
				var headers = { headers : {'Content-Type': 'application/json'} };
				switch (method) {
                    case 'get':
                        call = $http.get(apiEndPoint,headers);
                        break;
                    case 'post':
                        call = $http.post(apiEndPoint,data,headers);
                        break;
                    case 'put':
                        call = $http.put(apiEndPoint,data,headers);
                        break;
                    case 'delete':
                        call = $http.delete(apiEndPoint,data,headers);
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