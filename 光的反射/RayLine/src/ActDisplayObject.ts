/*
可拖动对象行为配置；
*/
class DragDisplayObject{

	public obj:egret.DisplayObject;//显示对象

	public mouseup:Function;//拖动停止时的行为
	public mousedown:Function;//拖动开始时
	public mousemove:Function;//正在拖动时的行为

	//拖动行为配置
	public center:boolean=true;//拖动时鼠标位置是否居中
	public range:egret.Rectangle=null;//拖动范围

	//旋转配置
	public handle:egret.DisplayObject=null;//控制杆
	public distance:number=50;//控制杆离物体的距离
	public angle:number=0;//控制杆的偏移角度

	public constructor(obj,mouseup=null,mousedown=null,mousemove=null) {	
		this.obj=obj;
		this.mouseup=mouseup;
		this.mousedown=mousedown;
		this.mousemove=mousemove;
	}

	/*public set obj(value:egret.DisplayObject){
		this._obj=value;
	}


	public get obj():egret.DisplayObject{
		return this._obj;
	}

	public set mouseup(value:Function){
		this._mouseup=value;
	}


	public get mouseup():Function{
		return this._mouseup;
	}


	public set mousedown(value:Function){
		this._mousedown=value;
	}


	public get mousedown():Function{
		return this._mousedown;
	}

	public set mousemove(value:Function){
		this._mousemove=value;
	}


	public get mousemove():Function{
		return this._mousemove;
	}*/

}