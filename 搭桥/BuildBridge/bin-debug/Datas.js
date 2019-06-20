var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Datas = (function () {
    function Datas() {
    }
    Datas.currentLevelData = function () {
        return Datas.datas[Datas.currentLevel];
    };
    Datas.newLevel = function () {
        if (Datas.hasNextLevel()) {
            Datas.currentLevel++;
            return Datas.datas[Datas.currentLevel];
        }
        else {
            return null;
        }
    };
    Datas.preLevel = function () {
        if (Datas.hasPreLevel()) {
            Datas.currentLevel--;
            return Datas.datas[Datas.currentLevel];
        }
        else {
            return null;
        }
    };
    Datas.hasNextLevel = function () {
        return Datas.currentLevel < Datas.datas.length - 1;
    };
    Datas.hasPreLevel = function () {
        return Datas.currentLevel > 0;
    };
    Datas.datas = [
        [
            [0, 4, 0, 0, 5, 0, 3],
            [2, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 2, 0, 0, 0],
            [3, 0, 0, 0, 4, 0, 2],
        ], [
            [2, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 5, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [6, 0, 0, 8, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0],
            [3, 0, 0, 5, 0, 0, 4],
        ],
        [
            [0, 4, 0, 0, 5, 0, 3],
            [2, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 2, 0, 0, 0],
            [3, 0, 0, 0, 4, 0, 2],
        ], [
            [3, 0, 0, 2, 0, 2, 0, 0, 1, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0, 3],
            [0, 0, 1, 0, 5, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 5, 0, 0, 0, 3, 0],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 0, 3, 0, 0, 0, 0, 0, 2, 0],
            [0, 2, 0, 0, 0, 0, 0, 4, 0, 3],
            [3, 0, 0, 3, 0, 0, 2, 0, 0, 0],
        ]
    ];
    Datas.currentLevel = 0;
    return Datas;
}());
__reflect(Datas.prototype, "Datas");
//# sourceMappingURL=Datas.js.map