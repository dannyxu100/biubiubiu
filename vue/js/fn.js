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
    QUERY_SERVICE       = window.QUERY_SERVICE;

let domdiv, defstyle;
domdiv = document.createElement('div');
document.documentElement.appendChild(domdiv);

//vue通用Fn插件
const Fn = {
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
        return target && Fn.isobject(target) && Object.getPrototypeOf(target) === Object.prototype;
    },

    //判断某值是否存在于对象类型数组的某属性
    hasvalue( obj, key, value ) {
        let res = false;
        Fn.each( obj, ( item, i )=>{
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
        if ( !Fn.isobject(obj) ) {
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
        if ( !Fn.isobject(obj) ) {
            return [];
        }
        if ( Object.keys ) {
            return Object.keys(obj);
        }
        let keys = [], key;
        for (key in obj){
            if( Fn.haskey(obj, key) ){
                keys.push(key);
            }
        }
        return keys;
    },
    //获取对象自有属性值（数组）
    values( obj ) {
        let keys = Fn.keys(obj),
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
        if( Fn.isboolean(arguments[0]) ) {
            isdeep = arguments[0];
            obj = arguments[1];
            idx++;
        }
        let source, keys, proplen, i, key, iscopyarr, clone;
        for (; idx<len; idx++) {                                        //多对象
            source = arguments[idx];                                    //扩展目标对象
            keys = Fn.allkeys(source);
            proplen = keys.length;
            for (i=0; i<proplen; i++) {
                key = keys[i];
                if ( source[key] === obj ) {                            //防止引用对象包含关系，导致死循环
                    continue;
                }
                if ( isdeep && ( Fn.isplainobject(source[key]) || (iscopyarr=Fn.isarray(source[key])) )) {
                    if( iscopyarr ) {
                        iscopyarr = false;
                        clone = obj[key] && Fn.isarray(obj[key]) ? obj[key] : [];
                    } else {
                        clone = obj[key] && Fn.isplainobject(obj[key]) ? obj[key] : {};
                    }
                    obj[key] = Fn.extend( isdeep, clone, source[key] );
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
        if( Fn.isarray(target) ){
            clone = [];
        } else {
            clone = {};
        }
        return Fn.extend(isdeep, clone, target);
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
        if ( Fn.isarraylike(dataset) ) {                                   //类数组
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
            let keys = Fn.keys( dataset );
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

        if( Fn.isdate(date) ){
            return map[ date.getDay() ];

        } else if( Fn.isstring(date) ){
            date = date.split(/[- :]/g);
            date = new Date(date[0], --date[1], date[2]);
            return map[ date.getDay() ];

        } else {
            return '';
        }
    },
    //获得日期对应的星期数
    dateplus( date ) {
        if( Fn.isstring(date) ) {
            date = Fn.str2date(date);
        }
        return {
            self: date,
            text: Fn.fmtdate( date ),                      //字符串全日期
            time: date.getTime(),                           //整数时间戳
            y: date.getFullYear(),                          //年
            M: date.getMonth() + 1,                         //月
            d: date.getDate(),                              //日
            D: Fn.getweekday( date ),                      //星期
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
        dateplus = Fn.dateplus( date );

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
        Fn.extend(params, opts);

        return Fn.http( params ).then(( result )=>{
            let res = result.data;
            if ( !res ) {
                return false;
            }
            if ( res && !!res.encode_str ) {
                try {
                    res = JSON.parse( dr(res.encode_str) );
                    // res = JSON.parse( MD5.hex(res.encode_str) );
                } catch (ex) {
                    Fn.error('数据错误！');
                    return false;
                }
            }
            if ( res.refresh ) {
                window.location.reload();
                return false;
            }
            if ( res.result === 'ServerError' ) {
                Fn.error('操作超时，请重试或刷新页面！');
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
                        Fn.error('无权限查看相关内容');
                    }
                    return false;
                }
                if ( res.result === 'FALSE' && (res.errorcode === 'ERROR_BE_DELETED' || res.errorcode === 'be_deleted') ) {
                    Fn.error('内容已被删除');
                    return false;
                }
                if ( res.result === 'FALSE' && res.errorcode === 'ERROR_REPEATED' ) {
                    Fn.error('已有相关内容');
                    return false;
                }
                //续费已过期
                if ( res.result === 'FALSE' && res.errorcode === 'COMPANY_PAYED_TIME_EXPIRED' ) {
                    viewUtil.companyNoPayedBox();
                    return false;
                }
                if ( res.result === 'FALSE' && (res.msg === 'ERROR_DB_GAOXIN_DATA_EXIST') ) {
                    Fn.error('已存在相同数据，请勿重复提交！');
                    return false;
                }
                Fn.error('操作失败');
            }
            return res;
        }, ( res )=>{
            Fn.error('操作超时，请重试或刷新页面！');
        });
    },
    //
    get( url, opts ) {
        return Fn.ajax( url, { method: 'get' }, {} );
    },
    //
    post( url, opts, data ) {
        return Fn.ajax( url, { method: 'post' }, data );
    },


    //获取渲染后的style
    getstyle(elem, prop) {
        let styles = elem.currentStyle? elem.currentStyle : window.getComputedStyle(elem, null);
        return prop ? styles[prop] : styles;
    },
    //设置样式
    setstyle(elem, styles) {
        let style, newstyles;
        newstyles = {};
        for( let prop in styles ){
            style = Fn.getstyle(elem, prop);
            if ( styles.hasOwnProperty(prop) && defstyle.hasOwnProperty(prop) ) {
                if( style !== styles[prop] ){
                    newstyles[prop] = styles[prop];
                }
            }
        }
        // Object.assign(elem.style, newstyles);           //统一设置，样式设置相互影响默认值，避免影响判断。
        Fn.extend(elem.style, newstyles);
    },

    //
    addclass(elem, classes) {
        classes = classes.split(' ');
        let oldClasses, newClasses;
        oldClasses = elem.className.split(' ');
        newClasses = oldClasses.concat();
        for( let i=0; i<classes.length; i++ ){
            if( -1 === oldClasses.indexOf(classes[i]) ){
                newClasses.push(classes[i]);
            }
        }
        elem.className = newClasses.join(' ');
    },
    //
    removeclass(elem, classes) {
        classes = classes.split(' ');
        let oldClasses, newClasses;
        oldClasses = elem.className.split(' ');
        newClasses = [];
        for( let i=0; i<oldClasses.length; i++ ){
            if( -1 === classes.indexOf(oldClasses[i]) ){
                newClasses.push(oldClasses[i]);
            }
        }
        elem.className = newClasses.join(' ');
    },
    //
    px(style) {
        let px = parseFloat(style);
        return isNaN(px) ? 0 : px;
    },
    //
    outerwidth(elem) {
        if( elem.outerWidth ){
            return elem.outerWidth();
        } else {
            let styles = Fn.getstyle(elem);
            return elem.offsetWidth + Fn.px(styles.marginLeft) + Fn.px(styles.marginRight);
        }
    },
    //
    outerheight(elem) {
        if( elem.outerHeight ){
            return elem.outerHeight();
        } else {
            let styles = Fn.getstyle(elem);
            return elem.offsetHeight + Fn.px(styles.marginTop) + Fn.px(styles.marginBottom);
        }
    }
};
//扩展部分
Fn.extend(Fn, {
    //创建一个全局缓存队列
    cache: Fn.createcache(false)
});


defstyle = Fn.getstyle(domdiv);
// defstyle = Object.assign({}, defstyle);
defstyle = Fn.copy(defstyle);
document.documentElement.removeChild(domdiv);



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
Fn.extend(Fn, {
    install( Vue, options ) {
        Vue.$fn = Fn;
        Vue.prototype.$fn = Fn;

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

                if (Fn.isarray(refs)) {
                    refs.push(findvmfromfrag(this._frag));
                } else {
                    refs[key] = findvmfromfrag(this._frag);
                }
            }
        });
    }
});
export default Fn;
