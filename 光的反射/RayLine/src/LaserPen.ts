// 激光笔功能
/*
*1.打开/关闭
*2.
*/
class LaserPen extends egret.Sprite {
    private _stage:egret.Stage;
    private _pen:egret.Bitmap;
    private _rayLine:RayLine;
    private _mirrors=[];
    private _rayLen=1000;//射线长度
    private _rayShape:egret.Shape;//用来绘制光线
    private _lines=[];//反射后生成的所有线段

    public constructor(stage:egret.Stage) {
		super();
        this._stage=stage;
        this._rayShape=new egret.Shape();//
        this.addChild(this._rayShape);
        this.createPen();
        this.createRayLine();
        this.update();

	}

    /*添加可被照射的镜面*/
    public addMirror(mirror){
        this._mirrors.push(mirror);
        this.update();
    }

    //绘制笔并添加拖拽行为
    private createPen(){
        this._pen=this.createBitmapByName("pen_png");
        this._pen.anchorOffsetX=this._pen.width/2;
        this._pen.anchorOffsetY=this._pen.height;
        this._pen.x=200;
        this._pen.y=200;
        this.addChild(this._pen);
       
        ObjectDecorator.get(this._pen).addDragAction(this._stage).upHandler(function(){
           
        }).moveHandler(function(){
            this.update();
        }.bind(this));

        let rotate=this.createBitmapByName("rotate_png");
        rotate.anchorOffsetX=rotate.width/2;
        rotate.anchorOffsetY=rotate.height/2
        this.addChild(rotate);
        ObjectDecorator.get(this._pen).addRotateAction(this._stage,rotate,150,-90).moveHandler(function(){
             this.update();
        }.bind(this));
    }

    //创建射线
    private createRayLine(){
        this._rayLine=new RayLine();
    }

    private updateRayLine(){
        this._rayLine.startPoint.x=this._pen.x;
        this._rayLine.startPoint.y=this._pen.y;
        this._rayLine.direction=this._pen.rotation*Math.PI/180+Math.PI/2;
    }

    public update(){
        this._lines=[];
        this.updateRayLine();
        this.hitTest(this._rayLine,this._mirrors,this._lines);
        this.renderLines(this._lines);
    }

    //rayLine和mirrors中的线段做碰撞检测，把生成的线段存储在lines中
    private hitTest(rayLine,mirrors,lines){
        let crosses=[];//存储每一个交点及对应的镜子
        for(let i=0;i<mirrors.length;i++){
            let cross1=rayLine.hitLine(this._rayLen,mirrors[i]);
            if(cross1){
                let obj={cross:cross1,mirror:mirrors[i]};
                crosses.push(obj);
            }
        }
    
        if(crosses.length==0){
            lines.push({
                startPoint:rayLine.startPoint,
                endPoint:rayLine.getPoint(this._rayLen)
            })
            return lines;
        }else{
            //获取射线照射到的第一面镜子
            let first=crosses[0];
            for(let i=1;i<crosses.length;i++){
                if(this.getDistance(crosses[i].cross,rayLine.startPoint)<this.getDistance(first.cross,rayLine.startPoint)){
                    first=crosses[i];
                }
            }
            crosses=[];
            
            lines.push({
                startPoint:rayLine.startPoint,
                endPoint:first.cross
            });
            //如果镜子不能反射，返回；
            if(!first.mirror.reflect){
                return;
            }
            let newRayLine=rayLine.getReflexLine(this._rayLen,first.mirror);
            this.hitTest(newRayLine,mirrors,lines);
        }
    }

    private renderLines(lines){
        let g=this._rayShape.graphics;
        g.clear();
        g.lineStyle(3,0xff0000);
        
        for(var i=0;i<lines.length;i++){
            g.moveTo(lines[i].startPoint.x,lines[i].startPoint.y);
            g.lineTo(lines[i].endPoint.x,lines[i].endPoint.y);
        }
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private getDistance(p1,p2){
	    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
    }

    

      
}
