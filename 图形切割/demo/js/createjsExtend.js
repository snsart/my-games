/*
 * description:对createjs中的Container方法进行扩展，提供了课件制作中元件所需要的常用方法，如拖动、旋转等行为。
 *@author:jinhailiang
 *createDate:2017.11.15
 *updateDate:2017.12.1
 * */

var createjsExtend={};

/*取得库中元件
 * @param  libName 库中元件名
 * @return 获得的元件
 * @date:2017.11.23
 */

createjsExtend.createLibMc=function(libName){
	var newMc
	var thisMc = "new lib." +libName+ "()";
	try{
		newMc=eval(thisMc);
	}catch(error){
		throw new Error("请将库元件命名为:"+libName);
	}
	return newMc;
}

/*计算两个元件之间的距离
 * @param  mc1,mc2
 * @return 距离
 * @date:2017.11.23
 */

createjsExtend.getDistance=function(mc1,mc2){
	return Math.sqrt((mc1.x-mc2.x)*(mc1.x-mc2.x)+(mc1.y-mc2.y)*(mc1.y-mc2.y));
}



createjsExtend.setCursor=function(mcArr,stage,cursor){
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true;
	for(var i=0;i<mcArr.length;i++){
		mcArr[i].cursor = cursor;
	}	
}




/*改变显示对象的填充颜色
 * @param  color 要填充的颜色
 */
createjs.Container.prototype.fillColor=function(color){
	var child=this.children;
	for(var i=0;i<child.length;i++){
		if(child[i].graphics._fill!=null){
			child[i].graphics._fill.style=color;
		}
	}
}

/*改变显示对象的边线颜色
 * @param  color 要填充的颜色
 */
createjs.Container.prototype.strokeColor=function(color){
	var child=this.children;
	for(var i=0;i<child.length;i++){
		if(child[i].graphics._stroke!=null){
			child[i].graphics._stroke.style=color;
		}
	}
}

/*对象沿着路径移动，数组描述了路径的节点
 */
createjs.Container.prototype.moveBy=function(paths){
	var i=0;
	var mc=this;
	(function(){
		i++;
		if(i<paths.length){
			createjs.Tween.get(mc).to({x:paths[i].x,y:paths[i].y},500).call(arguments.callee)
		}else{
			if(this.callback instanceof(Function)){
				this.callback();
			}
		}	
	})();
	return this;
}

createjs.Container.prototype.call=function(callback){
	this.callback=callback;
}



/*
 * 为显示对象添加拖动行为，可为拖动的对象定义mouseupHandler方法，当鼠标释放时会执行此方法；
 * @param rect createjs.Rectangle对象,限定了对象可拖动的范围
 * @param stage 舞台对象，当鼠标在stage上移动时会拖动对象
 * @param center 可选参数，当为true时，鼠标会限定在对象的注册中心点，默认为false
 * @param down 可选参数，规定鼠标初始状态是否按下，默认为false
 * 2017.11.27:添加dragable属性
 */

createjs.DisplayObject.prototype.addDragAction=createjs.Container.prototype.addDragAction=function(rect,stage,center=false,down=false){
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
			
			if(dragMc.mousedownHandler instanceof(Function)){
					dragMc.mousedownHandler();
			}
			
		})
	}

	stage.addEventListener("stagemousemove", function() {
		if(mcdown&&dragMc.dragable) {
			if(rect!=null){
				dragMc.x = Math.max(rect.x, Math.min(rect.x + rect.width, stage.mouseX-offsetX));
				dragMc.y = Math.max(rect.y, Math.min(rect.y + rect.height, stage.mouseY-offsetY));
			}else{
				dragMc.x = stage.mouseX-offsetX;
				dragMc.y = stage.mouseY-offsetY;
			}
			if(dragMc.moveHandler instanceof(Function)){
				dragMc.moveHandler();
			}
		}
	})

	stage.addEventListener("stagemouseup", function() {
		if(mcdown&&dragMc.dragable) {
			if(dragMc.mouseupHandler instanceof(Function)){
				dragMc.mouseupHandler();
			}
		}
		mcdown=false;
	})
}

/*
 * 为显示对象添加旋转行为，可为旋转的对象定义mouseupHandler方法，当鼠标释放时会执行此方法；
 * @param stage 舞台对象，当鼠标在stage上移动时会拖动对象
 */

createjs.Container.prototype.addRotateAction=function(stage){
	var mcdown=false;
	var rotaMc=this;
	if(this.rotaBtn==null){
		this.addEventListener("mousedown",function(){
			mcdown=true;
		});
	}else{
		this.rotaBtn.addEventListener("mousedown",function(){
			mcdown=true;
		});
	}

	stage.addEventListener("stagemousemove", function () {
		if (mcdown) {
			var dx=stage.mouseX-rotaMc.x;
			var dy=stage.mouseY-rotaMc.y;
			var r=Math.atan2(dy,dx)*180/Math.PI;
			rotaMc.rotation=r;
			if(rotaMc.moveHandler instanceof(Function)){
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
 * 复制显示对象，必须为要复制的对象添加libName属性，属性值为库中对应元件的名字；
 * @return 新对象
 */

createjs.Container.prototype.copy=function(){
	var newMc;
	if(this.libName==null||this.libName==""){
		throw new Error("请为元件添加libName属性");
	}
	newMc=createjsExtend.createLibMc(this.libName)
	newMc.libName=this.libName;
	return newMc;
}

/*
 * 为数字键盘提供功能,必须将要作为键盘的type类型设置为keyboard；若改变输入文本框时，改变该对象的inptTxt属性即可；
 * @param inputTxt 默认的输入文本
 * @param maxLength 输入文本框的最大长度
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

/*
 * 吸附
 * @param targetArr 目标
 * @param dis 吸附距离
 */
createjs.Container.prototype.goto=function(targetArr,dis){
	for(var i=0;i<targetArr.length;i++){
		if(createjsExtend.getDistance(this,targetArr[i])<30){
			this.x=targetArr[i].x;
			this.y=targetArr[i].y;
			return true;
		}
	}
	return false;
}
