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
var Island = (function (_super) {
    __extends(Island, _super);
    function Island(totalBridgeNum, radius) {
        if (radius === void 0) { radius = 40; }
        var _this = _super.call(this) || this;
        _this._adjoins = [null, null, null, null];
        _this._currentBridgeNum = 0;
        _this._totalBridgeNum = 8;
        _this._radius = radius;
        _this._totalBridgeNum = totalBridgeNum;
        _this._bg = new egret.Shape;
        _this.addChild(_this._bg);
        _this._txt = new egret.TextField();
        _this._txt.text = String(totalBridgeNum);
        _this._txt.textAlign = egret.HorizontalAlign.CENTER;
        _this._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        var size = radius * 1.5;
        _this._txt.width = size;
        _this._txt.height = size;
        _this._txt.anchorOffsetX = size / 2;
        _this._txt.anchorOffsetY = size / 2;
        _this._txt.bold = true;
        _this._txt.size = size;
        _this.addChild(_this._txt);
        _this._state = Island.INIT;
        _this.draw();
        return _this;
    }
    Object.defineProperty(Island.prototype, "adjoins", {
        get: function () {
            return this._adjoins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Island.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (state) {
            this._state = state;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Island.prototype, "colIndx", {
        get: function () {
            return this._colIndex;
        },
        set: function (value) {
            this._colIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Island.prototype, "rowIndx", {
        get: function () {
            return this._rowIndex;
        },
        set: function (value) {
            this._rowIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Island.prototype, "totalBridgeNum", {
        get: function () {
            return this._totalBridgeNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Island.prototype, "currentBridgeNum", {
        get: function () {
            return this._currentBridgeNum;
        },
        set: function (value) {
            this._currentBridgeNum = value;
            if (this._currentBridgeNum == this._totalBridgeNum) {
                this.state = Island.COMPLETED;
            }
            else {
                this.state = Island.INIT;
            }
        },
        enumerable: true,
        configurable: true
    });
    Island.prototype.draw = function () {
        var fillColor;
        var textColor;
        switch (this._state) {
            case Island.INIT:
                fillColor = 0xffffff;
                textColor = 0x000000;
                break;
            case Island.SELECTED:
                fillColor = 0x10A8FF;
                textColor = 0xffffff;
                break;
            case Island.COMPLETED:
                fillColor = 0x333333;
                textColor = 0xffffff;
                break;
        }
        var g = this._bg.graphics;
        g.clear();
        g.beginFill(fillColor);
        g.lineStyle(3, 0x555555);
        g.drawCircle(0, 0, this._radius);
        g.endFill();
        this._txt.textColor = textColor;
    };
    /*island state*/
    Island.INIT = "init";
    Island.SELECTED = "selected";
    Island.COMPLETED = "completed";
    return Island;
}(egret.Sprite));
__reflect(Island.prototype, "Island");
//# sourceMappingURL=Island.js.map