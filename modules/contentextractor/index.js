var config = require('../config');
var http = require('http');
var htmldecoder = require('./htmldecoder');
var BufferHelper = require('bufferhelper');
var util = require('../util')
var fs = require('fs');
var template = fs.readFileSync('modules/contentextractor/template.html').toString();
exports.extract=function(url,callback){
	var extractor_url=config.extractor_url.replace('${url}',url);
	get(extractor_url,function(obj){
		callback(store(obj));
	})
}

function store(obj){
	var file=config.local_storage+'/'+util.md5(JSON.stringify(obj))+'.html';
	var htmlContent = template.replace('${title}',obj.title).replace('${content}',obj.content);
	fs.writeFileSync(file,htmlContent);
	return file;
}

function get(url,callback){
	var req=http.get(url,function(res){
		var bufferHelper = new BufferHelper();
		res.on('data',function(chunk){
			bufferHelper.concat(chunk);
		});
		res.on('end',function(){
			var resTxt = bufferHelper.toBuffer().toString().replace(/\\t|\\n|\\r/g,'').replace(/ {2,}/g,' ');
			resTxt = htmldecoder.decode(resTxt);
			var obj=JSON.parse(resTxt);
			callback(obj);
		})
	});
	req.end();
	req.on('error',function(e){
		console.log(e);
	})
}