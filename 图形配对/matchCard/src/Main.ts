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
    private leaveCards:number=54;
    private dealCards:Card[]=[];
    private selectedCards=[];
    private endTarget:egret.Point=new egret.Point();
    private faceCards=[];
    private dealing:boolean=false;//是否正在发牌
    private player1:Player;
    private player2:Player;
    private currentPlayer:Player;
    private menuManage:MenuManage;

    private endEffect:SpEffect;
    private replayBtn:egret.Bitmap;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        
        this.addGameBackground();
        this.addGameUI();
        this.createCards();
        this.setCardPos();
        this.setdealCards();

        this.initGame();
        this.menuManage.open("intro",null);
         /*this.test();*/
        /* this.test2();*/
    }

    private test(){
        for(var i=0;i<54;i++){
            this.faceCards.push(this.cards[i]);
            this.cards[i].x=this.endTarget.x;
            this.cards[i].y=50+i*5;
            this.setChildIndex(this.cards[i],i+20);
        }
        this.replayGame();
    }

    private test2(){     
        this.addChild(this.endEffect);
        this.endEffect.x=400;
        this.endEffect.y=500;
        this.endEffect.startPlay();
    }

    private addGameBackground(){
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

        let title:egret.Bitmap=this.createBitmapByName("title");
        this.addChild(title);

    }

    private addGameUI(){
        let startBtn:egret.Bitmap=this.createBitmapByName("startBtn");
        startBtn.x=70;
        startBtn.y=580;
        this.addChild(startBtn);
        startBtn.touchEnabled=true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            if(this.leaveCards==54&&!this.dealing){
                this.deal(16,this.cardsPos);
            }
        },this);

        let updateBtn:egret.Bitmap=this.createBitmapByName("updateBtn");
        updateBtn.x=70;
        updateBtn.y=660;
        this.addChild(updateBtn);
        updateBtn.touchEnabled=true;
        updateBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            if(!this.dealing){
                this.initGame();
            }
        },this);

        let helpBtn:egret.Bitmap=this.createBitmapByName("helpBtn");
		helpBtn.x=10;
		helpBtn.y=720;
        helpBtn.width=30;
        helpBtn.height=30;
		this.addChild(helpBtn);
		helpBtn.touchEnabled=true;
		helpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
			 this.menuManage.open("intro",null);
		},this)

        this.replayBtn=this.createBitmapByName("replayBtn");
		this.replayBtn.x=850;
		this.replayBtn.y=715;
        this.replayBtn.width=70;
		this.replayBtn.height=25;
		this.addChild(this.replayBtn);
		this.replayBtn.touchEnabled=true;
        this.replayBtn.visible=false;
		this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
			this.endEffect.stop();
            this.replayGame();
		},this)


        this.player1=new Player();
        this.addChild(this.player1);
        this.player1.x=795;
        this.player1.y=50;
        this.player1.headID=0;
        this.player1.cardPot.x=885;
        this.player1.cardPot.y=60;
        this.player1.head.touchEnabled=true;
        this.player1.head.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this.menuManage.open("headImgs",this.player1);
        },this);

        this.player2=new Player();
        this.addChild(this.player2);
        this.player2.x=795;
        this.player2.y=390;
        this.player2.headID=1;
        this.player2.cardPot.x=885;
        this.player2.cardPot.y=400;
        this.player2.head.touchEnabled=true;
        this.player2.head.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this.menuManage.open("headImgs",this.player2);
        },this);

        //创建特效
        this.endEffect=new SpEffect();

    }

    private initGame(){
        this.initCards();
        this.cleardealCards();
        this.player1.focus=false;
        this.player2.focus=false;
        this.player1.cardNum=0;
        this.player2.cardNum=0;
        this.currentPlayer=this.player1;
        this.currentPlayer.focus=true;
        this.endTarget=this.currentPlayer.cardPot;
        this.faceCards=[];
        this.menuManage=MenuManage.getInstance(this.stage);
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

        for(let j=1;j<=2;j++){
                let faceId="e"+j;
                let backId="cards_json#back";
                let card:Card=new Card(faceId,backId);
                card.touchEnabled=true;
                card.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.cardClickHandler,this);
                this.addChild(card);
                this.cards.push(card);
        }
    }

    private initCards(){
        this.shuffer(this.cards);
        for(var i=0;i<this.cards.length;i++){
            this.addChild(this.cards[i]);
            this.cards[i].alpha=0;
            this.cards[i].rotation=0;
            this.cards[i].x=125;
            this.cards[i].y=50+i*5;
            this.cards[i].isdeal=false;
            if(this.cards[i].state!=CardState.BACK){
                this.cards[i].reverse();
            }
            this.setChildIndex(this.cards[i],i+10);
            egret.Tween.get(this.cards[i]).to({alpha:1},500);
        }
        this.selectedCards=[]; 
        this.leaveCards=54;
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

    private cleardealCards(){
        for(var i=0;i<16;i++){
            this.dealCards[i]=null;
        }
    }

    private cardClickHandler(e:egret.TouchEvent){
        var card:Card=e.currentTarget as Card;
        if(!card.isdeal||this.selectedCards.length>=2){
            return;
        }

        if(card.state!=CardState.BACK){
            return;
        }

        this.selectedCards.push(card);
        card.reverse();
        if(this.selectedCards.length==2){
            let firstType:String=this.selectedCards[0].faceID.substr(0,1);
            let secondType:String=this.selectedCards[1].faceID.substr(0,1);
            let firstId:String=this.selectedCards[0].faceID.slice(1);
            let secondId:String=this.selectedCards[1].faceID.slice(1);
            
            if((firstType=="e"&&secondType=="e")||(firstType!="e"&&secondType!="e"&&firstId==secondId)){
                 this.right();
            }else{
               this.wrong();
            }
        }
    }

    private wrong(){
        
        egret.setTimeout(function(){
            this.selectedCards[0].reverse();
            this.selectedCards[1].reverse();
            this.selectedCards=[];
            this.currentPlayer.focus=false;
            if(this.currentPlayer==this.player1){
                this.currentPlayer=this.player2;
            }else{
                this.currentPlayer=this.player1;
            }
            this.currentPlayer.focus=true;
            this.endTarget=this.currentPlayer.cardPot;
        },this,1000);
    }

    private right(){
        egret.setTimeout(function(){
            var sound:egret.Sound = RES.getRes("right_snd");
            sound.play(0,1);

            let card1=this.selectedCards[0];
            let card2=this.selectedCards[1];
            
            egret.Tween.get(card1).to({x:this.endTarget.x,y:this.endTarget.y},200);
            egret.Tween.get(card2).to({x:this.endTarget.x,y:this.endTarget.y},200);
            let nullPot1=this.cardsPos[this.dealCards.indexOf(card1)];
            let nullPot2=this.cardsPos[this.dealCards.indexOf(card2)];

            this.faceCards.push(card1);
            this.faceCards.push(card2);

            this.setChildIndex(card1,this.faceCards.length+54);  
            this.setChildIndex(card2,this.faceCards.length+55);

            egret.setTimeout(function(){
                this.currentPlayer.cardNum+=2;
                if(this.leaveCards>0){
                   this.deal(2,[nullPot1,nullPot2]);
                }
                this.selectedCards=[]; 
                if(this.faceCards.length==54){
                    this.gameOver();
                }
            },this,200) 

        },this,1000);
    }

    private gameOver(){
        this.player1.focus=false;
        this.player2.focus=false;
        let winPlayer:Player=this.player1.cardNum>this.player2.cardNum?this.player1:this.player2;
        winPlayer.focus=true;
        this.addChild(this.endEffect);
        this.endEffect.x=winPlayer.cardPot.x;
        this.endEffect.y=winPlayer.cardPot.y+80;
        this.endEffect.startPlay();
        this.replayBtn.visible=true;
    }

    private replayGame(){
        this.replayBtn.visible=false;
        for(let i=0;i<this.faceCards.length;i++){
            egret.setTimeout(function(){
                let card=this.faceCards.pop();
                console.log(card);
                let target:egret.Point=new egret.Point();
                target.x=-400+Math.random()*this.stage.stageWidth;
                target.y=Math.random()*this.stage.stageHeight+200;
                egret.Tween.get(card).to({x:target.x,y:target.y,alpha:0,rotation:360},1000);
            },this,(54-i)*50);
        }

        egret.setTimeout(function(){
            this.initGame();
        },this,4000);
    }


    private deal(cardNums:number,cardsPos:egret.Point[]){
        this.dealing=true;
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
            this.dealing=false;
        },this,cardNums*110+10);
    }

    private shuffer(arr){
        for(let i = 0,len = arr.length; i < len; i++){
            let currentRandom = Math.floor(Math.random()*len);
            let current = arr[i];
            arr[i] = arr[currentRandom];
            arr[currentRandom] = current;
        }
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