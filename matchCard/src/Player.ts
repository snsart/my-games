class Player extends egret.Sprite {
	
	private _cardnum:number=0;
	private _headImg:egret.Bitmap;
	private _focus:boolean=false;
	private _bg:egret.Shape=new egret.Shape();
	private _cardNumText:egret.TextField;

	public constructor() {
		super();
		this.headImg=this.createBitmapByName("headpic_json#h1");
		this._headImg.width=60;
		this._headImg.height=60;
		this.draw();
	}

	public set cardNum(value:number){
		this._cardnum=value;
		this._cardNumText.text=String(value);
	}

	public get cardNum():number{
		return this._cardnum;
	}

	public set headImg(value:egret.Bitmap){
		this._headImg=value;
	}

	private set focus(value:boolean){
		this._focus=value;
	}

	private draw(){
		this.addChild(this._bg);
		this.drawbg();
		this.drawfooter();

		let head=this.createHeadpic();
		head.x=40;
		head.y=235;
		this.addChild(head);

		let cardinfo=this.createCardNumInfo();
		cardinfo.x=90;
		cardinfo.y=235;
		this.addChild(cardinfo);
		
	}

	private drawbg(){
		this._bg.graphics.clear();
		this._bg.graphics.beginFill(0xffffff,0.2);
		this._bg.graphics.drawRoundRect(0,0,180,295,20,20);
		this._bg.graphics.endFill();	
	}

	private drawfooter(){
		let mask:egret.Shape=new egret.Shape();
		mask.graphics.beginFill(0x00a1b2);
		mask.graphics.drawRoundRect(0,190,180,105,20,20);
		mask.graphics.endFill();
		this.addChild(mask);

		let footer:egret.Shape=new egret.Shape();
		footer.graphics.beginFill(0x00a1b2);
		footer.graphics.drawRect(0,220,180,75);
		footer.graphics.endFill();
		footer.mask=mask;
		this.addChild(footer);
	}

	private createHeadpic(){
		let sprite:egret.Sprite=new egret.Sprite();
		let bg:egret.Shape=new egret.Shape();
		bg.graphics.lineStyle(4,0x00a1b2)
		bg.graphics.beginFill(0xffffff);
		bg.graphics.drawCircle(0,0,30);
		bg.graphics.endFill();
		sprite.addChild(bg);

		let mask:egret.Shape=new egret.Shape();
		mask.graphics.beginFill(0x00a1b2);
		mask.graphics.drawCircle(0,0,28);
		mask.graphics.endFill();
		sprite.addChild(mask);

		this._headImg.x=-this._headImg.width/2;
		this._headImg.y=-this._headImg.height/2;
		this._headImg.mask=mask;
		sprite.addChild(this._headImg);

		let txtbg:egret.Shape=new egret.Shape();
		txtbg.graphics.lineStyle(1,0x006e7a);
		txtbg.graphics.beginFill(0x94d1cc);
		txtbg.graphics.drawRoundRect(-this._headImg.width/2-7,32,this._headImg.width+15,25,20,20);
		sprite.addChild(txtbg);

		let text:egret.TextField=new egret.TextField();
		text.text="设置头像";
		text.fontFamily="微软雅黑";
		text.textColor=0x004850;
		text.size=15;
		text.x=-this._headImg.width/2;
		text.y=36;
		sprite.addChild(text);
		return sprite;
	}

	private createCardNumInfo(){
		let info:egret.Sprite=new egret.Sprite();
		this._cardNumText=new egret.TextField();
		this._cardNumText.text=String(54);
		this._cardNumText.size=50;
		this._cardNumText.textAlign="center";
		info.addChild(this._cardNumText);

		this._cardNumText=new egret.TextField();
		this._cardNumText.text="张";
		this._cardNumText.size=20;
		this._cardNumText.textAlign="center";
		this._cardNumText.x=60;
		this._cardNumText.y=20;
		info.addChild(this._cardNumText);
		return info;
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}