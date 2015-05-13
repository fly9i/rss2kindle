var express = require('express');
var router = express.Router();
var extractor = require('../modules/contentextractor');
var fs=require('fs');
var config = require('../modules/config')
/* GET home page. */
router.get('/:id', function(req, res, next) {
	console.log(req.params);
	try{
		res.send(fs.readFileSync(config.local_storage+'/'+req.params.id+'.html').toString());
	}catch(e){
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	}
});

module.exports = router;
