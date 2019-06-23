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
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(width, height) {
        var _this = _super.call(this) || this;
        _this._width = width;
        _this._height = height;
        _this.createBackGround();
        return _this;
    }
    Canvas.prototype.createBackGround = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.beginFill(0xffffff);
        g.lineStyle(1, 0xcccccc);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(bg);
    };
    return Canvas;
}(egret.Sprite));
__reflect(Canvas.prototype, "Canvas");
//# sourceMappingURL=Canvas.js.map