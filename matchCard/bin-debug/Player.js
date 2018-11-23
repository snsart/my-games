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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this._cardnum = 0;
        _this._headID = 0;
        _this._focus = false;
        _this._bg = new egret.Shape();
        _this._headImgs = [];
        _this._cardPot = new egret.Point;
        _this._frameShape = new egret.Shape();
        _this.createHeadImgs();
        _this.draw();
        return _this;
    }
    Object.defineProperty(Player.prototype, "cardNum", {
        get: function () {
            return this._cardnum;
        },
        set: function (value) {
            this._cardnum = value;
            this._cardNumText.text = String(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "headID", {
        get: function () {
            return this._headID;
        },
        set: function (value) {
            this._headID = value;
            this._headImg = this._headImgs[value];
            for (var i = 0; i < this._headImgs.length; i++) {
                if (this._head.getChildIndex(this._headImgs[i]) != -1) {
                    this._head.removeChild(this._headImgs[i]);
                }
            }
            this._head.addChild(this._headImg);
            this._headImg.mask = this._mask;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "head", {
        get: function () {
            return this._head;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "focus", {
        set: function (value) {
            this._focus = value;
            this.drawFrameShape();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "cardPot", {
        get: function () {
            return this._cardPot;
        },
        enumerable: true,
        configurable: true
    });
    /*-----------------------------------------------------------------------------*/
    Player.prototype.createHeadImgs = function () {
        for (var i = 0; i < 4; i++) {
            var img = this.createBitmapByName("headpic_json#h" + (i + 1));
            img.width = 60;
            img.height = 60;
            img.x = -img.width / 2;
            img.y = -img.height / 2;
            img.mask = this._mask;
            this._headImgs.push(img);
        }
        this._headImg = this._headImgs[this._headID];
    };
    Player.prototype.draw = function () {
        this.addChild(this._frameShape);
        this.drawFrameShape();
        this.addChild(this._bg);
        this.drawbg();
        this.drawfooter();
        this._head = this.createHeadpic();
        this._head.x = 40;
        this._head.y = 235;
        this.addChild(this._head);
        var cardinfo = this.createCardNumInfo();
        cardinfo.x = 90;
        cardinfo.y = 235;
        this.addChild(cardinfo);
    };
    Player.prototype.drawFrameShape = function () {
        this._frameShape.graphics.clear();
        if (this._focus) {
            this._frameShape.graphics.lineStyle(2, 0xffff00);
        }
        this._frameShape.graphics.beginFill(0xffffff, 0);
        this._frameShape.graphics.drawRoundRect(-5, -5, 190, 305, 20, 20);
        this._frameShape.graphics.endFill();
    };
    Player.prototype.drawbg = function () {
        this._bg.graphics.clear();
        this._bg.graphics.beginFill(0xffffff, 0.2);
        this._bg.graphics.drawRoundRect(0, 0, 180, 295, 20, 20);
        this._bg.graphics.endFill();
    };
    Player.prototype.drawfooter = function () {
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x00a1b2);
        mask.graphics.drawRoundRect(0, 190, 180, 105, 20, 20);
        mask.graphics.endFill();
        this.addChild(mask);
        var footer = new egret.Shape();
        footer.graphics.beginFill(0x00a1b2);
        footer.graphics.drawRect(0, 220, 180, 75);
        footer.graphics.endFill();
        footer.mask = mask;
        this.addChild(footer);
    };
    Player.prototype.createHeadpic = function () {
        var sprite = new egret.Sprite();
        var bg = new egret.Shape();
        bg.graphics.lineStyle(4, 0x00a1b2);
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawCircle(0, 0, 30);
        bg.graphics.endFill();
        sprite.addChild(bg);
        this._mask = new egret.Shape();
        this._mask.graphics.beginFill(0x00a1b2);
        this._mask.graphics.drawCircle(0, 0, 28);
        this._mask.graphics.endFill();
        sprite.addChild(this._mask);
        this._headImg.x = -this._headImg.width / 2;
        this._headImg.y = -this._headImg.height / 2;
        this._headImg.mask = this._mask;
        sprite.addChild(this._headImg);
        var txtbg = new egret.Shape();
        txtbg.graphics.lineStyle(1, 0x006e7a);
        txtbg.graphics.beginFill(0x94d1cc);
        txtbg.graphics.drawRoundRect(-this._headImg.width / 2 - 7, 32, this._headImg.width + 15, 25, 20, 20);
        sprite.addChild(txtbg);
        var text = new egret.TextField();
        text.text = "设置头像";
        text.fontFamily = "微软雅黑";
        text.textColor = 0x004850;
        text.size = 15;
        text.x = -this._headImg.width / 2;
        text.y = 36;
        sprite.addChild(text);
        return sprite;
    };
    Player.prototype.createCardNumInfo = function () {
        var info = new egret.Sprite();
        this._cardNumText = new egret.TextField();
        this._cardNumText.text = String(54);
        this._cardNumText.width = 60;
        this._cardNumText.size = 50;
        this._cardNumText.textAlign = "center";
        info.addChild(this._cardNumText);
        var txtUnit = new egret.TextField();
        txtUnit.text = "张";
        txtUnit.size = 20;
        txtUnit.textAlign = "center";
        txtUnit.x = 60;
        txtUnit.y = 20;
        info.addChild(txtUnit);
        return info;
    };
    Player.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Player;
}(egret.Sprite));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map