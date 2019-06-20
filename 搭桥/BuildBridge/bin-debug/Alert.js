var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Alert = (function () {
    function Alert() {
    }
    Alert.show = function (info, time) {
        if (time === void 0) { time = 3000; }
        Alert.addLabel(info);
        var handler;
        egret.clearTimeout(Alert._timeHandler);
        Alert._timeHandler = egret.setTimeout(function () {
            Alert.removeLabel();
        }, null, time);
    };
    Alert.addLabel = function (info) {
        Alert._label.textColor = 0xff0000;
        Alert._label.text = info;
        Alert._label.size = 30;
        Alert._label.x = 20;
        Alert._label.y = 30;
        Alert._label.bold = true;
        Alert._label.fontFamily = "微软雅黑";
        Alert.stage.addChild(Alert._label);
        console.log(Alert._label);
        console.log(Alert.stage);
    };
    Alert.removeLabel = function () {
        if (Alert.stage.getChildIndex(Alert._label) != -1) {
            Alert.stage.removeChild(Alert._label);
        }
    };
    Alert._label = new egret.TextField();
    Alert._timeHandler = null;
    return Alert;
}());
__reflect(Alert.prototype, "Alert");
//# sourceMappingURL=Alert.js.map