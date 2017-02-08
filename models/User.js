var base = tools.require('/models/Base');

var ObjectId = base.ObjectId;  
var UserScheme = new base.Schema({
		password:		String,				//密码  
		mobile:			String,				//手机  
		lastLoginTime:	Date,				//最后登陆时间  
		createTime: {						//创建时间  
			type:		Date,
			default:	Date.now
		}
});  
UserScheme.index({ mobile:1 },{ "background" : true });						//设置索引  
var UserEntity = base.mongoose.model('UserEntity', UserScheme, 'user');		//指定在数据库中的collection名称为user

exports.UserEntity  = UserEntity;											//导出实体