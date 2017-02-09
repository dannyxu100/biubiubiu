var express = tools.require('express');
var router = express.Router();

var User = tools.require('/models/User');
var Rtn = tools.require('/models/Rtn');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
