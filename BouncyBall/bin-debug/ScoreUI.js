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
var ScoreUI = (function (_super) {
    __extends(ScoreUI, _super);
    function ScoreUI() {
        var _this = _super.call(this) || this;
        _this._score = 0;
        _this.create();
        return _this;
    }
    Object.defineProperty(ScoreUI.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (_score) {
            this._score = _score;
            this._inputTxt.text = String(this._score);
        },
        enumerable: true,
        configurable: true
    });
    ScoreUI.prototype.create = function () {
        var label = new egret.TextField();
        label.textColor = 0xffff00;
        label.text = "score:";
        label.width = 100;
        label.height = 30;
        this.addChild(label);
        this._inputTxt = new egret.TextField();
        this._inputTxt.textColor = 0xffff00;
        this._inputTxt.x = 110;
        this._inputTxt.text = String(this._score);
        this.addChild(this._inputTxt);
    };
    return ScoreUI;
}(egret.Sprite));
__reflect(ScoreUI.prototype, "ScoreUI");
//# sourceMappingURL=ScoreUI.js.map