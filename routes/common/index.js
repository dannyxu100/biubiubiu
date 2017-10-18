const tools       = global.tools;
const express     = tools.require('express'),
      router      = express.Router();

const Rtn         = tools.require('/models/comm/Rtn'),
      User        = tools.require('/models/home/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/index.ejs', { title: 'biubiubiu管理' });
});
router.get('/admin', function(req, res, next) {
    res.render('admin/index.ejs', { title: 'biubiubiu管理' });
});
router.get('/home', function(req, res, next) {
	res.render('home/index.ejs', { title: 'biubiubiu~' });
});

module.exports = router;
