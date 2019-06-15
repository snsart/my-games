var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var RayLine = (function () {
    function RayLine() {
        this._startPoint = new egret.Point(0, 0);
        this._direction = 0;
    }
    Object.defineProperty(RayLine.prototype, "startPoint", {
        get: function () {
            return this._startPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayLine.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    /*
    获得射线上距离起始点为len处的点的坐标;
    */
    RayLine.prototype.getPoint = function (len) {
        var dx = len * Math.cos(this._direction);
        var dy = len * Math.sin(this._direction);
        return new egret.Point(this._startPoint.x + dx, this._startPoint.y + dy);
    };
    /*
     @len 射线的检测范围，一般要大于舞台
    @line 检测的线段，射线照射到线段上发生反射
    return：当射在线段上时，返回交叉点，否则返回null
    */
    RayLine.prototype.hitLine = function (len, line) {
        var cross;
        var rayStart = this._startPoint;
        var rayEnd = this.getPoint(len);
        var lineStart = line.startPoint;
        var lineEnd = line.endPoint;
        cross = this.segmentsIntr(rayStart, rayEnd, lineStart, lineEnd); //求两条线段的交点
        if (cross) {
            var len_1 = this.getDistance(rayStart, cross);
            if (len_1 < 3) {
                return null;
            }
        }
        return cross;
    };
    /*
     @len 射线的检测范围，一般要大于舞台
     @line 检测的线段，射线照射到线段上发生反射
    return：当射在线段上时，返回反射的射线,否则返回null
    */
    RayLine.prototype.getReflexLine = function (len, line) {
        var cross;
        if ((cross = this.hitLine(len, line))) {
            var angle = line.getRotation();
            var reflexLine = new RayLine();
            reflexLine._startPoint = cross;
            reflexLine._direction = 2 * angle - this._direction;
            return reflexLine;
        }
        return null;
    };
    /*
    求两条线段的交点
    */
    RayLine.prototype.segmentsIntr = function (a, b, c, d) {
        var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
        if (denominator == 0) {
            return null;
        }
        var x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y)
            + (b.y - a.y) * (d.x - c.x) * a.x
            - (d.y - c.y) * (b.x - a.x) * c.x) / denominator;
        var y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x)
            + (b.x - a.x) * (d.y - c.y) * a.y
            - (d.x - c.x) * (b.y - a.y) * c.y) / denominator;
        console.log((y - a.y) * (y - b.y));
        if (Math.round(x - a.x) * Math.round(x - b.x) <= 0 && Math.round(y - a.y) * Math.round(y - b.y) <= 0
            && Math.round(x - c.x) * Math.round(x - d.x) <= 0 && Math.round(y - c.y) * Math.round(y - d.y) <= 0) {
            return new egret.Point(x, y);
        }
        return null;
    };
    RayLine.prototype.getDistance = function (p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    };
    return RayLine;
}());
__reflect(RayLine.prototype, "RayLine");
//# sourceMappingURL=RayLine.js.map