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
    private cards:Card[]=[];
    private cardsPos:egret.Point[]=[];
    private leaveCards:number=52;
    private dealCards:Card[]=[];
    private selectedCards=[];
    private endTarget:egret.Point=new egret.Point();
    private faceCards=[];

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let bg:egret.Shape=new egret.Shape();
        bg.graphics.beginFill(0x284976);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        this.addChild(bg);

        let gamebg:egret.Shape=new egret.Shape();
        gamebg.graphics.beginFill(0xffffff,0.1);
        gamebg.graphics.drawRect(0,0,500,692);
        gamebg.x=250;
        gamebg.y=50;
        this.addChild(gamebg);

        this.endTarget.x=900;
        this.endTarget.y=50;
        

        this.createCards();
        this.initCards();
        this.setCardPos();
        this.setdealCards();
        this.deal(16,this.cardsPos);
    }

    private setCardPos(){
        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                let point:egret.Point=new egret.Point();
                point.x=314+j*124;
                point.y=54+i*172;
                this.cardsPos.push(point);
            }
        }
    }

    private setdealCards(){
        for(var i=0;i<16;i++){
            this.dealCards.push(null);
        }
    }

    private createCards(){
        let type=["a","b","c","d"];
        this.cards=[];
        for(let i=0;i<13;i++){
            for(let j=0;j<4;j++){
                let faceId=type[j]+(i+1);
                let backId="cards_json#back";
                let card:Card=new Card(faceId,backId);
                card.touchEnabled=true;
                card.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.cardClickHandler,this);
                this.addChild(card);
                this.cards.push(card);
            }
        }
    }

    private cardClickHandler(e:egret.TouchEvent){
        var card:Card=e.currentTarget as Card;
        if(!card.isdeal||this.selectedCards.length>=2){
            return;
        }

        if(card.isface){
            return;
        }


        this.selectedCards.push(card);
        card.reverse();
        if(this.selectedCards.length==2){
            let firstId:String=this.selectedCards[0].faceID.slice(1);
            let secondId:String=this.selectedCards[1].faceID.slice(1);
            if(firstId!=secondId){
               this.wrong();
            }else{
               this.right();
            }
        }
    }

    private wrong(){
        egret.setTimeout(function(){
            this.selectedCards[0].reverse();
            this.selectedCards[1].reverse();
            this.selectedCards=[];
        },this,1000);
    }

    private right(){
        egret.setTimeout(function(){
            let card1=this.selectedCards[0];
            let card2=this.selectedCards[1];
            this.endTarget.y+=10;
            egret.Tween.get(card1).to({x:this.endTarget.x,y:this.endTarget.y},200);
            egret.Tween.get(card2).to({x:this.endTarget.x,y:this.endTarget.y},200);
            let nullPot1=this.cardsPos[this.dealCards.indexOf(card1)];
            let nullPot2=this.cardsPos[this.dealCards.indexOf(card2)];

            this.faceCards.push(card1);
            this.faceCards.push(card2);

            this.setChildIndex(card1,this.faceCards.length+54);  
            this.setChildIndex(card2,this.faceCards.length+55);

            egret.setTimeout(function(){
                if(this.leaveCards>0){
                   this.deal(2,[nullPot1,nullPot2]);
                }
                this.selectedCards=[]; 
            },this,200) 

        },this,1000);
    }

    private initCards(){
        this.shuffer(this.cards);
        for(var i=0;i<this.cards.length;i++){
            this.addChild(this.cards[i]);
            this.cards[i].x=125;
            this.cards[i].y=50+i*5;
            this.setChildIndex(this.cards[i],i+10);
        }
    }

    private shuffer(arr){
        for(let i = 0,len = arr.length; i < len; i++){
            let currentRandom = Math.floor(Math.random()*len);
            let current = arr[i];
            arr[i] = arr[currentRandom];
            arr[currentRandom] = current;
        }
    }

    private deal(cardNums:number,cardsPos:egret.Point[]){
        for(let i=this.leaveCards-1,j=0;i>=this.leaveCards-cardNums;i--,j++){
            egret.setTimeout(function(){
                let card=this.cards[i];
                let potIndex=this.cardsPos.indexOf(cardsPos[j]);
                this.setChildIndex(card,i+10+54);
                egret.Tween.get(card).to({x:cardsPos[j].x,y:cardsPos[j].y},100).call(function(){
                    card.isdeal=true;
                    this.dealCards[potIndex]=card;
                    this.setChildIndex(card,i+10);
                },this);
            },this,110*j);
        }

        egret.setTimeout(function(){
            this.leaveCards-=cardNums;
        },this,cardNums*110+10);
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