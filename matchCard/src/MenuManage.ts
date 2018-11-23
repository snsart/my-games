class MenuManage {
	private _stage:egret.Stage;
	private static _instance:MenuManage;
	private _headImgs:HeadImgs;
	
	public constructor(stage:egret.Stage) {
		this._stage=stage;
	}

	public static getInstance(stage:egret.Stage):MenuManage{
		if(this._instance==null){
			this._instance=new MenuManage(stage);
		}
		return this._instance;
	}

	public open(menuName:String,data:any){
		switch(menuName){
			case "headImgs":
				let headImgs:HeadImgs=HeadImgs.getInstance();
				this._stage.addChild(headImgs);
				headImgs.currentPlayer=data as Player;
				headImgs.x=310;
				headImgs.y=300;
				break;
			case "intro":
				let intro:Instruction=Instruction.getInstance();
				this._stage.addChild(intro);
				egret.Tween.get(intro).to({alpha:1},200);
				break;
		}
	}

	public close(menuName:String){
		switch(menuName){
			case "headImgs":
				this._headImgs=HeadImgs.getInstance();
				if(this._stage.getChildIndex(this._headImgs)!=-1){
					this._stage.removeChild(this._headImgs);
				}
				break;
		}
	}
}