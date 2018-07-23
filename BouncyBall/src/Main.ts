
class Main extends egret.DisplayObjectContainer {

    private _world:p2.World;
    private _ballBody:p2.Body;
    private _ball:Ball;
    private _bat:Bat;
    private _startPanel:StartPanelUI;
    private _score:InfoUI;
    private _time:InfoUI;
    private _timer:egret.Timer;
    private _bricks:Brick[];
    private _endPanel:endPanelUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

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
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        this._world=World.getInstance();
        this._startPanel=new StartPanelUI(this.stage.stageWidth,this.stage.stageHeight);
        this.stage.addChild( this._startPanel);

        this._startPanel.startBtn.addEventListener("touchBegin",(e)=>{
            this.stage.removeChild(this._startPanel);
            this.initMainScene();
        },this);

        this._endPanel=new endPanelUI(this.stage.stageWidth,this.stage.stageHeight);
      
        this._endPanel.replayBtn.addEventListener("touchBegin",(e)=>{
            this.stage.removeChild(this._endPanel);
            this.resetGame();
        },this);
    }

    private initMainScene(){
        this.addBackground();
        this.initInfoPanel();
        this.addBoundary();
        this.addBricks();

        this._bat=new Bat(this.stage);
        this.stage.addChild(this._bat);

        this._ball=new Ball();
        this.stage.addChild(this._ball);

        egret.startTick(this.moveBall,this);

        this._world.on("beginContact",this.contactHandler);
        this._world.on("preSolve",this.preSolveHandler);
   
        //计时
        this._timer=new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER,(e)=>{
            this._time.value++;
        },this);
        this._timer.start();
        
    }

    //防止this的作用域改变，这里使用箭头函数的格式
    private contactHandler=(e)=>{
        console.log(e.bodyA,e.bodyB);
        if(e.bodyA.displays&&e.bodyA.displays[0] instanceof Brick){
               this._score.value++;
              (e.bodyA.displays[0] as Brick).destroy();
        }else if(e.bodyB.displays&&e.bodyB.displays[0] instanceof Brick){
            this._score.value++;
          (e.bodyB.displays[0] as Brick).destroy();
       }

       if((e.bodyA==this._ball.ballBody&&e.bodyB.id==1000)||(e.bodyB==this._ball.ballBody&&e.bodyA.id==1000)){
          this.gameOver();
       }
        
    }

    private preSolveHandler=(e)=>{
        for(let i=0;i<e.contactEquations.length;i++){
                var eq=e.contactEquations[i];
                if((eq.bodyA==this._ball.ballBody&&eq.bodyB==this._bat.body)||(eq.bodyB==this._ball.ballBody&&eq.bodyA==this._bat.body)){
                    //如果碰到bat的顶端，则进行反弹
                    var y=eq.normalA[1];
                    if(y!=0){
                        this._ball.ballBody.applyImpulse(this._bat.force,[0,0]);
                    }
                }
        }
    }

    private moveBall(timeStamp:number):boolean{
        this._world.step(1/60,0.1,10);
        this._ball.render();
        return false;
    }

    private addBackground(){
        let backGround:egret.Sprite=new egret.Sprite;
        backGround.x=0;
        backGround.y=0;
        backGround.graphics.beginFill(0x333333);
        backGround.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        backGround.graphics.endFill();
        this.addChild(backGround);
    }

    private initInfoPanel(){
        this._score=new InfoUI();
        this._score.label="score";
        this._score.x=20;
        this._score.y=10;
        this._score.value=0;
        this.stage.addChild(this._score);
        this._time=new InfoUI();
        this._time.label="time";
        this._time.x=400;
        this._time.y=10;
        this._time.value=0;
        this.stage.addChild(this._time);
    }

    private addBoundary(){
        this.addStaticPanel(10,50,0,1,this.stage.stageWidth-20);//top
        this.addStaticPanel(this.stage.stageWidth-10,50,Math.PI/2,2,this.stage.stageHeight-60);//right
        this.addStaticPanel(this.stage.stageWidth-10,this.stage.stageHeight-10,Math.PI,1000,this.stage.stageWidth-20);//buttom
        this.addStaticPanel(10,this.stage.stageHeight-10,270*Math.PI/180,4,this.stage.stageHeight-60);//left
    }

    private addStaticPanel(x:number,y:number,angle:number,id:number,width:number){
        
        let planeBody:p2.Body=new p2.Body({
            position:[x,y],
            angle:angle,
            id:id
        });
        let planeShape:p2.Plane=new p2.Plane({
           
        });
        
        planeBody.addShape(planeShape);
        this._world.addBody(planeBody);
        
        let planeMc:egret.Sprite=new egret.Sprite();
        planeMc.x=planeBody.position[0];
        planeMc.y=planeBody.position[1];
        planeMc.graphics.lineStyle(3,0x000000);
        planeMc.graphics.moveTo(0,0);
        planeMc.graphics.lineTo(width,0);
        planeMc.graphics.endFill();
        planeMc.rotation=planeBody.angle*180/Math.PI;
        this.addChild(planeMc);
    }

    private addBricks(){
        this._bricks=[];
        for(let i=0;i<=8;i++){
            for(let j=0;j<=5;j++){
                let brick:Brick=new Brick();
                brick.brickBody.position[0]=80+i*60;
                brick.brickBody.position[1]=200+j*40;
                brick.render();
                this._bricks.push(brick);
                this.addChild(brick);
            }
        }
    } 

    private resetGame(){
        this._score.value=0;
        this._time.value=0;
        this._timer.reset();
        this._timer.start();
        this._bricks.forEach((ele)=>{
            this._world.addBody(ele.brickBody);
            this.addChild(ele);
        },this);
        this._ball.ballBody.position[0]=200;
        this._ball.ballBody.position[1]=500;
        this._world.on("beginContact",this.contactHandler);
        this._world.on("preSolve",this.preSolveHandler);
    } 

    private gameOver(){
        this._timer.stop();
        this.stage.addChild(this._endPanel);
        this._endPanel.score.value=this._score.value;
        this._endPanel.time.value=this._time.value;
        this._world.off("beginContact",this.contactHandler);
        this._world.off("preSolve",this.preSolveHandler);
        if(this._world.has("beginContact",this.contactHandler)){
             this._world.off("beginContact",this.contactHandler);
        }
        if(this._world.has("preSolve",this.preSolveHandler)){
             this._world.off("preSolve",this.preSolveHandler);
        }
    }

}