class Bat extends egret.Sprite{
	private _world:p2.World;
	private _stage:egret.Stage;
	private _batBody:p2.Body;
	private _bat:egret.Sprite;
	private _isTouch:boolean;
	private _batWidth:number=100;
	private _force:number[];
	private _lastPosition:number;

	public constructor(stage:egret.Stage) {
		super();
		this._world=World.getInstance();
		this._stage=stage;
		this._bat=new egret.Sprite();
		this._force=[0,-400];
		this._lastPosition=0;
		this.createBat();
		this.addEvent();
	}

	public get force():number[]{
		return this._force;
	}

	public get body():p2.Body{
		return this._batBody;
	}

	private createBat(){
		this._batBody=new p2.Body({
			position:[this._stage.stageWidth/2,this._stage.stageHeight-50]
		});

		let batShape:p2.Box=new p2.Box({
			width:this._batWidth,
			height:80	
		});
		this._batBody.addShape(batShape);
		this._world.addBody(this._batBody);
		this.addChild(this._bat);
		this.render(this._batBody);
	}

	private render(body:p2.Body){
		let s:p2.Box=body.shapes[0] as p2.Box;
		this._bat.x=body.position[0];
		this._bat.y=body.position[1];
		this._bat.graphics.clear();
		this._bat.graphics.beginFill(0x888888);
		this._bat.graphics.drawRect(-s.width/2,-s.height/2,s.width,s.height);
		this._bat.graphics.endFill();
	}

	private addEvent(){
		this._bat.touchEnabled=true;
		this._bat.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{
			this._lastPosition=0;
			this._isTouch=true;
		},this);
		this._stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,(e)=>{
			if(this._isTouch){
				this._batBody.position[0]=Math.max(this._batWidth/2+10,Math.min(e.stageX,this._stage.stageWidth-10-this._batWidth/2));
				this.force[0]=(this._lastPosition==0?0:this._batBody.position[0]-this._lastPosition)*100;
				this._lastPosition=this._batBody.position[0];
				this.render(this._batBody);
			}
		},this);
	}

}