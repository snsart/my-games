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
        _this.leaveCards = 52;
        _this.dealCards = [];
        _this.selectedCards = [];
        _this.endTarget = new egret.Point();
        _this.faceCards = [];
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
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
        bg.graphics.beginFill(0x284976);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(bg);
        var gamebg = new egret.Shape();
        gamebg.graphics.beginFill(0xffffff, 0.1);
        gamebg.graphics.drawRect(0, 0, 500, 692);
        gamebg.x = 250;
        gamebg.y = 50;
        this.addChild(gamebg);
        this.endTarget.x = 900;
        this.endTarget.y = 50;
        this.createCards();
        this.initCards();
        this.setCardPos();
        this.setdealCards();
        this.deal(16, this.cardsPos);
    };
    Main.prototype.setCardPos = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var point = new egret.Point();
                point.x = 314 + j * 124;
                point.y = 54 + i * 172;
                this.cardsPos.push(point);
            }
        }
    };
    Main.prototype.setdealCards = function () {
        for (var i = 0; i < 16; i++) {
            this.dealCards.push(null);
        }
    };
    Main.prototype.createCards = function () {
        var type = ["a", "b", "c", "d"];
        this.cards = [];
        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 4; j++) {
                var faceId = type[j] + (i + 1);
                var backId = "cards_json#back";
                var card = new Card(faceId, backId);
                card.touchEnabled = true;
                card.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.cardClickHandler, this);
                this.addChild(card);
                this.cards.push(card);
            }
        }
    };
    Main.prototype.cardClickHandler = function (e) {
        var card = e.currentTarget;
        if (!card.isdeal || this.selectedCards.length >= 2) {
            return;
        }
        if (card.isface) {
            return;
        }
        this.selectedCards.push(card);
        card.reverse();
        if (this.selectedCards.length == 2) {
            var firstId = this.selectedCards[0].faceID.slice(1);
            var secondId = this.selectedCards[1].faceID.slice(1);
            if (firstId != secondId) {
                this.wrong();
            }
            else {
                this.right();
            }
        }
    };
    Main.prototype.wrong = function () {
        egret.setTimeout(function () {
            this.selectedCards[0].reverse();
            this.selectedCards[1].reverse();
            this.selectedCards = [];
        }, this, 1000);
    };
    Main.prototype.right = function () {
        egret.setTimeout(function () {
            var card1 = this.selectedCards[0];
            var card2 = this.selectedCards[1];
            this.endTarget.y += 10;
            egret.Tween.get(card1).to({ x: this.endTarget.x, y: this.endTarget.y }, 200);
            egret.Tween.get(card2).to({ x: this.endTarget.x, y: this.endTarget.y }, 200);
            var nullPot1 = this.cardsPos[this.dealCards.indexOf(card1)];
            var nullPot2 = this.cardsPos[this.dealCards.indexOf(card2)];
            this.faceCards.push(card1);
            this.faceCards.push(card2);
            this.setChildIndex(card1, this.faceCards.length + 54);
            this.setChildIndex(card2, this.faceCards.length + 55);
            egret.setTimeout(function () {
                if (this.leaveCards > 0) {
                    this.deal(2, [nullPot1, nullPot2]);
                }
                this.selectedCards = [];
            }, this, 200);
        }, this, 1000);
    };
    Main.prototype.initCards = function () {
        this.shuffer(this.cards);
        for (var i = 0; i < this.cards.length; i++) {
            this.addChild(this.cards[i]);
            this.cards[i].x = 125;
            this.cards[i].y = 50 + i * 5;
            this.setChildIndex(this.cards[i], i + 10);
        }
    };
    Main.prototype.shuffer = function (arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var currentRandom = Math.floor(Math.random() * len);
            var current = arr[i];
            arr[i] = arr[currentRandom];
            arr[currentRandom] = current;
        }
    };
    Main.prototype.deal = function (cardNums, cardsPos) {
        var _loop_1 = function (i, j) {
            egret.setTimeout(function () {
                var card = this.cards[i];
                var potIndex = this.cardsPos.indexOf(cardsPos[j]);
                this.setChildIndex(card, i + 10 + 54);
                egret.Tween.get(card).to({ x: cardsPos[j].x, y: cardsPos[j].y }, 100).call(function () {
                    card.isdeal = true;
                    this.dealCards[potIndex] = card;
                    this.setChildIndex(card, i + 10);
                }, this);
            }, this_1, 110 * j);
        };
        var this_1 = this;
        for (var i = this.leaveCards - 1, j = 0; i >= this.leaveCards - cardNums; i--, j++) {
            _loop_1(i, j);
        }
        egret.setTimeout(function () {
            this.leaveCards -= cardNums;
        }, this, cardNums * 110 + 10);
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