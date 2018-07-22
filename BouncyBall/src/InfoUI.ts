class InfoUI extends egret.Sprite {
	private _score:number=0;
	private _label:egret.TextField;
	private _inputTxt:egret.TextField;
	public constructor() {
		super();
		this.create();
	}

	public set value(_score:number){
		this._score=_score;
		this._inputTxt.text=String(this._score);
	}

	public get value():number{
		return this._score;
	}

	public set label(_label:string){
		this._label.text =_label; 
	}

	private create():void{
		this._label= new egret.TextField(); 
		this._label.textColor=0xffff00;
		this._label.text = "score:"; 
		this._label.width=100;
		this._label.height=30;
		this.addChild(this._label);

		this._inputTxt=new egret.TextField();
		this._inputTxt.textColor=0xffff00;
		this._inputTxt.x=110;
		this._inputTxt.text=String(this._score);
		this.addChild(this._inputTxt);
	}

	
}