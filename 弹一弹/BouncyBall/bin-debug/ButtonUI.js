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
var ButtonUI = (function (_super) {
    __extends(ButtonUI, _super);
    function ButtonUI() {
        var _this = _super.call(this) || this;
        _this._label = "按钮";
        _this.create();
        return _this;
    }
    Object.defineProperty(ButtonUI.prototype, "label", {
        set: function (label) {
            this._label = label;
            this._labelTxt.text = label;
        },
        enumerable: true,
        configurable: true
    });
    ButtonUI.prototype.create = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.beginFill(0x000000, 0.3);
        this.graphics.drawRoundRect(0, 0, 100, 50, 10);
        this.graphics.endFill();
        this._labelTxt = new egret.TextField();
        this._labelTxt.textColor = 0xffffff;
        this._labelTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._labelTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._labelTxt.text = this.label;
        this._labelTxt.width = 100;
        this._labelTxt.height = 50;
        this.addChild(this._labelTxt);
    };
    return ButtonUI;
}(egret.Sprite));
__reflect(ButtonUI.prototype, "ButtonUI");
//# sourceMappingURL=ButtonUI.js.map