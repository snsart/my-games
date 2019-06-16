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
/*镜子*/
var Mirror = (function (_super) {
    __extends(Mirror, _super);
    function Mirror(stage) {
        var _this = _super.call(this) || this;
        _this._mirrorLength = 200;
        _this._stage = stage;
        _this._line = new Line();
        _this.drawMirror();
        _this.updateLine();
        return _this;
    }
    Object.defineProperty(Mirror.prototype, "line", {
        get: function () {
            return this._line;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mirror.prototype, "x", {
        set: function (value) {
            this._mirror.x = value;
            ObjectDecorator.get(this._mirror).updateRotateHandlePosition();
            this.updateLine();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mirror.prototype, "y", {
        set: function (value) {
            this._mirror.y = value;
            ObjectDecorator.get(this._mirror).updateRotateHandlePosition();
            this.updateLine();
        },
        enumerable: true,
        configurable: true
    });
    Mirror.prototype.drawMirror = function () {
        this._mirror = this.createBitmapByName("mirror_png");
        this._mirror.anchorOffsetX = this._mirror.width / 2;
        this.addChild(this._mirror);
        var rotate = this.createBitmapByName("rotate_png");
        rotate.anchorOffsetX = rotate.width / 2;
        rotate.anchorOffsetY = rotate.height / 2;
        this.addChild(rotate);
        ObjectDecorator.get(this._mirror).addRotateAction(this._stage, rotate, 150, 0).moveHandler(function () {
            this.updateLine();
            this.dispatchEvent(new egret.Event(Mirror.POSITION_CHANGE));
        }.bind(this));
        ObjectDecorator.get(this._mirror).addDragAction(this._stage).moveHandler(function () {
            this.updateLine();
            this.dispatchEvent(new egret.Event(Mirror.POSITION_CHANGE));
        }.bind(this));
    };
    Mirror.prototype.updateLine = function () {
        var angle = this._mirror.rotation * Math.PI / 180;
        var dx = (this._mirrorLength / 2) * Math.cos(angle);
        var dy = (this._mirrorLength / 2) * Math.sin(angle);
        this.line.startPoint.x = this._mirror.x - dx;
        this.line.startPoint.y = this._mirror.y - dy;
        this.line.endPoint.x = this._mirror.x + dx;
        this.line.endPoint.y = this._mirror.y + dy;
    };
    Mirror.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Mirror.POSITION_CHANGE = "position_change";
    return Mirror;
}(egret.Sprite));
__reflect(Mirror.prototype, "Mirror");
//# sourceMappingURL=Mirrors.js.map