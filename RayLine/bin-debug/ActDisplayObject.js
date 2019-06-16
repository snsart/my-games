var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
可拖动对象行为配置；
*/
var DragDisplayObject = (function () {
    function DragDisplayObject(obj, mouseup, mousedown, mousemove) {
        if (mouseup === void 0) { mouseup = null; }
        if (mousedown === void 0) { mousedown = null; }
        if (mousemove === void 0) { mousemove = null; }
        //拖动行为配置
        this.center = true; //拖动时鼠标位置是否居中
        this.range = null; //拖动范围
        //旋转配置
        this.handle = null; //控制杆
        this.distance = 50; //控制杆离物体的距离
        this.angle = 0; //控制杆的偏移角度
        this.obj = obj;
        this.mouseup = mouseup;
        this.mousedown = mousedown;
        this.mousemove = mousemove;
    }
    return DragDisplayObject;
}());
__reflect(DragDisplayObject.prototype, "DragDisplayObject");
//# sourceMappingURL=ActDisplayObject.js.map