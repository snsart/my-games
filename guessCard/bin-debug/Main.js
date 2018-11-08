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
        _this.cards = [];
        _this.cardsPos = [];
        _this.cardsInitPos = [];
        _this.isdeal = false;
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
        this.setCards();
        this.setCardsPos();
        this.setCardsInitPos();
        for (var i = 0; i < 15; i++) {
            var card = this.cards[i];
            card.x = this.cardsInitPos[i].x;
            card.y = this.cardsInitPos[i].y;
            this.addChild(card);
        }
        var dealBtn = this.createBitmapByName("button#deal");
        this.addChild(dealBtn);
        dealBtn.touchEnabled = true;
        dealBtn.x = this.stage.stageWidth / 2 + 130;
        dealBtn.y = this.stage.stageHeight - 80;
        dealBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dealHandler, this);
        var acceptBtn = this.createBitmapByName("button#accept");
        this.addChild(acceptBtn);
        acceptBtn.touchEnabled = true;
        acceptBtn.x = this.stage.stageWidth / 2 + 310;
        acceptBtn.y = this.stage.stageHeight - 80;
        acceptBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.acceptHandler, this);
        this.selectUI = new SelectListUI();
        this.addChild(this.selectUI);
        this.selectUI.x = 330;
        this.selectUI.y = 600;
        this.tips = new egret.TextField();
        this.tips.x = 50;
        this.tips.y = 680;
        this.tips.textColor = 0xffff00;
        this.tips.size = 40;
        this.addChild(this.tips);
    };
    Main.prototype.dealHandler = function (e) {
        this.moveCard(this.cards[14]);
        this.selectUI.init();
        this.isdeal = true;
    };
    Main.prototype.moveCard = function (card) {
        var index = this.cards.indexOf(card);
        var target = this.cardsPos[index];
        egret.Tween.get(card).to({ x: target.x, y: target.y }, 100).call(function (index, card) {
            this.setChildIndex(card, 15 - index);
            if (index < 1) {
                return;
            }
            this.moveCard(this.cards[index - 1]);
        }, this, [index, card]);
    };
    Main.prototype.acceptHandler = function (e) {
        if (!this.isdeal) {
            this.showTips("请先发牌！");
            return;
        }
        var sort;
        switch (this.selectUI.selectId) {
            case 0:
                this.showTips("提示：请选择你的牌所在的列！");
                return;
            case 1:
                sort = [13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 12, 9, 6, 3, 0];
                break;
            case 2:
                sort = [14, 11, 8, 5, 2, 13, 10, 7, 4, 1, 12, 9, 6, 3, 0];
                break;
            case 3:
                sort = [14, 11, 8, 5, 2, 12, 9, 6, 3, 0, 13, 10, 7, 4, 1];
                break;
        }
        var cards = [];
        for (var i = 0; i < 15; i++) {
            var card = this.cards[sort[i]];
            this.setChildIndex(card, i);
            cards.push(card);
        }
        this.cards = cards;
        var _loop_1 = function (i) {
            var target = this_1.cardsInitPos[i];
            egret.setTimeout(function () {
                this.setChildIndex(this.cards[i], i + 15);
                egret.Tween.get(this.cards[i]).to({ x: target.x, y: target.y }, 250).call(function () {
                    this.setChildIndex(this.cards[i], i);
                }, this);
            }, this_1, Math.floor(i / 5) * 300);
        };
        var this_1 = this;
        for (var i = 0; i < 15; i++) {
            _loop_1(i);
        }
        this.selectUI.init();
        this.isdeal = false;
    };
    Main.prototype.setCardsPos = function () {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                this.cardsPos.push(new egret.Point(750 - j * 250, 330 - i * 70));
            }
        }
    };
    Main.prototype.setCardsInitPos = function () {
        for (var i = 0; i < 15; i++) {
            this.cardsInitPos.push(new egret.Point(55, 30 + i * 5));
        }
    };
    Main.prototype.setCards = function () {
        var names = [];
        var types = ["a", "b", "c", "d"];
        while (this.cards.length < 15) {
            var type = types[Math.floor(Math.random() * 4)];
            var num = Math.ceil(Math.random() * 13);
            var name_1 = type + num;
            if (names.indexOf(name_1) != -1) {
                continue;
            }
            names.push(name_1);
            var card = this.createBitmapByName("cards#" + name_1);
            this.cards.push(card);
        }
    };
    Main.prototype.showTips = function (text) {
        this.tips.text = text;
        egret.setTimeout(function () {
            this.tips.text = "";
        }, this, 2000);
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