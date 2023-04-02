$(function(){
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
})

var layer = layui.layer

$('#btnLogout').on('click',function(){
layer.confirm('确认退出?',{icon:3,title:'提示'},
function(index) {
    // 1.清空token
    localStorage.removeItem('token')
    // 2.跳转登陆页面
    location.href='login.html'

    layer.close(index)
})
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            if(res.status !== 0) {
                return layui.layer.msg('获取信息失败!')
            }
            // 调用renderAvatar渲染用户头像 
            console.log(res)
            renderAvatar(res.data) 
        },

        // complete:function(res) {
        //     if(res.responseJSON.status !== 0 || res.responseJSON.message === '身份认证失败!') {
        //         console.log(123)
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登陆页面
        //         location.href = 'login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户头像
    if(user.user_pic !== null){
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } 
    else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}