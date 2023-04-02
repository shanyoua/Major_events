$(function(){

    var layer = layui.layer
    var form = layui.form


    initCate()
    // 初始化富文本编辑器
    initEditor()

    // 获取分类列表
     function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success: function(res) {
                if(res.status !==0) return layer.msg("获取分类失败!")
                // 调用模板引擎自动生成分类
                console.log(res)
                var htmlStr = template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                // 通知layui,重新渲染表单结构
                form.render()
            }
        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')
    
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    //为选择的按钮绑定点击事件处理函数
    $('#btnChooseImage').on('click',function(){
        $('#coverFile').click()
    })

    // 监听图片change事件
    $('#coverFile').on('change',function(e){
        var files = e.target.files
        if(files.length === 0) {
            return layer.msg('获取图片失败!')
        }
        // 根据文件,创建对应的URL地址
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 文章状态
    var art_state = '已发布'

    // 为存为草稿按钮,绑定点击
    $('#btnSave2').on('click',function(){
        art_state = '草稿'
    })

    $('#form-pub').on('submit',function(e){
        e.preventDefault()
        // 基于填写的表单,快速创建一个FormData对象
        var fd = new FormData($(this)[0])
        // 将状态加进来,存到fd中
        fd.append('state',art_state)

        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {       
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
                // 将所有数据发起ajax请求
                // fd.forEach(function(f,k){
                //     console.log (k,f)
                // })
                publishArticle(fd)
            })
    })
    
    function publishArticle(fd) {
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data: fd,
            // 注意,如果向服务器提交的是FormData格式的数据
            // 必须添加以下两个配置项
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status !==0){
                    return layer.msg('发布文章失败!')
                }
                layer.msg('发布文章成功!')
                location.href=('\art_list.html')
            }
        })
    }

})