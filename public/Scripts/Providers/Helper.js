if("undefined" !== typeof app){
	app.provider('Helper',function Helper(CONFIG){
		this.fixUrlAPI = function (api_name, variables)
    {
        var Url = api_name;
        if(Array.isArray(variables))
        {
            for(var i = 1; i <= variables.length ; i++)
            {
                Url = Url.replace("$"+i,variables[i-1]);
            }
        }
        return Url;
    };
    this.getAPIEndPoint = function(path){
      var index = path.indexOf("/");
      if(index !== 0)
        path = "/" + path;
      return CONFIG.apiEndPoint.replace(/^\/|\/$/g, '') + path;
    }
    this.toRealObject = function(object){
      return JSON.parse(JSON.stringify(object));
    }
    this.$get = function Helper() {
      // let's assume that the UnicornLauncher constructor was also changed to
      // accept and use the useTinfoilShielding argument
      return this;
    };
	});
}