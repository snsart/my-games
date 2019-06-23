class ControlPanel extends egret.Sprite {
	
	private _width:number;
	private _height:number;
	private _levelInfo:egret.TextField;

	public constructor(width:number,height:number) {
		super();
		this._width=width;
		this._height=height;
		this.createBackGround();
		this.addBtns();
	}

	private createBackGround(){
		let bg=new egret.Shape();
		let g=bg.graphics;
		g.lineStyle(1,0xeeeeee);
		g.beginFill(0xffffff);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(bg);
	}

	private addBtns(){
		let prebutton,nextButton,replayButton;

		prebutton=new Button("上一关");
        prebutton.x=10;
		prebutton.y=10;
        this.addChild(prebutton);
		prebutton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
		
		},this);
		prebutton.clickable=false;

		nextButton=new Button("下一关");
        nextButton.x=270;
		nextButton.y=10;
        this.addChild(nextButton);
		nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			
		},this);
		nextButton.clickable=true;

		replayButton=new Button("重 玩");
        replayButton.x=this._width-replayButton.width-10;
		replayButton.y=10;
        this.addChild(replayButton);
		replayButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			
		},this);
		replayButton.clickable=true;

	}

}