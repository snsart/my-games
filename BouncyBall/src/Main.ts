
class Main extends egret.DisplayObjectContainer {

    private _world:p2.World;
    private _ballBody:p2.Body;

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

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this._world=World.getInstance();
        let startPanel:StartPanelUI=new StartPanelUI(this.stage.stageWidth,this.stage.stageHeight);
        //this.stage.addChild(startPanel);
        this.initMainScene()
    }

    private initMainScene(){
        this.addBackground();
        this.initInfoPanel();
        this.addBoundary();
        let bat:Bat=new Bat(this.stage);
        bat.y=this.stage.stageHeight-90;
        bat.x=10;
        this.stage.addChild(bat);
        this.addBall();
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
        let score:InfoUI=new InfoUI();
        score.label="score";
        score.x=20;
        score.y=10;
        this.stage.addChild(score);
        let time:InfoUI=new InfoUI();
        time.label="time";
        time.x=400;
        time.y=10;
        this.stage.addChild(time);
    }

    private addBoundary(){
        this.addStaticPanel(this.stage.stageWidth-10,50,Math.PI,1,this.stage.stageWidth-20);//top
        this.addStaticPanel(this.stage.stageWidth-10,this.stage.stageHeight-10,270*Math.PI/180,2,this.stage.stageHeight-60);//right
        this.addStaticPanel(10,this.stage.stageHeight-10,0,3,this.stage.stageWidth-20);//buttom
        this.addStaticPanel(10,50,Math.PI/2,4,this.stage.stageHeight-60);//left
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

    private addBall(){

    }



}