class Main extends egret.DisplayObjectContainer {
    private numCards=12;
    private cards=[];
    private firstCard=null;
    private secondCard=null;
    private scoreUI:ScoreUI;
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }

    private onAddToStage(event:egret.Event):void{
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
    }

    private onGroupComplete():void{
        this.addBackground();
        this.createCard();
        this.addCardToStage();
        this.addScoreUI();
        this.addReplyButton();
        this.cards.forEach(this.addEvent,this);//这里第二个参数不指定this的情况下,addEventTo中的作用域将变为window 
    }

    private addBackground(){
        let bg:egret.Bitmap=new egret.Bitmap(RES.getRes("faces.beijing"));
        bg.width=this.stage.stageWidth;
        bg.height=this.stage.stageHeight;
        this.addChild(bg);
    }

    private addScoreUI():void{
        this.scoreUI=new ScoreUI();
        this.scoreUI.x=85;
        this.scoreUI.y=30;
        this.addChild(this.scoreUI); 
    }

    private addReplyButton():void{
       
        let replyBtn:ButtonUI=new ButtonUI();
        replyBtn.label="replay";
        replyBtn.x=this.stage.stageWidth/2-50;
        replyBtn.y=this.stage.stageHeight-130; 
        this.addChild(replyBtn);
        replyBtn.touchEnabled=true;
        replyBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
            this.firstCard=null;
            this.secondCard=null;
            this.scoreUI.score=0;
            this.addCardToStage();
        },this)
    }

    private createCard():void{
       
        for(let i=0;i<this.numCards;i++){ 
            let id=Math.floor(i/2)+1;
            let faceID="faces.f"+id;
            let backID="faces.cardbg";
            let card:Card=new Card(faceID,backID);
            this.cards.push(card);
        }   
    }

    private addCardToStage(){
        this.shuffle(this.cards);
        for(let i=0;i<this.cards.length;i++){
            let coll=i%3;
            let row=Math.floor(i/3);
            this.cards[i].x=160+160*coll;
            this.cards[i].y=100+210*row;
            this.cards[i].init();
            this.addChild(this.cards[i]);
        }
    }

    private addEvent(card):void{
        console.log(this);
        card.touchEnabled=true;
        card.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt:egret.TouchEvent)=>{
            var card:Card=evt.currentTarget as Card;
            if(this.secondCard){
                return;
            }else{
                if(this.firstCard){
                    if(card==this.firstCard){
                        card.reverse();
                        this.firstCard=null;
                    }else{
                        this.secondCard=card;
                        card.reverse();
                        let root=this;
                        setTimeout(function() {
                            root.check();
                        }, 1000);
                    }
                }else{
                    this.firstCard=card;
                    card.reverse();
                }
            }
        },this)
    }

    private check():void{
       let right=this.firstCard.faceID==this.secondCard.faceID;
        if(right){
            this.removeChild(this.firstCard);
            this.removeChild(this.secondCard);
            this.scoreUI.score++;
        }else{
            this.firstCard.reverse();
            this.secondCard.reverse();
        }
        this.firstCard=null;
        this.secondCard=null;
    }

    private shuffle(arr:Card[]):void{
	for(var i=arr.length-1;i>0;i--){
		var j=Math.floor(Math.random()*i);
		if(j!=i){
			var temp=arr[i];
			arr[i]=arr[j];
			arr[j]=temp;
		}
	}
}
}