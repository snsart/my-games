class SpEffect extends egret.Sprite {
	private _effectMcs:egret.Bitmap[]=[];
	private _addStages:egret.Bitmap[]=[];
	private _vxs:number[]=[];
	private _vys:number[]=[];
	private _gravity:number=0.8;
	private _radius:number=400;
	private _runing=false;

	public constructor() {
		super();
		this.setEffectMcs();
	}

	public startPlay(){
		this._runing=true;
		for(let i=0;i<50;i++){	
			egret.setTimeout(function(){
				if(this._runing){
					this._addStages.push(this._effectMcs[i]);
					this.addChild(this._effectMcs[i]);
				}
			},this,50*i);	
		}
		this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}

	public stop(){
		this._runing=false;
		this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		for(let i=0;i<this._effectMcs.length;i++){
			if(this.getChildIndex(this._effectMcs[i])!=-1){
				this.removeChild(this._effectMcs[i]);
			}
		}
		this._addStages=[];	
	}

	private setEffectMcs(){
		for(let i=0;i<50;i++){
			let vx:number=Math.random()*10-5;
			let vy:number=-Math.random()*20;
			this._vxs.push(vx);
			this._vys.push(vy);
		}
		for(let i=0;i<100;i++){
			let mc:egret.Bitmap=this.createBitmapByName("tx"+((i%4)+1));
			this._effectMcs.push(mc);
		}
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

	private enterFrameHandler(){
		this._addStages.forEach(function(mc,index){
			mc.rotation+=5;
			mc.alpha-=0.01;
			mc.x+=this._vxs[index];
			this._vys[index]+=this._gravity;
			mc.y+=this._vys[index];
			if(mc.y>300){
				this._vxs[index]=Math.random()*10-5;
				this._vys[index]=-Math.random()*20;
				mc.x=0;
				mc.y=0;
				mc.alpha=1;
			}
		},this);
	}

}