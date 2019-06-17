class Giant extends Role {
	public constructor() {
		super();
		this.type=Role.GIANT_TYPE;
		this.draw();
	}

	private draw(){
		var role=this.createBitmapByName("giant_png");
		role.width=70;
		role.height=70;
		role.anchorOffsetX=role.width/2;
		role.anchorOffsetY=role.height/2;
		this.addChild(role);
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}