// TypeScript file
class RayLine{
    private _startPoint:egret.Point;
    private _direction:number;

    public constructor() {
        this._startPoint=new egret.Point(0,0);
        this._direction=0;
    }



    public get startPoint():egret.Point{
        return this._startPoint;
    }

    public get direction():number{
        return this._direction;
    }

    public set direction(value:number){
        this._direction=value;
    }

    /*
    获得射线上距离起始点为len处的点的坐标;
    */

    public getPoint(len):egret.Point{
        let dx=len*Math.cos(this._direction);
        let dy=len*Math.sin(this._direction);
        return new egret.Point(this._startPoint.x+dx,this._startPoint.y+dy);
    }

    /*
     @len 射线的检测范围，一般要大于舞台
    @line 检测的线段，射线照射到线段上发生反射
    return：当射在线段上时，返回交叉点，否则返回null
    */

    public hitLine(len,line):egret.Point{
        let cross:egret.Point;
        let rayStart=this._startPoint;
        let rayEnd=this.getPoint(len);

        let lineStart=line.startPoint;
	    let lineEnd=line.endPoint;
	    cross=this.segmentsIntr(rayStart, rayEnd, lineStart, lineEnd)//求两条线段的交点

        if(cross){
            let len=this.getDistance(rayStart,cross);
            if(len<3){
                return null;
            }
	    }

        return cross;
    }

    /*
     @len 射线的检测范围，一般要大于舞台
     @line 检测的线段，射线照射到线段上发生反射
    return：当射在线段上时，返回反射的射线,否则返回null
    */

    public getReflexLine(len,line):RayLine{
        let cross;	
        if((cross=this.hitLine(len,line))){
            let angle=line.getRotation();
            let reflexLine=new RayLine();
            reflexLine._startPoint=cross;
            reflexLine._direction=2*angle-this._direction;
            return reflexLine;
        }
        return null;
    }


    /*
    求两条线段的交点
    */

    private segmentsIntr(a, b, c, d):egret.Point{ 
        let denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
        if (denominator==0) {  
            return null;  
        }     
        let x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
                    + (b.y - a.y) * (d.x - c.x) * a.x   
                    - (d.y - c.y) * (b.x - a.x) * c.x ) / denominator;  
        let y = -( (b.y - a.y) * (d.y - c.y) * (c.x - a.x)   
                    + (b.x - a.x) * (d.y - c.y) * a.y   
                    - (d.x - c.x) * (b.y - a.y) * c.y ) / denominator;   
        console.log((y - a.y) * (y - b.y));
        if(  
            Math.round(x - a.x) * Math.round(x - b.x) <= 0 && Math.round(y - a.y) * Math.round(y - b.y) <= 0  
            && Math.round(x - c.x) * Math.round(x - d.x) <= 0 && Math.round(y - c.y) * Math.round(y - d.y) <= 0  
        ){  
            return new egret.Point(x,y);
        }   

        return null;  
    }

    private getDistance(p1,p2){
	    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
    }


}