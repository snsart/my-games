class HeadImgs extends egret.Sprite {

	private static _instance:HeadImgs;
	private _currentPlayer:Player;
	private _currentheadID:number;
	private _currenthead:HeadMc;
	private _selected:HeadMc[]=[];
	private _headMcs:HeadMc[]=[];

	public constructor() {
		super();
		this.draw();
		this.fillHeadImgs();
		this.init();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,function(){
			this.setState();
		},this);
	}

	public static getInstance():HeadImgs{
		if(this._instance==null){
			this._instance=new HeadImgs();
		}
		return this._instance;
	}

	private init(){
		this._currenthead=null;
		this._selected=[this._headMcs[0],this._headMcs[1]];
		this.setState();
	}

	public set currentPlayer(value:Player){
		this._currentPlayer=value;
		this._currentheadID=value.headID;
		this._currenthead=this._headMcs[this._currentheadID];
		this.setState();
	}


	public close(){
		this._selected.push(this._currenthead);
		this.parent.removeChild(this);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	private draw(){
		let shadow:egret.Shape=new egret.Shape();
		shadow.graphics.beginFill(0x000000,0.6);
		shadow.graphics.drawRect(10,10,400,200);
		this.addChild(shadow);

		let bg:egret.Shape=new egret.Shape();
		bg.graphics.beginFill(0xffffff);
		bg.graphics.drawRect(0,0,400,200);
		this.addChild(bg);

		let head:egret.Shape=new egret.Shape();
		head.graphics.beginFill(0x00a1b2);
		head.graphics.drawRect(0,0,400,40);
		this.addChild(head);

		let title:egret.TextField=new egret.TextField();
		title.text="请选择你喜欢的头像";
		title.textColor=0xffffff;
		title.fontFamily="微软雅黑";
		title.size=20;
		title.x=20;
		title.y=10;
		this.addChild(title);

		let button:Button=new Button();
		this.addChild(button);
		button.x=300;
		button.y=160;
		button.touchEnabled=true;
		button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
			this._selected.push(this._currenthead);
			this.close();
		},this);

	}

	private fillHeadImgs(){	
		for(let i=0;i<4;i++){
			let img=this.createBitmapByName("headpic_json#h"+(i+1));
			let headMc=new HeadMc(img);
			this._headMcs.push(headMc);
			headMc.x=20+90*i;
			headMc.y=60;
			headMc.headID=i;
			this.addChild(headMc);
			headMc.touchEnabled=true;
			headMc.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){
				let clickHead=e.currentTarget as HeadMc;
				if(this._selected.indexOf(clickHead)!=-1){
					return;
				}
				this._currentPlayer.headID=clickHead.headID;
				this._currenthead=clickHead;
				this.setState();
			},this);
		}
	}

	private setState(){
		for(let j=0;j<this._headMcs.length;j++ ){
			this._headMcs[j].state="nomal"
		}
	
		if(this._selected.length>0){
			for(let i=0;i<this._selected.length;i++){
				if(this._currenthead!=null&&this._selected[i].headImg==this._currenthead.headImg){
					this._selected.splice(i,1);
				}
			}
			for(let j=0;j<this._selected.length;j++){
				this._selected[j].state="selected";
			}
		}

		if(this._currenthead!=null){
			this._currenthead.state="current";
		}	
	}
	
	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}