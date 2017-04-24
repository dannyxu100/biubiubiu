var express = require('express');
var router = express.Router();

var User = tools.require('/models/User');
var Rtn = tools.require('/models/Rtn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
	var mobile = '13688382322';
	var password = '123456';
	// var password = new mongoose.Types.ObjectId;
	
	var rtn = new Rtn();  
	
	//findOne方法,第一个参数数条件,第二个参数是字段投影,第三那个参数是回调函数  
	User.findOne({mobile: mobile}, '_id', function(err, resdata){
		if( resdata ) {									//手机号已注册  
			rtn.code = Rtn.ERROR_BUSINESS;  
			rtn.error = "手机号已注册";  
			tools.send(res, rtn, 'JSON');
			return;  
			
		} else if( err ) {								//查询异常  
			rtn.code = Rtn.ERROR_BUSINESS;
			rtn.error = err.message;
			rtn.data = err.errors || rtn.data;
			tools.send(res, rtn, 'JSON');
			return;
			
		} else {
			var newuser = new User({
				// code: new User.ObjectId,
				// age: 'abc',
				mobile: mobile,
				password: password,
				createTime: new Date,
				job: {
					addr: '123',
					phone: '028-4584513',
					friends: ['小红','小明','啦啦啦']
				}
			});
			//调用实体的实例的保存方法  
			newuser.save(function(err, resdata) {
				if( resdata ) {
					rtn.data = 1;
					tools.send(res, rtn, 'JSON');
					return;
					
				} else if( err ) {
					rtn.code = Rtn.ERROR_BUSINESS;
					rtn.error = err.message;
					rtn.data = err.errors || rtn.data;
					tools.send(res, rtn, 'JSON');
					return;
					
				} else {
					rtn.code = Rtn.ERROR_UNKNOWN;  
					rtn.error = "未知的错误";
					tools.send(res, rtn, 'JSON');
					return;
				}
			});
		}

	});
});

router.get('/remove', function(req, res, next) {
	var mobile = '13688382321';
	
	var rtn = new Rtn();  
	
	User.remove({mobile: mobile}, function(err, resdata) {
		if( resdata && resdata.result && 1 === resdata.result.ok ) {
			rtn.data = resdata.result.n;
			tools.send(res, rtn, 'JSON');
			return;
			
		} else if( err ){ 
			rtn.code = Rtn.ERROR_BUSINESS;
			rtn.error = err.message;
			rtn.data = err.errors || rtn.data;
			tools.send(res, rtn, 'JSON');
			return;
			
		} else {
			rtn.code = Rtn.ERROR_UNKNOWN;  
			rtn.error = "未知的错误";
			tools.send(res, rtn, 'JSON');
			return;
		}
	});
	
});

router.get('/list', function(req, res, next) {
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

router.get('/findone', function(req, res, next) {
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
