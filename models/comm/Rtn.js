var ErrorMap = tools.require('/models/comm/ErrorMap');

var Rtn = function(){
    this.type = Rtn.ERROR_NO;
    this.code = '';
    this.error = '';
    this.data = '';
};

Rtn.ERROR_NO = 0;						//无错误
Rtn.ERROR_ARGUMENT = 10;				//参数错误
Rtn.ERROR_BUSINESS = 20;				//业务错误
Rtn.ERROR_AUTH = 30;					//认证错误
Rtn.ERROR_SERVER = 50;					//服务器错误
Rtn.ERROR_NOTEXIT = 80;					//目标不存在错误
Rtn.ERROR_UNKNOWN = 90;					//未知的错误

Rtn.error = function( res, code, data ){
	var err = ErrorMap[code];
	var rtn = new Rtn();
	rtn.type = Rtn.ERROR_BUSINESS;
	rtn.code = err[0];
	rtn.error = err[1];
	if( data ){
		rtn.data = data;
	}
	tools.send(res, rtn, 'JSON');
};

Rtn.json = function( res, code, data ){
	var rtn = new Rtn();
	rtn.code = code;
	rtn.data = data;
	tools.send(res, rtn, 'JSON');
};

module.exports = Rtn;