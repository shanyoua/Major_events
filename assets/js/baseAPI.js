// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用这个函数
$.ajaxPrefilter(function(options){
    // 请求时,将根路径拼接起来
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

})