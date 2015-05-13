exports.decode=function(str){
	var reg=/&#x[0-9a-fA-F]{4};/gi;
	return str.replace(reg,function(s){
		var sp = s.substring(3,7)
		try{
			return String.fromCharCode(parseInt(sp,16));
		}catch(e){
			return '';
		}
	});
}