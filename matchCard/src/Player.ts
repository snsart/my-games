class Player extends egret.Sprite {
	
	private _cardnum:number=0;
	private _headID:number=0;
	private _headImg:egret.Bitmap;
	private _focus:boolean=false;
	private _bg:egret.Shape=new egret.Shape();
	private _cardNumText:egret.TextField;
	private _head:egret.Sprite;
	private _headImgs:egret.Bitmap[]=[];
	private _mask:egret.Shape;
	private _cardPot:egret.Point=new egret.Point;
	private _frameShape:egret.Shape=new egret.Shape();

	public constructor() {
		super();
		this.createHeadImgs();
		this.draw();
	}

	public set cardNum(value:number){
		this._cardnum=value;
		this._cardNumText.text=String(value);
	}

	public get cardNum():number{
		return this._cardnum;
	}

	public set headID(value:number){
		this._headID=value;
		this._headImg=this._headImgs[value];
		for(var i=0;i<this._headImgs.length;i++){
			if(this._head.getChildIndex(this._headImgs[i])!=-1){
				this._head.removeChild(this._headImgs[i]);
			}
		}
		this._head.addChild(this._headImg);
		this._headImg.mask=this._mask;
	}

	public get headID():number{
		return this._headID;
	}

	public get head():egret.Sprite{
		return this._head;
	}

	public set focus(value:boolean){
		this._focus=value;
		this.drawFrameShape();
	}

	public get cardPot():egret.Point{
		return this._cardPot;
	}

	/*-----------------------------------------------------------------------------*/

	private createHeadImgs(){
		for(var i=0;i<4;i++){
			let img=this.createBitmapByName("headpic_json#h"+(i+1));
			img.width=60;
			img.height=60;
			img.x=-img.width/2;
			img.y=-img.height/2;
			img.mask=this._mask;
			this._headImgs.push(img);
		}
		this._headImg=this._headImgs[this._headID];
	}

	private draw(){
		this.addChild(this._frameShape);
		this.drawFrameShape();

		this.addChild(this._bg);
		this.drawbg();
		this.drawfooter();

		this._head=this.createHeadpic();
		this._head.x=40;
		this._head.y=235;
		this.addChild(this._head);

		let cardinfo=this.createCardNumInfo();
		cardinfo.x=90;
		cardinfo.y=235;
		this.addChild(cardinfo);
		
	}

	private drawFrameShape(){
		this._frameShape.graphics.clear();
		if(this._focus){
			this._frameShape.graphics.lineStyle(2,0xffff00);
		}
		this._frameShape.graphics.beginFill(0xffffff,0);
		this._frameShape.graphics.drawRoundRect(-5,-5,190,305,20,20);
		this._frameShape.graphics.endFill();
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

		this._mask=new egret.Shape();
		this._mask.graphics.beginFill(0x00a1b2);
		this._mask.graphics.drawCircle(0,0,28);
		this._mask.graphics.endFill();
		sprite.addChild(this._mask);

		this._headImg.x=-this._headImg.width/2;
		this._headImg.y=-this._headImg.height/2;
		this._headImg.mask=this._mask;
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
		this._cardNumText.width=60;
		this._cardNumText.size=50;
		this._cardNumText.textAlign="center";
		info.addChild(this._cardNumText);

		let txtUnit=new egret.TextField();
		txtUnit.text="张";
		txtUnit.size=20;
		txtUnit.textAlign="center";
		txtUnit.x=60;
		txtUnit.y=20;
		info.addChild(txtUnit);
		return info;
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}