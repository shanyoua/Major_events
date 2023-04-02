$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth()+1)
        var d = padZero.getDate()
        
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
    }

    // 定义补零函数
    function padZero(n) {
        return n>9 ? n:'0'+n
    }

    // 定义一个查询的参数对象,将来请求数据的时候,需要将数据发送服务器
    var q = {
        pagenum:1,
        pagesize:5,
        cate_id:'',
        state:''
    }

    initTable()
    initCate()

    // 获取数据接口
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !==0) {
                    return layer.msg('获取数据失败!')
                }
                // 使用模板引擎渲染页面
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

  
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

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        // 获取选择的筛选
        var cate_id = $('[name=cate_id').val()
        var state = $('[name=state]').val()
        // 为查询参数对象q中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        //根据最新的筛选条件，重新渲染表格的数据
        initTable()


    })

    // 定义渲染分页的方法:
    function renderPage(total) {
        laypage.render({
            elem:'pageBox', // 分页容器的ID
            count:total, // 总数据条数
            limit:q.pagesize, // 每页显示几条数据
            curr:q.pagenum, // 设置默认被选中的分页
            layout:['count','limit','prev','page','next','skip'],
            limits:[5,10,20],
            // 点击页数触发
            // first控制触发方式
            jump:function(obj,first){
                console.log(obj.curr)
                // 把最新的页码值,赋值到q这个查询参数对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 根据最新的q获取对应的数据列表
                if(!first){
                    initTable()
                }
            }
        })
    }

    // 删除按钮
    $('tbody').on('click','.btn-delete',function(){
        // 获取删除按钮的个数
        var len = $('.btn-delete').length
        console.log(123)
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?',{icon:3,title:'提示'},function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status !==0){
                        layer.msg('删除失败!')
                    }
                    layer.msg('删除成功!')
                    if(len ===1){

                        q.pagenum = q.pagenum ===1? 1:q.pagenum-1
                    }
                    initTable()
                }
            })
            layer.close(index)
        })
    })

}) 