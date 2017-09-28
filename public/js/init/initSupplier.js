if("undefined" !== typeof $){
	$(document).ready(function(){
		$("select#number-of-supplier").select2({});
		$("select#file-type").select2({});
		$(".nav.nav-pills a").on("click",function(e){
			e.preventDefault();
			$(this).tab("show");
		});
	});	
}