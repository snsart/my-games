/*镜子*/
class Mirror extends egret.Sprite {

	private _stage:egret.Stage;
	private _mirror:egret.Bitmap;
	private _mirrorLength:number=200;

	public static POSITION_CHANGE:string="position_change";

	private _line:Line;

	public constructor(stage:egret.Stage) {
		super();
		this._stage=stage;
		
		this._line=new Line();
		this.drawMirror();
		this.updateLine();
	}

	public get line():Line{
		return this._line;
	}

	public set x(value:number){
		this._mirror.x=value;
		ObjectDecorator.get(this._mirror).updateRotateHandlePosition();
		this.updateLine();
	}

	public set y(value:number){
		this._mirror.y=value;
		ObjectDecorator.get(this._mirror).updateRotateHandlePosition();
		this.updateLine();
	}


	private drawMirror(){
		this._mirror=this.createBitmapByName("mirror_png");
       	this._mirror.anchorOffsetX=this._mirror.width/2;
        this.addChild(this._mirror);
       
	    let rotate=this.createBitmapByName("rotate_png");
        rotate.anchorOffsetX=rotate.width/2;
        rotate.anchorOffsetY=rotate.height/2
        this.addChild(rotate);

        ObjectDecorator.get(this._mirror).addRotateAction(this._stage,rotate,150,0).moveHandler(function(){
			this.updateLine();
			this.dispatchEvent(new egret.Event(Mirror.POSITION_CHANGE));
		}.bind(this));

        ObjectDecorator.get(this._mirror).addDragAction(this._stage).moveHandler(function(){
			this.updateLine();
			this.dispatchEvent(new egret.Event(Mirror.POSITION_CHANGE));
		}.bind(this));

	}

	private updateLine(){
		let angle=this._mirror.rotation*Math.PI/180;
		let dx=(this._mirrorLength/2)*Math.cos(angle);
		let dy=(this._mirrorLength/2)*Math.sin(angle);
		this.line.startPoint.x=this._mirror.x-dx;
		this.line.startPoint.y=this._mirror.y-dy;
		this.line.endPoint.x=this._mirror.x+dx;
		this.line.endPoint.y=this._mirror.y+dy;
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}