/*canvas控制工具栏*/

var canvasArr=$("canvas");
for(var i=0;i<canvasArr.length;i++){
	var canvas=canvasArr[i];
	canvas.initLeft=$(canvas).css("left");
	canvas.initTop=$(canvas).css("top");
}

$(".arrow").click(function(e){
	var btn=e.currentTarget;
	var canvas=getCanvasBy(btn);	
	removeDragActionTo(canvas);
	
	$(canvas).css("cursor","default");
	$($(btn).find(".arrow-down")[0]).css("display","block");
	$($(btn).find(".arrow-up")[0]).css("display","none");
	$($($(btn).parent()).find(".hand-down")[0]).css("display","none");
	$($($(btn).parent()).find(".hand-up")[0]).css("display","block");
})

$(".hand").click(function(e){
	startDrag=true;
	var btn=e.currentTarget;
	var canvas=getCanvasBy(btn);	
	addDragActionTo(canvas);
	
	$(canvas).css("cursor","move");
	$($(btn).find(".hand-down")[0]).css("display","block");
	$($(btn).find(".hand-up")[0]).css("display","none");
	$($($(btn).parent()).find(".arrow-down")[0]).css("display","none");
	$($($(btn).parent()).find(".arrow-up")[0]).css("display","block");
})

//放大

$(".enlarge").mousedown(function(e){
	var btn=e.currentTarget;
	var canvas=getCanvasBy(btn);
	$(canvas).animate({width:'+=1rem'},"fast");
	
	$($(btn).find(".enlarge-down")[0]).css("display","block");
	$($(btn).find(".enlarge-up")[0]).css("display","none");

	console.log($(btn).find(".enlarge-up")[0])
})

$(".enlarge").mouseup(function(e){
	var btn=e.currentTarget;
	$($(btn).find(".enlarge-down")[0]).css("display","none" );
	$($(btn).find(".enlarge-up")[0]).css("display","block");
})

//缩小
$(".reduce").mousedown(function(e){
	var btn=e.currentTarget;
	var canvas=getCanvasBy(btn);	
	$(canvas).animate({width:'-=1rem'},"fast");	
	
	$($(btn).find(".reduce-down")[0]).css("display","block");
	$($(btn).find(".reduce-up")[0]).css("display","none");
})

$(".reduce").mouseup(function(e){
	var btn=e.currentTarget;
	$($(btn).find(".reduce-down")[0]).css("display","none");
	$($(btn).find(".reduce-up")[0]).css("display","block");
	
})

//复位
$(".initbtn").mousedown(function(e){
	var btn=e.currentTarget;
	var canvas=getCanvasBy(btn);
	
	$(canvas).css("left","auto");
	$(canvas).css("top","auto");
	$(canvas).css("width","7.6rem");
	
	$($(btn).find(".initbtn-down")[0]).css("display","block");
	$($(btn).find(".initbtn-up")[0]).css("display","none");
})

$(".initbtn").mouseup(function(e){
	var btn=e.currentTarget;
	$($(btn).find(".initbtn-down")[0]).css("display","none");
	$($(btn).find(".initbtn-up")[0]).css("display","block");
})


function addDragActionTo(canvas){
	canvas.addEventListener("mousedown",canvasDragHandler,true);
}

function removeDragActionTo(canvas){
	canvas.removeEventListener("mousedown",canvasDragHandler,true);
}

var currentCanvas;
function canvasDragHandler(e){
	currentCanvas=e.currentTarget;
	currentCanvas.mouseDown=true;
	
	currentCanvas.canvasOffsetTop=$(currentCanvas).css("top")=="auto"?0:parseInt($(currentCanvas).css("top"));
	currentCanvas.canvasOffsetLeft=$(currentCanvas).css("left")=="auto"?0:parseInt($(currentCanvas).css("left"));
	currentCanvas.downTop=e.clientY;
	currentCanvas.downLeft=e.clientX;
}

$("html").mousemove(function(e){
	if(currentCanvas!=null&&currentCanvas.mouseDown){	
		var y=e.clientY-currentCanvas.downTop+currentCanvas.canvasOffsetTop;
		var x=e.clientX-currentCanvas.downLeft+currentCanvas.canvasOffsetLeft;
		if(y<-100){
			y=-100;
		}
		$(currentCanvas).css("top",y);
		$(currentCanvas).css("left",x);
	}
});

$("html").mouseup(function(e){
	if(currentCanvas!=null){
		currentCanvas.mouseDown=false;
	}
});

function getCanvasBy(btn){
	return $(btn).parent().next()[0];
}
	
