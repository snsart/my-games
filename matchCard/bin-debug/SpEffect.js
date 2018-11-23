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
var SpEffect = (function (_super) {
    __extends(SpEffect, _super);
    function SpEffect() {
        var _this = _super.call(this) || this;
        _this._effectMcs = [];
        _this._addStages = [];
        _this._vxs = [];
        _this._vys = [];
        _this._gravity = 0.8;
        _this._radius = 400;
        _this._runing = false;
        _this.setEffectMcs();
        return _this;
    }
    SpEffect.prototype.startPlay = function () {
        this._runing = true;
        var _loop_1 = function (i) {
            egret.setTimeout(function () {
                if (this._runing) {
                    this._addStages.push(this._effectMcs[i]);
                    this.addChild(this._effectMcs[i]);
                }
            }, this_1, 50 * i);
        };
        var this_1 = this;
        for (var i = 0; i < 50; i++) {
            _loop_1(i);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    SpEffect.prototype.stop = function () {
        this._runing = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        for (var i = 0; i < this._effectMcs.length; i++) {
            if (this.getChildIndex(this._effectMcs[i]) != -1) {
                this.removeChild(this._effectMcs[i]);
            }
        }
        this._addStages = [];
    };
    SpEffect.prototype.setEffectMcs = function () {
        for (var i = 0; i < 50; i++) {
            var vx = Math.random() * 10 - 5;
            var vy = -Math.random() * 20;
            this._vxs.push(vx);
            this._vys.push(vy);
        }
        for (var i = 0; i < 100; i++) {
            var mc = this.createBitmapByName("tx" + ((i % 4) + 1));
            this._effectMcs.push(mc);
        }
    };
    SpEffect.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    SpEffect.prototype.enterFrameHandler = function () {
        this._addStages.forEach(function (mc, index) {
            mc.rotation += 5;
            mc.alpha -= 0.01;
            mc.x += this._vxs[index];
            this._vys[index] += this._gravity;
            mc.y += this._vys[index];
            if (mc.y > 300) {
                this._vxs[index] = Math.random() * 10 - 5;
                this._vys[index] = -Math.random() * 20;
                mc.x = 0;
                mc.y = 0;
                mc.alpha = 1;
            }
        }, this);
    };
    return SpEffect;
}(egret.Sprite));
__reflect(SpEffect.prototype, "SpEffect");
//# sourceMappingURL=SpEffect.js.map