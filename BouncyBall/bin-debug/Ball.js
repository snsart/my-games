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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this._world = World.getInstance();
        _this.addBall();
        return _this;
    }
    Object.defineProperty(Ball.prototype, "ballBody", {
        get: function () {
            return this._ballBody;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.render = function () {
        this._ball.x = this._ballBody.interpolatedPosition[0];
        this._ball.y = this._ballBody.interpolatedPosition[1];
    };
    Ball.prototype.addBall = function () {
        this._ballBody = new p2.Body({
            mass: 1,
            position: [200, 400]
        });
        var ballShape = new p2.Circle({
            radius: 15
        });
        this._ballBody.addShape(ballShape);
        this._world.addBody(this._ballBody);
        this._ball = new egret.Sprite();
        this._ball.graphics.beginFill(0xffff00);
        this._ball.graphics.drawCircle(0, 0, ballShape.radius);
        this._ball.graphics.endFill();
        this.addChild(this._ball);
    };
    return Ball;
}(egret.Sprite));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map