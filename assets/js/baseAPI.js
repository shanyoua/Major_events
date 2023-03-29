// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用这个函数
$.ajaxPrefilter(function(options){
    // 请求时,将根路径拼接起来
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    if(options.url.indexOf('/my') !== -1) {
        options.headers = {Authorization:localStorage.getItem('token')||'' }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        if(res.responseJSON.status !== 0 || res.responseJSON.message === '身份认证失败!') {
            console.log(123)
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制跳转到登陆页面
            location.href = 'login.html'
        }
    }
    
})