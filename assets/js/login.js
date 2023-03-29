$(function(){
    // 点击“去注册账号”按钮
    $('#link_reg').on('click',function(){
        // console.log(123)
        $('.login-box').hide()
        $('.reg-box').show() 
    })

      // 点击“去登陆”按钮
      $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide() 
    })

    // 从 layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],

        // 校验密码
        repwd:function (value){
            // 拿到注册密码
            // 获取确认密码值
            // 判断两个值是否一致
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault()
        // 发起ajax的post请求
        var data =  {username:$('#form_reg [name=username').val(), password:$('#form_reg [name=password').val()}
        $.post('/api/reguser',data,
        function(res){
            if(res.status !== 0){
                return (layer.msg(res.message));
            }
            layer.msg('注册成功');
            // 自动跳转
            $('#link_login').click()
        })
    })

    // 监听登录表单事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败！')
                }
                console.log(res.token)
                layer.msg('登陆成功！')

                // 将登陆成功的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台
                location.href = 'index.html'
            }
        })

    })

})

