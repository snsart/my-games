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
var InfoUI = (function (_super) {
    __extends(InfoUI, _super);
    function InfoUI() {
        var _this = _super.call(this) || this;
        _this._score = 0;
        _this.create();
        return _this;
    }
    Object.defineProperty(InfoUI.prototype, "value", {
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
    Object.defineProperty(InfoUI.prototype, "label", {
        set: function (_label) {
            this._label.text = _label;
        },
        enumerable: true,
        configurable: true
    });
    InfoUI.prototype.create = function () {
        this._label = new egret.TextField();
        this._label.textColor = 0xffff00;
        this._label.text = "score:";
        this._label.width = 100;
        this._label.height = 30;
        this.addChild(this._label);
        this._inputTxt = new egret.TextField();
        this._inputTxt.textColor = 0xffff00;
        this._inputTxt.x = 110;
        this._inputTxt.text = String(this._score);
        this.addChild(this._inputTxt);
    };
    return InfoUI;
}(egret.Sprite));
__reflect(InfoUI.prototype, "InfoUI");
//# sourceMappingURL=InfoUI.js.map