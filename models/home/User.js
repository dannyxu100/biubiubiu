var tools 	= global.tools;
var Base 	= tools.require('/models/comm/Base');
var UserSchema = new Base.Schema({
	// _id:			Base.ObjectId,
	code:			String,
	pwd:			String,				//密码
	mobile:			String,				//手机
	age:			Number,
	logintime:		Date,				//最后登陆时间
	createtime: {						//创建时间
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