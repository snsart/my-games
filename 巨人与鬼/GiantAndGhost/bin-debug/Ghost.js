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
var Ghost = (function (_super) {
    __extends(Ghost, _super);
    function Ghost() {
        var _this = _super.call(this) || this;
        _this.type = Role.GHOSR_TYPE;
        _this.draw();
        _this.live();
        return _this;
    }
    Ghost.prototype.die = function () {
        this._rolelive.visible = false;
        this._roledeath.visible = true;
    };
    Ghost.prototype.live = function () {
        this._rolelive.visible = true;
        this._roledeath.visible = false;
    };
    Ghost.prototype.draw = function () {
        this._rolelive = this.createBitmapByName("ghost_png");
        var rolelive = this._rolelive;
        rolelive.width = 70;
        rolelive.height = 70;
        rolelive.anchorOffsetX = rolelive.width / 2;
        rolelive.anchorOffsetY = rolelive.height / 2;
        this.addChild(rolelive);
        this._roledeath = this.createBitmapByName("death_png");
        var roledeath = this._roledeath;
        roledeath.width = 70;
        roledeath.height = 70;
        roledeath.anchorOffsetX = roledeath.width / 2;
        roledeath.anchorOffsetY = roledeath.height / 2;
        this.addChild(roledeath);
    };
    Ghost.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Ghost;
}(Role));
__reflect(Ghost.prototype, "Ghost");
//# sourceMappingURL=Ghost.js.map