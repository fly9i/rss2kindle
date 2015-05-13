var express = require('express');
var router = express.Router();
var extractor = require('../modules/contentextractor');

/* GET home page. */
router.get('/', function(req, res, next) {
	extractor.extract("http://finance.sina.com.cn/money/nmetal/20150511/135522151958.shtml",function(file){
		res.render('index', { body:file} );
	})
});

module.exports = router;
