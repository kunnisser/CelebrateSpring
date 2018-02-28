import Config from '../config/Config';
import PersonInfo from '../gui/personInfo';
import Navbar from '../gui/Navbar';
import TimeCounter from '../gui/TimeCounter';
import SimpleButton from '../gui/SimpleButton';
import En from "../utils/Encrypt";
import XHR from "../utils/XHR";
import Game from "../initGame/Game";
import ProConfig from '../assets/hashjson/project';
import Modal from "../gui/modal";

class Level extends Phaser.State {
    constructor () {
        super();
    }

    init (obj) {
        this.frompreload = obj.param;
        this.overlay = obj.overlay;
        this.countTime = 5;
        this.originalDelay = 800;
        this.randomIndex = this.game.rnd.integerInRange(0, 4);
        this.doorArr = [
            {
                child: null,
                isFu: !1
            },
            {
                child: null,
                isFu: !1
            },
            {
                child: null,
                isFu: !1
            },
            {
                child: null,
                isFu: !1
            },
            {
                child: null,
                isFu: !1
            }
        ];
        this.doorArr[this.randomIndex].isFu = !0;
        this.addGameBg();
        this.addPersonInfo();
        this.addDoors();
        this.addCountTime();
        this.addRollBtn();
        this.addModal();
        this.addNavbar();
        this.resize();
    }

    create () {
        this.game.time.events.add(1000, this.startGame, this);
        this.hideOverlay();
    }

    startGame () {
        for (let d of this.doorArr) {
            this.closeThedoor(d.child.children[4], d.child.children[2], d.child.children[3]).onComplete.add(() => {
            });
        }
        this.game.time.events.add(1400, this.shuffleDoors, this);
    }

    addGameBg () {
        this.Bg = this.game.add.image(0, 0, 'bg', null, this.world);
    }

    addPersonInfo () {
        this.personInfo = new PersonInfo(this.game, this.world);
        this.personInfo.position.set(70, 70);
    }

    addNavbar () {
        this.navbar = new Navbar(this.game, this.world, this.modal);
        this.world.swap(this.navbar, this.modal);
    }

    addDoors () {
        this.doorGroup = this.game.add.group(this.world, 'doorGp');
        for (let [index, d] of new Map(this.doorArr.map((d, index) => [index, d]))) {
            d.child = this.generateDoors(index);
        }
        this.setDoorsPosition(this.doorArr);
    }

    setDoorsPosition (arr) {
        for (let i = 0; i < 5; i++) {
            arr[i].child.x = (i - 2) * 180;
        }
    }

    generateDoors (i) {
        let door = this.game.add.group(this.doorGroup, 'door');
        let dog = this.game.add.image(0, 30, 'gameui', 'jiongdog.png', door);
        let fu = this.game.add.image(0, 30, 'gameui', 'score-fu.png', door);
        dog.anchor.set(0.5);
        fu.anchor.set(0.5);
        dog.visible = !0;
        fu.visible = !1;
        if (i === this.randomIndex) {
            fu.visible = !0;
            dog.visible = !1;
        }
        let leftdoor = this.game.add.image(-80, 26, 'gameui', 'leftdoor.png', door);
        let rightdoor = this.game.add.image(80, 26, 'gameui', 'rightdoor.png', door);
        let doorframe = this.game.add.image(0, 0, 'gameui', 'doorframe.png', door);
        doorframe.anchor.set(.5);
        leftdoor.anchor.set(.5);
        rightdoor.anchor.set(.5);
        let mask = this.game.add.graphics(0, 0, this.door);
        mask.drawRect(-45, -44, 90, 141);
        door.add(mask);
        leftdoor.mask = mask;
        rightdoor.mask = mask;
        doorframe.inputEnabled = !1;
        doorframe.events.onInputDown.add(() => {
            for (let d of this.doorArr) {
                d.child.children[4].inputEnabled = !1;
            }
            this._timeCounter.visible = !1;
            this.game.time.events.remove(this.loopTimer);
            this.openThedoor(doorframe, leftdoor, rightdoor).onComplete.addOnce(() => {
                this.rollBtn.visible = !0;
                if (i === this.randomIndex) {
                    this.personInfo.score = this.personInfo.score + 1;
                    this.personInfo.setScore(this.personInfo.score);
                    this.c = this.personInfo.score;
                    this.i = this.c;
                    this.id = (new En).init(this.i);
                    this.game.device.webAudio && this.sound.play('goal');
                    this.loadXhr();
                } else {
                    this.personInfo.currentLife--;
                    this.personInfo.setLife(this.personInfo.currentLife);
                    this.personInfo.currentLife > 0 && (
                        this.game.device.webAudio && this.sound.play('hurt')
                    );
                    this.personInfo.currentLife === 0 && (
                        this.game.device.webAudio && this.sound.play('game_over'),
                        this.rollBtn.visible = !1,
                        this.restartBtn.visible = !0,
                        Game.UserInfo['currentScore'] = this.personInfo.score,
                        this.navbar.panelCont[3].init(),
                        this.navbar.endShowInfo());
                }
                this.originalDelay = (800 - 50 * Math.floor(this.personInfo.score / 5) > 0) ?
                    (800 - 50 * Math.floor(this.personInfo.score / 5)) : 100;
                for (let d of this.doorArr) {
                    this.openThedoor(d.child.children[4], d.child.children[2], d.child.children[3]);
                }
            });
        });
        return door;
    }

