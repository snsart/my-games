/*
*
*/

class ObjectDecorator extends egret.DisplayObject {

	private static touchDown:boolean=false;
	private static touchEnd:boolean=false;
	private static touchMove:boolean=false;
	private static stage:egret.Stage;
	private static touchEndCall:Function;
	private static touchMoveCall:Function;
	private static objs=[];
	private static currentObj:DragDisplayObject;

	public constructor() {
		super();
	}

	public static get(obj:egret.DisplayObject){
		ObjectDecorator.currentObj=new DragDisplayObject(obj)
		ObjectDecorator.objs.push(ObjectDecorator.currentObj);
		return ObjectDecorator;
	}

	public static addDragAction(stage:egret.Stage,rect:egret.Rectangle=null,center:boolean=false){

		ObjectDecorator.currentObj.obj.touchEnabled=true;
		ObjectDecorator.currentObj.range=rect;
		ObjectDecorator.currentObj.center=center;
		
		//添加拖动事件相关侦听器
		ObjectDecorator.currentObj.obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,ObjectDecorator.touchBeginHandler,this);
		//stage只注册一次移动事件
		ObjectDecorator.stage=stage;
		if(!stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
			stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,ObjectDecorator.stageTouchMoveHandler,this);
		}
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


	/*鼠标在添加了拖动行为的物体上按下时*/
	private static touchBeginHandler(e:egret.TouchEvent):void{
		let obj=e.currentTarget;

		ObjectDecorator.currentObj=ObjectDecorator.objs.filter(function(item,index,array){if(item.obj==obj){return true}})[0];
	 	
		if(ObjectDecorator.currentObj.mousedown instanceof Function){
			ObjectDecorator.currentObj.mousedown();
		}
		if(!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_END)){
			ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_END,ObjectDecorator.stageTouchEndHandler,this);
		}
	}

	private static stageTouchMoveHandler(e:egret.TouchEvent):void{
		if(ObjectDecorator.currentObj==null){
			return;
		}
		ObjectDecorator.currentObj.obj.x=e.stageX;
		ObjectDecorator.currentObj.obj.y=e.stageY;
		if(ObjectDecorator.currentObj.mousemove instanceof Function){
			ObjectDecorator.currentObj.mousemove();
		}
	}

	private static stageTouchEndHandler(e:egret.TouchEvent):void{
		ObjectDecorator.stage.removeEventListener(egret.TouchEvent.TOUCH_END,ObjectDecorator.stageTouchEndHandler,this);

		if(ObjectDecorator.currentObj.mouseup instanceof Function){
			ObjectDecorator.currentObj.mouseup();
		}
		ObjectDecorator.currentObj=null;
	}



	
}