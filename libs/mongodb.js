var CONFIG_DB = tools.require('/config/config.json').mongodb,
	mongoose = tools.require('mongoose');

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function( msg ) {
	tools.log('数据库连接错误:'+ msg, 'ERROR');
});
db.once('open', function() {
	tools.log('数据库连接成功!');
});




var strconn = 'mongodb://';
// if(  '' !== CONFIG_DB.username && '' !== CONFIG_DB.password ){
	// strconn += CONFIG_DB.username +':'+ CONFIG_DB.password +'@';
// }
strconn += CONFIG_DB.server +':'+ CONFIG_DB.port +'/'+ CONFIG_DB.database;
mongoose.connect(strconn, {
  user: CONFIG_DB.username,
  pass: CONFIG_DB.password
});

exports.mongoose = mongoose;				//导出mongoose对象