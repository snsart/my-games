//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private lineShape:egret.Shape;
    private mates=[];//存储巨人-鬼对
    private roles=[];
    private startPoint;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let bg=new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        this.addChild(bg);

        this.lineShape=new egret.Shape();
        this.addChild(this.lineShape);

        this.createRoles(30);
        this.drawLines();
    }

    private createRoles(num:number){
        for(let i=0;i<num;i++){
            let ghost=new Ghost();
            ghost.x=Math.random()*this.stage.stageWidth;
            ghost.y=Math.random()*this.stage.stageHeight;
            ObjectDecorator.get(ghost).addDragAction(this.stage).moveHandler(this.drawLines.bind(this));;
            this.addChild(ghost);

            let giant=new Giant();
            giant.x=Math.random()*this.stage.stageWidth;
            giant.y=Math.random()*this.stage.stageHeight;
            ObjectDecorator.get(giant).addDragAction(this.stage).moveHandler(this.drawLines.bind(this));
            this.addChild(giant);

            this.roles.push(ghost,giant);

        }

    }

    private drawLines(){
        this.lineShape.graphics.clear();
        this.lineShape.graphics.lineStyle(2,0xff0000);
        //shape.graphics.beginFill(fillColor);

        
        let mates=this.mates=[];
        this.getmates(this.roles);
        for(var i=0;i<mates.length;i++){
            this.lineShape.graphics.moveTo(mates[i][0].x, mates[i][0].y);
            this.lineShape.graphics.lineTo(mates[i][1].x, mates[i][1].y);
        }
    }

    //求巨人-鬼对
    private getmates(points){
        if(points.length==0){
            return;
        }
        let mates=this.mates;
        let startPoint=this.startPoint=this.getStartPoint(points);
        var lefts=[];
        var rights=[];
        var m=0,n=0;//lefts中巨人和小鬼的数量
        console.log("heheheh")
        points.sort(this.compare.bind(this));
         console.log("hahahah")
        for(var i=1;i<points.length;i++){
            if(points[i].type==startPoint.type){
                lefts.push(points[i]);
                m++;
            }else if(points[i].type!=startPoint.type&&m!=n){
                lefts.push(points[i]);
                n++;
            }else{
                mates.push([startPoint,points[i]]);
                this.getmates(lefts);
                for(var j=i+1;j<points.length;j++){
                    rights.push(points[j]);
                }
                this.getmates(rights);
                break;
            }
        }
    } 

    //各点按极坐标的角度排序,若极坐标一样按x坐标排序,若x坐标一样按y排序；
    private compare(value1,value2){
        console.log(this.getPolarAngle);
        var value1Angle=this.getPolarAngle(this.startPoint,value1);
        var value2Angle=this.getPolarAngle(this.startPoint,value2);

        console.log(value1Angle);
        
        if(value1Angle<value2Angle){
            return -1;
        }else if (value1Angle>value2Angle){
            return 1;
        }else{
            if(value1.x<value2.x){
                return -1
            }else if(value1.x>value2.x){
                return 1;
            }else{
                if(value1.y<value2.y){
                    return 1;
                }else if(value1.y>value2.y){
                    return -1;
                }else{
                    return 0;
                }
                
            }
        }
    }

    //选出y轴最小的点startPoint
    private getStartPoint(points){
        var startPoint=points[0];
        for(var i=1;i<points.length;i++){
            if(points[i].y<startPoint.y){
                startPoint=points[i];
            }else if(points[i].y==startPoint.y){
                if(points[i].x<startPoint.x){
                    startPoint=points[i];
                }
            }
        }
        return startPoint
    }

    //得到向量极坐标的角度，p1和p2为向量的起点和终点
    private getPolarAngle(p1,p2){
        return Math.atan2(p2.y-p1.y,p2.x-p1.x);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}