$(function(){
    // 1.1 获取裁剪区域的 DOM 元素
    console.log(3444)
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 上传图谱
    $('#btnChooesImage').on('click',function(){
        $('#file').click()
    })

    // 为上传的绑定change时间
    $('#file').on('change',function(e){
        console.log(e)
        var filelist = e.target.files
        if(filelist.length === 0) {
            return layer.msg('请选择照片!')
        }

        // 1.拿到用户选择的文件
        var file = e.target.files[0]
        // 2.将文件转化为路径
        var newImgURL = URL.createObjectURL(file)
        // 3.将新图片进行展示w'w
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    $('#btnload').on('click',function(){
        // 拿到剪裁后的头像
        var dataURL = $image
        .cropper('getCroppedCanvas',{
            // 创建一个canvas画布
            width:100,
            height:100
        })
        // 将canvas画布上的内容,转化为base64格式的字符串
        .toDataURL('image/png')
        // 调用接口,把头像上传到服务器
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
                if(res.status !==0) return layer.msg('头像更换失败!')
                layer.msg('头像更换成功!')
                window.parent.getUserInfo()
            }
        })

    })
})