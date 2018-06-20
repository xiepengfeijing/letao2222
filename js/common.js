$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});


var APP = {
	baseUrl:'http://fullstack.net.cn:3000'
}
//将表单数据以Json的形式返回
$.fn.serializeToJson = function(){
	var formArray = this.serializeArray();
	var result = {};
	formArray.forEach(function(item,index){
	  result[item.name] = item.value;
	
	})
	return result;
  }