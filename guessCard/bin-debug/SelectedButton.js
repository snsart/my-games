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
var SelectedButton = (function (_super) {
    __extends(SelectedButton, _super);
    function SelectedButton() {
        var _this = _super.call(this) || this;
        _this._select = false;
        _this.createView();
        return _this;
    }
    Object.defineProperty(SelectedButton.prototype, "select", {
        get: function () {
            return this._select;
        },
        set: function (value) {
            if (value) {
                this._selectedImg.visible = true;
                this._unselectedImg.visible = false;
                this.drawRoundRect(true);
            }
            else {
                this._selectedImg.visible = false;
                this._unselectedImg.visible = true;
                this.drawRoundRect(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    SelectedButton.prototype.createView = function () {
        this._unselectedImg = this.createBitmapByName("button#unselect");
        this.addChild(this._unselectedImg);
        this._selectedImg = this.createBitmapByName("button#select");
        this.addChild(this._selectedImg);
        this._selectedImg.visible = false;
        this._unselectedImg.visible = true;
        this._selectedBg = new egret.Shape();
        this.drawRoundRect(false);
        this.addChild(this._selectedBg);
    };
    SelectedButton.prototype.drawRoundRect = function (line) {
        this._selectedBg.graphics.clear();
        if (line) {
            this._selectedBg.graphics.lineStyle(1, 0xffff00);
        }
        /*0f2642*/
        this._selectedBg.graphics.beginFill(0xffffff, 0.1);
        this._selectedBg.graphics.drawRoundRect(-85, -560, 185, 560, 30, 30);
        this._selectedBg.graphics.endFill();
    };
    SelectedButton.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return SelectedButton;
}(egret.Sprite));
__reflect(SelectedButton.prototype, "SelectedButton");
//# sourceMappingURL=SelectedButton.js.map