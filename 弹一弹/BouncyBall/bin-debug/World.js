var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var World = (function () {
    function World() {
    }
    World.getInstance = function () {
        if (!World._instance) {
            World._instance = new p2.World({ gravity: [0, 10.8] });
            World._instance.defaultContactMaterial.restitution = 1;
        }
        return World._instance;
    };
    return World;
}());
__reflect(World.prototype, "World");
//# sourceMappingURL=World.js.map