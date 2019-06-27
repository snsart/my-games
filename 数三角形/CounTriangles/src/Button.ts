class Button extends egret.Sprite {

	private _label:egret.TextField;
	private _bgColor:number;

	public constructor(label:string="按钮") {
		super();
		this._label=new egret.TextField();
		this._label.text=label;
		this._bgColor=0xffffff;

		this.draw();
	}

	public set clickable(value:boolean){
		
		if(value){
			this.touchEnabled=true;
			this._bgColor=0xffffff;
		}else{
			this.touchEnabled=false;
			this._bgColor=0xbbbbbb;
		}
		this.draw();
	} 

	private draw(){
		let txt=this._label;
		txt.textColor=0x333333;
		txt.size=20;
		txt.bold=true;
		txt.x=10;
		txt.y=10;
		txt.fontFamily="微软雅黑";

		let bg=new egret.Shape();
		let g=bg.graphics;
		g.clear();
		g.lineStyle(1,0x888888);
		g.beginFill(this._bgColor);
		g.drawRoundRect(0,0,txt.width+20,txt.height+20,15,15);
		this.addChild(bg);
		this.addChild(txt);
	}

}