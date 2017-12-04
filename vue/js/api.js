import axios            from 'axios';
// import Message          from '_IVIEW_/message';
// import Modal            from '_IVIEW_/modal';
// import Pinyin           from './pinyin';
// import MD5              from './md5';
/*
//                    _ooOoo_
//                   o8888888o
//                   88" . "88
//                   (| -_- |)
//                    O\ = /O
//                ____/`---'\____
//              .   ' \\| |// `.
//               / \\||| : |||// \
//             / _||||| -:- |||||- \
//               | | \\\ - /// | |
//             | \_| ''\---/'' | |
//              \ .-\__ `-` ___/-. /
//           ___`. .' /--.--\ `. . __
//        ."" '< `.___\_<|>_/___.' >'"".
//       | | : `- \`.;`\ _ /`;.`/ - ` : | |
//         \ \ `-. \_ __\ /__ _/ .-` / /
// ======`-.____`-.___\_____/___.-`____.-'======
//                    `=---='
//
// .............................................
//          佛祖保佑             永无BUG
*/

let MAX_ARRAY_INDEX     = Math.pow(2,53)-1,                  //js数组最大索引号
    toString            = window.toString,
    viewUtil            = window.viewUtil,
    dr                  = window.dr,
    QUERY_SERVICE       = window.QUERY_SERVICE,
    SERVICE_PREFIX      = window.SERVICE_PREFIX,
    uploadApi4base64    = window.uploadApi4base64,
    uploadPath          = window.uploadPath,
    createfolderApi     = window.createfolderApi,
    rtype               = window.rtype,
    rid                 = window.rid,
    nowCompanyId        = window.nowCompanyId;

