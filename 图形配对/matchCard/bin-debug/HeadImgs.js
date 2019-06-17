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
var HeadImgs = (function (_super) {
    __extends(HeadImgs, _super);
    function HeadImgs() {
        var _this = _super.call(this) || this;
        _this._selected = [];
        _this._headMcs = [];
        _this.draw();
        _this.fillHeadImgs();
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            this.setState();
        }, _this);
        return _this;
    }
    HeadImgs.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeadImgs();
        }
        return this._instance;
    };
    HeadImgs.prototype.init = function () {
        this._currenthead = null;
        this._selected = [this._headMcs[0], this._headMcs[1]];
        this.setState();
    };
    Object.defineProperty(HeadImgs.prototype, "currentPlayer", {
        set: function (value) {
            this._currentPlayer = value;
            this._currentheadID = value.headID;
            this._currenthead = this._headMcs[this._currentheadID];
            this.setState();
        },
        enumerable: true,
        configurable: true
    });
    HeadImgs.prototype.close = function () {
        this._selected.push(this._currenthead);
        this.parent.removeChild(this);
    };
    /*----------------------------------------------------------------------------------------------------------------*/
    HeadImgs.prototype.draw = function () {
        var shadow = new egret.Shape();
        shadow.graphics.beginFill(0x000000, 0.6);
        shadow.graphics.drawRect(10, 10, 400, 200);
        this.addChild(shadow);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, 400, 200);
        this.addChild(bg);
        var head = new egret.Shape();
        head.graphics.beginFill(0x00a1b2);
        head.graphics.drawRect(0, 0, 400, 40);
        this.addChild(head);
        var title = new egret.TextField();
        title.text = "请选择你喜欢的头像";
        title.textColor = 0xffffff;
        title.fontFamily = "微软雅黑";
        title.size = 20;
        title.x = 20;
        title.y = 10;
        this.addChild(title);
        var button = new Button();
        this.addChild(button);
        button.x = 300;
        button.y = 160;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this._selected.push(this._currenthead);
            this.close();
        }, this);
    };
    HeadImgs.prototype.fillHeadImgs = function () {
        for (var i = 0; i < 4; i++) {
            var img = this.createBitmapByName("headpic_json#h" + (i + 1));
            var headMc = new HeadMc(img);
            this._headMcs.push(headMc);
            headMc.x = 20 + 90 * i;
            headMc.y = 60;
            headMc.headID = i;
            this.addChild(headMc);
            headMc.touchEnabled = true;
            headMc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                var clickHead = e.currentTarget;
                if (this._selected.indexOf(clickHead) != -1) {
                    return;
                }
                this._currentPlayer.headID = clickHead.headID;
                this._currenthead = clickHead;
                this.setState();
            }, this);
        }
    };
    HeadImgs.prototype.setState = function () {
        for (var j = 0; j < this._headMcs.length; j++) {
            this._headMcs[j].state = "nomal";
        }
        if (this._selected.length > 0) {
            for (var i = 0; i < this._selected.length; i++) {
                if (this._currenthead != null && this._selected[i].headImg == this._currenthead.headImg) {
                    this._selected.splice(i, 1);
                }
            }
            for (var j = 0; j < this._selected.length; j++) {
                this._selected[j].state = "selected";
            }
        }
        if (this._currenthead != null) {
            this._currenthead.state = "current";
        }
    };
    HeadImgs.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return HeadImgs;
}(egret.Sprite));
__reflect(HeadImgs.prototype, "HeadImgs");
//# sourceMappingURL=HeadImgs.js.map