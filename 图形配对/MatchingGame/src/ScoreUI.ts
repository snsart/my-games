class ScoreUI extends egret.Sprite {
	private _score:number=0;
	private _inputTxt:egret.TextField;
	public constructor() {
		super();
		this.create();
	}

	public set score(_score:number){
		this._score=_score;
		this._inputTxt.text=String(this._score);
	}

	public get score():number{
		return this._score;
	}

	private create():void{
		let label:egret.TextField = new egret.TextField(); 
		label.textColor=0xffff00;
		label.text = "score:"; 
		label.width=100;
		label.height=30;
		this.addChild(label);

		this._inputTxt=new egret.TextField();
		this._inputTxt.textColor=0xffff00;
		this._inputTxt.x=110;
		this._inputTxt.text=String(this._score);
		this.addChild(this._inputTxt);
	}

	
}