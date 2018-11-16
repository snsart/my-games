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
        _this._focus = false;
        _this._bg = new egret.Shape();
        _this.headImg = _this.createBitmapByName("headpic_json#h1");
        _this._headImg.width = 60;
        _this._headImg.height = 60;
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
    Object.defineProperty(Player.prototype, "headImg", {
        set: function (value) {
            this._headImg = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "focus", {
        set: function (value) {
            this._focus = value;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.draw = function () {
        this.addChild(this._bg);
        this.drawbg();
        this.drawfooter();
        var head = this.createHeadpic();
        head.x = 40;
        head.y = 235;
        this.addChild(head);
        var cardinfo = this.createCardNumInfo();
        cardinfo.x = 90;
        cardinfo.y = 235;
        this.addChild(cardinfo);
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
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x00a1b2);
        mask.graphics.drawCircle(0, 0, 28);
        mask.graphics.endFill();
        sprite.addChild(mask);
        this._headImg.x = -this._headImg.width / 2;
        this._headImg.y = -this._headImg.height / 2;
        this._headImg.mask = mask;
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
        this._cardNumText.size = 50;
        this._cardNumText.textAlign = "center";
        info.addChild(this._cardNumText);
        this._cardNumText = new egret.TextField();
        this._cardNumText.text = "张";
        this._cardNumText.size = 20;
        this._cardNumText.textAlign = "center";
        this._cardNumText.x = 60;
        this._cardNumText.y = 20;
        info.addChild(this._cardNumText);
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