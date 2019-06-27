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
var Mark = (function (_super) {
    __extends(Mark, _super);
    function Mark(label) {
        var _this = _super.call(this) || this;
        _this._label = "a";
        _this._label = label;
        _this.draw();
        return _this;
    }
    Mark.prototype.draw = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.beginFill(0xff0000);
        g.drawCircle(0, 0, 15);
        this.addChild(bg);
        var txt = new egret.TextField();
        txt.text = this._label;
        var size = 20;
        txt.size = size;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        txt.width = size;
        txt.height = size;
        txt.anchorOffsetX = size / 2;
        txt.anchorOffsetY = size / 2;
        txt.bold = true;
        this.addChild(txt);
    };
    return Mark;
}(egret.Sprite));
__reflect(Mark.prototype, "Mark");
//# sourceMappingURL=Mark.js.map