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
var CardState;
(function (CardState) {
    CardState[CardState["FACE"] = 0] = "FACE";
    CardState[CardState["BACK"] = 1] = "BACK";
    CardState[CardState["REVERSING"] = 2] = "REVERSING";
})(CardState || (CardState = {}));
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(_faceID, _backID) {
        var _this = _super.call(this) || this;
        _this._speed = 0.1;
        _this._isdeal = false;
        _this.width = 120;
        _this.height = 168;
        _this.anchorOffsetX = _this.width / 2;
        _this._faceID = _faceID;
        _this._backID = _backID;
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
    Object.defineProperty(Card.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "isdeal", {
        get: function () {
            return this._isdeal;
        },
        set: function (value) {
            this._isdeal = value;
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.init = function () {
        this._state = CardState.FACE;
        this.reverse();
    };
    Card.prototype.draw = function () {
        var faceTxtr = RES.getRes(this._faceID);
        this._faceImg = new egret.Bitmap(faceTxtr);
        this._faceImg.width = this.width;
        this._faceImg.height = this.height;
        var backTxtr = RES.getRes(this._backID);
        this._backImg = new egret.Bitmap(backTxtr);
        this._backImg.width = this.width;
        this._backImg.height = this.height;
        this.addChild(this._backImg);
        this._state = CardState.BACK;
    };
    Card.prototype.reverse = function () {
        if (this._state != CardState.REVERSING) {
            this._stateBeforeReverse = this._state;
            this._state = CardState.REVERSING;
            egret.startTick(this.enterFrameHandler, this);
        }
    };
    Card.prototype.enterFrameHandler = function () {
        this.scaleX -= this._speed;
        if (Math.abs(this.scaleX) < 0.1) {
            if (this._stateBeforeReverse == CardState.FACE) {
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
            if (this._stateBeforeReverse == CardState.FACE) {
                this._state = CardState.BACK;
            }
            else {
                this._state = CardState.FACE;
            }
            this._speed = 0.1;
        }
        return true;
    };
    return Card;
}(egret.Sprite));
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map