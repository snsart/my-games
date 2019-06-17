class Ghost extends Role {

	private _rolelive:egret.Bitmap;
	private _roledeath:egret.Bitmap;
	

	public constructor() {
		super();
		this.type=Role.GHOSR_TYPE;
		this.draw();
		this.live();
	}

	public die(){
		this._rolelive.visible=false;
		this._roledeath.visible=true;
	}

	public live(){
		this._rolelive.visible=true;
		this._roledeath.visible=false;
	}

	private draw(){
		
		this._rolelive=this.createBitmapByName("ghost_png");
		let rolelive=this._rolelive;
		rolelive.width=70;
		rolelive.height=70;
		rolelive.anchorOffsetX=rolelive.width/2;
		rolelive.anchorOffsetY=rolelive.height/2;
		this.addChild(rolelive);

		
		this._roledeath=this.createBitmapByName("death_png");
		let roledeath=this._roledeath;
		roledeath.width=70;
		roledeath.height=70;
		roledeath.anchorOffsetX=roledeath.width/2;
		roledeath.anchorOffsetY=roledeath.height/2;
		this.addChild(roledeath);
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}