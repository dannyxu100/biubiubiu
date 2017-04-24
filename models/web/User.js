var Base = tools.require('/models/Base');

var UserSchema = new Base.Schema({
	code:			Base.ObjectId,
	password:		String,				//密码	
	mobile:			String,				//手机
	age:			Number,
	lastLoginTime:	Date,				//最后登陆时间  
	createTime: {						//创建时间  
		type:		Date,
		default:	Date.now
	},
	job: 			Base.Mixed
	
}, {
	// _id: false,
	// autoIndex: false 
});


// UserSchema.index({ mobile: true },{ "background": true });	//设置索引
var User = Base.mongoose.model('User', UserSchema, 'user');		//指定在数据库中的collection名称为user

module.exports = User;											//导出实体