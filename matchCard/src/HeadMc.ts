class HeadMc extends egret.Sprite {

	private _headImg:egret.Bitmap;
	private _headID:number;
	private _bg:egret.Shape;
	private _state:string="noselected";
	private _hideMc:egret.Shape;

	public constructor(headImg) {
		super();
		this._headImg=headImg;
		this.create();
	}

	public set state(value:string){
		this._state=value;
		this.draw();
	}

	public set headID(value:number){
		this._headID=value;
	}

	public get headID():number{
		return this._headID;
	}

	public set headImg(value:egret.Bitmap){
		this._headImg=value;
	}

	public get headImg():egret.Bitmap{
		return this._headImg;
	}

	private create(){
		this._bg=new egret.Shape();
		this.addChild(this._bg);
		this.addChild(this._headImg);
		this._headImg.width=80;
		this._headImg.height=80;

		/*this._hideMc=new egret.Shape();
		this._hideMc.graphics.beginFill(0x000000,0.5);
		this._hideMc.graphics.drawRect(0,0,80,80);
		this._hideMc.graphics.endFill();
		this.addChild(this._hideMc);
		this.draw();*/
	}

	private draw(){
		this._bg.graphics.clear();
		
		if(this._state=="current"){
			this._bg.graphics.lineStyle(2,0xff0000);
		}
		this._bg.graphics.beginFill(0xffffff);
		this._bg.graphics.drawRect(0,0,80,80);
		if(this._state=="selected"){
			this.alpha=0.2;
		}else{
			this.alpha=1;
		}
	}


}