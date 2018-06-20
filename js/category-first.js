$(function(){
    //1.发送ajax请求  请求一级分类数据
    //2.将数据渲染到页面中
  
    var page = 1;
    var pagesize = 5;
    var totalPage = 0;
    //获取数据
    getData();


    $('#prev').on('click',function(){
        page--;
        if(page < 1){
            page = 1;
            alert('已经是第一页了')
            return;
        }
        getData()
    })
    $('#next').on('click',function(){
        page++;
        if(page > totalPage){
            page = totalPage;
            alert('已经没有更多数据了')
            return;
        }
        getData()
    })
//获取数据
    function getData () {
        $.ajax({
            type:'get',
            url:`${APP.baseUrl}/category/queryTopCategoryPaging`,
            data: {
                page:page,
                pageSize:pagesize
            },
            success: function(response){
                var html = template('categoryFirstTpl',response);
                $('#categoryFirstBox').html(html);
                totalPage = Math.ceil(response.total / pagesize);
            }
        })
    }
})