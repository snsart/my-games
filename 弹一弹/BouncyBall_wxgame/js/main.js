var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
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
var InfoUI = (function (_super) {
    __extends(InfoUI, _super);
    function InfoUI() {
        var _this = _super.call(this) || this;
        _this._score = 0;
        _this.create();
        return _this;
    }
    Object.defineProperty(InfoUI.prototype, "value", {
        get: function () {
            return this._score;
        },
        set: function (_score) {
            this._score = _score;
            this._inputTxt.text = String(this._score);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoUI.prototype, "label", {
        set: function (_label) {
            this._label.text = _label;
        },
        enumerable: true,
        configurable: true
    });
    InfoUI.prototype.create = function () {
        this._label = new egret.TextField();
        this._label.textColor = 0xffff00;
        this._label.text = "score:";
        this._label.width = 100;
        this._label.height = 30;
        this.addChild(this._label);
        this._inputTxt = new egret.TextField();
        this._inputTxt.textColor = 0xffff00;
        this._inputTxt.x = 110;
        this._inputTxt.text = String(this._score);
        this.addChild(this._inputTxt);
    };
    return InfoUI;
}(egret.Sprite));
__reflect(InfoUI.prototype, "InfoUI");
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
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var Bat = (function (_super) {
    __extends(Bat, _super);
    function Bat(stage) {
        var _this = _super.call(this) || this;
        _this._batWidth = 150;
        _this._world = World.getInstance();
        _this._stage = stage;
        _this._bat = new egret.Sprite();
        _this._force = [0, -300];
        _this._lastPosition = 0;
        _this.createBat();
        _this.addEvent();
        return _this;
    }
    Object.defineProperty(Bat.prototype, "force", {
        get: function () {
            return this._force;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bat.prototype, "body", {
        get: function () {
            return this._batBody;
        },
        enumerable: true,
        configurable: true
    });
    Bat.prototype.createBat = function () {
        this._batBody = new p2.Body({
            position: [this._stage.stageWidth / 2, this._stage.stageHeight - 90]
        });
        var batShape = new p2.Box({
            width: this._batWidth,
            height: 160
        });
        this._batBody.addShape(batShape);
        this._world.addBody(this._batBody);
        this.addChild(this._bat);
        this.render(this._batBody);
    };
    Bat.prototype.render = function (body) {
        var s = body.shapes[0];
        this._bat.x = body.position[0];
        this._bat.y = body.position[1];
        this._bat.graphics.clear();
        this._bat.graphics.beginFill(0x888888);
        this._bat.graphics.drawRect(-s.width / 2, -s.height / 2, s.width, s.height);
        this._bat.graphics.endFill();
    };
    Bat.prototype.addEvent = function () {
        var _this = this;
        this._bat.touchEnabled = true;
        this._bat.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this._lastPosition = 0;
            _this._isTouch = true;
        }, this);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (_this._isTouch) {
                _this._batBody.position[0] = Math.max(_this._batWidth / 2 + 10, Math.min(e.stageX, _this._stage.stageWidth - 10 - _this._batWidth / 2));
                _this.force[0] = (_this._lastPosition == 0 ? 0 : _this._batBody.position[0] - _this._lastPosition) * 20;
                _this._lastPosition = _this._batBody.position[0];
                _this.render(_this._batBody);
            }
        }, this);
    };
    return Bat;
}(egret.Sprite));
__reflect(Bat.prototype, "Bat");
var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick() {
        var _this = _super.call(this) || this;
        _this._world = World.getInstance();
        _this.addBrick();
        return _this;
    }
    Object.defineProperty(Brick.prototype, "brickBody", {
        get: function () {
            return this._brickBody;
        },
        enumerable: true,
        configurable: true
    });
    Brick.prototype.render = function () {
        this._brick.x = this._brickBody.position[0];
        this._brick.y = this._brickBody.position[1];
    };
    Brick.prototype.addBrick = function () {
        this._brickBody = new p2.Body();
        this._brickBody.displays = [this];
        var ballShape = new p2.Box({
            width: 50,
            height: 20
        });
        this._brickBody.addShape(ballShape);
        this._world.addBody(this._brickBody);
        this._brick = new egret.Sprite();
        this._brick.graphics.beginFill(0xffff00);
        this._brick.graphics.drawRect(-ballShape.width / 2, -ballShape.height / 2, ballShape.width, ballShape.height);
        this._brick.graphics.endFill();
        this.addChild(this._brick);
    };
    Brick.prototype.destroy = function () {
        this._world.removeBody(this._brickBody);
        this.parent.removeChild(this);
    };
    return Brick;
}(egret.Sprite));
__reflect(Brick.prototype, "Brick");
var ButtonUI = (function (_super) {
    __extends(ButtonUI, _super);
    function ButtonUI() {
        var _this = _super.call(this) || this;
        _this._label = "按钮";
        _this.create();
        return _this;
    }
    Object.defineProperty(ButtonUI.prototype, "label", {
        set: function (label) {
            this._label = label;
            this._labelTxt.text = label;
        },
        enumerable: true,
        configurable: true
    });
    ButtonUI.prototype.create = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.beginFill(0x000000, 0.3);
        this.graphics.drawRoundRect(0, 0, 100, 50, 10);
        this.graphics.endFill();
        this._labelTxt = new egret.TextField();
        this._labelTxt.textColor = 0xffffff;
        this._labelTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._labelTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._labelTxt.text = this.label;
        this._labelTxt.width = 100;
        this._labelTxt.height = 50;
        this.addChild(this._labelTxt);
    };
    return ButtonUI;
}(egret.Sprite));
__reflect(ButtonUI.prototype, "ButtonUI");
var endPanelUI = (function (_super) {
    __extends(endPanelUI, _super);
    function endPanelUI(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this._replayBtn = new eui.Button();
        return _this;
    }
    endPanelUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.drawBack();
        this.addTitle();
        this._score = new InfoUI();
        this._score.label = "score";
        this._score.x = this.width / 2 - this._score.width / 2;
        this._score.y = this.height / 2;
        this.addChild(this._score);
        this._time = new InfoUI();
        this._time.label = "time";
        this._time.x = this.width / 2 - this._time.width / 2;
        this._time.y = this._score.y + 50;
        this.addChild(this._time);
        this._replayBtn.label = "replay";
        this._replayBtn.horizontalCenter = 0;
        this._replayBtn.y = this._time.y + 50;
        this.addChild(this._replayBtn);
        console.log("addBtn");
    };
    Object.defineProperty(endPanelUI.prototype, "replayBtn", {
        get: function () {
            return this._replayBtn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(endPanelUI.prototype, "time", {
        get: function () {
            return this._time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(endPanelUI.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: true,
        configurable: true
    });
    endPanelUI.prototype.drawBack = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x222222);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    endPanelUI.prototype.addTitle = function () {
        var title = new egret.TextField();
        title.text = "gameOver";
        title.size = 40;
        title.x = this.width / 2 - title.width / 2;
        title.y = this.height / 4;
        this.addChild(title);
    };
    return endPanelUI;
}(eui.Group));
__reflect(endPanelUI.prototype, "endPanelUI");
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this._world = World.getInstance();
        _this.addBall();
        return _this;
    }
    Object.defineProperty(Ball.prototype, "ballBody", {
        get: function () {
            return this._ballBody;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.render = function () {
        this._ball.x = this._ballBody.interpolatedPosition[0];
        this._ball.y = this._ballBody.interpolatedPosition[1];
    };
    Ball.prototype.addBall = function () {
        this._ballBody = new p2.Body({
            mass: 1,
            position: [200, 500]
        });
        var ballShape = new p2.Circle({
            radius: 15
        });
        this._ballBody.addShape(ballShape);
        this._world.addBody(this._ballBody);
        this._ball = new egret.Sprite();
        this._ball.graphics.beginFill(0xffff00);
        this._ball.graphics.drawCircle(0, 0, ballShape.radius);
        this._ball.graphics.endFill();
        this.addChild(this._ball);
    };
    return Ball;
}(egret.Sprite));
__reflect(Ball.prototype, "Ball");
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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        //防止this的作用域改变，这里使用箭头函数的格式
        _this.contactHandler = function (e) {
            console.log(e.bodyA, e.bodyB);
            if (e.bodyA.displays && e.bodyA.displays[0] instanceof Brick) {
                _this._score.value++;
                e.bodyA.displays[0].destroy();
            }
            else if (e.bodyB.displays && e.bodyB.displays[0] instanceof Brick) {
                _this._score.value++;
                e.bodyB.displays[0].destroy();
            }
            if ((e.bodyA == _this._ball.ballBody && e.bodyB.id == 1000) || (e.bodyB == _this._ball.ballBody && e.bodyA.id == 1000)) {
                _this.gameOver();
            }
        };
        _this.preSolveHandler = function (e) {
            for (var i = 0; i < e.contactEquations.length; i++) {
                var eq = e.contactEquations[i];
                if ((eq.bodyA == _this._ball.ballBody && eq.bodyB == _this._bat.body) || (eq.bodyB == _this._ball.ballBody && eq.bodyA == _this._bat.body)) {
                    //如果碰到bat的顶端，则进行反弹
                    var y = eq.normalA[1];
                    if (y != 0) {
                        _this._ball.ballBody.applyImpulse(_this._bat.force, [0, 0]);
                    }
                }
            }
        };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
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
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        this._world = World.getInstance();
        this._startPanel = new StartPanelUI(this.stage.stageWidth, this.stage.stageHeight);
        this.stage.addChild(this._startPanel);
        this._startPanel.startBtn.addEventListener("touchBegin", function (e) {
            _this.stage.removeChild(_this._startPanel);
            _this.initMainScene();
        }, this);
        this._endPanel = new endPanelUI(this.stage.stageWidth, this.stage.stageHeight);
        this._endPanel.replayBtn.addEventListener("touchBegin", function (e) {
            _this.stage.removeChild(_this._endPanel);
            _this.resetGame();
        }, this);
    };
    Main.prototype.initMainScene = function () {
        var _this = this;
        this.addBackground();
        this.initInfoPanel();
        this.addBoundary();
        this.addBricks();
        this._bat = new Bat(this.stage);
        this.stage.addChild(this._bat);
        this._ball = new Ball();
        this.stage.addChild(this._ball);
        egret.startTick(this.moveBall, this);
        this._world.on("beginContact", this.contactHandler);
        this._world.on("preSolve", this.preSolveHandler);
        //计时
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            _this._time.value++;
        }, this);
        this._timer.start();
    };
    Main.prototype.moveBall = function (timeStamp) {
        this._world.step(1 / 60, 0.1, 10);
        this._ball.render();
        return false;
    };
    Main.prototype.addBackground = function () {
        var backGround = new egret.Sprite;
        backGround.x = 0;
        backGround.y = 0;
        backGround.graphics.beginFill(0x333333);
        backGround.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        backGround.graphics.endFill();
        this.addChild(backGround);
    };
    Main.prototype.initInfoPanel = function () {
        this._score = new InfoUI();
        this._score.label = "score";
        this._score.x = 20;
        this._score.y = 10;
        this._score.value = 0;
        this.stage.addChild(this._score);
        this._time = new InfoUI();
        this._time.label = "time";
        this._time.x = 400;
        this._time.y = 10;
        this._time.value = 0;
        this.stage.addChild(this._time);
    };
    Main.prototype.addBoundary = function () {
        this.addStaticPanel(10, 50, 0, 1, this.stage.stageWidth - 20); //top
        this.addStaticPanel(this.stage.stageWidth - 10, 50, Math.PI / 2, 2, this.stage.stageHeight - 60); //right
        this.addStaticPanel(this.stage.stageWidth - 10, this.stage.stageHeight - 10, Math.PI, 1000, this.stage.stageWidth - 20); //buttom
        this.addStaticPanel(10, this.stage.stageHeight - 10, 270 * Math.PI / 180, 4, this.stage.stageHeight - 60); //left
    };
    Main.prototype.addStaticPanel = function (x, y, angle, id, width) {
        var planeBody = new p2.Body({
            position: [x, y],
            angle: angle,
            id: id
        });
        var planeShape = new p2.Plane({});
        planeBody.addShape(planeShape);
        this._world.addBody(planeBody);
        var planeMc = new egret.Sprite();
        planeMc.x = planeBody.position[0];
        planeMc.y = planeBody.position[1];
        planeMc.graphics.lineStyle(3, 0x000000);
        planeMc.graphics.moveTo(0, 0);
        planeMc.graphics.lineTo(width, 0);
        planeMc.graphics.endFill();
        planeMc.rotation = planeBody.angle * 180 / Math.PI;
        this.addChild(planeMc);
    };
    Main.prototype.addBricks = function () {
        this._bricks = [];
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 5; j++) {
                var brick = new Brick();
                brick.brickBody.position[0] = 80 + i * 60;
                brick.brickBody.position[1] = 200 + j * 40;
                brick.render();
                this._bricks.push(brick);
                this.addChild(brick);
            }
        }
    };
    Main.prototype.resetGame = function () {
        var _this = this;
        this._score.value = 0;
        this._time.value = 0;
        this._timer.reset();
        this._timer.start();
        this._bricks.forEach(function (ele) {
            _this._world.addBody(ele.brickBody);
            _this.addChild(ele);
        }, this);
        this._ball.ballBody.position[0] = 200;
        this._ball.ballBody.position[1] = 500;
        this._world.on("beginContact", this.contactHandler);
        this._world.on("preSolve", this.preSolveHandler);
    };
    Main.prototype.gameOver = function () {
        this._timer.stop();
        this.stage.addChild(this._endPanel);
        this._endPanel.score.value = this._score.value;
        this._endPanel.time.value = this._time.value;
        this._world.off("beginContact", this.contactHandler);
        this._world.off("preSolve", this.preSolveHandler);
        if (this._world.has("beginContact", this.contactHandler)) {
            this._world.off("beginContact", this.contactHandler);
        }
        if (this._world.has("preSolve", this.preSolveHandler)) {
            this._world.off("preSolve", this.preSolveHandler);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var StartPanelUI = (function (_super) {
    __extends(StartPanelUI, _super);
    function StartPanelUI(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    StartPanelUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.drawBack();
        this.addTitle();
        this._startBtn = new eui.Button();
        this._startBtn.label = "start";
        this._startBtn.horizontalCenter = 0;
        this._startBtn.verticalCenter = 0;
        this.addChild(this._startBtn);
    };
    Object.defineProperty(StartPanelUI.prototype, "startBtn", {
        get: function () {
            return this._startBtn;
        },
        enumerable: true,
        configurable: true
    });
    StartPanelUI.prototype.drawBack = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x222222);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    StartPanelUI.prototype.addTitle = function () {
        var title = new egret.TextField();
        title.text = "弹力球";
        title.size = 80;
        title.x = this.width / 2 - title.width / 2;
        title.y = this.height / 4;
        this.addChild(title);
    };
    return StartPanelUI;
}(eui.Group));
__reflect(StartPanelUI.prototype, "StartPanelUI");
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
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var World = (function () {
    function World() {
    }
    World.getInstance = function () {
        if (!World._instance) {
            World._instance = new p2.World({ gravity: [0, 10.8] });
            World._instance.defaultContactMaterial.restitution = 1;
        }
        return World._instance;
    };
    return World;
}());
__reflect(World.prototype, "World");
;window.Main = Main;