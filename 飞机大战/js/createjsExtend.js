/*
 * description:对createjs中的Container方法进行扩展，提供了课件制作中元件所需要的常用方法，如拖动、旋转等行为。
 *@author:jinhailiang
 *createDate:2017.11.15
 *updateDate:2018.1.8
 * */

var createjsExtend={};

/*计算两个元件之间的距离
 */

createjsExtend.getDistance=function(mc1,mc2){
	return Math.sqrt((mc1.x-mc2.x)*(mc1.x-mc2.x)+(mc1.y-mc2.y)*(mc1.y-mc2.y));
}

/*将表对应的度数转化为旋转度数*/
createjsExtend.watchToRota=function(watch){
	if (watch >= 0 && watch <= 270) {
		watch -= 90;
	} else if (watch > 270 && watch < 360) {
		watch -= 450;
	}
	return watch;
}

/*将旋转度数转化为表的度数*/
createjsExtend.rotaToWatch=function(rota) {
	if (rota >= -90 && rota <= 180) {
		rota += 90;
	} else if (rota > -180 && rota < -90) {
		rota += 450
	}
	return rota;
}


/*画扇形 度数按表的度数为标准，即起始点0度为12:00方向.
 * @param shape 一个形状可以让你在显示列表中显示矢量艺术
 * @param startAngle 扇形第一条边的度数
 * @param endAngle 扇形第二条边的度数
 * @param color 扇形填充颜色
 * @r 扇形半径
 * 2017.12.7新增功能
 */

createjsExtend.drawSectorHandToHand=function(shape, startHandAngle, endHandAngle, color,r) {
	var angleH_H= endHandAngle - startHandAngle;
	var sectorAngle;
	var startFrom;

	if (angleH_H < 0) {
		sectorAngle = 360 + angleH_H;
		startFrom = startHandAngle - 90;
	} else {
		sectorAngle = angleH_H;
		startFrom = startHandAngle - 90;
	}
	createjsExtend.drawSector(shape, 0, 0,r, sectorAngle, startFrom, color);
}

/*画扇形
 */

createjsExtend.drawSector=function(shape, x, y, r, angle, startFrom, color) {
	shape.graphics.clear();
	shape.graphics.beginFill(color);
	shape.graphics.moveTo(x, y);
	
	angle = (Math.abs(angle) > 360) ? 360 : angle;
	startFrom = startFrom * Math.PI / 180;
	
	var x1=r * Math.cos(startFrom);
	var y1=r * Math.sin(startFrom);
	var x2=x1*Math.cos(angle)-y1*Math.sin(angle);
	var y2=y1*Math.cos(angle)+x1*Math.sin(angle);
	var endAngle=startFrom+angle*Math.PI/180;
	
	shape.graphics.lineTo(x1,y1);
	shape.graphics.arc(x,y,r,startFrom,endAngle,false);
	
	if (angle != 360) {
		shape.graphics.lineTo(x, y);
	}
	shape.graphics.endFill(); 
}



/******************************createjs.Container 原型方法扩展***********************************/


/*
 * 为显示对象添加拖动行为
 */

createjs.Container.prototype.addDragAction=dragAction;

