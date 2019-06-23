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
var ControlPanel = (function (_super) {
    __extends(ControlPanel, _super);
    function ControlPanel(width, height) {
        var _this = _super.call(this) || this;
        _this._width = width;
        _this._height = height;
        _this.createBackGround();
        _this.addBtns();
        return _this;
    }
    ControlPanel.prototype.createBackGround = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.lineStyle(1, 0xeeeeee);
        g.beginFill(0xffffff);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(bg);
    };
    ControlPanel.prototype.addBtns = function () {
        var prebutton, nextButton, replayButton;
        prebutton = new Button("上一关");
        prebutton.x = 10;
        prebutton.y = 10;
        this.addChild(prebutton);
        prebutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
        }, this);
        prebutton.clickable = false;
        nextButton = new Button("下一关");
        nextButton.x = 270;
        nextButton.y = 10;
        this.addChild(nextButton);
        nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
        }, this);
        nextButton.clickable = true;
        replayButton = new Button("重 玩");
        replayButton.x = this._width - replayButton.width - 10;
        replayButton.y = 10;
        this.addChild(replayButton);
        replayButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
        }, this);
        replayButton.clickable = true;
    };
    return ControlPanel;
}(egret.Sprite));
__reflect(ControlPanel.prototype, "ControlPanel");
//# sourceMappingURL=ControlPanel.js.map