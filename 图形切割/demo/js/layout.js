

var canvasHeight=$("canvas").attr("height");
var canvasWidth=$("canvas").attr("width");

var ratio=canvasWidth/canvasHeight;

layout();
function layout(){
	$("#canvasCont").css("height",innerHeight);
	var screenRatio=innerWidth/innerHeight;
	if(ratio>screenRatio){
		//canvas宽度等于视窗宽度，高度按比例缩放
		$("canvas").css("width",innerWidth);
		$("canvas").css("height",innerWidth/ratio);
		$("#canvasCont").css("width",innerWidth);
	}else{
		//canvas高度等于视窗高度，宽度按比例缩放
		var canvasWidth=innerHeight*ratio;
		$("canvas").css("height",innerHeight);
		$("canvas").css("width",canvasWidth);
		$("#canvasCont").css("width",canvasWidth);
	}
}

window.onresize=function(){
	layout();
}
