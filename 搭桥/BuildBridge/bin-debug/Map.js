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
var Map = (function (_super) {
    __extends(Map, _super);
    function Map(datas) {
        if (datas === void 0) { datas = null; }
        var _this = _super.call(this) || this;
        _this._datas = [
            [0, 4, 0, 0, 5, 0, 3],
            [2, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 2, 0, 0, 0],
            [3, 0, 0, 0, 4, 0, 2],
        ];
        _this._width = 768;
        _this._height = 768;
        _this._islands = [];
        _this._bridgesData = [];
        _this._islandLine = [];
        _this._firstSelected = null;
        _this.createBackground();
        _this.createGrid();
        _this.createIslands();
        _this.createBridges();
        _this.addBridges();
        _this.addIslands();
        _this.addEventToIsland();
        return _this;
    }
    Map.prototype.update = function (datas) {
    };
    Map.prototype.createBackground = function () {
    };
    Map.prototype.createGrid = function () {
    };
    Map.prototype.addEventToIsland = function () {
        for (var i = 0; i < this._islandLine.length; i++) {
            var island = this._islandLine[i];
            island.touchEnabled = true;
            island.addEventListener(egret.TouchEvent.TOUCH_TAP, this.islandClickHandler, this);
        }
    };
    Map.prototype.islandClickHandler = function (e) {
        var island = e.currentTarget;
        switch (island.state) {
            case Island.INIT:
            case Island.COMPLETED:
                if (this._firstSelected) {
                    var bridge = this.search(island, this._firstSelected);
                    if (bridge != null && !this.isCross(bridge)) {
                        if (this._firstSelected.currentBridgeNum == this._firstSelected.totalBridgeNum || island.currentBridgeNum == island.totalBridgeNum) {
                            while (bridge.linkNum != 0) {
                                bridge.addLink();
                            }
                            ;
                        }
                        else {
                            bridge.addLink();
                        }
                        this._firstSelected = null;
                    }
                }
                else {
                    this._firstSelected = island;
                    island.state = Island.SELECTED;
                }
                break;
            case Island.SELECTED:
                if (island.currentBridgeNum == island.totalBridgeNum) {
                    island.state = Island.COMPLETED;
                }
                else {
                    island.state = Island.INIT;
                }
                this._firstSelected = null;
                break;
        }
    };
    Map.prototype.search = function (island1, island2) {
        for (var i = 0; i < this._bridgesData.length; i++) {
            var bridge = this._bridgesData[i];
            var find = (bridge.startIsland == island1 && bridge.endIsland == island2) || (bridge.startIsland == island2 && bridge.endIsland == island1);
            if (find) {
                return bridge;
            }
        }
        return null;
    };
    Map.prototype.createIslands = function () {
        var rowNum = this._datas.length;
        var space = this._width / (rowNum + 1);
        for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
            var arr = [];
            for (var colIndex = 0, colNum = this._datas[rowIndex].length; colIndex < colNum; colIndex++) {
                var num = this._datas[rowIndex][colIndex];
                if (num != 0) {
                    var island = new Island(num);
                    island.x = (colIndex + 1) * space;
                    island.y = (rowIndex + 1) * space;
                    island.rowIndx = rowIndex;
                    island.colIndx = colIndex;
                    arr.push(island);
                    this._islandLine.push(island);
                }
                else {
                    arr.push(null);
                }
            }
            this._islands.push(arr);
        }
    };
    Map.prototype.createBridges = function () {
        var startIsland = this._islandLine[0];
        this.check(startIsland);
    };
    Map.prototype.addIslands = function () {
        for (var i = 0; i < this._islandLine.length; i++) {
            this.addChild(this._islandLine[i]);
        }
    };
    Map.prototype.addBridges = function () {
        for (var i = 0; i < this._bridgesData.length; i++) {
            this.addChild(this._bridgesData[i]);
        }
    };
    Map.prototype.check = function (island) {
        var left = 0, top = 0;
        var bottom = this._datas.length - 1, right = this._datas[0].length - 1;
        var currentRow = island.rowIndx;
        var currentCol = island.colIndx;
        //向上遍历
        for (var i = currentRow - 1; i >= 0; i--) {
            var endIsland = this._islands[i][currentCol];
            if (endIsland != null) {
                var bridge = new Bridge(island, endIsland);
                island.adjoins[0] = endIsland; //0：上 1：右 2：下 3：左 
                endIsland[2] = island;
                this._bridgesData.push(bridge);
                this.check(endIsland);
                break;
            }
        }
        //向下遍历
        for (var i = currentRow + 1; i <= bottom; i++) {
            var endIsland = this._islands[i][currentCol];
            if (endIsland != null && endIsland.adjoins[0] == null) {
                var bridge = new Bridge(island, endIsland);
                island.adjoins[2] = endIsland;
                endIsland.adjoins[0] = island;
                this._bridgesData.push(bridge);
                this.check(endIsland);
                break;
            }
        }
        //向左遍历
        for (var i = currentCol - 1; i >= 0; i--) {
            var endIsland = this._islands[currentRow][i];
            if (endIsland != null && endIsland.adjoins[1] == null) {
                var bridge = new Bridge(island, endIsland);
                island.adjoins[3] = endIsland;
                endIsland.adjoins[1] = island;
                this._bridgesData.push(bridge);
                this.check(endIsland);
                break;
            }
        }
        //向右遍历
        for (var i = currentCol + 1; i <= right; i++) {
            var endIsland = this._islands[currentRow][i];
            if (endIsland != null && endIsland.adjoins[3] == null) {
                var bridge = new Bridge(island, endIsland);
                island.adjoins[1] = endIsland;
                endIsland.adjoins[3] = island;
                this._bridgesData.push(bridge);
                this.check(endIsland);
                break;
            }
        }
    };
    /*判断bridge和其他桥是否相交*/
    Map.prototype.isCross = function (bridge) {
        for (var i = 0; i < this._bridgesData.length; i++) {
            var anotherBridge = this._bridgesData[i];
            if (anotherBridge == bridge || anotherBridge.linkNum == 0) {
                continue;
            }
            var start1 = new egret.Point(bridge.startIsland.x, bridge.startIsland.y);
            var end1 = new egret.Point(bridge.endIsland.x, bridge.endIsland.y);
            var start2 = new egret.Point(anotherBridge.startIsland.x, anotherBridge.startIsland.y);
            var end2 = new egret.Point(anotherBridge.endIsland.x, anotherBridge.endIsland.y);
            if (this.segmentsIntr(start1, end1, start2, end2)) {
                return true;
            }
        }
        return false;
    };
    Map.prototype.segmentsIntr = function (a, b, c, d) {
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
        if (Math.round(x - a.x) * Math.round(x - b.x) < 0 && Math.round(y - a.y) * Math.round(y - b.y) < 0
            && Math.round(x - c.x) * Math.round(x - d.x) < 0 && Math.round(y - c.y) * Math.round(y - d.y) < 0) {
            return {
                x: x,
                y: y
            };
        }
        return false;
    };
    return Map;
}(egret.Sprite));
__reflect(Map.prototype, "Map");
//# sourceMappingURL=Map.js.map