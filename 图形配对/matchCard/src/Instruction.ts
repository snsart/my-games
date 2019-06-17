class Instruction extends egret.Sprite {

	private static _instance:Instruction;

	public constructor() {
		super();
		this.draw();
	}

	public static getInstance():Instruction{
		if(this._instance==null){
			this._instance=new Instruction();
		}
		return this._instance;
	}

	private draw(){
		let bg:egret.Shape=new egret.Shape();
		bg.graphics.beginFill(0x000000,1);
		bg.graphics.drawRect(0,0,1024,768);
		this.addChild(bg);

		let intro:egret.Bitmap=this.createBitmapByName("intro");
		intro.x=0;
		intro.y=150;
		this.addChild(intro);

		let introBtn:egret.Bitmap=this.createBitmapByName("introCloseBtn");
		introBtn.x=800;
		introBtn.y=460;
		this.addChild(introBtn);
		introBtn.touchEnabled=true;
		introBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
			this.close();
		},this)

	}

	private close(){
		egret.Tween.get(this).to({alpha:0},200).call(function(){
			if(this.parent.getChildIndex(this)!=-1){
				this.parent.removeChild(this);
			}
		})	
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}