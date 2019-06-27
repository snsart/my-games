class ControlPanel extends egret.Sprite {
	
	private _width:number;
	private _height:number;
	private _levelInfo:egret.TextField;
	private _canvas:Canvas;
	private _triangleList:TriangleList;

	public constructor(width:number,height:number,canvas:Canvas,list:TriangleList) {
		super();
		this._width=width;
		this._height=height;
		this._canvas=canvas;
		this._triangleList=list;
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

		let drawBtn:eui.ToggleButton=new eui.ToggleButton();
		drawBtn.label="绘 图";
		drawBtn.width=100;
		drawBtn.height=50;
		drawBtn.x=10;
		drawBtn.y=5;
		drawBtn.selected=true;
		this.addChild(drawBtn);
		drawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			this._canvas.drawAble=drawBtn.selected;
		},this)

		
		let reDrawBtn:eui.Button=new eui.Button();
		reDrawBtn.label="修 正";
		reDrawBtn.width=100;
		reDrawBtn.height=50;
		reDrawBtn.x=120;
		reDrawBtn.y=5;
		this.addChild(reDrawBtn);
		reDrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			drawBtn.selected=false;
			this._canvas.drawAble=drawBtn.selected;
			this._canvas.reDraw();
		},this)

		let markBtn:eui.Button=new eui.Button();
		markBtn.label="标 记";
		markBtn.width=100;
		markBtn.height=50;
		markBtn.x=230;
		markBtn.y=5;
		this.addChild(markBtn);
		markBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			drawBtn.selected=false;
			this._canvas.drawAble=drawBtn.selected;
			this._canvas.markCross();
		},this)


		
		let answerBtn:eui.Button=new eui.Button();
		answerBtn.label="答 案";
		answerBtn.width=100;
		answerBtn.height=50;
		answerBtn.x=340;
		answerBtn.y=5;
		this.addChild(answerBtn);
		answerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			drawBtn.selected=false;
			this._canvas.drawAble=drawBtn.selected;
			this._triangleList.list=[];
			this._triangleList.list=this._canvas.triangles;
		},this)

		let updateBtn:eui.Button=new eui.Button();
		updateBtn.label="刷 新";
		updateBtn.width=100;
		updateBtn.height=50;
		updateBtn.x=this._width-110;
		updateBtn.y=5;
		this.addChild(updateBtn);
		updateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
			drawBtn.selected=true;
			this._canvas.drawAble=drawBtn.selected;
			this._triangleList.list=[];
			this._canvas.update();
		},this)
/*
		prebutton=new Button("绘图");
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
*/
	}

}