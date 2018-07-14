class ButtonUI extends egret.Sprite{
	private _label:string="按钮";
	private _labelTxt:egret.TextField;

	public constructor() {
		super();
		this.create();
	}
	public set label(label:string){
		this._label=label;
		this._labelTxt.text =label;
	}

	private create():void{
		this.graphics.clear();
		this.graphics.lineStyle(1,0xffffff);
		this.graphics.beginFill(0x000000,0.3);
		this.graphics.drawRoundRect(0,0,100,50,10);
		this.graphics.endFill();

		this._labelTxt = new egret.TextField(); 
		this._labelTxt.textColor=0xffffff;
		this._labelTxt.textAlign = egret.HorizontalAlign.CENTER;
		this._labelTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._labelTxt.text = this.label;
		this._labelTxt.width=100;
		this._labelTxt.height=50;
		this.addChild(this._labelTxt);
	}
}