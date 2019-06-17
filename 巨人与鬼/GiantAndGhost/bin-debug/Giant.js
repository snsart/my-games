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
var Giant = (function (_super) {
    __extends(Giant, _super);
    function Giant() {
        var _this = _super.call(this) || this;
        _this.type = Role.GIANT_TYPE;
        _this.draw();
        return _this;
    }
    Giant.prototype.draw = function () {
        var role = this.createBitmapByName("giant_png");
        role.width = 70;
        role.height = 70;
        role.anchorOffsetX = role.width / 2;
        role.anchorOffsetY = role.height / 2;
        this.addChild(role);
    };
    Giant.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Giant;
}(Role));
__reflect(Giant.prototype, "Giant");
//# sourceMappingURL=Giant.js.map