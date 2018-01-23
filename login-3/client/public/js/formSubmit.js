
(function(){
    // 注册
    $('#signup').ajaxForm({
        beforeSubmit: function (data) {
            console.log('beforeSbumit data is', data);
        },
        success: function (responseText) {
            window.location.href='/login';
        },
        error: function (e) {
            console.log('the error e is', e);
        }
    });

    // 登录
    $('#login').ajaxForm({
        beforeSubmit: function (data) {
            console.log('beforeSbumit data is', data);
        },
        success: function (responseText) {
            // 返回json数据
            console.log('返回了正确的jon数据', responseText);
            window.location.href = '/home';
        },
        error: function (e) {
            alert('密码或用户名有误');
        }
    });

})();



