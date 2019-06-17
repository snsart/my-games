var toolList=this.toolList=this.tooList||{
	index1:{
		name:"index1",
		clickhandler:null
	},
	index2:{
		name:"index2",
		clickhandler:null
	},
	index3:{
		name:"index3",
		clickhandler:null
	},
	update:{
		name:"update",
		clickhandler:null
	},
	help:{
		name:"help",
		clickhandler:null
	}
};

(function init(){
	toolList.selected=toolList.index3;
	$($("li.selected")[0]).removeClass("selected");
	$($(".index3")[0]).addClass("selected");
	$($("canvas")[0]).css("cursor","url(img/knifecursor.svg),auto");
})();


toolList.index1.clickhandler=function(){
	$($("li.selected")[0]).removeClass("selected");
	$($(".index1")[0]).addClass("selected");
	$($("canvas")[0]).css("cursor","default");
	toolList.selected=this;
};

toolList.index2.clickhandler=function(){
	$($("li.selected")[0]).removeClass("selected");
	$($(".index2")[0]).addClass("selected");
	
	$($("canvas")[0]).css("cursor","pointer");
	toolList.selected=this;
};

toolList.index3.clickhandler=function(){
	$($("li.selected")[0]).removeClass("selected");
	$($(".index3")[0]).addClass("selected");
	
	$($("canvas")[0]).css("cursor","url(img/knifecursor.svg),auto");
	/* "url(../img/images/mouse-fangxiaojing.png), auto"*/
	toolList.selected=this;
};

toolList.eventHandler=function(){}


var btnList=document.getElementById("btns-list");

btnList.addEventListener("mousedown",function(e){
	var btn=$(e.target).parent();
	var name=$(btn).attr("data-name");
	if(toolList[name].clickhandler instanceof Function){
		toolList[name].clickhandler();
	};
	toolList.eventHandler();
})
