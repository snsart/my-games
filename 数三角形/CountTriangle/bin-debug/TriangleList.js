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
var TriangleList = (function (_super) {
    __extends(TriangleList, _super);
    function TriangleList(width, height, canvas) {
        var _this = _super.call(this) || this;
        _this._width = width;
        _this._height = height;
        _this._canvas = canvas;
        _this.createBackground();
        _this.createHeader();
        _this.createList();
        return _this;
    }
    Object.defineProperty(TriangleList.prototype, "list", {
        set: function (datas) {
            this._list.dataProvider = new eui.ArrayCollection(datas);
        },
        enumerable: true,
        configurable: true
    });
    TriangleList.prototype.createBackground = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.beginFill(0xffffff);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(bg);
    };
    TriangleList.prototype.createHeader = function () {
        var header = new egret.TextField();
        header.text = "三角形";
        header.fontFamily = "微软雅黑";
        header.textColor = 0x333333;
        header.width = this._width;
        header.textAlign = egret.HorizontalAlign.CENTER;
        header.verticalAlign = egret.VerticalAlign.MIDDLE;
        header.size = 25;
        header.height = 50;
        this.addChild(header);
    };
    TriangleList.prototype.createList = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.beginFill(0xeeeeee);
        g.lineStyle(1, 0xcccccc);
        g.drawRect(10, 50, this._width - 20, this._height - 70);
        this.addChild(bg);
        this._list = new eui.List();
        this._list.width = this._width;
        this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
        var scroller = new eui.Scroller();
        scroller.width = this._width - 20;
        scroller.height = this._height - 70;
        scroller.x = 10;
        scroller.y = 50;
        scroller.viewport = this._list;
        this.addChild(scroller);
    };
    TriangleList.prototype.onChange = function (e) {
        console.log(this._list.selectedItem, this._list.selectedIndex);
        this._canvas.showTriangleByIndex(this._list.selectedIndex);
    };
    return TriangleList;
}(eui.Group));
__reflect(TriangleList.prototype, "TriangleList");
//# sourceMappingURL=TriangleList.js.map