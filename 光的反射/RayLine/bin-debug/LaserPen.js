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
// 激光笔功能
/*
*1.打开/关闭
*2.
*/
var LaserPen = (function (_super) {
    __extends(LaserPen, _super);
    function LaserPen(stage) {
        var _this = _super.call(this) || this;
        _this._mirrors = [];
        _this._rayLen = 1000; //射线长度
        _this._lines = []; //反射后生成的所有线段
        _this._stage = stage;
        _this._rayShape = new egret.Shape(); //
        _this.addChild(_this._rayShape);
        _this.createPen();
        _this.createRayLine();
        _this.update();
        return _this;
    }
    /*添加可被照射的镜面*/
    LaserPen.prototype.addMirror = function (mirror) {
        this._mirrors.push(mirror);
        this.update();
    };
    //绘制笔并添加拖拽行为
    LaserPen.prototype.createPen = function () {
        this._pen = this.createBitmapByName("pen_png");
        this._pen.anchorOffsetX = this._pen.width / 2;
        this._pen.anchorOffsetY = this._pen.height;
        this._pen.x = 200;
        this._pen.y = 200;
        this.addChild(this._pen);
        ObjectDecorator.get(this._pen).addDragAction(this._stage).upHandler(function () {
        }).moveHandler(function () {
            this.update();
        }.bind(this));
        var rotate = this.createBitmapByName("rotate_png");
        rotate.anchorOffsetX = rotate.width / 2;
        rotate.anchorOffsetY = rotate.height / 2;
        this.addChild(rotate);
        ObjectDecorator.get(this._pen).addRotateAction(this._stage, rotate, 150, -90).moveHandler(function () {
            this.update();
        }.bind(this));
    };
    //创建射线
    LaserPen.prototype.createRayLine = function () {
        this._rayLine = new RayLine();
    };
    LaserPen.prototype.updateRayLine = function () {
        this._rayLine.startPoint.x = this._pen.x;
        this._rayLine.startPoint.y = this._pen.y;
        this._rayLine.direction = this._pen.rotation * Math.PI / 180 + Math.PI / 2;
    };
    LaserPen.prototype.update = function () {
        this._lines = [];
        this.updateRayLine();
        this.hitTest(this._rayLine, this._mirrors, this._lines);
        this.renderLines(this._lines);
    };
    //rayLine和mirrors中的线段做碰撞检测，把生成的线段存储在lines中
    LaserPen.prototype.hitTest = function (rayLine, mirrors, lines) {
        var crosses = []; //存储每一个交点及对应的镜子
        for (var i = 0; i < mirrors.length; i++) {
            var cross1 = rayLine.hitLine(this._rayLen, mirrors[i]);
            if (cross1) {
                var obj = { cross: cross1, mirror: mirrors[i] };
                crosses.push(obj);
            }
        }
        if (crosses.length == 0) {
            lines.push({
                startPoint: rayLine.startPoint,
                endPoint: rayLine.getPoint(this._rayLen)
            });
            return lines;
        }
        else {
            //获取射线照射到的第一面镜子
            var first = crosses[0];
            for (var i = 1; i < crosses.length; i++) {
                if (this.getDistance(crosses[i].cross, rayLine.startPoint) < this.getDistance(first.cross, rayLine.startPoint)) {
                    first = crosses[i];
                }
            }
            crosses = [];
            lines.push({
                startPoint: rayLine.startPoint,
                endPoint: first.cross
            });
            //如果镜子不能反射，返回；
            if (!first.mirror.reflect) {
                return;
            }
            var newRayLine = rayLine.getReflexLine(this._rayLen, first.mirror);
            this.hitTest(newRayLine, mirrors, lines);
        }
    };
    LaserPen.prototype.renderLines = function (lines) {
        var g = this._rayShape.graphics;
        g.clear();
        g.lineStyle(3, 0xff0000);
        for (var i = 0; i < lines.length; i++) {
            g.moveTo(lines[i].startPoint.x, lines[i].startPoint.y);
            g.lineTo(lines[i].endPoint.x, lines[i].endPoint.y);
        }
    };
    LaserPen.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    LaserPen.prototype.getDistance = function (p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    };
    return LaserPen;
}(egret.Sprite));
__reflect(LaserPen.prototype, "LaserPen");
//# sourceMappingURL=LaserPen.js.map