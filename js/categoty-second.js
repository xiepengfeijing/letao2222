$(function(){
    //获取二级分类页面的数据
    
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    getData();
    $('#nextBtn').on('click',function(){
        page++;
        if(page > totalPage){
            alert('已没有更多数据');
            page = totalPage;
           
        } 
        getData();
    })
    $('#prevBtn').on('click',function(){
        page--;
        if(page < 1){
            alert('已经是第一页');
            page = 1;
        }
        getData();
    })
   
    function getData () {
        $.ajax({
            url:`${APP.baseUrl}/category/querySecondCategoryPaging`,
            type:'get',
            data: {
                page:page,
                pageSize:pageSize 
            },
            success:function(response){
                    var html = template('categorySecond',{
                        list:response,
                        api:APP.baseUrl
                    })
                    $('#categorySecondBox').html(html);
                    totalPage = Math.ceil(response.total / pageSize);
                    // alert(response.message);
               
            }
        })
    }

    //获取一级分类数据 渲染在弹出框中
    $.ajax({
        type:'get',
        url:`${APP.baseUrl}/category/queryTopCategoryPaging`,
        data:{
            page:1,
            pageSize:100000
        },
        success:function(response){
            console.log(response);
            var html = template('categoryFirstTpl',response);
            $('#categoryFirstBox').html(html);
        }
    })

var brandLogo = '';
    $('#fileUpLoad').fileupload({
        dataType: 'json',
        done: function(e,data){
            console.log(data);
            brandLogo = data._response.result.picAddr;
            var imgUrl =APP.baseUrl + data._response.result.picAddr;
            $('#imgPreview').attr('src',imgUrl);
        }
    })
    //  当添加二级分类按钮被点击的时候
    $('#categorySecondBtn').on('click',function(){
        var brandName = $('#brandName').val();
        var categoryId = $('#categoryFirstBox').val();
        var hot = 1;
        $.ajax({
            type:'post',
            url:`${APP.baseUrl}/category/addSecondCategory`,
            data:{
                brandName,
                categoryId,
                brandLogo,
                hot
            },
            success: function(response){
                console.log(response);
                if(response.success){
                    alert('添加二级分类成功')
                    $('#category-second').css({
                        display: 'none'
                    })
                    $('.modal-backdrop').remove();
                }
            }
        })
    })
})