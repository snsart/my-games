class ObjectDecorator extends egret.DisplayObject {

	private static obj:egret.DisplayObject;
	private static touchDown:boolean=false;
	private static touchEnd:boolean=false;
	private static touchMove:boolean=false;

	public constructor() {
		super();
	}

	public static get(obj:egret.DisplayObject):ObjectDecorator{
		ObjectDecorator.obj=obj;
		return null;
	}

	public static addDragAction(stage:egret.Stage):ObjectDecorator{
		ObjectDecorator.obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,ObjectDecorator.touchBeginHandler,this);
		stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,ObjectDecorator.stageTouchMoveHandler,this);
		return null;
	}

	private static touchBeginHandler():void{
		ObjectDecorator.touchDown=true;
	}

	private static stageTouchMoveHandler():void{
		if(ObjectDecorator)

	}

	
}