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
var Bat = (function (_super) {
    __extends(Bat, _super);
    function Bat(stage) {
        var _this = _super.call(this) || this;
        _this._batWidth = 100;
        _this._world = World.getInstance();
        _this._stage = stage;
        _this._bat = new egret.Sprite();
        _this.createBat();
        _this.addEvent();
        return _this;
    }
    Bat.prototype.createBat = function () {
        this._batBody = new p2.Body({
            position: [this._stage.stageWidth / 2, 40]
        });
        var batShape = new p2.Box({
            width: this._batWidth,
            height: 80
        });
        this._batBody.addShape(batShape);
        this._world.addBody(this._batBody);
        this.addChild(this._bat);
        this.render(this._batBody);
    };
    Bat.prototype.render = function (body) {
        var s = body.shapes[0];
        this._bat.x = body.position[0];
        this._bat.y = body.position[1];
        this._bat.graphics.clear();
        this._bat.graphics.beginFill(0x888888);
        this._bat.graphics.drawRect(-s.width / 2, -s.height / 2, s.width, s.height);
        this._bat.graphics.endFill();
    };
    Bat.prototype.addEvent = function () {
        var _this = this;
        this._bat.touchEnabled = true;
        this._bat.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this._isTouch = true;
        }, this);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (_this._isTouch) {
                var baX = _this._batBody.position[0];
                _this._batBody.position[0] = Math.max(_this._batWidth / 2, Math.min(e.stageX, _this._stage.stageWidth - 20 - _this._batWidth / 2));
                _this.render(_this._batBody);
            }
        }, this);
    };
    return Bat;
}(egret.Sprite));
__reflect(Bat.prototype, "Bat");
//# sourceMappingURL=Bat.js.map