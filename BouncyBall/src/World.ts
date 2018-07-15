class World {

	private static _instance:p2.World;
	public constructor() {
	}

	public static getInstance():p2.World{
		if(!World._instance){
			World._instance=new p2.World({gravity:[0,9.8]});
		}
		return World._instance;
	}
}