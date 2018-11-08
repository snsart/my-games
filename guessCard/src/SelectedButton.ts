class SelectedButton extends egret.Sprite {

	private _select:Boolean=false;
	private _unselectedImg:egret.Bitmap;
	private _selectedImg:egret.Bitmap;
	private _selectedBg:egret.Shape;

	public constructor() {
		super();
		this.createView();
	}

	public set select(value:Boolean){
		if(value){
			this._selectedImg.visible=true;
			this._unselectedImg.visible=false;
			this.drawRoundRect(true);
		}else{
			this._selectedImg.visible=false;
			this._unselectedImg.visible=true;
			this.drawRoundRect(false);
		}
	}

	public get select():Boolean{
		return this._select;
	}

	private createView(): void {

        this._unselectedImg=this.createBitmapByName("button#unselect");
		this.addChild(this._unselectedImg);
		this._selectedImg=this.createBitmapByName("button#select");	
		this.addChild(this._selectedImg);
		this._selectedImg.visible=false;
		this._unselectedImg.visible=true;

		this._selectedBg=new egret.Shape();
		this.drawRoundRect(false);
		this.addChild(this._selectedBg);
    }

	private drawRoundRect(line:boolean){
		this._selectedBg.graphics.clear();
		if(line){
			this._selectedBg.graphics.lineStyle(1,0xffff00);
		}
		/*0f2642*/
		this._selectedBg.graphics.beginFill(0xffffff,0.1);
		this._selectedBg.graphics.drawRoundRect(-85,-560,185,560,30,30);
		this._selectedBg.graphics.endFill();
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}