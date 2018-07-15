class Ball {
	private _ballBody:p2.Body;
	private _ball:egret.Sprite;
	public constructor() {
	}

	private addBall(){
		this._ballBody=new p2.Body({
            mass:1,
            position:[200,500]
        });
        let ballShape:p2.Circle=new p2.Circle({
            radius:10
        })
        this._ballBody.addShape(ballShape);
        this._world.addBody(this._ballBody);
        this.render(this._ballBody);
	}
}