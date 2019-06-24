class Canvas extends egret.Sprite {

	private _width:number;
	private _height:number;
	private _drawAble:boolean=true;
	private _startPoint:egret.Point;
	private _bg:egret.Shape=new egret.Shape();

	private _lines=[];//线条，包括起点和终点
	private _linesWithCross=[];//线条，包括中间的交点

	private _currentLine:egret.Shape;
	private _lineShapes:egret.Shape[]=[];//所有的线段

	private _points:egret.Point[]=[];//所有的点，包括端点
	private _markCrossPoints:egret.Point[]=[];//所有的交点

	public constructor(width:number,height:number) {
		super();
		this._width=width;
		this._height=height;
		this._startPoint;
		this.touchEnabled=true;
		this.createBackGround();
		this.addChild(this._bg);
		this.addEvents();
	}

	public set drawAble(value:boolean){
		this._drawAble=value;
		if(value){
			this.touchEnabled=true;
		}else{
			this.touchEnabled=false;
		}
	}

	/*对图形进行修剪*/

	public reDraw(){
		for(let i=0;i<this._lineShapes.length;i++){
			this.removeChild(this._lineShapes[i]);
		}
		this._lineShapes=[];

		this._linesWithCross=this.getLinesWithCross(this._lines);
		this.sortLines(this._linesWithCross);
		this.trimLines(this._linesWithCross);
	
		this._currentLine=new egret.Shape();
		let g=this._currentLine.graphics;
		g.lineStyle(3,0x000000);

		for(let i=0;i<this._linesWithCross.length;i++){
			let start=this._linesWithCross[i][0],end=this._linesWithCross[i][this._linesWithCross[i].length-1];
			g.moveTo(start.x,start.y);
			g.lineTo(end.x,end.y);
		}
		this.addChild(this._currentLine);

	}

	/*标记交点*/
	public markCross(){
		this.setMartCrossPoints();
		let crossLines=this.getLinesWithCross(this._lines);
		let table=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U"];
		for(let i=0;i<this._markCrossPoints.length;i++){
			let mark=new Mark(table[i]);
			mark.x=this._markCrossPoints[i].x;
			mark.y=this._markCrossPoints[i].y;
			this.addChild(mark);
		}
	}

	/*取得所有的交点*/
	public setMartCrossPoints(){
		this._markCrossPoints=this._points.concat();
		for(let i=this._markCrossPoints.length;i>=0;i--){
			let point=this._markCrossPoints[i];
			let isCross=false;
			for(let j=0;j<this._linesWithCross.length;j++){
				if(this._linesWithCross[j].indexOf(point)!=-1){
					isCross=true;
				}
			}
			if(!isCross){
				this._markCrossPoints.splice(i,1);
			}
		}
	}


	private addEvents(){
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){
			let x=e.stageX-this.x;
			let y=e.stageY-this.y;
			this._currentLine=new egret.Shape();
			this._lineShapes.push(this._currentLine);
			this.addChild(this._currentLine);
			this._startPoint=new egret.Point(x,y);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.drawEndHandler,this);
		},this);

		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){
			let g=this._currentLine.graphics;
			g.clear();
			g.lineStyle(3,0x000000);
			g.moveTo(this._startPoint.x,this._startPoint.y);
			g.lineTo(e.stageX-this.x,e.stageY-this.y);
		},this);
	}

	private drawEndHandler(e){
		let x=e.stageX-this.x;
		let y=e.stageY-this.y;
		let endPoint=new egret.Point(x,y);
		this._lines.push([this._startPoint,endPoint]);
		this._startPoint=null;
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.drawEndHandler,this);
	}

	/** 
	 *生成带有交点的线段集 
	*/
	private getLinesWithCross(lines){
		let crossLines=[];

		for(let i=0,len=lines.length;i<len;i++){
			let line=[];
		
			let lineStart=lines[i][0];
			let lineEnd=lines[i][1];

			if(this.getPointsNearBy(lineStart,this._points).length==0){
				this._points.push(lineStart);
			}else{
				lineStart=this.getPointsNearBy(lineStart,this._points)[0];
			}

			if(this.getPointsNearBy(lineEnd,this._points).length==0){
				this._points.push(lineEnd);
			}else{
				lineEnd=this.getPointsNearBy(lineEnd,this._points)[0];
			}
			
			line.push(lineStart,lineEnd);

			for(let j=0,len=lines.length;j<len;j++){
				if(i==j){
					continue;
				}
				let cross=this.segmentsIntr(lines[i][0],lines[i][1],lines[j][0],lines[j][1]);
				if(cross){
					if(this.getPointsNearBy(cross,this._points).length==0){
						this._points.push(cross);
					}else{
						cross=this.getPointsNearBy(cross,this._points)[0];
					}
					line.push(cross);
				}
			}
			crossLines.push(line);
		}

		return crossLines;
	}

	/*取得一系列点中离某点较近的点*/

	private getPointsNearBy(point:egret.Point,points:egret.Point[]){
		return points.filter(function(value,index,array){
			let distance=(value.x-point.x)*(value.x-point.x)+(value.y-point.y)*(value.y-point.y);
			if(distance<400){
				return true;
			}
		});
	}

	/*对线上的点进行排序*/
	private sortLines(lines){
		for(let i=0;i<lines.length;i++){
			let startPoint=lines[i][0];
			lines[i].sort(function(value1,value2){
				let dis1=this.getDistance(value1,startPoint);
				let dis2=this.getDistance(value2,startPoint);
				return dis1>dis2;
			}.bind(this));
		}
	}

	/*修剪掉线段头，即把非交点的顶点删除掉*/
	private trimLines(lines){
		for(let i=0,len=lines.length;i<len;i++){
			let start=lines[i][0];
			let end=lines[i][lines[i].length-1];
			let startIsCross=false,endIsCross=false;//start和end点是否是交点
			for(let j=0,len=lines.length;j<len;j++){
				if(i==j){
					continue;
				}
				if(lines[j].indexOf(start)!=-1){
					startIsCross=true;
				}
				if(lines[j].indexOf(end)!=-1){
					endIsCross=true;
				}
			}
			if(!startIsCross){
				console.log("trimstart");
				lines[i].splice(0,1);
			}
			if(!endIsCross){
				console.log("trimend");
				console.log(lines[i].length);
				lines[i].splice(lines[i].length-1,1);
				console.log(lines[i].length);
			}
		}
	}


	private createBackGround(){
		let bg=new egret.Shape();
		let g=bg.graphics;
		g.beginFill(0xffffff);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(bg);
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
			return new egret.Point(x,y);
		}   

    	return false  
	}

	private getDistance(p1,p2):number{
		return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
	}

	
}