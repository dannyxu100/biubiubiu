var tools = global.tools;

var CONFIG_DB = tools.require('/config/config.json').mongodb,
	mongoose = tools.require('mongoose'),
	strconn = 'mongodb://';

mongoose.Promise = global.Promise;
var conn = mongoose.connection;
conn.on('error', function( msg ) {
	tools.log('数据库连接错误:'+ msg, 'ERROR');
});
conn.once('open', function() {
	tools.log('数据库连接成功!');
});


strconn += CONFIG_DB.server +':'+ CONFIG_DB.port +'/'+ CONFIG_DB.database;
// mongoose.connect(strconn, {
//   user: CONFIG_DB.username,
//   pass: CONFIG_DB.password
// });



// mongodb://user:pass@localhost:port/database
// strconn += CONFIG_DB.username +':'+ CONFIG_DB.password +'@'+ CONFIG_DB.server +':'+ CONFIG_DB.port +'/'+ CONFIG_DB.database;
console.log(strconn);
mongoose.connect(strconn, {
    useMongoClient: true
    /* other options */
});
/*mongoose.connect('mongodb://'+CONFIG_DB.server, CONFIG_DB.database, CONFIG_DB.port, {
  user: CONFIG_DB.username,
  pass: CONFIG_DB.password
});*/


exports.mongoose = mongoose;				//导出mongoose对象