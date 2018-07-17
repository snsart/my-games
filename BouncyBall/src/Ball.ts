class Ball extends egret.Sprite{
	private _ballBody:p2.Body;
	private _ball:egret.Sprite;
	private _world:p2.World;
	public constructor() {
		super();
		this._world=World.getInstance();
		this.addBall();
	}

	public get ballBody():p2.Body{
		return this._ballBody;
	}

	public render():void{
		this._ball.x=this._ballBody.interpolatedPosition[0];
		this._ball.y=this._ballBody.interpolatedPosition[1];
	}

	private addBall(){
		this._ballBody=new p2.Body({
            mass:1,
			position:[200,400]
        });
        let ballShape:p2.Circle=new p2.Circle({
            radius:15
        })
        this._ballBody.addShape(ballShape);
        this._world.addBody(this._ballBody);

        this._ball=new egret.Sprite();
		this._ball.graphics.beginFill(0xffff00);
		this._ball.graphics.drawCircle(0,0,ballShape.radius);
		this._ball.graphics.endFill();
		this.addChild(this._ball);
	}
}