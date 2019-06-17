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
var StartPanelUI = (function (_super) {
    __extends(StartPanelUI, _super);
    function StartPanelUI(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    StartPanelUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.drawBack();
        this.addTitle();
        this._startBtn = new eui.Button();
        this._startBtn.label = "start";
        this._startBtn.horizontalCenter = 0;
        this._startBtn.verticalCenter = 0;
        this.addChild(this._startBtn);
    };
    Object.defineProperty(StartPanelUI.prototype, "startBtn", {
        get: function () {
            return this._startBtn;
        },
        enumerable: true,
        configurable: true
    });
    StartPanelUI.prototype.drawBack = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x222222);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    StartPanelUI.prototype.addTitle = function () {
        var title = new egret.TextField();
        title.text = "弹力球";
        title.size = 80;
        title.x = this.width / 2 - title.width / 2;
        title.y = this.height / 4;
        this.addChild(title);
    };
    return StartPanelUI;
}(eui.Group));
__reflect(StartPanelUI.prototype, "StartPanelUI");
//# sourceMappingURL=StartPanelUI.js.map