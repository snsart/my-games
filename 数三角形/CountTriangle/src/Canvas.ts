class Canvas extends egret.Sprite {

	private _width:number;
	private _height:number;

	public constructor(width:number,height:number) {
		super();
		this._width=width;
		this._height=height;
		this.createBackGround();
	}

	private createBackGround(){
		let bg:egret.Shape=new egret.Shape();
		let g=bg.graphics;
		g.beginFill(0xffffff);
		g.lineStyle(1,0xcccccc);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(bg);
	}
}