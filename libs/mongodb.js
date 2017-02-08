var CONFIG_DB = tools.require('/config/config.json').mongodb,
	mongoose = tools.require('mongoose');

var db = mongoose.connection;
db.on('error', function( msg ){
	tools.log('数据库连接错误:'+ msg, 'ERROR');
});
db.once('open', function() {
	tools.log('数据库连接成功!');
});




var strconn = 'mongodb://';
if(  '' !== CONFIG_DB.username && '' !== CONFIG_DB.password ){
	strconn += CONFIG_DB.username +':'+ CONFIG_DB.password +'@';
}
strconn += CONFIG_DB.server +':'+ CONFIG_DB.port +'/'+ CONFIG_DB.database;
mongoose.connect(strconn);					//mongodb连接地址,demo为数据库名称,默认mongodb连接不需要密码

exports.mongoose = mongoose;				//导出mongoose对象