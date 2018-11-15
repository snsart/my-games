class Player extends egret.Sprite {
	
	private _cardnum:number=0;
	private _headImg:egret.Bitmap;
	private _focus:boolean=false;
	private _bg:egret.Shape=new egret.Shape();

	public constructor() {
		super();
	}

	public set cardNum(value:number){
		this._cardnum=value;
	}

	public get cardNum():number{
		return this._cardnum;
	}

	public set headImg(value:egret.Bitmap){
		this._headImg=value;
	}

	private set focus(value:boolean){
		this._focus=value;
	}

	private draw(){
		this.drawbg();
	}

	private drawbg(){
			this._bg.graphics.clear();
	}
}