$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if(value.length >= 6) {
                return '昵称长度需要在1~6字符之间'
            }
        }
    })

    initUserInfo()

    // 初始化用户信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0) {
                    return layer.message('获取用户信息失败!')
                }
                console.log(res)

                // 调用form.val为表单赋值
                form.val('formUserInfo',res.data)

            }
        })
    }

    // 重置表单
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
     $('.layui-form').on('submit',function(e){
        // 阻止表单默认提交行为
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0 ) {
                    return layer.msg('提交失败!')
                }
                
                layer.msg('用户信息修改成功!')

                // 调用父页面中的方法,重新渲染用户的头像禾用户的信息
                window.parent.getUserInfo()
            }
        })
     })
})
