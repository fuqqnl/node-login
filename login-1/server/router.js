
var mockData = require('./mongodb/mock');
module.exports = function (app) {
    // 根目录页面
    app.get('/', function (req, res) {
        res.render('login');
    });

    // 点击登录
    app.post('/', function (req, res) {
        // 传过来的数据根模拟数据库中的数据进行对比
        // ...实际上这里是去mongodb里查数据的过程
        mockData.forEach(function (item) {
            if (item.username === req.body['user'] && item.passwd === req.body['passwd']) {
                // 成功则跳转到home.html页面
                console.log('redirect');
                res.redirect('/home');
            } else {

            }
        })
    });

    // home页面
    app.get('/home', function (req, res) {
        res.render('home');
    });
    app.get('*', function (req, res) {
        res.render('404');
    });
}