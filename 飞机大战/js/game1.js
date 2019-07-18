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
var grids=[];
var plane1,plane2,plane3;
var planes=[];
var step=0;
var planeNum=1;


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


function updateHandler(){
	if(planes.length==0){
		return;
	}
	for(var i=0;i<planes.length;i++){
		clearGridWith(planes[i]);
	}
	planes=[];
	step=0;
	root.stepTxt.text=step;
	clearGrids();
	cishu=0;
	addPlanes();
}

function gameInit(){
	createGrid();
	addPlanes();
	root.updateBtn.addEventListener("click",function(e){
		updateHandler();
	})
	
	root.upBtn.addEventListener("click",function(e){
		if(planeNum<3){
			planeNum++;
		}
		root.planeNumTxt.text=planeNum;
		updateHandler();
	})
	
	root.downBtn.addEventListener("click",function(e){
		if(planeNum>1){
			planeNum--;
		}
		root.planeNumTxt.text=planeNum;
		updateHandler();
	})
}

function createGrid(){
	for(var i=0;i<9;i++){
		var inner=[];
		for(var j=0;j<9;j++){
			var rect=createjsExtend.createLibMc("Rect");
			rect.x=126+i*50;
			rect.y=83+j*50;
			inner.push(rect);
			root.addChild(rect);
			rect.addEventListener("click",clickHandler);
		}
		grids.push(inner);
	}
}

function clickHandler(e){
	var rect=e.currentTarget;
	step++;
	root.stepTxt.text=step;
	switch(rect.id){
		case 1:
			show(rect.plane);
			root.hitHead.play();
			break;
		case 2:
			rect.gotoAndStop(3);
			root.hitBody.play();
			break;
		case 3:
			rect.gotoAndStop(2);
			root.hitWing.play();
			break;
		default:
			rect.gotoAndStop(1);
			root.noHit.play();
	}
}
var cishu=0;

function addPlanes(){

	while(planes.length<planeNum){
		var testTimes=0;
		while(testTimes<10){
			var plane=createPlane();
			if(!hitTestBy(plane)){
				planes.push(plane);
				fillGridWith(plane);
				break;
			}else{
				testTimes++;
				cishu++;
			}
		}
		if(testTimes==10){
			var plane=planes.pop();
			clearGridWith(plane);
		}
	}
	console.log(cishu);
	
	for(var i=0;i<planeNum;i++){
		planes[i].id=i+1;
		planes[i].head.plane=planes[i];
		planes[i].head.id=1;
		for(var j=0;j<planes[i].body.length;j++){
			planes[i].body[j].id=2;
		}
		for(j=0;j<planes[i].wing.length;j++){
			planes[i].wing[j].id=3;
		}
	}
	
}

/*function setPlanes(){
	plane1={
		id:1,
		head:grids[2][1],
		body:[grids[2][2],grids[2][3],grids[2][4]],
		wing:[grids[0][2],grids[1][2],grids[3][2],grids[4][2],grids[1][4],grids[3][4]]
	}
	
	plane2={
		id:2,
		head:grids[5][4],
		body:[grids[6][4],grids[7][4],grids[8][4]],
		wing:[grids[6][2],grids[6][3],grids[6][5],grids[6][6],grids[8][3],grids[8][5]]
	}
	
	plane3={
		id:3,
		head:grids[3][8],
		body:[grids[3][7],grids[3][6],grids[3][5]],
		wing:[grids[1][7],grids[2][7],grids[4][7],grids[5][7],grids[2][5],grids[4][5]]
	}
	
	planes=[plane1,plane2,plane3]
	
	for(var i=0;i<3;i++){
		planes[i].head.plane=planes[i];
		planes[i].head.id=1;
		for(var j=0;j<planes[i].body.length;j++){
			planes[i].body[j].id=2;
		}
		for(j=0;j<planes[i].wing.length;j++){
			planes[i].wing[j].id=3;
		}
	}
}*/

