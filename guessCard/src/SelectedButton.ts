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
			this.drawSelectedBg(true);
		}else{
			this._selectedImg.visible=false;
			this._unselectedImg.visible=true;
			this.drawSelectedBg(false);
		}
	}

	public get select():Boolean{
		return this._select;
	}

	private createView(): void {

		this._selectedBg=new egret.Shape();
		this.drawSelectedBg(false);
		this.addChild(this._selectedBg);

        this._unselectedImg=this.createBitmapByName("button#unselect");
		this.addChild(this._unselectedImg);
		this._unselectedImg.width=30;
		this._unselectedImg.height=30;
		this._unselectedImg.x=-15;
		this._unselectedImg.y=-15;
		this._selectedImg=this.createBitmapByName("button#select");	
		this.addChild(this._selectedImg);
		this._selectedImg.width=30;
		this._selectedImg.height=30;
		this._selectedImg.x=-15;
		this._selectedImg.y=-15;
		this._selectedImg.visible=false;
		this._unselectedImg.visible=true;
	
    }

	private drawSelectedBg(line:boolean){
		this._selectedBg.graphics.clear();
		if(line){
			this._selectedBg.graphics.lineStyle(1,0xffff00);
		}
		/*0f2642*/
		this._selectedBg.graphics.beginFill(0xffffff,0.1);
		this._selectedBg.graphics.drawRoundRect(-100,-600,200,600,30,30);
		this._selectedBg.graphics.endFill();
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}