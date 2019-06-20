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
    function ControlPanel(map, width, height) {
        var _this = _super.call(this) || this;
        _this._map = map;
        _this._width = width;
        _this._height = height;
        _this.createBackGround();
        _this.addLevelInfo();
        _this.addBtns();
        return _this;
    }
    ControlPanel.prototype.createBackGround = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.lineStyle(1, 0x666666);
        g.beginFill(0xffffff);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(bg);
    };
    ControlPanel.prototype.createLevelInfo = function () {
        var levelSprite = new egret.Sprite();
        var g = levelSprite.graphics;
        g.clear();
        g.beginFill(0xffffff);
        g.lineStyle(1, 0x888888);
        g.drawRoundRect(0, 0, 90, 70, 15, 15);
        g.endFill();
        this._levelInfo = new egret.TextField();
        this._levelInfo.text = String(Datas.currentLevel + 1);
        this._levelInfo.textColor = 0x000000;
        this._levelInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._levelInfo.verticalAlign = egret.VerticalAlign.MIDDLE;
        var size = 50;
        this._levelInfo.width = 90;
        this._levelInfo.height = 70;
        this._levelInfo.bold = true;
        this._levelInfo.size = size;
        levelSprite.addChild(this._levelInfo);
        return levelSprite;
    };
    ControlPanel.prototype.addLevelInfo = function () {
        var levelSprite = this.createLevelInfo();
        levelSprite.x = 170;
        levelSprite.y = 10;
        this.addChild(levelSprite);
    };
    ControlPanel.prototype.addBtns = function () {
        var prebutton, nextButton, replayButton;
        prebutton = new Button("上一关");
        prebutton.x = 10;
        prebutton.y = 10;
        this.addChild(prebutton);
        prebutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (Datas.hasPreLevel()) {
                this._map.update(Datas.preLevel());
                this._levelInfo.text = String(Datas.currentLevel + 1);
                Alert.show("开始搭桥吧");
                nextButton.clickable = true;
                if (!Datas.hasPreLevel()) {
                    prebutton.clickable = false;
                }
            }
        }, this);
        prebutton.clickable = false;
        nextButton = new Button("下一关");
        nextButton.x = 270;
        nextButton.y = 10;
        this.addChild(nextButton);
        nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (Datas.hasNextLevel()) {
                this._map.update(Datas.newLevel());
                this._levelInfo.text = String(Datas.currentLevel + 1);
                Alert.show("开始搭桥吧");
                prebutton.clickable = true;
                if (!Datas.hasNextLevel()) {
                    nextButton.clickable = false;
                }
            }
        }, this);
        nextButton.clickable = true;
        replayButton = new Button("重 玩");
        replayButton.x = this._width - replayButton.width - 10;
        replayButton.y = 10;
        this.addChild(replayButton);
        replayButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this._map.update(Datas.currentLevelData());
            Alert.show("开始搭桥吧");
        }, this);
        replayButton.clickable = true;
    };
    return ControlPanel;
}(egret.Sprite));
__reflect(ControlPanel.prototype, "ControlPanel");
//# sourceMappingURL=ControlPanel.js.map