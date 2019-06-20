class Alert{
	
	public static stage:egret.DisplayObjectContainer;
	private static _label:egret.TextField=new egret.TextField();
	private static _timeHandler=null;

	public constructor() {

	}

	public static show(info:string,time:number=3000){
		Alert.addLabel(info);
		let handler;
		egret.clearTimeout(Alert._timeHandler);
		Alert._timeHandler=egret.setTimeout(function(){
			Alert.removeLabel();
		},null,time);
	}

	private static addLabel(info:string){
		Alert._label.textColor=0xff0000;
		Alert._label.text=info;
		Alert._label.size=30;
		Alert._label.x=20;
		Alert._label.y=30;
		Alert._label.bold=true;
		Alert._label.fontFamily="微软雅黑";

		Alert.stage.addChild(Alert._label);
		console.log(Alert._label);
		console.log(Alert.stage);
	}

	private static removeLabel(){
		if(Alert.stage.getChildIndex(Alert._label)!=-1){
			Alert.stage.removeChild(Alert._label);
		}
	}

}