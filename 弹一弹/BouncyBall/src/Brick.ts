class Brick extends egret.Sprite{
	private _brickBody:p2.Body;
	private _brick:egret.Sprite;
	private _world:p2.World;
	public constructor() {
		super();
		this._world=World.getInstance();
		this.addBrick();
	}

	public get brickBody():p2.Body{
		return this._brickBody;
	}

	public render():void{
		this._brick.x=this._brickBody.position[0];
		this._brick.y=this._brickBody.position[1];
	}

	private addBrick(){
		this._brickBody=new p2.Body();
		this._brickBody.displays=[this];

        let ballShape:p2.Box=new p2.Box({
			width:50,
			height:20
		})

        this._brickBody.addShape(ballShape);
        this._world.addBody(this._brickBody);

        this._brick=new egret.Sprite();
		this._brick.graphics.beginFill(0xffff00);
		this._brick.graphics.drawRect(-ballShape.width/2,-ballShape.height/2,ballShape.width,ballShape.height);
		this._brick.graphics.endFill();
		this.addChild(this._brick);
	}

	public destroy(){
		this._world.removeBody(this._brickBody);
		this.parent.removeChild(this);
	}
}