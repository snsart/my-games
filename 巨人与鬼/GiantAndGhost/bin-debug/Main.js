//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.mates = []; //存储巨人-鬼对
        _this.roles = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(bg);
        this.lineShape = new egret.Shape();
        this.addChild(this.lineShape);
        this.createRoles(30);
        this.drawLines();
    };
    Main.prototype.createRoles = function (num) {
        for (var i = 0; i < num; i++) {
            var ghost = new Ghost();
            ghost.x = Math.random() * this.stage.stageWidth;
            ghost.y = Math.random() * this.stage.stageHeight;
            ObjectDecorator.get(ghost).addDragAction(this.stage).moveHandler(this.drawLines.bind(this));
            ;
            this.addChild(ghost);
            var giant = new Giant();
            giant.x = Math.random() * this.stage.stageWidth;
            giant.y = Math.random() * this.stage.stageHeight;
            ObjectDecorator.get(giant).addDragAction(this.stage).moveHandler(this.drawLines.bind(this));
            this.addChild(giant);
            this.roles.push(ghost, giant);
        }
    };
    Main.prototype.drawLines = function () {
        this.lineShape.graphics.clear();
        this.lineShape.graphics.lineStyle(2, 0xff0000);
        //shape.graphics.beginFill(fillColor);
        var mates = this.mates = [];
        this.getmates(this.roles);
        for (var i = 0; i < mates.length; i++) {
            this.lineShape.graphics.moveTo(mates[i][0].x, mates[i][0].y);
            this.lineShape.graphics.lineTo(mates[i][1].x, mates[i][1].y);
        }
    };
    //求巨人-鬼对
    Main.prototype.getmates = function (points) {
        if (points.length == 0) {
            return;
        }
        var mates = this.mates;
        var startPoint = this.startPoint = this.getStartPoint(points);
        var lefts = [];
        var rights = [];
        var m = 0, n = 0; //lefts中巨人和小鬼的数量
        console.log("heheheh");
        points.sort(this.compare.bind(this));
        console.log("hahahah");
        for (var i = 1; i < points.length; i++) {
            if (points[i].type == startPoint.type) {
                lefts.push(points[i]);
                m++;
            }
            else if (points[i].type != startPoint.type && m != n) {
                lefts.push(points[i]);
                n++;
            }
            else {
                mates.push([startPoint, points[i]]);
                this.getmates(lefts);
                for (var j = i + 1; j < points.length; j++) {
                    rights.push(points[j]);
                }
                this.getmates(rights);
                break;
            }
        }
    };
    //各点按极坐标的角度排序,若极坐标一样按x坐标排序,若x坐标一样按y排序；
    Main.prototype.compare = function (value1, value2) {
        console.log(this.getPolarAngle);
        var value1Angle = this.getPolarAngle(this.startPoint, value1);
        var value2Angle = this.getPolarAngle(this.startPoint, value2);
        console.log(value1Angle);
        if (value1Angle < value2Angle) {
            return -1;
        }
        else if (value1Angle > value2Angle) {
            return 1;
        }
        else {
            if (value1.x < value2.x) {
                return -1;
            }
            else if (value1.x > value2.x) {
                return 1;
            }
            else {
                if (value1.y < value2.y) {
                    return 1;
                }
                else if (value1.y > value2.y) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }
    };
    //选出y轴最小的点startPoint
    Main.prototype.getStartPoint = function (points) {
        var startPoint = points[0];
        for (var i = 1; i < points.length; i++) {
            if (points[i].y < startPoint.y) {
                startPoint = points[i];
            }
            else if (points[i].y == startPoint.y) {
                if (points[i].x < startPoint.x) {
                    startPoint = points[i];
                }
            }
        }
        return startPoint;
    };
    //得到向量极坐标的角度，p1和p2为向量的起点和终点
    Main.prototype.getPolarAngle = function (p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map