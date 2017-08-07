var tools = global.tools;
var express = tools.require('express');
var router = express.Router();

var Rtn = tools.require('/models/comm/Rtn');
var User = tools.require('/models/web/User');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('web/index', { title: 'biubiubiu~' });
});

module.exports = router;
