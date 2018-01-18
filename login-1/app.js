
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cons = require('consolidate');

var app = express();
/**
* 设置app端口、视图、模板引擎
*/
app.engine('html', cons.swig);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'html');

/**
* 加载全局中间件
* 解析cookie
* 解析body（post请求）
* 设置静态服务路径
*/
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client/public'));
// 加载路由
require('./server/router')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
})




