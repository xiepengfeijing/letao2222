$(function(){
 //1.为登录按钮添加点击事件
 //2.获取用户输入的用户名和密码
 //3.对用户输入的信息格式进行校验
 //4.如果校验成功，调用登录接口，实现登录
 $('#loginBtn').on('click',function(){
    var result = $('#loginForm').serializeToJson();
    if(!$.trim(result.username)){
        alert('请输入用户名');
        return;
    }
    if(!$.trim(result.password)){
        alert('请输入密码');
        return;
    }

    $.ajax({
        type:'post',
        url:`${APP.baseUrl}/employee/employeeLogin`,
        data:result,
        success:function(response){
            //判断登录状态
            if(response.success){
                alert('登录成功')
                location.href = "user.html"
            } else {
                alert(response.message)
            }
        }
    })
})

})