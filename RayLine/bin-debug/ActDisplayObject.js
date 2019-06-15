var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActDisplayObject = (function () {
    function ActDisplayObject(obj, mouseup, mousedown, mousemove) {
        if (mouseup === void 0) { mouseup = null; }
        if (mousedown === void 0) { mousedown = null; }
        if (mousemove === void 0) { mousemove = null; }
        this._obj = obj;
        this._mouseup = mouseup;
        this._mousedown = mousedown;
        this._mousemove = mousemove;
    }
    Object.defineProperty(ActDisplayObject.prototype, "obj", {
        get: function () {
            return this._obj;
        },
        set: function (value) {
            this._obj = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActDisplayObject.prototype, "mouseup", {
        get: function () {
            return this._mouseup;
        },
        set: function (value) {
            this._mouseup = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActDisplayObject.prototype, "mousedown", {
        get: function () {
            return this._mousedown;
        },
        set: function (value) {
            this._mousedown = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActDisplayObject.prototype, "mousemove", {
        get: function () {
            return this._mousemove;
        },
        set: function (value) {
            this._mousemove = value;
        },
        enumerable: true,
        configurable: true
    });
    return ActDisplayObject;
}());
__reflect(ActDisplayObject.prototype, "ActDisplayObject");
//# sourceMappingURL=ActDisplayObject.js.map