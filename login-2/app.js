/**
* @file express+mongodb+jade
*/
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoConnect = require('connect-mongo')(session);

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

/*
* 从express 4开始，除了static模块，其它模块都拆分出去，当做单独的中间件
* 引用，像cookie-parser,body-parser等
*/
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client/public'));

/**
* 设置mongodb连接
* 这里只演示连接我们本地的mongodb
* @param {string} dbHost 连接数据库的域名
* @param {number} dbPort 连接数据库的端口
* @param {string} dbName 要链接哪个数据库
*/
var dbHost = process.env.dbHost || 'localhost';
var dbPort = process.env.dbPort || 27017;
var dbName = process.env.dbName || 'login-test';

dbConnect = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

// require 路由
require('./server/router')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('express 服务已经运行在'+ app.get('port')+ '端口');
})






