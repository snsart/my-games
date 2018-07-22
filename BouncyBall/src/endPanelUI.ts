class endPanelUI extends eui.Group{
	private _replayBtn:eui.Button;
	private _score:InfoUI;
	private _time:InfoUI;

	constructor(width:number,height:number) {
        super();
		this.width=width;
		this.height=height;
		this.createChildren();
    }
    protected createChildren(): void {
        super.createChildren();
		this.drawBack();
		this.addTitle();

		this._score=new InfoUI();
		this._score.label="score";
		this._score.x=this.width/2-this._score.width/2;
		this._score.y=this.height/2;
		this.addChild(this._score);

		this._time=new InfoUI();
		this._time.label="time";
		this._time.x=this.width/2-this._time.width/2;
		this._time.y=this._score.y+50;
		this.addChild(this._time);

        this._replayBtn = new eui.Button();
        this._replayBtn.label = "replay";
		this._replayBtn.horizontalCenter=0;
		this._replayBtn.y=this._time.y+50;
        this.addChild(this._replayBtn);
    }


	public get replayBtn():eui.Button{
		return this._replayBtn;
	}

	public get time():InfoUI{
		return this._time;
	}

	public get score():InfoUI{
		return this._score;
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
		title.text="gameOver";
		title.size=40;
		title.x=this.width/2-title.width/2;
		title.y=this.height/4;
		this.addChild(title);
	}
}