    delayTapDoor () {
        this.rollBtn.visible = !0;
        for (let d of this.doorArr) {
            d.child.children[4].inputEnabled = !1;
        }
        this.personInfo.currentLife--;
        this.personInfo.setLife(this.personInfo.currentLife);
        this.personInfo.currentLife > 0 && (
            this.game.device.webAudio && this.sound.play('hurt')
        );
        this.personInfo.currentLife === 0 && (
            this.game.device.webAudio && this.sound.play('game_over'),
                this.rollBtn.visible = !1,
                this.restartBtn.visible = !0,
                Game.UserInfo['currentScore'] = this.personInfo.score,
                this.navbar.panelCont[3].init(),
                this.navbar.endShowInfo());
        for (let d of this.doorArr) {
            this.openThedoor(d.child.children[4], d.child.children[2], d.child.children[3]);
        }
    }

    loadXhr () {
        this.xhr = new XHR();
        this.EndingTime = (new Date()).getTime();
        let respXhr = this.xhr.post(ProConfig.project.api + '/yzdtp/score/getDetail', {
            num: 30,
            currentScore: this.c,
            timestamp: this.EndingTime,
            wxopenId: this.id
        });
        respXhr.then((res) => {
           if (res.illegal === '0') {
               alert('素质游戏，请勿作弊！');
           }
            Game.UserInfo = res;
            this.navbar.panelCont[0].init();
        }, this);
    }

    openThedoor (frame, left, right) {
        let f = frame;
        f.blendMode = PIXI.blendModes.ADD;
        let lefttween = this.game.add.tween(left).to({
            x: -80
        }, 1400, Phaser.Easing.Cubic.Out, !0, 0);
        this.game.add.tween(right).to({
            x: 80
        }, 1400, Phaser.Easing.Cubic.Out, !0, 0);
        this.game.time.events.add(100, () => {
            f.blendMode = PIXI.blendModes.NORMAL;
        }, this);
        return lefttween;
    }

    closeThedoor (frame, left, right) {
            let tween = this.game.add.tween(left).to({
                x: -19
            }, 1400, Phaser.Easing.Cubic.Out, !0, 0);
            this.game.add.tween(right).to({
                x: 19
            }, 1400, Phaser.Easing.Cubic.Out, !0, 0);
            return tween;
    }

    addCountTime() {
        this._timeCounter = new TimeCounter(this.game, this.countTime);
        this._timeCounter.position.set(Config.HALF_GAME_WIDTH, 100);
        this.game.world.add(this._timeCounter);
        this._timeCounter.visible = !1;
    }

    countTimeHandle () {
        if (this.countTime <= 0) {
            this.game.time.events.remove(this.loopTimer);
            this.delayTapDoor();
        } else {
            this.countTime--;
            this._timeCounter.updateCount(this.countTime);
        }
    }

