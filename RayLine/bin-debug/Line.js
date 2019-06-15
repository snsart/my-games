var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Line = (function () {
    function Line() {
        this._reflect = true;
        this._startPoint = new egret.Point(0, 0);
        this._endPoint = new egret.Point(10, 100);
        this._reflect = true;
    }
    Object.defineProperty(Line.prototype, "startPoint", {
        get: function () {
            return this._startPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "endPoint", {
        get: function () {
            return this._startPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "reflect", {
        get: function () {
            return this._reflect;
        },
        set: function (value) {
            this._reflect = value;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.getRotation = function () {
        var start = this.startPoint, end = this.endPoint;
        return Math.atan2(end.y - start.y, end.x - start.x);
    };
    return Line;
}());
__reflect(Line.prototype, "Line");
//# sourceMappingURL=Line.js.map