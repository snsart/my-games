class StartPanelUI extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _startBtn:ButtonUI;
	public constructor(width:number,height:number) {
		super();
		console.log(width,height);
		this._width=width;
		this._height=height;
		this.drawBack();
		this.addTitle();
		this.addButton();
	}

	public get startBtn():ButtonUI{
		return this._startBtn;
	}

	private drawBack():void{
		this.graphics.clear();
		this.graphics.beginFill(0x222222);
		this.graphics.drawRect(0,0,this._width,this._height);
		this.graphics.endFill();
	}

	private addTitle():void{
		let title:egret.TextField=new egret.TextField();
		title.text="弹力球";
		title.size=80;
		title.x=this._width/2-title.width/2;
		title.y=this._height/4;
		
		this.addChild(title);
	}

	private addButton():void{
		this._startBtn=new ButtonUI();
		this._startBtn.label="开始";
		this._startBtn.x=this._width/2-this._startBtn.width/2;
		this._startBtn.y=this._height/1.5;
		this.addChild(this._startBtn);
	}

}