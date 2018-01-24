/**
* @file express+mongodb+jade
*/
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var mongoConnect = require('connect-mongo')(session);

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

app.use(session({
    secret: 'node-login', // 对session id相关的cookie进行签名
    name: 'connect.sid', // 存在cookie中的名字
    rolling: false, // 每个请求都重新设置一个 cookie，默认为 false
    // cookie的maxAge，单位是ms；httpOnly设置为true可以防止客户端修改cookie，进行攻击
    // 当设置了maxAge后，connect.sid这条cookie，只有在时间到了后才会会过期，在时间内，浏览器彻底关闭后再启动，connect.id的值也不会发生变化，
    // 也就是说，可以找到对应的那条服务端session
    // 如果不设置maxAge,浏览器彻底重启后，原来的connect.sid就会被清除。
    cookie: { path: '/', maxAge: 60*1000, httpOnly: true }, 
    resave: false, // 是否每次都重新保存会话,默认true
    saveUninitialized: false // 是否自动保存未初始化的会话，一般是false

}));

// require 路由
require('./server/router')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('express 服务已经运行在'+ app.get('port')+ '端口');
})






