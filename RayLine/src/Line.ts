class Line {
	private _startPoint:egret.Point;
	private _endPoint:egret.Point;
	private _reflect:boolean=true;

	public constructor() {
		this._startPoint=new egret.Point(0,0);
		this._endPoint=new egret.Point(10,100);
		this._reflect=true;
	}

	public get startPoint():egret.Point{
        return this._startPoint;
    }

	public get endPoint():egret.Point{
        return this._startPoint;
    }

	public get reflect():boolean{
        return this._reflect;
    }

	public set reflect(value:boolean){
		this._reflect=value
	}

	public getRotation(){
		let start=this.startPoint,end=this.endPoint;
		return Math.atan2(end.y-start.y,end.x-start.x);
	}
}