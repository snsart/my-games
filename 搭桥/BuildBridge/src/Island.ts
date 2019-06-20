class Island extends egret.Sprite {

	/*island state*/
	public static INIT:string="init";
	public static SELECTED:string="selected";
	public static COMPLETED:string="completed";

	private _adjoins:Island[]=[null,null,null,null];
	private _currentBridgeNum=0;
	private _totalBridgeNum=8;
	private _state:string;
	private _bg:egret.Shape;
	private _txt:egret.TextField;
	private _radius:number;

	private _rowIndex:number;
	private _colIndex:number;

	public constructor(totalBridgeNum:number,radius:number=40) {
		super();
		this._radius=radius;
		this._totalBridgeNum=totalBridgeNum;
		this._bg=new egret.Shape;
		this.addChild(this._bg);

		this._txt=new egret.TextField();
		this._txt.text=String(totalBridgeNum);
		this._txt.textAlign=egret.HorizontalAlign.CENTER;
		this._txt.verticalAlign=egret.VerticalAlign.MIDDLE;
		let size=radius*1.5;
		this._txt.width=size;
		this._txt.height=size;
		this._txt.anchorOffsetX=size/2;
		this._txt.anchorOffsetY=size/2;
		this._txt.bold=true;
		this._txt.size=size;
		this.addChild(this._txt);

		this._state=Island.INIT;
		this.draw();
	}

	public get adjoins(){
		return this._adjoins;
	}

	public set state(state:string){
		this._state=state;
		this.draw();
	}

	public get state():string{
		return this._state;
	}

	public set colIndx(value:number){
		this._colIndex=value;
	}

	public get colIndx():number{
		return this._colIndex;
	}

	public set rowIndx(value:number){
		this._rowIndex=value;
	}

	public get rowIndx():number{
		return this._rowIndex;
	}

	public get totalBridgeNum():number{
		return this._totalBridgeNum;
	}

	public set currentBridgeNum(value:number){
		this._currentBridgeNum=value;
		if(this._currentBridgeNum==this._totalBridgeNum){
			this.state=Island.COMPLETED;
		}else{
			this.state=Island.INIT;
		}
	}

	public get currentBridgeNum():number{
		return this._currentBridgeNum;
	}

	private draw(){
		let fillColor:number;
		let textColor:number;
		switch(this._state){
			case Island.INIT:
				fillColor=0xffffff;
				textColor=0x000000;
				break;
			case Island.SELECTED:
				fillColor=0x10A8FF;
				textColor=0xffffff;
				break;
			case Island.COMPLETED:
				fillColor=0x04874C;
				textColor=0xffffff;
				break;
		}
		let g=this._bg.graphics;
		g.clear();
		g.beginFill(fillColor);
		g.lineStyle(3,0x555555);
		g.drawCircle(0,0,this._radius);
		g.endFill();

		this._txt.textColor=textColor;
	}
		
}