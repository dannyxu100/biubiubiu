var express 	= require('express');
var router 		= express.Router();

var tools		= global.tools;
var Rtn 		= tools.require('/models/comm/Rtn');
var User 		= tools.require('/models/home/User');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/remove', function(req, res, next) {
	var mobile = '13688382321';

	User.remove({mobile: mobile}, function(err, data) {
		if( data && data.result && 1 === data.result.ok ) {
			return Rtn.json(res, 'TRUE', data.result.n);

		} else if( err ) {
			return Rtn.error(res, '00002', err.toString());
		} else {
			return Rtn.error(res, '00003');
		}
	});

});

router.get('/list', function(req, res, next) {
	User.find({}, function(err, users) {
		if( users ) {
			return Rtn.json(res, 'TRUE', users);

		} else if( err ) {									//查询异常
			return Rtn.error(res, '00002', err.toString());
		} else {
			return Rtn.error(res, '00003');
		}
	});

});

router.get('/findone', function(req, res, next) {
	var id = req.params.id;

	User.find({ _id: id }, function(err, users) {
		if( users ) {
			return Rtn.json(res, 'TRUE', users);

		} else if( err ) {									//查询异常
			return Rtn.error(res, '00002', err.toString());
		} else {
			return Rtn.error(res, '00003');
		}
	});

});

//新增用户
router.post('/add', function(req, res, next) {
	var mobile = req.body.mobile,
		code = req.body.code,
		pwd = req.body.pwd,
		age = req.body.age,
		job = req.body.job;
	// var password = new mongoose.Types.ObjectId;

	if( !mobile ) {
		return Rtn.error(res, '10001');
	}
	if( !pwd ) {
		return Rtn.error(res, '10002');
	}
	if( !code ) {
		return Rtn.error(res, '10004');
	}

	//findOne方法,第一个参数数条件,第二个参数是字段投影,第三那个参数是回调函数
	User.findOne({mobile: mobile}, '_id', function(err, data){
		if( data ) {									//手机号已注册
			return Rtn.error(res, '10003');
		} else if( err ) {								//操作异常
			return Rtn.error(res, '00002', err.toString());
		} else {
			var newuser = new User({
				// code: new User.ObjectId,
				// age: 'abc',
				mobile: mobile,
				pwd: pwd,
				age: age,
				createtime: new Date(),
				job: job
			});
			//调用实体的实例的保存方法
			newuser.save(function(err2, data2) {
				if( data2 ) {
					return Rtn.json(res, 'TRUE', 1);

				} else if( err2 ) {
					return Rtn.error(res, '00002', err2.toString());
				} else {
					return Rtn.error(res, '00003');
				}
			});
		}
	});
});

module.exports = router;
