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
var Bridge = (function (_super) {
    __extends(Bridge, _super);
    function Bridge(start, end) {
        var _this = _super.call(this) || this;
        _this._linkNum = 0;
        _this._bridgeShape = new egret.Shape();
        _this.addChild(_this._bridgeShape);
        _this._startIsland = start;
        _this._endIsland = end;
        _this.draw();
        return _this;
    }
    Object.defineProperty(Bridge.prototype, "linkNum", {
        get: function () {
            return this._linkNum;
        },
        set: function (value) {
            this._linkNum = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bridge.prototype, "startIsland", {
        get: function () {
            return this._startIsland;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bridge.prototype, "endIsland", {
        get: function () {
            return this._endIsland;
        },
        enumerable: true,
        configurable: true
    });
    Bridge.prototype.addLink = function () {
        if (this.linkNum < 2) {
            this.linkNum++;
            this.startIsland.currentBridgeNum++;
            this.endIsland.currentBridgeNum++;
        }
        else {
            this.linkNum = 0;
            this.startIsland.currentBridgeNum -= 2;
            this.endIsland.currentBridgeNum -= 2;
        }
    };
    Bridge.prototype.draw = function () {
        var g = this._bridgeShape.graphics;
        g.clear();
        g.lineStyle(5, 0x333333);
        var start = new egret.Point(this._startIsland.x, this._startIsland.y);
        var end = new egret.Point(this._endIsland.x, this._endIsland.y);
        var space = 15; //两条桥以上时，桥之间的距离；
        switch (this._linkNum) {
            case 0:
                break;
            case 1:
                g.moveTo(start.x, start.y);
                g.lineTo(end.x, end.y);
                break;
            case 2:
                var angle = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
                var dx = Math.cos(angle) * space / 2;
                var dy = Math.sin(angle) * space / 2;
                var start1 = new egret.Point(start.x + dx, start.y + dy);
                var end1 = new egret.Point(end.x + dx, end.y + dy);
                var start2 = new egret.Point(start.x - dx, start.y - dy);
                var end2 = new egret.Point(end.x - dx, end.y - dy);
                g.moveTo(start1.x, start1.y);
                g.lineTo(end1.x, end1.y);
                g.moveTo(start2.x, start2.y);
                g.lineTo(end2.x, end2.y);
                break;
            case 3:
                angle = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
                dx = Math.cos(angle) * space;
                dy = Math.sin(angle) * space;
                start1 = new egret.Point(start.x + dx, start.y + dy);
                end1 = new egret.Point(end.x + dx, end.y + dy);
                start2 = new egret.Point(start.x - dx, start.y - dy);
                end2 = new egret.Point(end.x - dx, end.y - dy);
                g.moveTo(start.x, start.y);
                g.lineTo(end.x, end.y);
                g.moveTo(start1.x, start1.y);
                g.lineTo(end1.x, end1.y);
                g.moveTo(start2.x, start2.y);
                g.lineTo(end2.x, end2.y);
                break;
        }
    };
    return Bridge;
}(egret.Sprite));
__reflect(Bridge.prototype, "Bridge");
//# sourceMappingURL=Bridge.js.map