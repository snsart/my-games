class ObjectDecorator extends egret.DisplayObject {

	private static obj:egret.DisplayObject;

	public constructor() {
		super();
	}

	public static get(obj:egret.DisplayObject):ObjectDecorator{
		ObjectDecorator.obj=obj;
		return ObjectDecorator;
	}

	
}