var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(_faceID, _backID) {
        var _this = _super.call(this) || this;
        _this._isface = false;
        _this._speed = 0.1;
        _this.width = 150;
        _this.height = 200;
        _this.anchorOffsetX = _this.width / 2;
        _this._faceID = _faceID;
        _this._backID = _backID;
        _this.drawMask();
        _this.draw();
        return _this;
    }
    Object.defineProperty(Card.prototype, "faceID", {
        get: function () {
            return this._faceID;
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.init = function () {
        this._isface = true;
        this.reverse();
    };
    Card.prototype.draw = function () {
        this.graphics.clear();
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRoundRect(0, 0, this.width, this.height, 30);
        this.graphics.endFill();
        var faceTxtr = RES.getRes(this._faceID);
        this._faceImg = new egret.Bitmap(faceTxtr);
        this._faceImg.width = this.width;
        this._faceImg.height = this.height;
        this._faceImg.mask = this._mask;
        var backTxtr = RES.getRes(this._backID);
        this._backImg = new egret.Bitmap(backTxtr);
        this._backImg.mask = this._mask;
        this.addChild(this._backImg);
    };
    Card.prototype.drawMask = function () {
        this._mask = new egret.Shape();
        this._mask.graphics.clear();
        this._mask.graphics.beginFill(0xffffff);
        this._mask.graphics.drawRoundRect(0, 0, this.width, this.height, 30);
        this._mask.graphics.endFill();
        this.addChild(this._mask);
    };
    Card.prototype.reverse = function () {
        this._isface = !this._isface;
        egret.startTick(this.enterFrameHandler, this);
    };
    Card.prototype.enterFrameHandler = function () {
        this.scaleX -= this._speed;
        if (Math.abs(this.scaleX) < 0.1) {
            if (!this._isface) {
                if (this.getChildIndex(this._faceImg) != -1) {
                    this.removeChild(this._faceImg);
                }
                this.addChild(this._backImg);
            }
            else {
                if (this.getChildIndex(this._backImg) != -1) {
                    this.removeChild(this._backImg);
                }
                this.addChild(this._faceImg);
            }
            this._speed = -0.1;
        }
        if (this.scaleX == 1) {
            egret.stopTick(this.enterFrameHandler, this);
            this._speed = 0.1;
        }
        return true;
    };
    return Card;
}(egret.Sprite));
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map