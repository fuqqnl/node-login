var url = require('url');
var dbHandle = require('./module/dbHandle');

module.exports = function (app) {
    app.get('/', function (req, res) {
        if (req.cookies.user === undefined || req.cookies.passwd === undefined) {
            res.render('login'); 
        } else {
            //进行自动登录
            dbHandle.autoLogin(req.cookies.user, req.cookies.passwd, function (data) {
                if(data) {
                    res.redirect('/home');
                } else {
                    res.render('login');
                }
            })
        }
        
    });
    // 进行登录
    app.get('/userLogin', function (req, res) {
        var parseReq = url.parse(req.url, true).query;
        dbHandle.loginAccount({
            user: parseReq.user,
            passwd: parseReq.passwd
        }, function (data) {
            // 如果登录成功
            if (!!data) {
                // 将已有session初始化
                req.session.regenerate(function (err) {
                    if (err) {
                        return res.json({errno: 2001, msg: 'session初始化失败，登录失败'});
                    }
                    req.session.loginUser = data.user;
                    res.json({errno: 0, msg: 'success'});
                })
            } else {
                res.json({errno: -1, msg: '用户名或密码错误'});
            }
            /*
            * 自动登录
            * 这里的user和passwd是明文的，在正式项目中应该进行加密，比如md5
            */
            if (parseReq.isRemind === 'true') {
                res.cookie('user', parseReq.user, {maxAge: 24*60*60*1000});
                res.cookie('passwd', parseReq.passwd, {maxAge: 24*60*60*1000});
            }
        })
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });
    // 进行注册
    app.post('/newAccount', function (req, res) {
        dbHandle.addNewAccount({
            user: req.body['user'],
            passwd: req.body['passwd'],
            favo: req.body['favo'],
            email: req.body['email'],
            gender: req.body['gender']
        }, function (data){
            res.json(data);
        });
    });
    //跳转到Home
    app.get('/home', function (req, res) {
        console.log('req.session', req.session);
        res.render('home', {
            name: req.session.loginUser
        });
    });
}

