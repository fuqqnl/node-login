/**
* @file 用ajax进行form表单的提交
*/
(function () {

    $('body').on('click', '#login .button-sign-in', function () {
        // 登录
        var username = $('.username').val();
        var password = $('.passwd').val();
        var remenber = $('#remenber').is(':checked');
        var url = '/userLogin';
        $.ajax({
            url: url,
            data: {user: username, passwd: password,isRemind: remenber},
            type: 'get', // 这里用get只是为了演示node如何处理get请求，真正项目中要用post
            success: function (data) {
                if (data.errno === 0) {
                    location.href="/home";
                } else {
                    alert(data.msg);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    })
    .on ('click', '#signup .button-sign-up', function () {
        // 注册
        var user = $('input[name="username"]').val(),
            passwd = $('input[name="passwd"]').val(),
            fav = $('input[name="favorite"]').val(),
            email = $('input[name="email"]').val(),
            gender = $('input[name="gender"]:checked').val();
        var postData = {user: user, passwd: passwd, favo: fav, email: email, gender: gender};
        var url = '/newAccount';
        $.ajax({
            url: url,
            data: postData,
            type: 'post',
            success: function (data) {
                alert('注册成功，请回登录页面进行登录');
                location.href='/';
            },
            error: function (msg) {
                console.log('msg是', msg);
            }
        })
    })
})();