    shuffleDoors () {
        Phaser.ArrayUtils.shuffle(this.doorArr);
        this.tempArr = [-360, -180, 0, 180, 360];
        for (let [index, d] of new Map(this.doorArr.map((d, index) => [index, d]))) {
            let randomX = this.game.rnd.integerInRange(1, 10);
            let movingTween = this.game.add.tween(d.child).to({
                x: -360 + randomX,
                y: 60 * (index % 2 ? -1: 1)
            }, this.originalDelay, Phaser.Easing.Sinusoidal.Out, !0, index * this.originalDelay);
            let movingTween2 = this.game.add.tween(d.child).to({
                x: 360,
                y: 60 * (index % 2 ? -1: 1)
            }, this.originalDelay / 4, Phaser.Easing.Sinusoidal.Out, !1);
            movingTween.onComplete.add(() => {
                this.game.add.tween(d.child).to({
                    x: -180,
                    y: -60 * (index % 2 ? -1: 1)
                }, this.originalDelay / 4, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(() => {
                    this.game.add.tween(d.child).to({
                        x: 0,
                        y: 60 * (index % 2 ? -1: 1)
                    }, this.originalDelay / 4, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(() => {
                        this.game.add.tween(d.child).to({
                            x: 180,
                            y: -60 * (index % 2 ? -1: 1)
                        }, this.originalDelay / 4, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(() => {
                            movingTween2.start();
                        });
                    });
                });
            });
            movingTween2.onComplete.add(() => {
                this.game.add.tween(d.child).to({
                    x: this.tempArr[index],
                    y: 0
                }, this.originalDelay, Phaser.Easing.Back.Out, !0).onComplete.addOnce(() => {
                    if (index === 4) {
                        for (let d of this.doorArr) {
                            d.child.children[4].inputEnabled = !0;
                        }
                        this.countTime = 5;
                        this._timeCounter.setText(this.countTime.toString());
                        this._timeCounter.visible = !0;
                        this.loopTimer = this.game.time.events.loop(1000, this.countTimeHandle, this);
                    }
                });
            });
        }
    }

    addRollBtn () {
        this.rollBtn = new SimpleButton(this.game, 0, 0, 'gameui', 'tryagain.png');
        this.rollBtn.visible = !1;
        this.world.add(this.rollBtn);
        this.addRestart();
        this.rollBtn.setCallbackDelay(50);
        this.rollBtn.callback.add(() => {
            this.game.device.webAudio && this.sound.play('tap');
            if (this.personInfo.currentLife > 0) {
                this.rollBtn.visible = !1;
                this.doorGroup.visible = !1;
                this._timeCounter.visible = !1;
                this.game.time.events.add(500, () => {
                    this.doorGroup.visible = !0;
                    this.startGame();
                });
            } else {
                alert('好运没啦！');
            }
        }, this);
    }

    addRestart () {
        this.restartBtn = new SimpleButton(this.game, 0, 0, 'gameui', 'restart.png');
        this.world.add(this.restartBtn);
        this.restartBtn.visible = !1;
        this.restartBtn.setCallbackDelay(50);
        this.restartBtn.callback.addOnce(() => {
            this.game.device.webAudio && this.sound.play('tap');
            this.game.changeState('menu', !1);
        });
    }

    addModal () {
        this.modal = new Modal(this.game, this.world);
    }

    resizeBg () {
        this.Bg.width = Config.GAME_WIDTH;
        this.Bg.height = Config.GAME_HEIGHT;
    }

    resizeNavbar () {
        this.navbar.x = Config.GAME_WIDTH - 308;
        this.navbar.y = 72;
    }

    resizeDoors () {
        this.doorGroup.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT + 20);
    }

    resizeRollBtn () {
        this.rollBtn.position.set(Config.HALF_GAME_WIDTH, Config.GAME_HEIGHT - 100);
        this.rollBtn.scale.set(Config.GAME_HEIGHT / 750);
        this.restartBtn.position.set(this.rollBtn.x, this.rollBtn.y);
        this.restartBtn.scale.set(Config.GAME_HEIGHT / 750);
    }

    resizeModal () {
        this.modal.x = Config.HALF_GAME_WIDTH;
        this.modal.y = Config.HALF_GAME_HEIGHT;
        this.modal.cushion.scale.set(Config.GAME_WIDTH, Config.GAME_HEIGHT);
    }

    resize () {
        this.resizeBg();
        this.resizeNavbar();
        this.resizeDoors();
        this.resizeRollBtn();
        this.resizeModal();
    }

    hideOverlay () {
        this.hideLayTween = this.game.add.tween(this.overlay).to({
            alpha: 0
        }, 400, Phaser.Easing.Cubic.Out, !0);
        this.hideLayTween.onComplete.addOnce(() => {
            this.overlay.visible = !1;
        });
    }
}

export default Level;