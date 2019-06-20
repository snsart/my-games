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
    function Map(datas, width, height) {
        var _this = _super.call(this) || this;
        _this._islands = [];
        _this._bridgesData = [];
        _this._islandLine = [];
        _this._background = new egret.Shape();
        _this._grid = new egret.Shape();
        _this._firstSelected = null;
        _this._selected = [];
        _this._width = width;
        _this._height = height;
        _this._datas = datas;
        console.log(_this._datas);
        _this.createBackground();
        _this.createObject();
        return _this;
    }
    Map.prototype.update = function (datas) {
        this._datas = datas;
        this._firstSelected = null;
        this._selected = [];
        this.removeObject();
        this.createObject();
    };
    Map.prototype.createObject = function () {
        this.createGrid();
        this.createIslands();
        this.createBridges();
        this.addBridges();
        this.addIslands();
        this.addEventToIsland();
    };
    Map.prototype.removeObject = function () {
        this.removeGrid();
        this.removeEventToIsland();
        this.removeIslands();
        this.removeBridges();
    };
    Map.prototype.createBackground = function () {
        var g = this._background.graphics;
        g.beginFill(0xffffff);
        g.lineStyle(1, 0x666666);
        g.drawRoundRect(10, 10, this._width - 20, this._width - 20, 20, 20);
        this.addChild(this._background);
    };
    /*创建/移除表格*/
    Map.prototype.createGrid = function () {
        var g = this._grid.graphics;
        g.clear();
        g.lineStyle(1, 0xbbbbbb);
        console.log(this._datas);
        var numCol = this._datas[0].length;
        var numRow = this._datas.length;
        var space = this._width / (numCol + 1);
        for (var i = 1; i <= numCol; i++) {
            var startX = i * space, startY = space, endX = i * space, endY = space * numRow;
            g.moveTo(startX, startY);
            g.lineTo(endX, endY);
            console.log("drawline");
        }
        for (var i = 1; i <= numRow; i++) {
            var startX = space, startY = i * space, endX = space * numCol, endY = i * space;
            g.moveTo(startX, startY);
            g.lineTo(endX, endY);
        }
        this.addChild(this._grid);
    };
    Map.prototype.removeGrid = function () {
        var g = this._grid.graphics;
        g.clear();
    };
    /*添加/移除按钮的事件*/
    Map.prototype.addEventToIsland = function () {
        for (var i = 0; i < this._islandLine.length; i++) {
            var island = this._islandLine[i];
            island.touchEnabled = true;
            island.addEventListener(egret.TouchEvent.TOUCH_TAP, this.islandClickHandler, this);
        }
    };
    Map.prototype.removeEventToIsland = function () {
        for (var i = 0; i < this._islandLine.length; i++) {
            var island = this._islandLine[i];
            island.touchEnabled = false;
            island.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.islandClickHandler, this);
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
                            do {
                                bridge.addLink();
                            } while (bridge.linkNum != 0);
                            Alert.show("岛上连接的桥不能超过岛上的数字");
                        }
                        else {
                            bridge.addLink();
                            this.checkComplete();
                        }
                        this._firstSelected = null;
                    }
                    else {
                        Alert.show("两岛之间只能垂直或水平搭桥，且桥不能相交");
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
    /*已知两座岛，查找连接两岛的桥*/
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
    /*创建小岛*/
    Map.prototype.createIslands = function () {
        var rowNum = this._datas.length;
        var space = this._width / (rowNum + 1);
        for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
            var arr = [];
            for (var colIndex = 0, colNum = this._datas[rowIndex].length; colIndex < colNum; colIndex++) {
                var num = this._datas[rowIndex][colIndex];
                if (num != 0) {
                    var island = new Island(num, space / 2);
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
    Map.prototype.addIslands = function () {
        for (var i = 0; i < this._islandLine.length; i++) {
            this.addChild(this._islandLine[i]);
        }
    };
    Map.prototype.removeIslands = function () {
        for (var i = 0; i < this._islandLine.length; i++) {
            if (this.getChildIndex(this._islandLine[i]) != -1) {
                this.removeChild(this._islandLine[i]);
            }
        }
        this._islandLine = [];
        this._islands = [];
    };
    /*创建/移除桥*/
    Map.prototype.createBridges = function () {
        var startIsland = this._islandLine[0];
        this.check(startIsland);
    };
    Map.prototype.addBridges = function () {
        for (var i = 0; i < this._bridgesData.length; i++) {
            this.addChild(this._bridgesData[i]);
        }
    };
    Map.prototype.removeBridges = function () {
        for (var i = 0; i < this._bridgesData.length; i++) {
            if (this.getChildIndex(this._bridgesData[i]) != -1) {
                this.removeChild(this._bridgesData[i]);
            }
        }
        this._bridgesData = [];
    };
    /*判断是否完成*/
    Map.prototype.checkComplete = function () {
        var unCompleteNum = 0;
        var total = this._islandLine.length;
        for (var i = 0; i < total; i++) {
            if (this._islandLine[i].state != Island.COMPLETED) {
                unCompleteNum++;
            }
        }
        if (unCompleteNum != 0) {
            Alert.show("还剩" + unCompleteNum + "个岛未完成，加油！");
        }
        else {
            Alert.show("恭喜完成本关，你真棒!", 6000);
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
            /*起点或终点重合的情况*/
            if (bridge.startIsland == anotherBridge.startIsland || bridge.startIsland == anotherBridge.endIsland ||
                bridge.endIsland == anotherBridge.startIsland || bridge.endIsland == anotherBridge.endIsland) {
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
        if (Math.round(x - a.x) * Math.round(x - b.x) <= 0 && Math.round(y - a.y) * Math.round(y - b.y) <= 0
            && Math.round(x - c.x) * Math.round(x - d.x) <= 0 && Math.round(y - c.y) * Math.round(y - d.y) <= 0) {
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