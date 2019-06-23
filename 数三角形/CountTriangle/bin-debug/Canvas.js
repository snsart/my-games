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
        _this._drawAble = true;
        _this._bg = new egret.Shape();
        _this._lines = [];
        _this._width = width;
        _this._height = height;
        _this._startPoint;
        _this.touchEnabled = true;
        _this.createBackGround();
        _this.addChild(_this._bg);
        _this.addEvents();
        return _this;
    }
    Object.defineProperty(Canvas.prototype, "drawAble", {
        set: function (value) {
            this._drawAble = value;
            if (value) {
                this.touchEnabled = true;
            }
            else {
                this.touchEnabled = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Canvas.prototype.addEvents = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            var x = e.stageX;
            var y = e.stageY;
            this._currentLine = new egret.Shape();
            this.addChild(this._currentLine);
            this._startPoint = new egret.Point(x, y);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.drawEndHandler, this);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            console.log(1245);
            var g = this._currentLine.graphics;
            g.clear();
            g.lineStyle(3, 0x000000);
            g.moveTo(this._startPoint.x, this._startPoint.y);
            g.lineTo(e.stageX, e.stageY);
        }, this);
    };
    Canvas.prototype.drawEndHandler = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        var endPoint = new egret.Point(x, y);
        this._lines.push([this._startPoint, endPoint]);
        console.log(this._lines);
        this._startPoint = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.drawEndHandler, this);
    };
    Canvas.prototype.createBackGround = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.beginFill(0xffffff);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(bg);
    };
    return Canvas;
}(egret.Sprite));
__reflect(Canvas.prototype, "Canvas");
//# sourceMappingURL=Canvas.js.map