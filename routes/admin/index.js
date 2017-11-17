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
    try{
        fs.statSync( filepath );
        //如果可以执行到这里那么就表示存在了
        console.log('haode');
    }catch(e){
        //捕获异常
    }

    fs.writeFile('/public/dist/myless.less', params.data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('The file was saved!');
    });

    res.send('{"result":"TRUE"}');
});
router.get('/home', function(req, res, next) {
	res.render('home/index.ejs', { title: 'biubiubiu~' });
});

module.exports = router;