function createPlane(){
	var dirPlanes=["top","buttom","left","right"];
	var plane;
	while(true){
		var headX=Math.floor(Math.random()*9);
		var headY=Math.floor(Math.random()*9);
		var dir=dirPlanes[Math.floor(Math.random()*4)];
		
		if(dir=="top"){
			if(headY+3<=8&&headX-2>=0&&headX+2<=8){
				plane={
					head:grids[headX][headY],
					body:[grids[headX][headY+1],grids[headX][headY+2],grids[headX][headY+3]],
					wing:[grids[headX-2][headY+1],grids[headX-1][headY+1],grids[headX+1][headY+1],grids[headX+2][headY+1],grids[headX-1][headY+3],grids[headX+1][headY+3]]
				}
				plane.head.plane=plane;
				break;
			}else{
				continue;
			}
		}else if(dir=="buttom"){
			if(headY-3>=0&&headX-2>=0&&headX+2<=8){
				plane={
					head:grids[headX][headY],
					body:[grids[headX][headY-1],grids[headX][headY-2],grids[headX][headY-3]],
					wing:[grids[headX-2][headY-1],grids[headX-1][headY-1],grids[headX+1][headY-1],grids[headX+2][headY-1],grids[headX-1][headY-3],grids[headX+1][headY- 3]]
				}
				plane.head.plane=plane;
				break;
			}else{
				continue;
			}
			
		}else if(dir=="left"){
			if(headX+3<=8&&headY-2>=0&&headY+2<=8){
				plane={
					head:grids[headX][headY],
					body:[grids[headX+1][headY],grids[headX+2][headY],grids[headX+3][headY]],
					wing:[grids[headX+1][headY-1],grids[headX+1][headY-2],grids[headX+1][headY+1],grids[headX+1][headY+2],grids[headX+3][headY-1],grids[headX+3][headY+1]]
				}
				plane.head.plane=plane;
				break;
			}else{
				continue;
			}
			
		}else{
			if(headX-3>=8&&headY-2>=0&&headY+2<=8){
				plane={
					head:grids[headX][headY],
					body:[grids[headX-1][headY],grids[headX-2][headY],grids[headX-3][headY]],
					wing:[grids[headX-1][headY-1],grids[headX-1][headY-2],grids[headX-1][headY+1],grids[headX-1][headY+2],grids[headX-3][headY-1],grids[headX-3][headY+1]]
				}
				plane.head.plane=plane;
				break;
			}else{
				continue;
			}
		}
	}
	return plane;	  
}

function fillGridWith(plane){
	plane.head.fill=true;
	for(var i=0;i<plane.body.length;i++){
		plane.body[i].fill=true;
	}
	for(var j=0;j<plane.wing.length;j++){
		plane.wing[j].fill=true;
	}
}

function clearGridWith(plane){
	plane.head.fill=false;
	for(var i=0;i<plane.body.length;i++){
		plane.body[i].fill=false;
	}
	
	for(var j=0;j<plane.wing.length;j++){
		plane.wing[j].fill=false;
	}
}

function clearGrids(){
	for(var i=0;i<grids.length;i++){
		for(var j=0;j<grids[i].length;j++){
			grids[i][j].id=0;
			grids[i][j].gotoAndStop(0);
		}
	}
}

function hitTestBy(plane){
	var hitHead=plane.head.fill==true;
	var hitBody=function(){
		for(var i=0;i<plane.body.length;i++){
			if(plane.body[i].fill==true){
				return true;
			};
		}
		return false;
	}
	var hitWing=function(){
		for(var i=0;i<plane.wing.length;i++){
			if(plane.wing[i].fill==true){
				return true;
			};
		}
		return false;
	}
	return hitHead||hitBody()||hitWing();
}

function show(plane){
	plane.head.gotoAndStop(plane.id+3);
	for(var i=0;i<plane.body.length;i++){
		plane.body[i].gotoAndStop(plane.id+3);
	}
	for(i=0;i<plane.wing.length;i++){
		plane.wing[i].gotoAndStop(plane.id+3);
	}
}


})();
