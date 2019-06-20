class Bridge extends egret.Sprite {
	private _linkNum:number=0;
	private _bridgeShape:egret.Shape;
	private _startIsland:Island;
	private _endIsland:Island;
	
	public constructor(start:Island,end:Island) {
		super();
		this._bridgeShape=new egret.Shape();
		this.addChild(this._bridgeShape);
		this._startIsland=start;
		this._endIsland=end;
		this.draw();
	}

	public set linkNum(value:number){
		this._linkNum=value;
		this.draw();
	}

	public get linkNum():number{
		return this._linkNum;
	}

	public get startIsland():Island{
		return this._startIsland;
	}

	public get endIsland():Island{
		return this._endIsland;
	}

	public addLink(){
		if(this.linkNum<2){
			this.linkNum++;
			this.startIsland.currentBridgeNum++;
			this.endIsland.currentBridgeNum++;
		}else{
			this.linkNum=0;
			this.startIsland.currentBridgeNum-=2;
			this.endIsland.currentBridgeNum-=2;
		}
	}

	private draw(){
		let g=this._bridgeShape.graphics;
		g.clear();
		g.lineStyle(5,0x333333);
		
		let start=new egret.Point(this._startIsland.x,this._startIsland.y);
		let end=new egret.Point(this._endIsland.x,this._endIsland.y);
		let space=15;//两条桥以上时，桥之间的距离；

		switch(this._linkNum){
			case 0:
				break;
			case 1:
				g.moveTo(start.x,start.y);
				g.lineTo(end.x,end.y);
				break;
			case 2:
				let angle=Math.atan2(end.y-start.y,end.x-start.x)+Math.PI/2;
				let dx=Math.cos(angle)*space/2;
				let dy=Math.sin(angle)*space/2;
				let start1=new egret.Point(start.x+dx,start.y+dy);
				let end1=new egret.Point(end.x+dx,end.y+dy);
				let start2=new egret.Point(start.x-dx,start.y-dy);
				let end2=new egret.Point(end.x-dx,end.y-dy);
				g.moveTo(start1.x,start1.y);
				g.lineTo(end1.x,end1.y);
				g.moveTo(start2.x,start2.y);
				g.lineTo(end2.x,end2.y);
				break;
			case 3:
				angle=Math.atan2(end.y-start.y,end.x-start.x)+Math.PI/2;
				dx=Math.cos(angle)*space;
				dy=Math.sin(angle)*space;
				start1=new egret.Point(start.x+dx,start.y+dy);
				end1=new egret.Point(end.x+dx,end.y+dy);
				start2=new egret.Point(start.x-dx,start.y-dy);
				end2=new egret.Point(end.x-dx,end.y-dy);
				g.moveTo(start.x,start.y);
				g.lineTo(end.x,end.y);
				g.moveTo(start1.x,start1.y);
				g.lineTo(end1.x,end1.y);
				g.moveTo(start2.x,start2.y);
				g.lineTo(end2.x,end2.y);
				break;
		}

	}


}