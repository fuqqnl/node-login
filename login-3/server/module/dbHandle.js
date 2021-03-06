/**
* 对mongodb的所有增删改查
*/
var MongoDB = require('mongodb').Db;
var Server  = require('mongodb').Server;
var moment = require('moment');

/*设置mongo的host/port/数据库名称*/
var dbHost = process.env.dbHost || 'localhost';
var dbPort = process.env.dbPort || 27017;
var dbName = process.env.dbName || 'db-login';

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
    if (e) {
        console.log(e);
    } else {
        console.log('mongo :: connected to database :: "'+dbName+'"');
    }
});
// 选择文档
var accounts = db.collection('accounts');

// 新建账号
exports.addNewAccount = function (newData, callback) {
    // 首先看用户名是否已存在
    accounts.findOne({user: newData.user}, function (err, res) {
        if (res) {
            var errMsg = '账号已存在';
            callback({errno: -1, msg: errMsg});
        } else {
            // 其次看email是否已存在
            accounts.findOne({email: newData.email}, function (err, res) {
                // res是通过查询得到的符合的那条数据
                var errMsg = 'email已被注册';
                if (res) {
                    callback({errno: -2, msg: errMsg});
                }
                // January 19th 2018, 5:34:20 pm
                newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                // 插入到数据库
                /*
                * insert({},opt)
                * otp=> ordered: false 表示不会有序插入。 unordered 无序的插入会在遇到异常时继续执行，有序插入不同，碰到异常时它会直接返回，不会继续插入数组中其余的文档记录
                */
                accounts.insert(newData,{ordered: true}, callback({errno: 0, msg: 'success'}));

            });
        }
    });
}

// 登录账号
exports.loginAccount = function (newData, callback) {
    // 去数据库中匹配账号密码是否正确
    accounts.findOne({user: newData.user}, function (err,res) {
        if (!res) {

            callback();
        } else {
            var dbPasswd = res.passwd;
            var dataRes = {user: res.user};
            dbPasswd === newData.passwd 
            ? callback(dataRes) 
            : callback()
        }
    })
}

// 自动登录
exports.autoLogin = function (user, passwd, callback) {
    accounts.findOne({user: user}, function (err, res) {
        if (res) {
            passwd === res.passwd ? callback(res) : callback(null);
        } else {
            callback(null);
        }
    })
}














