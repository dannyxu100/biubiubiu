var express = require('express');
var router = express.Router();

var User = tools.require('/models/User');
var Rtn = tools.require('/models/Rtn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
	var mobile = '13688382321';
	var password = '123456';
	
	var rtn = new Rtn();  
	
	//findOne方法,第一个参数数条件,第二个参数是字段投影,第三那个参数是回调函数  
	User.findOne({mobile: mobile}, '_id', function(err, user){
		if(err){										//查询异常  
			rtn.code = Rtn.ERROR_SERVER;  
			rtn.error = "服务器异常";
			tools.send(res, rtn, 'JSON');
			return;  
		}
		if (user){										//手机号已注册  
			rtn.code = Rtn.ERROR_BUSINESS;  
			rtn.error = "手机号已注册";  
			tools.send(res, rtn, 'JSON');
			return;  
		}

		var newuser = new User({
			// code: new User.ObjectId,
			mobile: mobile,
			password: password,
			createTime: new Date
		});
		//调用实体的实例的保存方法  
		newuser.save(function(err, user){
			if(err){									//保存异常  
				// tools.log(err);
				// tools.log(err.message);
				// tools.log(err.errors);
				rtn.code = Rtn.ERROR_BUSINESS;
				rtn.error = err.message;
				rtn.data = err.errors;
				// tools.log(rtn);
				tools.send(res, rtn, 'JSON');
				return;  
			}

			res.send(rtn);//返回成功结果  
		});  
		
	});
});

router.get('/list', function(req, res, next) {
	var rtn = new Rtn();  
	
	User.find(function(err, users){
		if(err){										//查询异常  
			rtn.code = Rtn.ERROR_SERVER;  
			rtn.error = "服务器异常";  
			tools.send(res, rtn, 'JSON');
			return;  
		}
		
		rtn.data = users;  
		tools.send(res, rtn, 'JSON');

	});
	
});

router.get('/findone', function(req, res, next) {
	var rtn = new Rtn();  
	
	User.find(function(err, users){
		if(err){										//查询异常  
			rtn.code = Rtn.ERROR_SERVER;  
			rtn.error = "服务器异常";  
			tools.send(res, rtn, 'JSON');
			return;  
		}
		
		rtn.data = users;  
		tools.send(res, rtn, 'JSON');

	});
	
});

module.exports = router;
