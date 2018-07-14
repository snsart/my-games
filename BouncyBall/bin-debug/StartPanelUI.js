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
        console.log(width, height);
        _this._width = width;
        _this._height = height;
        _this.drawBack();
        _this.addTitle();
        _this.addButton();
        return _this;
    }
    Object.defineProperty(StartPanelUI.prototype, "startBtn", {
        get: function () {
            return this._startBtn;
        },
        enumerable: true,
        configurable: true
    });
    StartPanelUI.prototype.drawBack = function () {
        this.graphics.clear();
        this.graphics.beginFill(0x222222);
        this.graphics.drawRect(0, 0, this._width, this._height);
        this.graphics.endFill();
    };
    StartPanelUI.prototype.addTitle = function () {
        var title = new egret.TextField();
        title.text = "弹力球";
        title.size = 80;
        title.x = this._width / 2 - title.width / 2;
        title.y = this._height / 4;
        this.addChild(title);
    };
    StartPanelUI.prototype.addButton = function () {
        this._startBtn = new ButtonUI();
        this._startBtn.label = "开始";
        this._startBtn.x = this._width / 2 - this._startBtn.width / 2;
        this._startBtn.y = this._height / 1.5;
        this.addChild(this._startBtn);
    };
    return StartPanelUI;
}(egret.Sprite));
__reflect(StartPanelUI.prototype, "StartPanelUI");
//# sourceMappingURL=StartPanelUI.js.map