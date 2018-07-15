class World {

	private static _instance:p2.World;
	public constructor() {
	}

	public static getInstance():p2.World{
		return World._instance=World._instance?World._instance:new p2.World();
	}
}