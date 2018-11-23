enum CardState{
	FACE=0,
	BACK,
	REVERSING,
}

class Card extends egret.Sprite{
	private _faceID:string;
	private _backID:string;
	private _faceImg:egret.Bitmap;
	private _backImg:egret.Bitmap;
	private _speed=0.1;
	private _isdeal=false;
	private _state:CardState;
	private _stateBeforeReverse:CardState;

	public constructor(_faceID:string,_backID:string) {
		super();
		this.width=120;
		this.height=168;
		this.anchorOffsetX=this.width/2;
		this._faceID=_faceID;
		this._backID=_backID;
		this.draw();
	}

	public get faceID():string{
		return this._faceID;
	}

	public get state():CardState{
		return this._state;
	}

	public get isdeal():boolean{
		return this._isdeal;
	}

	public set isdeal(value:boolean){
		this._isdeal=value;
	}

	public init():void{
		this._state=CardState.FACE;
		this.reverse();
	}
	
	public reverse():void{
		if(this._state!=CardState.REVERSING){
			this._stateBeforeReverse=this._state;
			this._state=CardState.REVERSING;
			egret.startTick(this.enterFrameHandler,this);
		}
	}

	/*-------------------------------------------------------------------------------------------*/

	private draw():void{
		let faceTxtr:egret.Texture = RES.getRes(this._faceID);
       	this._faceImg= new egret.Bitmap(faceTxtr);
		this._faceImg.width=this.width;
		this._faceImg.height=this.height;
		
		let backTxtr:egret.Texture = RES.getRes(this._backID);
       	this._backImg= new egret.Bitmap(backTxtr);
		this._backImg.width=this.width;
		this._backImg.height=this.height;

		this.addChild(this._backImg);
		this._state=CardState.BACK;
	}

	private enterFrameHandler():boolean{
		this.scaleX-=this._speed;
		if(Math.abs(this.scaleX)<0.1){
			if(this._stateBeforeReverse==CardState.FACE){
				if(this.getChildIndex(this._faceImg)!=-1){
					this.removeChild(this._faceImg);
				}
				this.addChild(this._backImg);
			}else{
				if(this.getChildIndex(this._backImg)!=-1){
					this.removeChild(this._backImg);
				}
				this.addChild(this._faceImg);
			}
			this._speed=-0.1;
		}
		if(this.scaleX==1){	
			egret.stopTick(this.enterFrameHandler,this);
			if(this._stateBeforeReverse==CardState.FACE){
				this._state=CardState.BACK;
			}else{
				this._state=CardState.FACE;
			}
			
			this._speed=0.1;
		}
		return true;
	}
}