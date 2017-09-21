const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');
// 订阅事件，当 event.action === 'reload' 时执行页面刷新
// app.js中 派发的reload事件吧
hotClient.subscribe(function (event) {
    if ('reload' === event.action) {
        window.location.reload();
    }
});