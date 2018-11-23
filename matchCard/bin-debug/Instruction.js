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
var Instruction = (function (_super) {
    __extends(Instruction, _super);
    function Instruction() {
        var _this = _super.call(this) || this;
        _this.draw();
        return _this;
    }
    Instruction.getInstance = function () {
        if (this._instance == null) {
            this._instance = new Instruction();
        }
        return this._instance;
    };
    Instruction.prototype.draw = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 1);
        bg.graphics.drawRect(0, 0, 1024, 768);
        this.addChild(bg);
        var intro = this.createBitmapByName("intro");
        intro.x = 0;
        intro.y = 150;
        this.addChild(intro);
        var introBtn = this.createBitmapByName("introCloseBtn");
        introBtn.x = 800;
        introBtn.y = 460;
        this.addChild(introBtn);
        introBtn.touchEnabled = true;
        introBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.close();
        }, this);
    };
    Instruction.prototype.close = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 200).call(function () {
            if (this.parent.getChildIndex(this) != -1) {
                this.parent.removeChild(this);
            }
        });
    };
    Instruction.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Instruction;
}(egret.Sprite));
__reflect(Instruction.prototype, "Instruction");
//# sourceMappingURL=Instruction.js.map