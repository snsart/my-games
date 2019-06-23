class Canvas extends egret.Sprite {

	private _width:number;
	private _height:number;
	private _drawAble:boolean=true;
	private _startPoint:egret.Point;
	private _bg:egret.Shape=new egret.Shape();
	private _lines=[];
	private _currentLine:egret.Shape;

	public constructor(width:number,height:number) {
		super();
		this._width=width;
		this._height=height;
		this._startPoint;
		this.touchEnabled=true;
		this.createBackGround();
		this.addChild(this._bg);
		this.addEvents();
	}

	public set drawAble(value:boolean){
		this._drawAble=value;
		if(value){
			this.touchEnabled=true;
		}else{
			this.touchEnabled=false;
		}
	}

	private addEvents(){
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){
			let x=e.stageX;
			let y=e.stageY;
			this._currentLine=new egret.Shape();
			this.addChild(this._currentLine);
			this._startPoint=new egret.Point(x,y);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.drawEndHandler,this);
		},this);

		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){
	
			console.log(1245);
			let g=this._currentLine.graphics;
			g.clear();
			g.lineStyle(3,0x000000);
			g.moveTo(this._startPoint.x,this._startPoint.y);
			g.lineTo(e.stageX,e.stageY);

		},this);

	}

	private drawEndHandler(e){
		let x=e.stageX;
		let y=e.stageY;
		let endPoint=new egret.Point(x,y);
		this._lines.push([this._startPoint,endPoint]);
		console.log(this._lines);
		this._startPoint=null;
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.drawEndHandler,this);
	}

	private createBackGround(){
		let bg=new egret.Shape();
		let g=bg.graphics;
		g.beginFill(0xffffff);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(bg);
	}

	
}