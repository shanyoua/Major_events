$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格!'],
        samePwd:function(value) {
            if(value === $('[name=oldPwd]').val()) 
            {return '新旧密码不能相同!'}
        },
        rePwd:function (value) {
            if(value !== $('[name=newPwd').val()) 
            {return '新密码不一致!'}
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data: $(this).serialize(),
            success: function(res){
                if (res.status !== 0) {
                    return layer.msg('修改密码失败!')
                }
                layer.msg('密码修改成功,请重新登录!')
                // reset可重置,内置的方法,只能通过原生方法调用,jquery不行,因此需要[0]
                $('.layui-form')[0].reset()

                //重置密码后倒计时退出界面重新登录
                // location.href = 'login.html'
            }
        })
    })
})