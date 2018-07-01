var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.numCards = 12;
        _this.cards = [];
        _this.firstCard = null;
        _this.secondCard = null;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
    };
    Main.prototype.onGroupComplete = function () {
        this.addBackground();
        this.createCard();
        this.addCardToStage();
        this.addScoreUI();
        this.addReplyButton();
        this.cards.forEach(this.addEvent, this); //这里第二个参数不指定this的情况下,addEventTo中的作用域将变为window 
    };
    Main.prototype.addBackground = function () {
        var bg = new egret.Bitmap(RES.getRes("faces.beijing"));
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);
    };
    Main.prototype.addScoreUI = function () {
        this.scoreUI = new ScoreUI();
        this.scoreUI.x = 85;
        this.scoreUI.y = 30;
        this.addChild(this.scoreUI);
    };
    Main.prototype.addReplyButton = function () {
        var _this = this;
        var replyBtn = new ButtonUI();
        replyBtn.label = "replay";
        replyBtn.x = this.stage.stageWidth / 2 - 50;
        replyBtn.y = this.stage.stageHeight - 130;
        this.addChild(replyBtn);
        replyBtn.touchEnabled = true;
        replyBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.firstCard = null;
            _this.secondCard = null;
            _this.scoreUI.score = 0;
            _this.addCardToStage();
        }, this);
    };
    Main.prototype.createCard = function () {
        for (var i = 0; i < this.numCards; i++) {
            var id = Math.floor(i / 2) + 1;
            var faceID = "faces.f" + id;
            var backID = "faces.cardbg";
            var card = new Card(faceID, backID);
            this.cards.push(card);
        }
    };
    Main.prototype.addCardToStage = function () {
        this.shuffle(this.cards);
        for (var i = 0; i < this.cards.length; i++) {
            var coll = i % 3;
            var row = Math.floor(i / 3);
            this.cards[i].x = 160 + 160 * coll;
            this.cards[i].y = 100 + 210 * row;
            this.cards[i].init();
            this.addChild(this.cards[i]);
        }
    };
    Main.prototype.addEvent = function (card) {
        var _this = this;
        console.log(this);
        card.touchEnabled = true;
        card.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            var card = evt.currentTarget;
            if (_this.secondCard) {
                return;
            }
            else {
                if (_this.firstCard) {
                    if (card == _this.firstCard) {
                        card.reverse();
                        _this.firstCard = null;
                    }
                    else {
                        _this.secondCard = card;
                        card.reverse();
                        var root_1 = _this;
                        setTimeout(function () {
                            root_1.check();
                        }, 1000);
                    }
                }
                else {
                    _this.firstCard = card;
                    card.reverse();
                }
            }
        }, this);
    };
    Main.prototype.check = function () {
        var right = this.firstCard.faceID == this.secondCard.faceID;
        if (right) {
            this.removeChild(this.firstCard);
            this.removeChild(this.secondCard);
            this.scoreUI.score++;
        }
        else {
            this.firstCard.reverse();
            this.secondCard.reverse();
        }
        this.firstCard = null;
        this.secondCard = null;
    };
    Main.prototype.shuffle = function (arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * i);
            if (j != i) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map