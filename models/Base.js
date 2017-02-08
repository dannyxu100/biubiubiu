var mongodb = tools.require('/libs/mongodb');	//引入config中的mongodb对象

var mongoose = mongodb.mongoose;				//获取mongoose

var Base = {
	mongodb:	mongodb,							//导出mongodb
	mongoose:	mongoose, 							//导出mongoose
	Schema:		mongoose.Schema,					//导出Schema,以便快捷使用
	ObjectId:	mongoose.Schema.Types.ObjectId,		//导出ObjectId,以便快捷使用
	Mixed:		mongoose.Schema.Types.Mixed			//导出Mixed
};

module.exports = Base;