(function(){
	
var gameid;

//获取当前js文件的文件名
var scripts = document.getElementsByTagName('script');
// 获取现在已经加载的所有script
var lastScript = scripts[scripts.length-1];
// 获取最近一个加载的script，即这个js本身
var scriptName = lastScript.src;
// 获取此js的路径
var start=scriptName.lastIndexOf("/")+1;
var end=scriptName.lastIndexOf(".");
var animName=scriptName.slice(start,end);

for(var i=0;i<animateControlInfo.length;i++){
	if(animateControlInfo[i].ctrlBar==animName){
		gameid=i;
		break;
	}
}

var close=true;
for(var j=0;j<animateControlInfo.length;j++){
	$(animateControlInfo[gameid].btn).click(function(){
		if(close){
			updateHandler();
		}
		close=!close;
	})
}	


var canvas, stage, root;

var rows=4,columns=9;
var rectHeight=rectWidth=50;
var shapeConts=[];
var pathShape;
var cutState=false;
var targetPos=[];

var mousedown=false;

init();

function init() {
	canvas = document.getElementById(animateControlInfo[gameid].canvasId);
	var donghua="new lib."+animateControlInfo[gameid].name+"()"
	root = eval(donghua);

	stage = new createjs.Stage(canvas);
	stage.addChild(root);
	stage.update();
	
	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);	
	gameInit();
}

//使创建的图形具备吸附功能
createjs.DisplayObject.prototype.goto=function(targetArr,dis){
	for(var i=0;i<targetArr.length;i++){
		if(createjsExtend.getDistance(this,targetArr[i])<dis){
			this.x=targetArr[i].x;
			this.y=targetArr[i].y;
			return true;
		}
	}
	return false;
}

function updateHandler(){
	clearAllShapes();
	createInitShapes();
	cutState=false;
	root.cutBtn.gotoAndStop(0);
	clearCutPath();
	for(var i=0;i<shapeConts.length;i++){
		shapeConts[i].cutfinish=true;
		shapeConts[i].cutPath=[];
		shapeConts[i].dragable=true;
	}
}

function gameInit(){
	stage.enableMouseOver(10);
	setTargetPos();
	pathShape=new createjs.Shape();//切割路径
	createInitShapes();
	addEvent();
	addEventToBtn();
}

function setTargetPos(){
	for(var i=0;i<=20;i++){
		for(var j=0;j<=15;j++){
			targetPos.push({x:i*50,y:j*50})
		}
	}
}

function createInitShapes(){
	var initShapes=[];//一个二维数组，存储图形中的小方块
	var shapesCont=new createjs.MovieClip();
	shapesCont.shapes=[];//存储图形形状
	shapesCont.linkPots=[];//存储图形中各链接点坐标,相对于shapesCont
	shapesCont.cutPath=[];//存储图形中的切割路径，相对于shapesCont
	for(var row=0;row<rows;row++){
		var rowArr=[];
		for(var column=0;column<columns;column++){
			var shape=new createjs.Shape();
			shape.graphics.setStrokeStyle(2).beginStroke("#ffffff").beginFill("red").drawRect(0,0,rectWidth,rectHeight);//画一个小方块
			shape.x=rectWidth*column;
			shape.y=rectHeight*row;
			shapesCont.shapes.push(shape);
			shapesCont.addChild(shape);
			rowArr.push(shape);
		}
		initShapes.push(rowArr);
	}
	shapesCont.x=250;
	shapesCont.y=100;
	shapesCont.linkPots=getLinkPot(shapesCont);
	shapesCont.addDragAction(new createjs.Rectangle(0,0,1024,768),stage,false,false);//这里为shapesCont图形添加拖动效果
	shapesCont.mouseupHandler=function(){
		this.goto(targetPos,25);
	}
	shapeConts.push(shapesCont);
	root.addChild(shapesCont);
	
	//为每个方块设置上下左右的图形链接；
	(function setLinkShapes(){
		for(var row=0;row<rows;row++){
			for(var column=0;column<columns;column++){
				initShapes[row][column].left=column-1<0?null:initShapes[row][column-1];
				initShapes[row][column].top=row-1<0?null:initShapes[row-1][column];
				initShapes[row][column].right=column+1>8?null:initShapes[row][column+1];
				initShapes[row][column].buttom=row+1>3?null:initShapes[row+1][column];
			}
		}
	})();
}

//获得shapeCont中所有图形之间的链接点
function getLinkPot(shapeCont){
	var arr=new Array();
	for(var i=0;i<shapeCont.shapes.length;i++){
		
		var pot1={x:shapeCont.shapes[i].x,y:shapeCont.shapes[i].y};
		var pot2={x:shapeCont.shapes[i].x+rectWidth,y:shapeCont.shapes[i].y};
		var pot3={x:shapeCont.shapes[i].x,y:shapeCont.shapes[i].y+rectHeight};
		var pot4={x:shapeCont.shapes[i].x+rectWidth,y:shapeCont.shapes[i].y+rectHeight};
		if(myarrayIndexOf(arr,pot1)==-1){
			arr.push(pot1);
		}
		if(myarrayIndexOf(arr,pot2)==-1){
			arr.push(pot2);
		}
		
		if(myarrayIndexOf(arr,pot3)==-1){
			arr.push(pot3);
		}
		
		if(myarrayIndexOf(arr,pot4)==-1){
			arr.push(pot4);
		}
	}
	return arr;
	
	//根据坐标位置判断两个点是否一样
	function myarrayIndexOf(arr,pot){
		if(arr.length==0){
			return -1;
		}
		for(var i=0;i<arr.length;i++){
			if(arr[i].x==pot.x&&arr[i].y==pot.y){
				return i;
			}
		}
		return -1;
	}
}

//添加事件
function addEvent(){
	stage.addEventListener("mousedown",function(e){
		mousedown=true;
	});
	
	stage.addEventListener("stagemouseup",function(e){
		mousedown=false;
		if(cutState&&stage.mouseY<600){
			for(var i=0;i<shapeConts.length;i++){
				stopCut(shapeConts[i]);
			}
			if(cutfinished()){
				stopCutState();
			}
		}
	});
	
	stage.addEventListener("stagemousemove",function(e){
		if(mousedown&&cutState){
			for(var i=0;i<shapeConts.length;i++){
				cuting(shapeConts[i]);
			}
		}
	});		
}

function stopCutState(){
	cutState=false;
	root.cutBtn.gotoAndStop(0);
	clearCutPath();
	for(var i=0;i<shapeConts.length;i++){
		shapeConts[i].cutfinish=true;
		shapeConts[i].cutPath=[];
		shapeConts[i].dragable=true;
	}
}

function addEventToBtn(){
	root.cutBtn.addEventListener("pressup",function(){
		root.cutBtn.play();
		cutState=!cutState;
		if(cutState){
			for(var i=0;i<shapeConts.length;i++){
				shapeConts[i].cutfinish=false;
				shapeConts[i].dragable=false;
			}
		}else{
			for(var i=0;i<shapeConts.length;i++){
				shapeConts[i].dragable=true;
			}
		}
	});
	
	root.updateBtn.addEventListener("click",function(e){
		updateHandler();
	})	
}

//判断有没有对舞台上的图形完成切割，只要舞台上有一个图形切割成两半则完成切割
function cutfinished(){
	for(var i=0;i<shapeConts.length;i++){
		if(shapeConts[i].cutfinish){
			return true;
		};
	}
	return false;
}

//开始切割
function cuting(shapeCont){
	shapeCont.cutfinish=false;
	//鼠标在图形上的位置
	var mouse={x:stage.mouseX-shapeCont.x,y:stage.mouseY-shapeCont.y};
	drawCutPath(shapeCont);
	for(var i=0;i<shapeCont.linkPots.length;i++){
		//根据鼠标离链接结点的距离，来判断加哪一个链接结点加入切割路径中
		if(createjsExtend.getDistance(mouse,shapeCont.linkPots[i])<10){
			if(shapeCont.cutPath.length==0){
				arrayUtils.addSingleEleToArray(shapeCont.cutPath,shapeCont.linkPots[i]);
			}else if(Math.abs(createjsExtend.getDistance(shapeCont.linkPots[i],shapeCont.cutPath[shapeCont.cutPath.length-1])-50)<15){
				arrayUtils.addSingleEleToArray(shapeCont.cutPath,shapeCont.linkPots[i]);
			}
		}
	}
}

function stopCut(shapeCont){
	updateLinkState(shapeCont);
	//创建切割出来的图形，此图形为由与shapeCont中最后一块连接的所有小图形组成
	var shapes=getAllLinksShape(shapeCont.shapes[shapeCont.shapes.length-1]);
	//如果没有切割成两块，则继续切割,否则创建切割出来的图形
	shapeCont.cutfinish=shapes.length!=shapeCont.shapes.length;
	if(!shapeCont.cutfinish){
		return;
	}else{
		createNewShapeCont(shapes);
		//更改原图形数据
		shapeCont.shapes=differenceSet(shapeCont.shapes,shapes);
		shapeCont.cutPath=[];
	}	
}

function createNewShapeCont(shapes){
	var shapeCont=new createjs.MovieClip();
	shapeCont.shapes=shapes;
	for(var i=0;i<shapeCont.shapes.length;i++){
		shapeCont.addChild(shapeCont.shapes[i]);
	}
	var minX=getMinValueByProp(shapeCont.shapes,"x");
	var minY=getMinValueByProp(shapeCont.shapes,"y");
	shapeCont.shapes.forEach(function(item,index,array){
		item.x-=minX;
		item.y-=minY;
	})
	shapeCont.x=stage.mouseX-10;
	shapeCont.y=stage.mouseY-10;
	shapeCont.addDragAction(new createjs.Rectangle(0,0,1024,768),stage,false,false);
	shapeCont.mouseupHandler=function(){
		this.goto(targetPos,25);
	}
	shapeCont.linkPots=getLinkPot(shapeCont);
	shapeCont.cutPath=[];
	shapeConts.push(shapeCont);
	root.addChild(shapeCont);
}


function drawCutPath(shapeCont){	
	if(shapeCont.cutPath.length==0){
		return;
	}
	pathShape.graphics.clear();
	pathShape.graphics.setStrokeStyle(4,"round","round").beginStroke("#000033");
	pathShape.graphics.moveTo(shapeCont.cutPath[0].x+shapeCont.x,shapeCont.cutPath[0].y+shapeCont.y);
	if(shapeCont.cutPath.length>1){
		for(var i=1;i<shapeCont.cutPath.length;i++){
			pathShape.graphics.lineTo(shapeCont.cutPath[i].x+shapeCont.x,shapeCont.cutPath[i].y+shapeCont.y);
		}
	}
	var dx=Math.abs(stage.mouseX-(shapeCont.cutPath[shapeCont.cutPath.length-1].x+shapeCont.x));
	var dy=Math.abs(stage.mouseY-(shapeCont.cutPath[shapeCont.cutPath.length-1].y+shapeCont.y));
	var endX,endY;
	if(dx<dy){
		endX=shapeCont.cutPath[shapeCont.cutPath.length-1].x+shapeCont.x;
		endY=stage.mouseY;
	}else{
		endX=stage.mouseX;
		endY=shapeCont.cutPath[shapeCont.cutPath.length-1].y+shapeCont.y;
	}
	
	pathShape.graphics.lineTo(endX,endY);
	root.addChild(pathShape);
}

function clearCutPath(){
	pathShape.graphics.clear();
}

//从shapes中查找所有与shape能联通的形状
function getAllLinksShape(shape){
	var linkShapes=[];
	var checkShapes=[];
	checkShapes.push(shape)
	while(checkShapes.length>0){
		var shape=checkShapes.shift();
		if(shape.right!=null&&linkShapes.indexOf(shape.right)==-1&&checkShapes.indexOf(shape.right)==-1){
			checkShapes.push(shape.right);
		}
		
		if(shape.buttom!=null&&linkShapes.indexOf(shape.buttom)==-1&&checkShapes.indexOf(shape.buttom)==-1){
			checkShapes.push(shape.buttom);
		}	
		
		if(shape.left!=null&&linkShapes.indexOf(shape.left)==-1&&checkShapes.indexOf(shape.left)==-1){
			checkShapes.push(shape.left);
		}	
		
		if(shape.top!=null&&linkShapes.indexOf(shape.top)==-1&&checkShapes.indexOf(shape.top)==-1){
			checkShapes.push(shape.top);
		}
		linkShapes.push(shape);	
	};	
	return linkShapes;	
}

//根据shapeCont中的切割路径，更新形状之间的链接状态，被切开的两块形状将不再链接
function updateLinkState(shapeCont){
	for(var i=0;i<shapeCont.cutPath.length-1;i++){
		//获得每一小段切割路径两端的坐标
		var startPos=shapeCont.cutPath[i];
		var endPos=shapeCont.cutPath[i+1];
		if(startPos.x==endPos.x&&Math.abs(Math.abs(startPos.y-endPos.y)-50)<15){
			var pos=startPos.y<endPos.y?startPos:endPos;
			for(var j=0;j<shapeCont.shapes.length;j++){
				if(shapeCont.shapes[j].x==pos.x&&shapeCont.shapes[j].y==pos.y){
					var rightShape=shapeCont.shapes[j];
				}
			}
			if(rightShape!=null&&rightShape.left!=null){
				rightShape.left.right=null;	
				rightShape.left=null;
			}
		}
		
		if(startPos.y==endPos.y&&Math.abs(Math.abs(startPos.x-endPos.x)-50)<20){
			var pos=startPos.x<endPos.x?startPos:endPos;
			for(var j=0;j<shapeCont.shapes.length;j++){
				if(shapeCont.shapes[j].x==pos.x&&shapeCont.shapes[j].y==pos.y){
					var buttomShape=shapeCont.shapes[j]
				}
			}
			if(buttomShape!=null&&buttomShape.top!=null){
				buttomShape.top.buttom=null;
				buttomShape.top=null;
			}
		}
	}
}

//清除所有图形
function clearAllShapes(){
	if(shapeConts.length==0){
		return;
	}
	for(var i=0;i<shapeConts.length;i++){
		root.removeChild(shapeConts[i]);
		shapeConts[i].removeAllEventListeners();
	}
	shapeConts=[];
}

/*-----------------一些数组工具库--------------*/
//求arr1和arr2的差集
function differenceSet(arr1,arr2){
	for(var i=arr1.length-1;i>=0;i--){
		for(var j=arr2.length-1;j>=0;j--){
			if(arr1[i]==arr2[j]){
				console.log("delete");
				arr1.splice(i,1);
				break;
			}
		}
	}
	return arr1;
}
//得到数组各项中prop最小的值
function getMinValueByProp(arr,prop){
	var minValue=arr[0][prop]
	for(var i=1;i<arr.length;i++){
		if(arr[i][prop]<minValue){
			minValue=arr[i][prop];
		}
	}
	return minValue;
}

})();
