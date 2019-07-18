var issend=true
$(".demon_Btn").click(function(e){
	var clickBtn=e.currentTarget;
	
	if($($(clickBtn).find(".titlebg2")).attr("src")=="img/title3.svg"){
		closeAllCanvas();
		$($(clickBtn).find(".titlebg2")).attr("src","img/title3_2.svg");
		$($(clickBtn).find(".demonstration")).css("display","block");
		console.log(123456);
	}else{
		$($(clickBtn).find(".titlebg2")).attr("src","img/title3.svg");
		$($(clickBtn).find(".demonstration")).css("display","none");
	};
	if(issend){
		//type:'解析动画1',fseasons:"春季",grade:"五年级",name:"第九讲",
		post_fen_shu('解析动画1',"暑期","六年级","第十四讲");
		issend=false
	}
	
})

function closeAllCanvas(){
	var titles=$(".titlebg2");
	for(var i=0;i<titles.length;i++){
		$(titles[i]).attr("src","img/title3.svg");
	}
	
	var canvas=$(".demonstration");
	for(i=0;i<titles.length;i++){
		$(canvas[i]).css("display","none");
	}
}



/*$("#demon_BtnA").click(function(){
	 $("#demon_BtnB .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnC .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnD .text span").removeClass("arrowRight_cur");
	 
	 $("#demon_BtnA .text span").toggleClass("arrowRight_cur");
	 $(".demonstration").css("overflow","visible");
})

$("#demon_BtnB").click(function(){
	 $("#demon_BtnA .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnC .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnD .text span").removeClass("arrowRight_cur");
	 
	 $("#demon_BtnB .text span").toggleClass("arrowRight_cur");
})

$("#demon_BtnC").click(function(){
	 $("#demon_BtnA .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnB .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnD .text span").removeClass("arrowRight_cur");
	 
	 $("#demon_BtnC .text span").toggleClass("arrowRight_cur");
})

$("#demon_BtnD").click(function(){
	 $("#demon_BtnA .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnB .text span").removeClass("arrowRight_cur");
	 $("#demon_BtnC .text span").removeClass("arrowRight_cur");
	  
	 $("#demon_BtnD .text span").toggleClass("arrowRight_cur");
})*/


//////////埋点方法
var post_fen_shu=function(Ptype,Pfseasons,pgrade,pname){
	$.ajax({
	  type: 'POST',
	  url: "http://game.speiyou.com/index/index3/user",
	  data:{type:Ptype,fseasons:Pfseasons,grade:pgrade,name:pname,n:1}, 
	  //返回数据的格式  
	  datatype: "jsonp",//"xml", "html", "script", "json", "jsonp", "text".
	  processData: false, 
	  success:function(status){
	  	console.log("成功："+status);
	  }
	});
}