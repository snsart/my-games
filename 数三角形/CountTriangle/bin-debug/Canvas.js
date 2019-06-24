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
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(width, height) {
        var _this = _super.call(this) || this;
        _this._drawAble = true;
        _this._bg = new egret.Shape();
        _this._lines = [];
        _this._points = [];
        _this._width = width;
        _this._height = height;
        _this._startPoint;
        _this.touchEnabled = true;
        _this.createBackGround();
        _this.addChild(_this._bg);
        _this.addEvents();
        return _this;
    }
    Object.defineProperty(Canvas.prototype, "drawAble", {
        set: function (value) {
            this._drawAble = value;
            if (value) {
                this.touchEnabled = true;
            }
            else {
                this.touchEnabled = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Canvas.prototype.addEvents = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            var x = e.stageX - this.x;
            var y = e.stageY - this.y;
            this._currentLine = new egret.Shape();
            this.addChild(this._currentLine);
            this._startPoint = new egret.Point(x, y);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.drawEndHandler, this);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            var g = this._currentLine.graphics;
            g.clear();
            g.lineStyle(3, 0x000000);
            g.moveTo(this._startPoint.x, this._startPoint.y);
            g.lineTo(e.stageX - this.x, e.stageY - this.y);
        }, this);
    };
    Canvas.prototype.drawEndHandler = function (e) {
        var x = e.stageX - this.x;
        var y = e.stageY - this.y;
        var endPoint = new egret.Point(x, y);
        this._lines.push([this._startPoint, endPoint]);
        this._startPoint = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.drawEndHandler, this);
        var crossLines = this.getLinesWithCross(this._lines);
        console.log(crossLines);
        this.sortLines(crossLines);
        console.log(crossLines);
        this.trimLines(crossLines);
        console.log(crossLines);
    };
    /**
     *生成带有交点的线段集
    */
    Canvas.prototype.getLinesWithCross = function (lines) {
        var crossLines = [];
        for (var i = 0, len = lines.length; i < len; i++) {
            var line = [];
            var lineStart = lines[i][0];
            var lineEnd = lines[i][1];
            if (this.getPointsNearBy(lineStart, this._points).length == 0) {
                this._points.push(lineStart);
            }
            else {
                lineStart = this.getPointsNearBy(lineStart, this._points)[0];
            }
            if (this.getPointsNearBy(lineEnd, this._points).length == 0) {
                this._points.push(lineEnd);
            }
            else {
                lineEnd = this.getPointsNearBy(lineEnd, this._points)[0];
            }
            line.push(lineStart, lineEnd);
            for (var j = 0, len_1 = lines.length; j < len_1; j++) {
                if (i == j) {
                    continue;
                }
                var cross = this.segmentsIntr(lines[i][0], lines[i][1], lines[j][0], lines[j][1]);
                if (cross) {
                    if (this.getPointsNearBy(cross, this._points).length == 0) {
                        this._points.push(cross);
                    }
                    else {
                        cross = this.getPointsNearBy(cross, this._points)[0];
                    }
                    line.push(cross);
                }
            }
            crossLines.push(line);
        }
        return crossLines;
    };
    /*取得一系列点中离某点较近的点*/
    Canvas.prototype.getPointsNearBy = function (point, points) {
        return points.filter(function (value, index, array) {
            var distance = (value.x - point.x) * (value.x - point.x) + (value.y - point.y) * (value.y - point.y);
            if (distance < 100) {
                return true;
            }
        });
    };
    /*对线上的点进行排序*/
    Canvas.prototype.sortLines = function (lines) {
        var _loop_1 = function (i) {
            var startPoint = lines[i][0];
            lines[i].sort(function (value1, value2) {
                var dis1 = this.getDistance(value1, startPoint);
                var dis2 = this.getDistance(value2, startPoint);
                return dis1 > dis2;
            }.bind(this_1));
        };
        var this_1 = this;
        for (var i = 0; i < lines.length; i++) {
            _loop_1(i);
        }
    };
    /*修剪掉线段头，即把非交点的顶点删除掉*/
    Canvas.prototype.trimLines = function (lines) {
        for (var i = 0, len = lines.length; i < len; i++) {
            var start = lines[i][0];
            var end = lines[i][lines[i].length - 1];
            var startIsCross = false, endIsCross = false; //start和end点是否是交点
            for (var j = 0, len_2 = lines.length; j < len_2; j++) {
                if (i == j) {
                    continue;
                }
                if (lines[j].indexOf(start) != -1) {
                    startIsCross = true;
                }
                if (lines[j].indexOf(end) != -1) {
                    endIsCross = true;
                }
            }
            if (!startIsCross) {
                lines[i].splice(0, 1);
            }
            if (!endIsCross) {
                lines[i].splice(lines[i].length - 1, 1);
            }
        }
    };
    Canvas.prototype.createBackGround = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.beginFill(0xffffff);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(bg);
    };
    Canvas.prototype.segmentsIntr = function (a, b, c, d) {
        var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
        if (denominator == 0) {
            return false;
        }
        var x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y)
            + (b.y - a.y) * (d.x - c.x) * a.x
            - (d.y - c.y) * (b.x - a.x) * c.x) / denominator;
        var y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x)
            + (b.x - a.x) * (d.y - c.y) * a.y
            - (d.x - c.x) * (b.y - a.y) * c.y) / denominator;
        if (Math.round(x - a.x) * Math.round(x - b.x) <= 0 && Math.round(y - a.y) * Math.round(y - b.y) <= 0
            && Math.round(x - c.x) * Math.round(x - d.x) <= 0 && Math.round(y - c.y) * Math.round(y - d.y) <= 0) {
            return new egret.Point(x, y);
        }
        return false;
    };
    Canvas.prototype.getDistance = function (p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    };
    return Canvas;
}(egret.Sprite));
__reflect(Canvas.prototype, "Canvas");
//# sourceMappingURL=Canvas.js.map