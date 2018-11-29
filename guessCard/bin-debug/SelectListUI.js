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
var SelectListUI = (function (_super) {
    __extends(SelectListUI, _super);
    function SelectListUI() {
        var _this = _super.call(this) || this;
        _this._selectId = 0;
        _this._selectBtnList = [];
        _this.createView();
        return _this;
    }
    Object.defineProperty(SelectListUI.prototype, "selectId", {
        get: function () {
            return this._selectId;
        },
        enumerable: true,
        configurable: true
    });
    SelectListUI.prototype.init = function () {
        for (var i = 0; i < 3; i++) {
            this._selectBtnList[i].select = false;
        }
        this._selectId = 0;
    };
    SelectListUI.prototype.createView = function () {
        for (var i = 0; i < 3; i++) {
            var selectBtn = new SelectedButton();
            this.addChild(selectBtn);
            selectBtn.x = i * 240;
            selectBtn.touchEnabled = true;
            this._selectBtnList.push(selectBtn);
            selectBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickHandler, this);
        }
    };
    SelectListUI.prototype.clickHandler = function (e) {
        var selectBtn = e.currentTarget;
        this._selectId = this._selectBtnList.indexOf(selectBtn) + 1;
        selectBtn.select = true;
        for (var i = 0; i < 3; i++) {
            if (i != this._selectId - 1) {
                this._selectBtnList[i].select = false;
            }
        }
        this.dispatchEvent(new egret.Event("select"));
    };
    return SelectListUI;
}(egret.Sprite));
__reflect(SelectListUI.prototype, "SelectListUI");
//# sourceMappingURL=SelectListUI.js.map