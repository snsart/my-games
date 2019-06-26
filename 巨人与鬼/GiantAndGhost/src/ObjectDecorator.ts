/*
*为DisplayObject对象添加拖拽、旋转等行为;
*/

class ObjectDecorator extends egret.DisplayObject {

	private static stage:egret.Stage;
	private static objs=[];
	private static currentObj:DragDisplayObject;
	private static isRotating:Boolean=false;
	private static isDraging:Boolean=false;

	//点击点离物体注册点的距离
	private static offsetX:number;
	private static offsetY:number;

	public constructor() {
		super();
	}

	public static get(obj:egret.DisplayObject){

		ObjectDecorator.currentObj=ObjectDecorator.objs.filter(function(item,index,array){if(item.obj==obj){return true}})[0]
		if(!ObjectDecorator.currentObj){
			ObjectDecorator.currentObj=new DragDisplayObject(obj);
			ObjectDecorator.objs.push(ObjectDecorator.currentObj);
		}
		return ObjectDecorator;
	}

	/**添加拖拽行为
	*@stage:舞台
	*@handle:旋转控制杆
	*@distance:控制杆距离物体注册中心的距离
	*@angle:控制杆初始角度
	*/

	public static addDragAction(stage:egret.Stage,rect:egret.Rectangle=null,center:boolean=false){

		ObjectDecorator.currentObj.obj.touchEnabled=true;
		ObjectDecorator.currentObj.range=rect;
		ObjectDecorator.currentObj.center=center;
		
		//添加拖动事件相关侦听器
		ObjectDecorator.currentObj.obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,ObjectDecorator.dragBeginHandler,this);
		//stage只注册一次移动事件
		ObjectDecorator.stage=stage;
		
		return ObjectDecorator;
	}

	/*添加旋转行为
	*@stage:舞台
	*@handle:旋转控制杆
	*@distance:控制杆距离物体注册中心的距离
	*@angle:控制杆初始角度
	*/

	public static addRotateAction(stage:egret.Stage, handle:egret.DisplayObject,distance:number=20,angle:number=0){
		ObjectDecorator.currentObj.handle=handle;
		ObjectDecorator.currentObj.distance=distance;
		ObjectDecorator.currentObj.angle=angle;

		ObjectDecorator.updateRotateHandlePosition();

		handle.touchEnabled=true;
		ObjectDecorator.currentObj.handle.addEventListener(egret.TouchEvent.TOUCH_BEGIN,ObjectDecorator.rotateBeginHandler,this);
		return ObjectDecorator;
	}

	public static upHandler(call:Function){
		ObjectDecorator.currentObj.mouseup=call;
		return ObjectDecorator;
	}

	public static moveHandler(call:Function){
		ObjectDecorator.currentObj.mousemove=call;
		return ObjectDecorator;
	}

	public static downHandler(call:Function){
		ObjectDecorator.currentObj.mousedown=call;
		return ObjectDecorator;
	}

/***********************************************************private************************************************************/

	/*开始拖动时*/
	private static dragBeginHandler(e:egret.TouchEvent):void{
		let obj=e.currentTarget;
		ObjectDecorator.currentObj=ObjectDecorator.objs.filter(function(item,index,array){if(item.obj==obj){return true}})[0];
		ObjectDecorator.isDraging=true;

	 	if(ObjectDecorator.currentObj.center){
			ObjectDecorator.offsetX=0;
			ObjectDecorator.offsetY=0;
		}else{
			ObjectDecorator.offsetX=e.stageX-obj.x;
			ObjectDecorator.offsetY=e.stageY-obj.y;
		}

		if(!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
			ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,ObjectDecorator.stageTouchMoveHandler,this);
		}

		if(!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_END)){
			ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_END,ObjectDecorator.stageTouchEndHandler,this);
		}

		/*执行回调函数*/
		if(ObjectDecorator.currentObj.mousedown instanceof Function){
			ObjectDecorator.currentObj.mousedown();
		}
	}

	/*开始旋转时*/
	private static rotateBeginHandler(e:egret.TouchEvent):void{
		let handle=e.currentTarget;
		ObjectDecorator.currentObj=ObjectDecorator.objs.filter(function(item,index,array){if(item.handle==handle){return true}})[0];
		ObjectDecorator.isRotating=true;

		if(!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
			ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,ObjectDecorator.stageTouchMoveHandler,this);
		}

		if(!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_END)){
			ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_END,ObjectDecorator.stageTouchEndHandler,this);
		}

		/*执行回调函数*/
		if(ObjectDecorator.currentObj.mousedown instanceof Function){
			ObjectDecorator.currentObj.mousedown();
		}
	}


	private static stageTouchMoveHandler(e:egret.TouchEvent):void{
		if(ObjectDecorator.currentObj==null){
			return;
		}

		if(ObjectDecorator.isDraging){

			let dragX=e.stageX-ObjectDecorator.offsetX,dragY=e.stageY-ObjectDecorator.offsetY;
			let range=ObjectDecorator.currentObj.range;
			if(range instanceof egret.Rectangle){
				dragX=Math.min(Math.max(dragX,range.x),range.x+range.width);
				dragY=Math.min(Math.max(dragY,range.y),range.y+range.height);
			}

			ObjectDecorator.currentObj.obj.x=dragX;
			ObjectDecorator.currentObj.obj.y=dragY;
			ObjectDecorator.updateRotateHandlePosition();
		}

		if(ObjectDecorator.isRotating){
			ObjectDecorator.currentObj.handle.x=e.stageX;
			ObjectDecorator.currentObj.handle.y=e.stageY;
			let dx=e.stageX-ObjectDecorator.currentObj.obj.x;
			let dy=e.stageY-ObjectDecorator.currentObj.obj.y;
			let rotation=Math.atan2(dy,dx)*180/Math.PI;
			ObjectDecorator.currentObj.obj.rotation=rotation-ObjectDecorator.currentObj.angle;
		}

		/*执行回调函数*/
		if(ObjectDecorator.currentObj.mousemove instanceof Function){
			ObjectDecorator.currentObj.mousemove();
		}
	}

	private static stageTouchEndHandler(e:egret.TouchEvent):void{

		/*执行回调函数*/
		if(ObjectDecorator.currentObj.mouseup instanceof Function){
			ObjectDecorator.currentObj.mouseup();
		}

		ObjectDecorator.updateRotateHandlePosition();

		ObjectDecorator.isRotating=false;
		ObjectDecorator.isDraging=false;
		ObjectDecorator.currentObj=null;
		
		ObjectDecorator.stage.removeEventListener(egret.TouchEvent.TOUCH_END,ObjectDecorator.stageTouchEndHandler,this);
		ObjectDecorator.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,ObjectDecorator.stageTouchMoveHandler,this);
	}

	public static updateRotateHandlePosition(){
		
		if(ObjectDecorator.currentObj.handle!=null){	
			let distance=ObjectDecorator.currentObj.distance;
			let rotation=ObjectDecorator.currentObj.angle+ObjectDecorator.currentObj.obj.rotation;
			let angle=rotation*Math.PI/180;
			let dx=Math.cos(angle)*distance,dy=Math.sin(angle)*distance;
			ObjectDecorator.currentObj.handle.x=ObjectDecorator.currentObj.obj.x+dx;
			ObjectDecorator.currentObj.handle.y=ObjectDecorator.currentObj.obj.y+dy;
		}
	}

	
}