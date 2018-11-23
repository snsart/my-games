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
var HeadMc = (function (_super) {
    __extends(HeadMc, _super);
    function HeadMc(headImg) {
        var _this = _super.call(this) || this;
        _this._state = "noselected";
        _this._headImg = headImg;
        _this.create();
        return _this;
    }
    Object.defineProperty(HeadMc.prototype, "state", {
        set: function (value) {
            this._state = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeadMc.prototype, "headID", {
        get: function () {
            return this._headID;
        },
        set: function (value) {
            this._headID = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeadMc.prototype, "headImg", {
        get: function () {
            return this._headImg;
        },
        set: function (value) {
            this._headImg = value;
        },
        enumerable: true,
        configurable: true
    });
    HeadMc.prototype.create = function () {
        this._bg = new egret.Shape();
        this.addChild(this._bg);
        this.addChild(this._headImg);
        this._headImg.width = 80;
        this._headImg.height = 80;
        /*this._hideMc=new egret.Shape();
        this._hideMc.graphics.beginFill(0x000000,0.5);
        this._hideMc.graphics.drawRect(0,0,80,80);
        this._hideMc.graphics.endFill();
        this.addChild(this._hideMc);
        this.draw();*/
    };
    HeadMc.prototype.draw = function () {
        this._bg.graphics.clear();
        if (this._state == "current") {
            this._bg.graphics.lineStyle(2, 0xff0000);
        }
        this._bg.graphics.beginFill(0xffffff);
        this._bg.graphics.drawRect(0, 0, 80, 80);
        if (this._state == "selected") {
            this.alpha = 0.2;
        }
        else {
            this.alpha = 1;
        }
    };
    return HeadMc;
}(egret.Sprite));
__reflect(HeadMc.prototype, "HeadMc");
//# sourceMappingURL=HeadMc.js.map