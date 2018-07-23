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
var endPanelUI = (function (_super) {
    __extends(endPanelUI, _super);
    function endPanelUI(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this._replayBtn = new eui.Button();
        return _this;
    }
    endPanelUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.drawBack();
        this.addTitle();
        this._score = new InfoUI();
        this._score.label = "score";
        this._score.x = this.width / 2 - this._score.width / 2;
        this._score.y = this.height / 2;
        this.addChild(this._score);
        this._time = new InfoUI();
        this._time.label = "time";
        this._time.x = this.width / 2 - this._time.width / 2;
        this._time.y = this._score.y + 50;
        this.addChild(this._time);
        this._replayBtn.label = "replay";
        this._replayBtn.horizontalCenter = 0;
        this._replayBtn.y = this._time.y + 50;
        this.addChild(this._replayBtn);
        console.log("addBtn");
    };
    Object.defineProperty(endPanelUI.prototype, "replayBtn", {
        get: function () {
            return this._replayBtn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(endPanelUI.prototype, "time", {
        get: function () {
            return this._time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(endPanelUI.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: true,
        configurable: true
    });
    endPanelUI.prototype.drawBack = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x222222);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    endPanelUI.prototype.addTitle = function () {
        var title = new egret.TextField();
        title.text = "gameOver";
        title.size = 40;
        title.x = this.width / 2 - title.width / 2;
        title.y = this.height / 4;
        this.addChild(title);
    };
    return endPanelUI;
}(eui.Group));
__reflect(endPanelUI.prototype, "endPanelUI");
//# sourceMappingURL=endPanelUI.js.map