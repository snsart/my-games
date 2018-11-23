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
    function Button() {
        var _this = _super.call(this) || this;
        _this.draw();
        return _this;
    }
    Button.prototype.draw = function () {
        var txtbg = new egret.Shape();
        txtbg.graphics.lineStyle(1, 0x006e7a);
        txtbg.graphics.beginFill(0x94d1cc);
        txtbg.graphics.drawRoundRect(0, 0, 70, 30, 20, 20);
        this.addChild(txtbg);
        var text = new egret.TextField();
        text.text = "确定";
        text.fontFamily = "微软雅黑";
        text.width = 70;
        text.height = 30;
        text.textColor = 0x004850;
        text.size = 15;
        text.textAlign = "center";
        text.verticalAlign = "middle";
        this.addChild(text);
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map