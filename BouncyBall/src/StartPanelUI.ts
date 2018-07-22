class StartPanelUI extends eui.Group{
	private _startBtn:eui.Button;

	constructor(width:number,height:number) {
        super();
		this.width=width;
		this.height=height;
    }
    protected createChildren(): void {
        super.createChildren();
		this.drawBack();
		this.addTitle();
        this._startBtn = new eui.Button();
        this._startBtn.label = "start";
		this._startBtn.horizontalCenter = 0;
		this._startBtn.verticalCenter = 0;
        this.addChild(this._startBtn);
    }


	public get startBtn():eui.Button{
		return this._startBtn;
	}

	private drawBack():void{
		var bg:egret.Shape=new egret.Shape();
		bg.graphics.clear();
		bg.graphics.beginFill(0x222222);
		bg.graphics.drawRect(0,0,this.width,this.height);
		bg.graphics.endFill();
		this.addChild(bg);
	}

	private addTitle():void{
		let title:egret.TextField=new egret.TextField();
		title.text="弹力球";
		title.size=80;
		title.x=this.width/2-title.width/2;
		title.y=this.height/4;	
		this.addChild(title);
	}
}