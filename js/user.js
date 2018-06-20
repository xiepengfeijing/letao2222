//判断用户是否登录 进行登录拦截
$.ajax({
    type:'get',
    async:false,
    url:`${APP.baseUrl}/employee/checkRootLogin`,
    success: function(response){
        if(response.error){
            location.href = 'login.html'
        }
    }

})

$(function(){
    $.ajax({
        type:'get',
        url:`${APP.baseUrl}/user/queryUser`,
        data: {
            page:1,
            pageSize:100
        },
        success: function(response){
            // console.log(response)
           var html = template('userTpl',response);
           $('#userBox').append(html);
        }
    })

    $('#userBox').on('click','.changeStatus',function(){
        var id = $(this).data('user-id');
        var isDelete = $(this).data('user-isdelete');
        console.log(isDelete);
        var This = $(this);
        $.ajax({
            type:'post',
            url:`${APP.baseUrl}/user/updateUser`,
            data:{
                id:id,
                isDelete: isDelete == 1 ? 0 : 1
            },
            success: function(response){
                if(response.success){
                    // if(isDelete == 1){
                    //     This.html('启用').removeClass('btn-danger').addClass('btn-success');
                    // } else {
                    //     This.html('禁用').removeClass('btn-success').addClass('btn-danger');
                    // }
                    // console.log(isDelete);
                    // isDelete == 1?This.addClass('btn-success'):This.addClass('btn-danger');
                    // isDelete == 1?This.html('启用'):This.html('禁用');
                    location.reload();
                }else {
                    alert(response.message)
                }
            }
        })
    })

})