function dragAction(rect,stage,center=false,down=false){
	if(this.dragable==null){
		this.dragable=true;
	}
	var mcdown = down;
	var offsetX;
	var offsetY;
	
	if(center){
		offsetX=0;
		offsetY=0;
	}else{
		offsetX=stage.mouseX-this.x;
		offsetY=stage.mouseY-this.y;
	}
	
	var dragMc=this;
	
	if(this.dragBtn!=null){
		this.dragBtn.addEventListener("mousedown", function(e) {
			mcdown = true;
			offsetX=stage.mouseX-dragMc.x;
			offsetY=stage.mouseY-dragMc.y;
			if(dragMc.mousedownHandler!=null&&dragMc.mousedownHandler instanceof(Function)){
				dragMc.mousedownHandler();
			}
		})
	}else{
		this.addEventListener("mousedown", function(e) {
			mcdown = true;
			if(center){
				offsetX=0;
				offsetY=0;
			}else{
				offsetX=stage.mouseX-dragMc.x;
				offsetY=stage.mouseY-dragMc.y;
			}
			
			if(dragMc.mousedownHandler!=null&&dragMc.mousedownHandler instanceof(Function)){
				dragMc.mousedownHandler();
			}
		})
	}

	stage.addEventListener("stagemousemove", function() {
		if(mcdown&&dragMc.dragable) {
			dragMc.x = Math.max(rect.x, Math.min(rect.x + rect.width, stage.mouseX-offsetX));
			dragMc.y = Math.max(rect.y, Math.min(rect.y + rect.height, stage.mouseY-offsetY));
			if(dragMc.moveHandler!=null&&dragMc.moveHandler instanceof(Function)){
				dragMc.moveHandler();
			}
		}
	})

	stage.addEventListener("stagemouseup", function() {
		if(mcdown&&dragMc.dragable) {
			if(dragMc.mouseupHandler!=null&&dragMc.mouseupHandler instanceof(Function)){
				dragMc.mouseupHandler();
			}
		}
		mcdown=false;
	})
}

/*
 * 为显示对象添加旋转行为
 */

createjs.Container.prototype.addRotateAction=function(stage){
	var mcdown=false;
	var rotaMc=this;
	if(this.rotaBtn==null){
		this.addEventListener("mousedown",function(){
			mcdown=true;
		});
	}else{
		this.rotaBtn.addEventListener("mousedown",function(){;
			mcdown=true;
		});
	}

	stage.addEventListener("stagemousemove", function () {
		if (mcdown) {
			var dx=stage.mouseX-rotaMc.x;
			var dy=stage.mouseY-rotaMc.y;
			var r=Math.atan2(dy,dx)*180/Math.PI;
			rotaMc.rotation=r;
			
			if(rotaMc.moveHandler!=null&&rotaMc.moveHandler instanceof(Function)){
				rotaMc.moveHandler();
			}
		}
	})
	
	stage.addEventListener("stagemouseup", function () {
		if(mcdown) {
			if(rotaMc.mouseupHandler!=null&&rotaMc.mouseupHandler instanceof(Function)){
				rotaMc.mouseupHandler();
			}
		}
		mcdown=false;
	})
}


/*
 * 复制显示对象
 */

createjs.Container.prototype.copy=function(){
	var newMc;
	newMc=createjsExtend.createLibMc(this.libName)
	newMc.libName=this.libName;
	return newMc;
}

/*
 * 为数字键盘提供功能
 */

createjs.Container.prototype.keyboardInit=function(inputTxt,maxLength=3){
	if(this.type==null||this.type!="keyboard"){
		throw new Error("请将元件的type设置为keyboard")
	}
	
	//命名键盘
	for(var i=0;i<=9;i++){
		if(this["key"+i]==null){
			throw new Error("请命名按键key"+i)
		}
		this["key"+i].name="key"+i;	
	}
	if(this.keyd==null||this.keye==null){
		throw new Error("请将删除键和确定键命名为keyd和keye")
	}
	this.keyd.name="keyd";
	this.keye.name="keye";
	
	if(this.enterHandler==null||!this.enterHandler instanceof(Function)){
		throw new Error("需定义enterHander函数，用来处理按确定键时的行为")
	}
	this.inputTxt=inputTxt;
	this.maxLength=maxLength;
	//添加事件
	if(!this.hasEventListener()){
		this.addEventListener("click",keyBoardHandler.bind(this));
	}
	
	function keyBoardHandler(e){
		var btn=e.target;
		var name=btn.name.substr(3,1);
		switch(name){
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
				if(this.inputTxt.text.length<this.maxLength){
					this.inputTxt.text+=name;
				}
				break;
			case "d":
				this.inputTxt.text="";
				break;
			case "e":
				this.enterHandler();
				break;
		}
	}	
}

