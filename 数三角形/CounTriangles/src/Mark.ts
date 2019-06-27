class Mark extends egret.Sprite{

	private _label:string="a";

	public constructor(label:string) {
		super();
		this._label=label;
		this.draw();
	}

	private draw(){
		let bg:egret.Shape=new egret.Shape();
		let g=bg.graphics;
		g.beginFill(0xff0000);
		g.drawCircle(0,0,15);
		this.addChild(bg);

		let txt:egret.TextField=new egret.TextField();
		txt.text=this._label;
		let size=20;
		txt.size=size;
		txt.textAlign=egret.HorizontalAlign.CENTER;
		txt.verticalAlign=egret.VerticalAlign.MIDDLE;
		txt.width=size;
		txt.height=size;
		txt.anchorOffsetX=size/2;
		txt.anchorOffsetY=size/2;
		txt.bold=true;
		this.addChild(txt);
	}
}