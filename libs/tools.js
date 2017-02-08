var path = require('path');

var tools = {
	rootpath: path.join(__dirname, '../'),					//项目根目录
	require: function( userpath ){
		if( 0 === userpath.indexOf('/') ){					//绝对路径引入
			userpath = path.join(tools.rootpath, userpath);
		}
		console.log(userpath);
		return require( userpath );
		
	},
	log: function( msg, type ){
		if( 'ERROR' === type ){
			console.error(msg);
		} else if( 'WARN' === type ){
			console.warn(msg);
		} else {
			console.log(msg);
		}
	},
};

module.exports = tools;