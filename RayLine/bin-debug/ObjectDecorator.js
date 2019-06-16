/*
*
*/
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
var ObjectDecorator = (function (_super) {
    __extends(ObjectDecorator, _super);
    function ObjectDecorator() {
        return _super.call(this) || this;
    }
    ObjectDecorator.get = function (obj) {
        ObjectDecorator.currentObj = ObjectDecorator.objs.filter(function (item, index, array) { if (item.obj == obj) {
            return true;
        } })[0];
        if (!ObjectDecorator.currentObj) {
            ObjectDecorator.currentObj = new DragDisplayObject(obj);
            ObjectDecorator.objs.push(ObjectDecorator.currentObj);
        }
        return ObjectDecorator;
    };
    ObjectDecorator.addDragAction = function (stage, rect, center) {
        if (rect === void 0) { rect = null; }
        if (center === void 0) { center = false; }
        ObjectDecorator.currentObj.obj.touchEnabled = true;
        ObjectDecorator.currentObj.range = rect;
        ObjectDecorator.currentObj.center = center;
        //添加拖动事件相关侦听器
        ObjectDecorator.currentObj.obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ObjectDecorator.dragBeginHandler, this);
        //stage只注册一次移动事件
        ObjectDecorator.stage = stage;
        return ObjectDecorator;
    };
    /*添加旋转行为
    *@handle:旋转控制杆
    *@distance:控制杆距离物体注册中心的距离
    *@angle:控制杆初始角度
    */
    ObjectDecorator.addRotateAction = function (stage, handle, distance, angle) {
        if (distance === void 0) { distance = 20; }
        if (angle === void 0) { angle = 0; }
        ObjectDecorator.currentObj.handle = handle;
        ObjectDecorator.currentObj.distance = distance;
        ObjectDecorator.currentObj.angle = angle;
        ObjectDecorator.updateRotateHandlePosition();
        handle.touchEnabled = true;
        ObjectDecorator.currentObj.handle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ObjectDecorator.rotateBeginHandler, this);
    };
    ObjectDecorator.upHandler = function (call) {
        ObjectDecorator.currentObj.mouseup = call;
        return ObjectDecorator;
    };
    ObjectDecorator.moveHandler = function (call) {
        ObjectDecorator.currentObj.mousemove = call;
        return ObjectDecorator;
    };
    ObjectDecorator.downHandler = function (call) {
        ObjectDecorator.currentObj.mousedown = call;
        return ObjectDecorator;
    };
    /***********************************************************private************************************************************/
    /*开始拖动时*/
    ObjectDecorator.dragBeginHandler = function (e) {
        var obj = e.currentTarget;
        ObjectDecorator.currentObj = ObjectDecorator.objs.filter(function (item, index, array) { if (item.obj == obj) {
            return true;
        } })[0];
        ObjectDecorator.isDraging = true;
        if (ObjectDecorator.currentObj.center) {
            ObjectDecorator.offsetX = 0;
            ObjectDecorator.offsetY = 0;
        }
        else {
            ObjectDecorator.offsetX = e.stageX - obj.x;
            ObjectDecorator.offsetY = e.stageY - obj.y;
        }
        if (!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
            ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, ObjectDecorator.stageTouchMoveHandler, this);
        }
        if (!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_END, ObjectDecorator.stageTouchEndHandler, this);
        }
        /*执行回调函数*/
        if (ObjectDecorator.currentObj.mousedown instanceof Function) {
            ObjectDecorator.currentObj.mousedown();
        }
    };
    /*开始旋转时*/
    ObjectDecorator.rotateBeginHandler = function (e) {
        var handle = e.currentTarget;
        ObjectDecorator.currentObj = ObjectDecorator.objs.filter(function (item, index, array) { if (item.handle == handle) {
            return true;
        } })[0];
        ObjectDecorator.isRotating = true;
        if (!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
            ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, ObjectDecorator.stageTouchMoveHandler, this);
        }
        if (!ObjectDecorator.stage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_END, ObjectDecorator.stageTouchEndHandler, this);
        }
        /*执行回调函数*/
        if (ObjectDecorator.currentObj.mousedown instanceof Function) {
            ObjectDecorator.currentObj.mousedown();
        }
    };
    ObjectDecorator.stageTouchMoveHandler = function (e) {
        if (ObjectDecorator.currentObj == null) {
            return;
        }
        if (ObjectDecorator.isDraging) {
            var dragX = e.stageX - ObjectDecorator.offsetX, dragY = e.stageY - ObjectDecorator.offsetY;
            var range = ObjectDecorator.currentObj.range;
            if (range instanceof egret.Rectangle) {
                dragX = Math.min(Math.max(dragX, range.x), range.x + range.width);
                dragY = Math.min(Math.max(dragY, range.y), range.y + range.height);
            }
            ObjectDecorator.currentObj.obj.x = dragX;
            ObjectDecorator.currentObj.obj.y = dragY;
            ObjectDecorator.updateRotateHandlePosition();
        }
        if (ObjectDecorator.isRotating) {
            ObjectDecorator.currentObj.handle.x = e.stageX;
            ObjectDecorator.currentObj.handle.y = e.stageY;
            var dx = e.stageX - ObjectDecorator.currentObj.obj.x;
            var dy = e.stageY - ObjectDecorator.currentObj.obj.y;
            var rotation = Math.atan2(dy, dx) * 180 / Math.PI;
            ObjectDecorator.currentObj.obj.rotation = rotation - ObjectDecorator.currentObj.angle;
        }
        /*执行回调函数*/
        if (ObjectDecorator.currentObj.mousemove instanceof Function) {
            ObjectDecorator.currentObj.mousemove();
        }
    };
    ObjectDecorator.stageTouchEndHandler = function (e) {
        /*执行回调函数*/
        if (ObjectDecorator.currentObj.mouseup instanceof Function) {
            ObjectDecorator.currentObj.mouseup();
        }
        ObjectDecorator.updateRotateHandlePosition();
        ObjectDecorator.isRotating = false;
        ObjectDecorator.isDraging = false;
        ObjectDecorator.currentObj = null;
        ObjectDecorator.stage.removeEventListener(egret.TouchEvent.TOUCH_END, ObjectDecorator.stageTouchEndHandler, this);
        ObjectDecorator.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, ObjectDecorator.stageTouchMoveHandler, this);
    };
    ObjectDecorator.updateRotateHandlePosition = function () {
        console.log(ObjectDecorator.currentObj);
        if (ObjectDecorator.currentObj.handle != null) {
            var distance = ObjectDecorator.currentObj.distance;
            var rotation = ObjectDecorator.currentObj.angle + ObjectDecorator.currentObj.obj.rotation;
            var angle = rotation * Math.PI / 180;
            var dx = Math.cos(angle) * distance, dy = Math.sin(angle) * distance;
            ObjectDecorator.currentObj.handle.x = ObjectDecorator.currentObj.obj.x + dx;
            ObjectDecorator.currentObj.handle.y = ObjectDecorator.currentObj.obj.y + dy;
        }
    };
    ObjectDecorator.objs = [];
    ObjectDecorator.isRotating = false;
    ObjectDecorator.isDraging = false;
    return ObjectDecorator;
}(egret.DisplayObject));
__reflect(ObjectDecorator.prototype, "ObjectDecorator");
//# sourceMappingURL=ObjectDecorator.js.map