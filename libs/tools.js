var path = require('path');

var tools = {
	rootpath: path.join(__dirname, '../'),					//项目根目录
	require: function( userpath ){
		if( 0 === userpath.indexOf('/') ){					//绝对路径引入
			userpath = path.join(tools.rootpath, userpath);
		}
		// tools.log(userpath);
		try {
			return require( userpath );
		} catch( err ){
			throw new Error('tools.require 文档引用中异常: '+ userpath +'\n\n'+ err);
		}
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

	send: function( res, data, type ){
		if( 'JSON' === type ) {
			res.writeHead( 200, {'Content-Type': 'application/json;charset=utf-8'} );
			res.end( JSON.stringify(data) );
		} else {
			res.send( data );
		}
	},
	end: function( res, data, type ){
		tools.send( res, data, type );
		res.end();
	}
};

module.exports = tools;