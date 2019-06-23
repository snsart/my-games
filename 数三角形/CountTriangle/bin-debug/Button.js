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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(label) {
        if (label === void 0) { label = "按钮"; }
        var _this = _super.call(this) || this;
        _this._label = new egret.TextField();
        _this._label.text = label;
        _this._bgColor = 0xffffff;
        _this.draw();
        return _this;
    }
    Object.defineProperty(Button.prototype, "clickable", {
        set: function (value) {
            if (value) {
                this.touchEnabled = true;
                this._bgColor = 0xffffff;
            }
            else {
                this.touchEnabled = false;
                this._bgColor = 0xbbbbbb;
            }
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.draw = function () {
        var txt = this._label;
        txt.textColor = 0x333333;
        txt.size = 20;
        txt.bold = true;
        txt.x = 10;
        txt.y = 10;
        txt.fontFamily = "微软雅黑";
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.clear();
        g.lineStyle(1, 0x888888);
        g.beginFill(this._bgColor);
        g.drawRoundRect(0, 0, txt.width + 20, txt.height + 20, 15, 15);
        this.addChild(bg);
        this.addChild(txt);
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map