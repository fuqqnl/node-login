
var dbHandle = require('./module/dbHandle');
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('login'); 
    });
    // 进行登录
    app.post('/', function (req, res) {
        dbHandle.loginAccount({
            user: req.body['username'], 
            passwd: req.body['passwd']
        }, function (err, data) {
            if(!data) {
                res.status(400).send(err);
            } else {
                res.status(200).send(data);
            }
        })
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });
    // 进行注册
    app.post('/signup', function (req, res) {
        dbHandle.addNewAccount({
            user: req.body['username'],
            passwd: req.body['passwd'],
            favo: req.body['favorite'],
            email: req.body['email'],
            gender: req.body['gender']
        }, function (err){
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send('success');
            }
        });
    });
    //跳转到Home
    app.get('/home', function (req, res) {
        res.render('home');
    });
}

