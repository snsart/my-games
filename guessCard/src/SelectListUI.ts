class SelectListUI extends egret.Sprite {

	private _selectId:number=0;
	private _selectBtnList:SelectedButton[]=[];
	
	public constructor() {
		super();
		this.createView();
	}


	public get selectId():number{
		return this._selectId;
	}

	public init():void{
		for(let i=0;i<3;i++){
			this._selectBtnList[i].select=false;
		}
		this._selectId=0;
	}

	private createView(): void {
        for(var i=0;i<3;i++){
            let selectBtn:SelectedButton=new SelectedButton();
            this.addChild(selectBtn);
            selectBtn.x=i*250;
			selectBtn.touchEnabled=true;
			this._selectBtnList.push(selectBtn);
			selectBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.clickHandler,this);
        }
    }

	private clickHandler(e:egret.TouchEvent){
		let selectBtn=e.currentTarget as SelectedButton;
		this._selectId=this._selectBtnList.indexOf(selectBtn)+1;
		selectBtn.select=true;
		for(let i=0;i<3;i++){
			if(i!=this._selectId-1){
				this._selectBtnList[i].select=false;
			} 
		}
	}




}