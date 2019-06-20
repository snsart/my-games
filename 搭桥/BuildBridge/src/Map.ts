class Map extends egret.Sprite {

	private _datas;

	private _width:number=768;
	private _height:number=768;

	private _islands=[];
	private _bridgesData:Bridge[]=[];
	private _islandLine:Island[]=[];

	private _background:egret.Shape=new egret.Shape();
	private _grid:egret.Shape=new egret.Shape();

	private _firstSelected:Island=null;

	public constructor(datas) {
		super();
		this._datas=datas;
		console.log(this._datas);
		this.createBackground();
		this.createObject();
	}

	public update(datas){
		this._datas=datas;
		this._firstSelected=null;
		this.removeObject();
		this.createObject();
	}

	public createObject(){
		this.createGrid();
		this.createIslands();
		this.createBridges();
		this.addBridges();
		this.addIslands();
		this.addEventToIsland();
	}

	public removeObject(){
		this.removeGrid();
		this.removeEventToIsland();
		this.removeIslands();
		this.removeBridges();
	}

	private createBackground(){
		let g=this._background.graphics;
		g.beginFill(0xffffff);
		g.lineStyle(1,0x666666);
		g.drawRoundRect(10,10,this._width-20,this._width-20,20,20);
		this.addChild(this._background);
	}

	/*创建/移除表格*/
	private createGrid(){
		let g=this._grid.graphics;
		g.clear();
		g.lineStyle(1,0xbbbbbb);
		console.log(this._datas);
		let numCol=this._datas[0].length;
		let numRow=this._datas.length;
		let space=this._width/(numCol+1);

		for(let i=1;i<=numCol;i++){
			let startX=i*space,startY=space,endX=i*space,endY=space*numRow;
			g.moveTo(startX,startY);
			g.lineTo(endX,endY);
			console.log("drawline");
		}
		for(let i=1;i<=numRow;i++){
			let startX=space,startY=i*space,endX=space*numCol,endY=i*space;
			g.moveTo(startX,startY);
			g.lineTo(endX,endY);
		}
		this.addChild(this._grid);
	}

	private removeGrid(){
		let g=this._grid.graphics;
		g.clear();
	} 

	/*添加/移除按钮的事件*/

	private addEventToIsland(){
		for(let i=0;i<this._islandLine.length;i++){
			let island=this._islandLine[i];
			island.touchEnabled=true;
			island.addEventListener(egret.TouchEvent.TOUCH_TAP,this.islandClickHandler,this)

		}
	}

	private removeEventToIsland(){
		for(let i=0;i<this._islandLine.length;i++){
			let island=this._islandLine[i];
			island.touchEnabled=false;
			island.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.islandClickHandler,this)
		}
	}

	private islandClickHandler(e:egret.TouchEvent){
		let island:Island=e.currentTarget;
		switch(island.state){
			case Island.INIT:
			case Island.COMPLETED:
				if(this._firstSelected){
					let bridge=this.search(island,this._firstSelected);
					if(bridge !=null&&!this.isCross(bridge)){
						if(this._firstSelected.currentBridgeNum==this._firstSelected.totalBridgeNum||island.currentBridgeNum==island.totalBridgeNum){
							while(bridge.linkNum!=0){
								bridge.addLink();
							};
						}else{
							bridge.addLink();
							this.checkComplete();
						}
						this._firstSelected=null;
					}else{
						Alert.show("两岛之间只能垂直或水平搭桥，且桥不能相交");
					}
				}else{
					this._firstSelected=island;
					island.state=Island.SELECTED;
				}
				break;
			case Island.SELECTED:
				if(island.currentBridgeNum==island.totalBridgeNum){
					island.state=Island.COMPLETED;
				}else{
					island.state=Island.INIT;
				}
				this._firstSelected=null;
				break;
		}	
	}

	/*已知两座岛，查找连接两岛的桥*/

	private search(island1,island2):Bridge{
		for(var i=0;i<this._bridgesData.length;i++){
			let bridge=this._bridgesData[i];
			let find=(bridge.startIsland==island1&&bridge.endIsland==island2)||(bridge.startIsland==island2&&bridge.endIsland==island1)
			if(find){
				return bridge;
			}
		}
		return null;
	}

	/*创建小岛*/

	private createIslands(){
		let rowNum=this._datas.length;
		let space=this._width/(rowNum+1);
		for(let rowIndex=0;rowIndex<rowNum;rowIndex++){
			let arr=[];
			for(let colIndex=0,colNum=this._datas[rowIndex].length;colIndex<colNum;colIndex++){
				let num=this._datas[rowIndex][colIndex];
				if(num!=0){
					let island:Island=new Island(num);
					island.x=(colIndex+1)*space;
					island.y=(rowIndex+1)*space;
					island.rowIndx=rowIndex;
					island.colIndx=colIndex;
					arr.push(island);
					this._islandLine.push(island);
				}else{
					arr.push(null);
				}
			}
			this._islands.push(arr);
		}
	}

	private addIslands(){
		for(let i=0;i<this._islandLine.length;i++){
			this.addChild(this._islandLine[i]);
		}
	}

	private removeIslands(){
		for(let i=0;i<this._islandLine.length;i++){
			if(this.getChildIndex(this._islandLine[i])!=-1){
				this.removeChild(this._islandLine[i]);
			}
		}
		this._islandLine=[];
		this._islands=[];
	}

	/*创建/移除桥*/

	private createBridges(){
		let startIsland=this._islandLine[0];
		this.check(startIsland);
	}

	private addBridges(){
		for(let i=0;i<this._bridgesData.length;i++){
			this.addChild(this._bridgesData[i]);
		}
	}

	private removeBridges(){
		for(let i=0;i<this._bridgesData.length;i++){
			if(this.getChildIndex(this._bridgesData[i])!=-1){
				this.removeChild(this._bridgesData[i]);
			}
		}
		this._bridgesData=[];
	}

	/*判断是否完成*/
	private checkComplete(){
		let unCompleteNum:number=0;
		let total=this._islandLine.length;
		for(let i=0;i<total;i++){
			if(this._islandLine[i].state!=Island.COMPLETED){
				unCompleteNum++;
			}
		}
		if(unCompleteNum!=0){
			Alert.show("还剩"+unCompleteNum+"个岛未完成，加油！");
		}else{
			Alert.show("恭喜完成本关，你真棒!",6000);
		}
	}

	private check(island:Island){
		
		let left=0,top=0;
		let bottom=this._datas.length-1,right=this._datas[0].length-1;
		
		let currentRow=island.rowIndx;
		let currentCol=island.colIndx;

		//向上遍历
		for(let i=currentRow-1;i>=0;i--){
			let endIsland=this._islands[i][currentCol];
			if(endIsland!=null){
				let bridge=new Bridge(island,endIsland);
				island.adjoins[0]=endIsland;//0：上 1：右 2：下 3：左 
				endIsland[2]=island;
				this._bridgesData.push(bridge);
				this.check(endIsland);
				break;
			}
		}

		//向下遍历
		for(let i=currentRow+1;i<=bottom;i++){
			let endIsland=this._islands[i][currentCol];
			if(endIsland!=null&&endIsland.adjoins[0]==null){
				let bridge=new Bridge(island,endIsland);
				island.adjoins[2]=endIsland;
				endIsland.adjoins[0]=island;
				this._bridgesData.push(bridge);
				this.check(endIsland);
				break;
			}
		}

		//向左遍历
		for(let i=currentCol-1;i>=0;i--){
			let endIsland=this._islands[currentRow][i];
			if(endIsland!=null&&endIsland.adjoins[1]==null){
				let bridge=new Bridge(island,endIsland);
				island.adjoins[3]=endIsland;
				endIsland.adjoins[1]=island;
				this._bridgesData.push(bridge);
				this.check(endIsland);
				break;
			}
		}

		//向右遍历
		for(let i=currentCol+1;i<=right;i++){
			let endIsland=this._islands[currentRow][i];
			if(endIsland!=null&&endIsland.adjoins[3]==null){
				let bridge=new Bridge(island,endIsland);
				island.adjoins[1]=endIsland;
				endIsland.adjoins[3]=island;
				this._bridgesData.push(bridge);
				this.check(endIsland);
				break;
			}
		}
	}

	/*判断bridge和其他桥是否相交*/

	private isCross(bridge:Bridge):boolean{
		for(var i=0;i<this._bridgesData.length;i++){
			let anotherBridge=this._bridgesData[i];
			if(anotherBridge==bridge||anotherBridge.linkNum==0){
				continue;
			}

			/*起点或终点重合的情况*/
			if(bridge.startIsland==anotherBridge.startIsland||bridge.startIsland==anotherBridge.endIsland||
				bridge.endIsland==anotherBridge.startIsland||bridge.endIsland==anotherBridge.endIsland){
					continue;
			}

			let start1=new egret.Point(bridge.startIsland.x,bridge.startIsland.y);
			let end1=new egret.Point(bridge.endIsland.x,bridge.endIsland.y);
			let start2=new egret.Point(anotherBridge.startIsland.x,anotherBridge.startIsland.y);
			let end2=new egret.Point(anotherBridge.endIsland.x,anotherBridge.endIsland.y);
			if(this.segmentsIntr(start1,end1,start2,end2)){
				return true;
			}
		}
		return false;
	}

	private segmentsIntr(a, b, c, d){ 
		var denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
		if (denominator==0) {  
			return false;  
		}     
		var x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
					+ (b.y - a.y) * (d.x - c.x) * a.x   
					- (d.y - c.y) * (b.x - a.x) * c.x ) / denominator;  
		var y = -( (b.y - a.y) * (d.y - c.y) * (c.x - a.x)   
					+ (b.x - a.x) * (d.y - c.y) * a.y   
					- (d.x - c.x) * (b.y - a.y) * c.y ) / denominator;   
		if(  
			Math.round(x - a.x) * Math.round(x - b.x) <= 0 && Math.round(y - a.y) * Math.round(y - b.y) <= 0  
			&& Math.round(x - c.x) * Math.round(x - d.x) <= 0 && Math.round(y - c.y) * Math.round(y - d.y) <= 0  
		){  
			return {  
				x :  x,  
				y :  y  
			}  
		}   

    	return false  
	}


}