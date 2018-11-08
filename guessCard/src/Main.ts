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
    private cards:egret.Bitmap[]=[];
    private cardsPos:egret.Point[]=[];
    private cardsInitPos:egret.Point[]=[];
    private selectUI:SelectListUI;
    private tips:egret.TextField;
    private isdeal:boolean=false;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        this.setCards();
        this.setCardsPos();
        this.setCardsInitPos();
        for(let i=0;i<15;i++){
            let card=this.cards[i];
            card.x=this.cardsInitPos[i].x;
            card.y=this.cardsInitPos[i].y;
            this.addChild(card);
        }

        let dealBtn=this.createBitmapByName("button#deal");
        this.addChild(dealBtn);
        dealBtn.touchEnabled = true; 
        dealBtn.x=this.stage.stageWidth/2+130;
        dealBtn.y=this.stage.stageHeight-80;
        dealBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.dealHandler,this);

        let acceptBtn=this.createBitmapByName("button#accept");
        this.addChild(acceptBtn);
        acceptBtn.touchEnabled = true;
        acceptBtn.x=this.stage.stageWidth/2+310;
        acceptBtn.y=this.stage.stageHeight-80;
        acceptBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.acceptHandler,this);

        this.selectUI=new SelectListUI();
        this.addChild(this.selectUI);
        this.selectUI.x=330;
        this.selectUI.y=600;

        this.tips=new egret.TextField();
        this.tips.x=50;
        this.tips.y=680;
        this.tips.textColor=0xffff00;
        this.tips.size=40;
        this.addChild(this.tips);
    }

    private dealHandler(e){
        this.moveCard(this.cards[14]);
        this.selectUI.init(); 
        this.isdeal=true;
    }

    private moveCard(card){
        let index=this.cards.indexOf(card);
        
        let target=this.cardsPos[index];

        egret.Tween.get(card).to({x:target.x,y:target.y},100).call(function(index:number,card:egret.Bitmap){
            this.setChildIndex(card,15-index);
            if(index<1){
                 return;
            }
            this.moveCard(this.cards[index-1]);
        },this,[index,card]);
    }

    private acceptHandler(e){
        if(!this.isdeal){
            this.showTips("请先发牌！");
            return;
        }
        
        let sort;
        
        switch(this.selectUI.selectId){
            case 0:
                this.showTips("提示：请选择你的牌所在的列！");
                return;
            case 1:
                sort=[13,10,7,4,1,14,11,8,5,2,12,9,6,3,0];
                break;
            case 2:
                sort=[14,11,8,5,2,13,10,7,4,1,12,9,6,3,0];
                break;
            case 3:
                sort=[14,11,8,5,2,12,9,6,3,0,13,10,7,4,1];
                break;
        }

        let cards=[];
        for(let i=0;i<15;i++){
            let card=this.cards[sort[i]];
            this.setChildIndex(card,i);
            cards.push(card);
        }
        this.cards=cards;
        for(let i=0;i<15;i++){
            let target=this.cardsInitPos[i];
            egret.setTimeout(function(){
                this.setChildIndex(this.cards[i],i+15);
                egret.Tween.get(this.cards[i]).to({x:target.x,y:target.y},250).call(function(){
                   this.setChildIndex(this.cards[i],i);
                },this);
            },this,Math.floor(i/5)*300);
        } 

        this.selectUI.init(); 
        this.isdeal=false;
        
    }

    private setCardsPos(){
        for(let i=0;i<5;i++){
            for(let j=0;j<3;j++){
                this.cardsPos.push(new egret.Point(750-j*250,330-i*70));
            }
        }
    }

     private setCardsInitPos(){
        for(let i=0;i<15;i++){  
            this.cardsInitPos.push(new egret.Point(55,30+i*5));
        }
    }

    private setCards(){
        let names=[];
        let types=["a","b","c","d"]
        while(this.cards.length<15){
            let type=types[Math.floor(Math.random()*4)];
            let num=Math.ceil(Math.random()*13);
            let name=type+num;
            if(names.indexOf(name)!=-1){
                continue;
            }
            names.push(name);
            let card=this.createBitmapByName("cards#"+name);
            this.cards.push(card);
        }
    }

    private showTips(text:string){
        this.tips.text=text;
        egret.setTimeout(function(){
            this.tips.text="";
        },this,2000);
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