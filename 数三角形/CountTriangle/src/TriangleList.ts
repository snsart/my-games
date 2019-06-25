class TriangleList extends eui.Group{

	private _width:number;
	private _height:number;
	private _list:eui.List;


	public constructor(width:number,height:number) {
		super();
		this._width=width;
		this._height=height;
		this.createBackground();
		this.createHeader();
		this.createList();
	}

	public set list(datas){
		this._list.dataProvider = new eui.ArrayCollection(datas);
	}

	private createBackground(){
		let bg:egret.Shape=new egret.Shape();
		let g=bg.graphics;
		g.beginFill(0xffffff);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(bg);
	}

	private createHeader(){
		let header:egret.TextField=new egret.TextField();
		header.text="三角形";
		header.fontFamily="微软雅黑";
		header.textColor=0x333333;
		header.width=this._width;
		header.textAlign=egret.HorizontalAlign.CENTER;
		header.verticalAlign=egret.VerticalAlign.MIDDLE;
		header.size=25;
		header.height=50;
		this.addChild(header);
	}

	private createList(){
		let bg:egret.Shape=new egret.Shape();
		let g=bg.graphics;
		g.beginFill(0xeeeeee);
		g.lineStyle(1,0xcccccc);
		g.drawRect(10,50,this._width-20,this._height-70);
		this.addChild(bg);

		this._list=new eui.List();
		this._list.width=this._width;
		
		
		let scroller=new eui.Scroller();
		scroller.width=this._width-20;
		scroller.height=this._height-70;
		scroller.x=10;
		scroller.y=50;
		scroller.viewport=this._list;
		this.addChild(scroller);
	}
}