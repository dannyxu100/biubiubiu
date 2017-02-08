var express = tools.require('express');
var router = express.Router();

var Rtn = tools.require('/models/Rtn');
var UserEntity = tools.require('/models/User').UserEntity;

/* GET home page. */
router.get('/', function(req, res, next) {
	var mobile = '13688387776';
	var password = '123456';
	
	var rtn = new Rtn();  
	
	//findOne方法,第一个参数数条件,第二个参数是字段投影,第三那个参数是回调函数  
	UserEntity.findOne({mobile: mobile}, '_id', function(err,user){
		if(err){										//查询异常  
			rtn.code = rtn.EXCEPTION_ERROR;  
			rtn.error = "服务器异常";  
			res.send(rtn);  
			return;  
		}  

		if (user){										//手机号已注册  
			rtn.code = rtn.BUSINESS_ERROR;  
			rtn.error = "手机号已注册";  
			res.send(rtn);  
			return;  
		}  

	});
	
	
	var registerUser = new UserEntity({mobile:mobile, password:password});
	
	//调用实体的实例的保存方法  
	registerUser.save(function(err,row){
		if(err){										//服务器保存异常  
			rtn.code = rtn.EXCEPTION_ERROR;
			rtn.error = "服务器异常";  
			res.send(rtn);  
			return;  
		}  

		res.send(rtn);//返回成功结果  
	});  
	
	
	res.render('index', { title: 'Express' });
});

module.exports = router;
