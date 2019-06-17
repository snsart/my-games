class World {

	private static _instance:p2.World;
	public constructor() {
	}

	public static getInstance():p2.World{
		if(!World._instance){
			World._instance=new p2.World({gravity:[0,10.8]});
			World._instance.defaultContactMaterial.restitution=1;
		}
		return World._instance;
	}
}