if("undefined" !== typeof $){
	$(document).ready(function(){
		$("select#number-of-quota").select2({});
		$(".nav.nav-pills a").on("click",function(e){
			e.preventDefault();
			$(this).tab("show");
		});
	});	
}