var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MenuManage = (function () {
    function MenuManage(stage) {
        this._stage = stage;
    }
    MenuManage.getInstance = function (stage) {
        if (this._instance == null) {
            this._instance = new MenuManage(stage);
        }
        return this._instance;
    };
    MenuManage.prototype.open = function (menuName, data) {
        switch (menuName) {
            case "headImgs":
                var headImgs = HeadImgs.getInstance();
                this._stage.addChild(headImgs);
                headImgs.currentPlayer = data;
                headImgs.x = 310;
                headImgs.y = 300;
                break;
            case "intro":
                var intro = Instruction.getInstance();
                this._stage.addChild(intro);
                egret.Tween.get(intro).to({ alpha: 1 }, 200);
                break;
        }
    };
    MenuManage.prototype.close = function (menuName) {
        switch (menuName) {
            case "headImgs":
                this._headImgs = HeadImgs.getInstance();
                if (this._stage.getChildIndex(this._headImgs) != -1) {
                    this._stage.removeChild(this._headImgs);
                }
                break;
        }
    };
    return MenuManage;
}());
__reflect(MenuManage.prototype, "MenuManage");
//# sourceMappingURL=MenuManage.js.map