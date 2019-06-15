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
        ObjectDecorator.currentObj = new ActDisplayObject(obj);
        ObjectDecorator.objs.push(ObjectDecorator.currentObj);
        return ObjectDecorator;
    };
    ObjectDecorator.addDragAction = function (stage, rect, center) {
        if (rect === void 0) { rect = null; }
        if (center === void 0) { center = false; }
        ObjectDecorator.currentObj.obj.touchEnabled = true;
        ObjectDecorator.stage = stage;
        ObjectDecorator.currentObj.obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ObjectDecorator.touchBeginHandler, this);
        //stage只注册一次移动事件
        if (!stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
            stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, ObjectDecorator.stageTouchMoveHandler, this);
        }
        return ObjectDecorator;
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
    /*鼠标在添加了拖动行为的物体上按下时*/
    ObjectDecorator.touchBeginHandler = function (e) {
        var obj = e.currentTarget;
        ObjectDecorator.currentObj = ObjectDecorator.objs.filter(function (item, index, array) { if (item.obj == obj) {
            return true;
        } })[0];
        if (ObjectDecorator.currentObj.mousedown instanceof Function) {
            ObjectDecorator.currentObj.mousedown();
        }
        ObjectDecorator.stage.addEventListener(egret.TouchEvent.TOUCH_END, ObjectDecorator.stageTouchEndHandler, this);
    };
    ObjectDecorator.stageTouchMoveHandler = function (e) {
        if (ObjectDecorator.currentObj == null) {
            return;
        }
        ObjectDecorator.currentObj.obj.x = e.stageX;
        ObjectDecorator.currentObj.obj.y = e.stageY;
        if (ObjectDecorator.currentObj.mousemove instanceof Function) {
            ObjectDecorator.currentObj.mousemove();
        }
    };
    ObjectDecorator.stageTouchEndHandler = function (e) {
        ObjectDecorator.stage.removeEventListener(egret.TouchEvent.TOUCH_END, ObjectDecorator.stageTouchEndHandler, this);
        if (ObjectDecorator.currentObj.mouseup instanceof Function) {
            ObjectDecorator.currentObj.mouseup();
        }
        ObjectDecorator.currentObj = null;
    };
    ObjectDecorator.touchDown = false;
    ObjectDecorator.touchEnd = false;
    ObjectDecorator.touchMove = false;
    ObjectDecorator.objs = [];
    return ObjectDecorator;
}(egret.DisplayObject));
__reflect(ObjectDecorator.prototype, "ObjectDecorator");
//# sourceMappingURL=ObjectDecorator.js.map