const tools       = global.tools;
const express     = tools.require('express'),
      path        = tools.require('path'),
      fs          = tools.require('fs'),
      router      = express.Router();

const Rtn         = tools.require('/models/comm/Rtn'),
      User        = tools.require('/models/home/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/index.ejs', { title: 'biubiubiu管理' });
});


function lessfont( basic ) {
    return [`@fontfamily-ios:-apple-system, sf_ui_textlight;
             @fontfamily-en:"ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial;
             @fontfamily-zh:"Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei";
             @fontfamily-sys:sans-serif;
             @fontfamily-def:~"@{fontfamily-ios}, @{fontfamily-en}, @{fontfamily-zh}, @{fontfamily-sys}";
             @fontfamily-title:inherit;
             @fontfamily-html:"Helvetica Neue", Helvetica, Arial, sans-serif;
             @fontfamily-icon:"iconfont";`];
}
function lesscontrol( basic ) {
    return [`@height-control:35px;
             @height-control-min:28px;
             @height-control-big:45px;
             @fontsize-control:14px;
             @fontsize-control-min:12px;
             @fontsize-control-big:16px;
             @padding-control-tb:8px;
             @padding-control-lr:18px;
             @padding-control-min-tb:6px;
             @padding-control-min-lr:14px;
             @padding-control-big-tb:10px;
             @padding-control-big-lr:30px;`];
}
function lessgrid( basic ) {
    return [`@grid-columns-12:12;
             @grid-columns-7:7;
             @grid-columns-5:5;
             @padding-grid-lr:2px;`];
}
function lesscolor( basic ) {
    let less = [];
    let color, colorkey, item, itemkey;

    for( colorkey in basic.colors ) {
        color = basic.colors[ colorkey ];
        for( itemkey in color.ladder ) {
            item = color.ladder[ itemkey ];
            if( item ) {
                less.push(`@color-${colorkey}-${itemkey}:rgb(${item.rgb});`);
            }
        }
    }

    less.push(`@color-def:@color-black-normal;
               @color-weak:@color-gray-darker;
               @color-title:inherit;
               @color-hr:@color-gray-lighter;
               @color-small:@color-gray-darker;
               @color-link:@color-theme-dark;
               @color-link-hover:@color-theme-darker;
               @bgcolor-def:@color-white-light;
               @bgcolor-weak:@color-white-normal;`);

    return less;
}

function getlesstext( basic ) {
    let less = [];
    less.push(`@prefix:${basic.prefix};`);

    return less.concat(
                lessfont(basic),
                lesscolor(basic),
                lessgrid(basic),
                lesscontrol(basic) ).join('\n');
}



router.post('/less', function(req, res, next) {
    let params = req.body;
    // console.log( params.data );

    //检查某个目录是否存在
    // var stat = fs.statSync(path.join(__dirname,'content'));
    // if( stat.isDirectory() ){                   //为true的话那么存在，如果为false不存在
            //TODO:
    // }

    let filepath = path.join(__dirname, '../../public/dist/myless.less');
    //检查某个文件是否存在
    fs.stat(filepath, (err, stats)=>{
        if( err ){
            console.log(err);
        }
        let basic = JSON.parse( params.data );
        fs.writeFile(filepath, getlesstext( basic ), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log('The file was saved!');
        });
        res.send('{"result":"TRUE"}');
    });
});


router.get('/home', function(req, res, next) {
	res.render('home/index.ejs', { title: 'biubiubiu~' });
});

module.exports = router;
