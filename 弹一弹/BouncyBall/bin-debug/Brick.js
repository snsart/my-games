var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick() {
        var _this = _super.call(this) || this;
        _this._world = World.getInstance();
        _this.addBrick();
        return _this;
    }
    Object.defineProperty(Brick.prototype, "brickBody", {
        get: function () {
            return this._brickBody;
        },
        enumerable: true,
        configurable: true
    });
    Brick.prototype.render = function () {
        this._brick.x = this._brickBody.position[0];
        this._brick.y = this._brickBody.position[1];
    };
    Brick.prototype.addBrick = function () {
        this._brickBody = new p2.Body();
        this._brickBody.displays = [this];
        var ballShape = new p2.Box({
            width: 50,
            height: 20
        });
        this._brickBody.addShape(ballShape);
        this._world.addBody(this._brickBody);
        this._brick = new egret.Sprite();
        this._brick.graphics.beginFill(0xffff00);
        this._brick.graphics.drawRect(-ballShape.width / 2, -ballShape.height / 2, ballShape.width, ballShape.height);
        this._brick.graphics.endFill();
        this.addChild(this._brick);
    };
    Brick.prototype.destroy = function () {
        this._world.removeBody(this._brickBody);
        this.parent.removeChild(this);
    };
    return Brick;
}(egret.Sprite));
__reflect(Brick.prototype, "Brick");
//# sourceMappingURL=Brick.js.map