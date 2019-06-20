class ControlPanel extends egret.Sprite {
	
	private _map:Map;
	private _width:number;
	private _height:number;
	private _levelInfo:egret.TextField;

	public constructor(map:Map,width:number,height:number) {
		super();
		this._map=map;
		this._width=width;
		this._height=height;
		this.createBackGround();
		this.addLevelInfo();
		this.addBtns();
	}

	private createBackGround(){
		let bg=new egret.Shape();
		let g=bg.graphics;
		g.lineStyle(1,0x666666);
		g.beginFill(0xffffff);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(bg);
	}

	private createLevelInfo():egret.Sprite{
		let levelSprite=new egret.Sprite();
		let g=levelSprite.graphics;
		g.clear();
		g.beginFill(0xffffff);
		g.lineStyle(1,0x888888);
		g.drawRoundRect(0,0,90,70,15,15);
		g.endFill();

		this._levelInfo=new egret.TextField();
		this._levelInfo.text=String(Datas.currentLevel+1);
		this._levelInfo.textColor=0x000000;
		this._levelInfo.textAlign=egret.HorizontalAlign.CENTER;
		this._levelInfo.verticalAlign=egret.VerticalAlign.MIDDLE;
		let size=50;
		this._levelInfo.width=90;
		this._levelInfo.height=70;
		this._levelInfo.bold=true;
		this._levelInfo.size=size;
		levelSprite.addChild(this._levelInfo);

		return levelSprite;
	}

	private addLevelInfo(){
		let levelSprite=this.createLevelInfo();
		levelSprite.x=200;
		levelSprite.y=10;
		this.addChild(levelSprite);
	}

	private addBtns(){
		let prebutton,nextButton,replayButton;

		prebutton=new Button("上一关");
        prebutton.x=10;
		prebutton.y=10;
        this.addChild(prebutton);
		prebutton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			if(Datas.hasPreLevel()){
				this._map.update(Datas.preLevel());
				this._levelInfo.text=String(Datas.currentLevel+1);

				Alert.show("开始搭桥吧");
				nextButton.clickable=true;
				if(!Datas.hasPreLevel()){
					prebutton.clickable=false;
				}
			}
		},this);
		prebutton.clickable=false;

		nextButton=new Button("下一关");
        nextButton.x=330;
		nextButton.y=10;
        this.addChild(nextButton);
		nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			if(Datas.hasNextLevel()){
				this._map.update(Datas.newLevel());
				this._levelInfo.text=String(Datas.currentLevel+1);

				Alert.show("开始搭桥吧");
				prebutton.clickable=true;
				if(!Datas.hasNextLevel()){
					nextButton.clickable=false;
				}
			}
		},this);
		nextButton.clickable=true;

		replayButton=new Button("重 玩");
        replayButton.x=this._width-replayButton.width-10;
		replayButton.y=10;
        this.addChild(replayButton);
		replayButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			this._map.update(Datas.currentLevelData());
			Alert.show("开始搭桥吧");
		},this);
		replayButton.clickable=true;

	}

}