//vue通用api插件
const api = {
    //类型判断
    //数组
    isarray: Array.isArray || function( target ) {
        return toString.call(target) === '[object Array]';
    },
    //类数组
    isarraylike( target ) {
        let len = target && target.length;
        return len && 'number'===typeof len && 0 <= len && len <= MAX_ARRAY_INDEX;
    },
    isboolean( target ) {
        return target === true || target === false || toString.call(target) === '[object Boolean]';
    },
    isdate( target ) {
        return toString.call( target ) === '[object Date]';
    },
    isnumber( target ) {
        return typeof (target) === 'number';
    },
    isstring( target ) {
        return typeof (target) === 'string';
    },
    isfunction( target ) {
        return typeof (target) === 'function';
    },
    //普通对象
    isobject( target ) {
        return typeof(target) === 'object';
    },
    //键值对象
    isplainobject( target ) {
        return target && api.isobject(target) && Object.getPrototypeOf(target) === Object.prototype;
    },

    //判断某值是否存在于对象类型数组的某属性
    hasvalue( obj, key, value ) {
        let res = false;
        api.each( obj, ( item, i )=>{
            if( item[key] && item[key] === value ) {
                res = true;
                return false;
            }
        });
        return res;
    },
    //判断对象是否包含某直接属性（非原型）
    haskey( obj, key ) {
        return obj !== null && hasOwnProperty.call(obj, key);
    },
    //获取对象所有属性名
    allkeys( obj ) {
        if ( !api.isobject(obj) ) {
            return [];
        }
        let keys = [], key;
        for (key in obj){
            keys.push(key);
        }
        return keys;
    },
    //获取对象自有属性名（不包含原型属性）
    keys( obj ) {
        if ( !api.isobject(obj) ) {
            return [];
        }
        if ( Object.keys ) {
            return Object.keys(obj);
        }
        let keys = [], key;
        for (key in obj){
            if( api.haskey(obj, key) ){
                keys.push(key);
            }
        }
        return keys;
    },
    //获取对象自有属性值（数组）
    values( obj ) {
        let keys = api.keys(obj),
            len = keys.length,
            i = 0,
            arr = Array(len);

        for (; i < len; i++) {
            arr[i] = obj[ keys[i] ];
        }
        return arr;
    },
    //对象属性扩展覆盖（同jQuery/Angularjs）
    //放弃使用Object.assign, 因为Object.assign只能覆盖一层，不能深度扩展
    //return Object.assign.apply( (arguments.length > 0 ? arguments[0] : this), arguments);
    extend: function( /*isdeep,*/ obj ) {
        let len = arguments.length, idx=1, isdeep=false;
        if ( len < 2 || obj === null ){
            return obj;
        }
        if( api.isboolean(arguments[0]) ) {
            isdeep = arguments[0];
            obj = arguments[1];
            idx++;
        }
        let source, keys, proplen, i, key, iscopyarr, clone;
        for (; idx<len; idx++) {                                        //多对象
            source = arguments[idx];                                    //扩展目标对象
            keys = api.allkeys(source);
            proplen = keys.length;
            for (i=0; i<proplen; i++) {
                key = keys[i];
                if ( source[key] === obj ) {                            //防止引用对象包含关系，导致死循环
                    continue;
                }
                if ( isdeep && ( api.isplainobject(source[key]) || (iscopyarr=api.isarray(source[key])) )) {
                    if( iscopyarr ) {
                        iscopyarr = false;
                        clone = obj[key] && api.isarray(obj[key]) ? obj[key] : [];
                    } else {
                        clone = obj[key] && api.isPlainObject(obj[key]) ? obj[key] : {};
                    }
                    obj[key] = api.extend( isdeep, clone, source[key] );
                } else if ( void 0 !== source[key] ) {
                    obj[key] = source[key];
                }
            }
        }
        return obj;
    },
    //拷贝
    copy( target, isdeep=true ) {
        let clone;
        if( api.isarray(target) ){
            clone = [];
        } else {
            clone = {};
        }
        return api.extend(isdeep, clone, target);
    },
    //遍历工具，dataset可以是数组和对象
    //回调函数 fn( item, index|key, dataset);
    // break----用return false;
    // continue --用return ture;
    each( dataset, fn, context ) {
        let callback = 'undefined' === typeof context ? fn : function(value, index, collection) {
            return fn.call(context, value, index, collection);
        };
        let i, len, res;
        if ( api.isarraylike(dataset) ) {                                   //类数组
            i=0;
            len=dataset.length;
            for (; i<len; i++) {
                res = callback( dataset[i], i, dataset );
                if( false === res ) {
                    break;
                } else if( true === res ){
                    continue;
                }
            }
        } else {                                                            //键值对象
            let keys = api.keys( dataset );
            i=0;
            len=keys.length;
            for (; i<len; i++) {
                res = callback( dataset[keys[i]], keys[i], dataset );
                if( false === res ) {
                    break;
                } else if( true === res ){
                    continue;
                }
            }
        }
        return dataset;
    },
    //队列缓存对象生产器（返回一个缓存区对象）
    createcache( maxlen ) {
        let keys = [];
        function cache( key, value ){
            if( false !== maxlen && keys.push[ key+' ' ] > maxlen ){        //key加一个空格符，与原型属性做一下区分，避免原型属性被修改
                delete cache[ keys.shift() ];
            }
            if( 'undefined' !== typeof value ){
                return ( cache[ key+' ' ] = value );
            } else {
                return cache[ key+' ' ];
            }
        }
        return cache;
    },
    //降频处理器
    later( fn, delay, immediate ) {
        let timer;
        return function() {
            let context=this, args=arguments, callnow=immediate && !timer;
            clearTimeout(timer);
            timer = setTimeout(function() {
                if ( !immediate ) {
                    fn.apply( context, args );
                }
                timer = null;
            }, delay);
            if ( callnow ) {
                fn.apply( context, args );
            }
        };
    },

    //去掉字符串前后空格
    trim( str ) {
        return 'undefined' !== typeof str.trim ? str.trim() : str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //裁剪字符串
    substr( str, start, len ) {
        str = String(str).toString();
        start = start || 0;
        len = len || str.length;
        return str.substr(start, len);
    },
    //前置补零
    prefillzero( num, len ) {
        num = num.toString();
        while (num.length < len){
            num = '0' +num;
        }
        return num;
    },
    //获取文件后缀
    sufix( url, islower=true ) {
        url = url.substr( url.lastIndexOf('.')+1 );
        return true === islower ? url.toLowerCase() : url.toUpperCase();
    },
    //汉子转拼音
    pinyin( str,  isupper=false, isfirst=false ) {
        if( !str ){
            return str;
        }
        str = isfirst ? Pinyin.convert_first(str) : Pinyin.convert(str);
        return isupper ? str.toUpperCase() : str.toLowerCase();
    },

    //字符串转日期
    str2date( strdate ) {
        let arr = strdate.split(/[- \/:]/g) || [];
        arr[0] = arr[0] || 1986;
        arr[1] = arr[1] || 6;
        arr[2] = arr[2] || 1;
        arr[3] = arr[3] || 0;
        arr[4] = arr[4] || 0;
        arr[5] = arr[5] || 0;
        return new Date( arr[0], --arr[1], arr[2], arr[3], arr[4], arr[5] );
    },
    //日期格式化
    fmtdate( date, fmt='yyyy-MM-dd hh:mm:ss' ) {
        let o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    //获得日期对应的星期数
    getweekday( date ) {
        let map = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        if( api.isdate(date) ){
            return map[ date.getDay() ];

        } else if( api.isstring(date) ){
            date = date.split(/[- :]/g);
            date = new Date(date[0], --date[1], date[2]);
            return map[ date.getDay() ];

        } else {
            return '';
        }
    },
    //获得日期对应的星期数
    dateplus( date ) {
        if( api.isstring(date) ) {
            date = api.str2date(date);
        }
        return {
            self: date,
            text: api.fmtdate( date ),                      //字符串全日期
            time: date.getTime(),                           //整数时间戳
            y: date.getFullYear(),                          //年
            M: date.getMonth() + 1,                         //月
            d: date.getDate(),                              //日
            D: api.getweekday( date ),                      //星期
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            q: Math.floor((date.getMonth() + 3) / 3),       //季度
            S: date.getMilliseconds()                       //毫秒
        };
    },
    //日期加减
    // fmt = '-d5'; //五天前
    // fmt = '+d5'; //五天后
    // fmt = '-M5'; //五个月前
    // fmt = '+M5'; //五个月后
    adddate( date, fmt ) {
        let dateplus, matchs, mothed, type, value;
        dateplus = api.dateplus( date );

        matchs = fmt.match( /^([-+])([A-Za-z])(\d)*$/ );
        if( matchs && matchs[1] && matchs[2] && matchs[3] ) {
            mothed = matchs[1];
            type = matchs[2];
            value = matchs[3];

            switch( type ){
                case 'y':
                    dateplus.y += parseInt( mothed + value );
                    date.setFullYear( dateplus.y );
                    break;
                case 'M':
                    dateplus.M += parseInt( mothed + value );
                    date.setMonth( dateplus.M );
                    break;
                case 'd':
                    dateplus.d += parseInt( mothed + value );
                    date.setDate( dateplus.d );
                    break;
                case 'h':
                    dateplus.h += parseInt( mothed + value );
                    date.setHours( dateplus.h );
                    break;
                case 'm':
                    dateplus.m += parseInt( mothed + value );
                    date.setMinutes( dateplus.m );
                    break;
            }
            return date;
        } else {
            return false;
        }
    },

    //统一信息提示
    info() {
        // Message.info.apply(this, arguments);
        window.alert(arguments[0]);
    },
    success() {
        // Message.success.apply(this, arguments);
        window.alert(arguments[0]);
    },
    error() {
        // Message.error.apply(this, arguments);
        window.alert(arguments[0]);
    },
    confirm( content, fnok, fncancel, textok, textcancel ) {
        // Modal.confirm({
        //     content: '<span style="font-size: 18px;">'+ content +'</span>',
        //     okText: textok || '确定',
        //     onOk: fnok || function(){},
        //     cancelText: textcancel || '取消',
        //     onCancel: fncancel || function(){}
        // });
        if( confirm.apply(this, content) ){
            fnok && fnok();
        } else {
            fncancel && fncancel();
        }
    },

    //获得一个流水号
    nowid() {
        var now = new Date().getTime();
        now += window.g35user._id;
        return now;
    },
    //http工具
    http(){
        return axios.apply( this, arguments );              //可更换第三方支持promise的ajax工具
    },
    //数据统一接口
    ajax( url, opts, data ) {
        if (url === false) {
            url = QUERY_SERVICE;
        }
        if( !data ) {
            data = opts;
            opts = {};
        }
        let params = {
            method: 'post',
            url: url,
            data: data,
            responseType: 'json'
        };
        api.extend(params, opts);

        return api.http( params ).then(( result )=>{
            let res = result.data;
            if ( !res ) {
                return false;
            }
            if ( res && !!res.encode_str ) {
                try {
                    res = JSON.parse( dr(res.encode_str) );
                    // res = JSON.parse( MD5.hex(res.encode_str) );
                } catch (ex) {
                    api.error('数据错误！');
                    return false;
                }
            }
            if ( res.refresh ) {
                window.location.reload();
                return false;
            }
            if ( res.result === 'ServerError' ) {
                api.error('操作超时，请重试或刷新页面！');
                return false;
            }
            if ( res.result !== 'TRUE' ) {
                if ( res.result === 'FALSE' && res.errorcode === 'COMPANY_CRM_PAYED_TIME_EXPIRED' ) {
                    viewUtil.isCRMNoPayed();
                    return false;
                }
                if ( res.result === 'FALSE' && res.errorcode === 'ERROR_NO_AUTHORITY' ) {
                    if ($('#taskDetail').length) {
                        viewUtil.showSummary();
                    } else {
                        api.error('无权限查看相关内容');
                    }
                    return false;
                }
                if ( res.result === 'FALSE' && (res.errorcode === 'ERROR_BE_DELETED' || res.errorcode === 'be_deleted') ) {
                    api.error('内容已被删除');
                    return false;
                }
                if ( res.result === 'FALSE' && res.errorcode === 'ERROR_REPEATED' ) {
                    api.error('已有相关内容');
                    return false;
                }
                //续费已过期
                if ( res.result === 'FALSE' && res.errorcode === 'COMPANY_PAYED_TIME_EXPIRED' ) {
                    viewUtil.companyNoPayedBox();
                    return false;
                }
                if ( res.result === 'FALSE' && (res.msg === 'ERROR_DB_GAOXIN_DATA_EXIST') ) {
                    api.error('已存在相同数据，请勿重复提交！');
                    return false;
                }
                api.error('操作失败');
            }
            return res;
        }, ( res )=>{
            api.error('操作超时，请重试或刷新页面！');
        });
    },
    //
    get( url, opts ) {
        return api.ajax( url, { method: 'get' }, {} );
    },
    //
    post( url, opts, data ) {
        return api.ajax( url, { method: 'post' }, data );
    },

    //upyun上传接口
    //data = {policy, signature, file}
    ajaxupyun( url, data ) {
        let formData = new FormData(),
            nowid = api.nowid(),
            filedata = {
                nowid: nowid,
                filetype: data.file.type,
                size: data.file.size,
                file_nowid: nowid,
                file_name: data.file.name,
                file_url: ''
            };

        api.each( data, ( item, key )=>{
            formData.append( key, item );
        });

        let params = {
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        };

        return api.http( params ).then(( res )=>{
            // debugger;
            if ( 'string' === typeof res ) {
                res = JSON.parse(res);
            } else {
                res = res;
            }
            if ( 200 === res.code && 'ok' === res.message ) {
                let isimage = /image\/\w+/.test( res.mimetype );
                if ( isimage ) {
                    if ( res['image-width'] ) {
                        filedata.file_width = res['image-width'];
                        filedata.width = res['image-width'];
                    }
                    if ( res['image-height'] ) {
                        filedata.file_height = res['image-height'];
                        filedata.height = res['image-height'];
                    }
                    filedata.file_url = 'https://groups35-images.b0.upaiyun.com' + res.url.substr(0, 9) + encodeURIComponent( res.url.substr(9) ) + '!normal';
                    filedata.file_type = 'pic';
                    filedata.type = '1';

                } else {
                    filedata.file_url = 'https://groups35-notimage.b0.upaiyun.com' + res.url.substr(0, 9) + encodeURIComponent( res.url.substr(9) );
                    filedata.file_type = 'files';
                    filedata.type = '3';
                }
                return filedata;

            } else {
                api.error('云存储数据异常！');
            }

        }, ( res )=>{
            if( res && res.responseJSON ) {
                api.error( '云存储错误：'+ res.responseJSON.code +' - '+ res.responseJSON.message );
            }
        });
    },
    //保存附件文件信息
    savefile( filedata ) {
        let params = {
            httpType: 'post',
            serviceName: 'file',
            functionName: 'addToGroupOrP2P',
            user_id: '',
            token: '',
            company_id: nowCompanyId
        };
        params = api.extend( params, filedata );

        return api.ajax( false, params ).then(( res )=>{
            if ( res && 'TRUE' === res.result ) {
                res.data.created = '刚刚';        //返回新数据，未日期格式化
                return res.data;
            }
            else {
                api.error('保存附件失败！');
            }

        }, ( res )=>{
            // debugger;
            api.error('保存附件失败！');
        });
    },
    //上传附件
    //attachtype = msg|group|temp       //附件分类
    //attachdata = {type, id}           //分类信息
    uploadattach( file, attachtype, attachdata ) {
        let configtype = 'files';
        if ( /image\/\w+/.test(file.type) ) {
            configtype = 'images';
        }
        if ( /audio\/\w+/.test(file.type) ) {
            configtype = 'audio';
        }

        let params = {
            serviceName: 'file',
            functionName: 'getUploadInfoNoReturn',
            type: configtype,
            file_name: encodeURIComponent(file.name),
            service_params_order: ['type', 'file_name']
        };
        return api.ajax( false, params ).then(( res )=>{
            //获得upyun验证配置
            if ( res && 'TRUE' === res.result && res.data ) {
                res = res.data;

                let data = {
                    policy: res.policy,
                    signature: res.signature,
                    file: file,
                };
                return api.ajaxupyun( res.action, data );

            } else {
                api.error('upyun配置数据异常！');
            }

        }).then(( res )=>{
            //保存附件文件信息
            var filedata = {
                file_url: res.file_url,
                type: res.file_type,
                title: res.file_name,
                size: res.size,
                file_rtype: '',
                file_rid: '0'
            };

            if ( 'pic' === res.type ) {
                filedata.width = res.file_width;
                filedata.height = res.file_height;
            }

            if ( 'task' === attachtype ) {
                filedata.from = attachtype;
            }
            if( 'msg' === attachtype ){
                filedata.file_rtype = attachdata.type || rtype;     //rtype、rid兼容老代码的全局变量
                filedata.file_rid = attachdata.id || rid;
            }
            if ( 'group' === attachtype ) {
                filedata.file_rtype = attachdata.type;
                filedata.file_rid = attachdata.id;

                if ( 'task' !== attachtype ) {
                    filedata.from_group_id = attachdata.id;
                }
            }

            if ( 'p2p' === filedata.file_rtype ) {
                filedata.another_user_id = filedata.file_rid;
            }
            if ( 'all' === filedata.file_rtype ) {
                filedata.file_rid = 0;
                filedata.another_user_id = 0;
            }

            return api.savefile( filedata );

        });
    },
    //上传图片（不保存附件管理记录）
    uploadimage( src, rid, rtype ) {
        var params = {
            nowid: api.nowid(),
            img_src: src
        };
        if ( rid ) {
            params.rid = rid;
        }
        if ( rtype ) {
            params.rtype = rtype;
        }

        return api.ajax( SERVICE_PREFIX + 'upload/uploadCaptureOrDragImg', params);
    },
    //根据路径创建目录（本地服务器）
    createfolder( opt ) {
        if( api.isarray( opt.paths ) ){
            opt.paths = opt.paths.join('<+>');
        }

        var params = {
            httpType: 'post',
            serviceName: '',
            functionName: '',
            serviceURL: createfolderApi,            //上传API地址
            paths: opt.paths || ''
        };
        return api.ajax( false, params );
    },
    //上传文件（base64）
    uploadlocal4base64( opt ) {
        var params = {
            httpType: 'post',
            serviceName: '',
            functionName: '',
            serviceURL: uploadApi4base64,           //上传API地址
            host: uploadPath,                       //服务器地址
            imgdata: opt.imgdata,
            path: opt.path || '',
            filename: opt.filename || ''
        };
        return api.ajax( false, params );
    },
    //已上传文件列表
    getfiles( filetype='file', page=1, limit=15 ){
        let image_only;
        switch( filetype ){
            case 'file':
                image_only = 0;
                break;
            case 'pic':
                image_only = 1;
                break;
        }

        let params = {
            serviceName: 'file',
            functionName: 'getItemsByUserId',
            user_id: '',
            token: '',
            company_id: nowCompanyId,
            limit: limit,
            page: page,
            image_only: image_only,
            service_params_order: ['user_id', 'token', 'company_id', 'limit', 'page', 'image_only']
        };
        return api.ajax( false, params );
    },
    //切换图片upyun尺寸
    imagemode( url, mode ) {
        if( !url || !mode ) {
            return url;
        }
        if( 'NORMAL' === mode ) {
            return url.replace(/\!\w*/, '!normal');
        } else if( 'THUMBNAIL' === mode ) {
            return url.replace(/\!\w*/, '!thumbnail');
        } else if( 'ORIGIN' === mode ) {
            return url.replace(/\!\w*/, '');
        }
    },

    //获取项目详情
    getprojectdetail( projectid ) {
        let params = {
            user_id: '',
            token: '',
            serviceName: 'project',
            functionName: 'getProjectInfo',
            httpType: 'post',
            project_id: projectid,
            tiny: 0
        };
        return api.ajax( false, params );
    },
    //获取项目阶段列表
    getprojectstages( projectid ) {
        let params = {
            httpType: 'get',
            serviceName: 'stage',
            functionName: 'getStageByProjectId',
            user_id: '',
            token: '',
            project_id: projectid,
            service_params_order: ['user_id', 'token', 'project_id']
        };
        return api.ajax( false, params );
    },
    //获取所有参与项目
    getprojects() {
        let params = {
            httpType: 'get',
            serviceName: 'project',
            functionName: 'getCanVisibleProjectList',
            user_id: '',
            token: '',
            company_id: nowCompanyId,
            service_params_order: ['user_id', 'token', 'company_id']
        };
        return api.ajax( false, params );
    },
    //获取所有客户
    getcustomers() {
        let params = {
            httpType: 'post',
            serviceName: 'customer',
            functionName: 'listOwnCustomers',
            user_id: '',
            token: '',
            limit: 99999,
            page: 1,
            company_id: nowCompanyId
        };
        return api.ajax( false, params );
    },

    //通过用户id获得用户
    getuser( id ) {
        return id && window.orgUsers[id] ? window.orgUsers[id] : null;
    },
    //筛选用户
    queryusers( keywords, source ) {
        let res = [];
        keywords = keywords.toUpperCase();
        if (keywords !== '') {
            api.each(source, function ( user, index ) {
                if ( user.nickname_en && -1 < user.nickname_en.replace('/,/g', '').toUpperCase().indexOf(keywords) ) {
                    res.push(user);
                    return true;
                } else if ( user.nickname && -1 < user.nickname.replace('/,/g', '').toUpperCase().indexOf(keywords) ) {
                    res.push(user);
                    return true;
                }
            });
        }
        return res;
    },

    //向pomelo服务器发送消息
    send_comment( opt ) {
        let params = {
            httpType: 'post',
            serviceName: 'task',
            functionName: 'addComment',
            user_id: '',
            token: '',
        };
        if( opt.type ){
            params.sub_type = opt.type;
        }
        if( opt.data ){
            params.data = opt.data;
        }

        return api.ajax( false, params ).then(( res ) => {
            if( res && res.result && 'TRUE'===res.result ) {

            } else {
                //
            }
        }, ( res ) => {
            //
        });
    }
};
//扩展部分
api.extend(api, {
    //创建一个全局缓存队列
    cache: api.createcache(false)
});



//懒加载组件
function findvmfromfrag(frag) {
    let node = frag.node;
    if (frag.end) {
        while (!node.__vue__ && node !== frag.end && node.nextSibling) {
            node = node.nextSibling;
        }
    }
    return node.__vue__;
}
//扩展部分
api.extend(api, {
    install( Vue, options ) {
        Vue.$fn = api;
        Vue.prototype.$fn = api;

        Vue.directive('floaded', {
            bind () {
                // debugger;
                // console.log(1111111111);
                // console.log($('#projectprogress-ganttbox').length);
            },
            update () {
                // debugger;
                // console.log(3333333333);
                // console.log($('#projectprogress-ganttbox').length);
            },
            unbind () {
                // debugger;
                // console.log(5555555555);
                // console.log($('#projectprogress-ganttbox').length);
            }
        });

        //可编辑元素 contenteditable="true"
        Vue.directive('edit', {
            twoWay: true,
            bind: function () {
                this.handler = function () {
                    this.set(this.el.innerHTML);
                }.bind(this);
                this.el.addEventListener('keyup', this.handler);        //每次输入内容后，重新双向绑定
            },
            update: function (newValue, oldValue) {
                this.el.innerHTML = newValue || '';
            },
            unbind: function () {
                this.el.removeEventListener('keyup', this.handler);
            }
        });

        //懒加载组件
        const FragmentFactory = Vue.FragmentFactory;
        const { createAnchor, replace } = Vue.util;
        Vue.directive('lazy', {
            terminal: true,
            bind () {
                // this.INITED = false;
                this.anchor = createAnchor('v-if');
                replace(this.el, this.anchor);
            },
            update (value) {
                if (this.INITED) { return; }
                window.setTimeout(() => {
                    this.insert();
                    this.updateref();
                    this.INITED = true;
                }, value || 0);
            },
            unbind () {
                if( this.frag ) {
                    this.frag.destroy();
                }
            },
            // insert dom
            insert () {
                if ( !this.factory ) {
                    this.factory = new FragmentFactory(this.vm, this.el);
                }
                this.frag = this.factory.create(this._host, this._scope, this._frag);
                this.frag.before(this.anchor, !this.modifiers['no-animation']); //multiBefore(target, withTransition)
            },
            // update v-ref
            updateref () {
                let ref = this.descriptor.ref;
                if (!ref) { return; }

                let hash = (this.vm || this._scope).$refs,
                    refs = hash[ref],
                    key = this._frag.scope.$key;

                if (!refs) { return; }

                if (Array.isArray(refs)) {
                    refs.push(findvmfromfrag(this._frag));
                } else {
                    refs[key] = findvmfromfrag(this._frag);
                }
            }
        });
    }
});
export default api;
