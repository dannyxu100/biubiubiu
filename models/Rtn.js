var Rtn = function(){
    this.code = Rtn.NO_ERROR;
    this.error = "";
    this.data = {};
};  

Rtn.ERROR_NO = 0;						//无错误  
Rtn.ERROR_ARGUMENT = 10;				//参数错误  
Rtn.ERROR_BUSINESS = 20;				//业务错误  
Rtn.ERROR_AUTH = 30;					//认证错误  
Rtn.ERROR_SERVER = 50;					//服务器错误  
Rtn.ERROR_NOTEXIT = 90;					//目标不存在错误

module.exports = Rtn;