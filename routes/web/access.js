var express = require('express');
var router = express.Router();

var tools = global.tools;
var Rtn = tools.require('/models/comm/Rtn');
var User = tools.require('/models/web/User');

/* GET users listing. */
router.get('/login', function(req, res, next) {
	var rtn = new Rtn();

	User.find({}, function(err, users) {
		if( err ) {										//查询异常
			rtn.code = Rtn.ERROR_BUSINESS;
			rtn.error = err.message;
			rtn.data = err.errors || rtn.data;
			tools.send(res, rtn, 'JSON');
			return;
		}

		rtn.data = users;
		tools.send(res, rtn, 'JSON');

	});

});

router.get('/logout', function(req, res, next) {
	var rtn = new Rtn();

	User.find(function(err, users) {
		if( err ) {										//查询异常
			rtn.code = Rtn.ERROR_BUSINESS;
			rtn.error = err.message;
			rtn.data = err.errors || rtn.data;
			tools.send(res, rtn, 'JSON');
			return;
		}

		rtn.data = users;
		tools.send(res, rtn, 'JSON');

	});

});

module.exports = router;
