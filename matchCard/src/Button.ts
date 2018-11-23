class Button extends egret.Sprite {
	public constructor() {
		super();
		this.draw();
	}

	private draw(){
		let txtbg:egret.Shape=new egret.Shape();
		txtbg.graphics.lineStyle(1,0x006e7a);
		txtbg.graphics.beginFill(0x94d1cc);
		txtbg.graphics.drawRoundRect(0,0,70,30,20,20);
		this.addChild(txtbg);

		let text:egret.TextField=new egret.TextField();
		text.text="确定";
		text.fontFamily="微软雅黑";
		text.width=70;
		text.height=30;
		text.textColor=0x004850;
		text.size=15;
		text.textAlign="center";
		text.verticalAlign="middle";
		this.addChild(text);
	}


}