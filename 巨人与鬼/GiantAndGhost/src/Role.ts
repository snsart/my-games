class Role extends egret.Sprite {

	public static GHOSR_TYPE:string="ghost";
	public static GIANT_TYPE:string="giant";

	private _type:string
	public constructor() {
		super();
	}

	public get type():string{
		return this._type
	}

	public set type(value:string){
		this._type=value;
	}
}