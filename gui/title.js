import SimpleButton from './SimpleButton';
class title extends Phaser.Group {
    constructor (game, parent) {
        super(game, parent);
        this.init();
    }

    init () {
        this.generateCoverFu();
        this.addLogo();
        this.addTitleLine();
        this.generateStartGroup();
    }

    generateCoverFu () {
        this.coverFu = this.game.add.image(0, 0, 'gamebg', 'fu.png', this);
        this.coverFu.anchor.set(.5);
        this.coverFu.alpha = 0.6;
    }

    addLogo () {
        this.logo = this.game.add.image(0, -210, 'gameui', 'logo.png', this);
        this.logo.anchor.set(0.5);
    }

    addTitleLine () {
        this.titleLight = this.game.add.image(0, 0, 'gamebg', 'title-light.png', this);
        this.titleLight.anchor.set(0.5);
        this.titleLight.y = 56;
        this.titleLight.x = 26
        this.game.add.tween(this.titleLight).to({
            alpha: 0.2
        }, 2000, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0);
        this.titleLine = this.game.add.image(0, 0, 'gamebg', 'title-body.png', this);
        this.titleLine.anchor.set(0.5);
        this.titleLine.y = -50;
        this.game.add.tween(this.titleLine).to({
        }, 2000, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0);
    }

    generateStartGroup () {
        this.startGp = this.game.add.group(this, 'startGp');
        this.startGp.y = 120;
        this.prizeIcon = this.game.add.image(0, 0, 'gameui', 'prize.png', this.startGp);
        this.prizeIcon.anchor.set(0.5);
        this.prizeIcon.alpha = 0.6;
        this.dateIcon = this.game.add.image(0, 0, 'gameui', 'duringDate.png', this.startGp);
        this.dateIcon.anchor.set(0.5);
        this.dateIcon.alpha = 0.6;
        this.jiongDog = this.game.add.image(0, 500, 'gamebg', 'big-jiongdog.png', this.startGp);
        this.jiongDog.anchor.set(0.5);
        this.startBtn = new SimpleButton(this.game, 0, 150, 'gameui', 'startBtn.png');
        this.startGp.add(this.startBtn);
        this.startBtn.scale.set(0);
        this.game.add.tween(this.jiongDog).to({
            y: 0
        }, 500, Phaser.Easing.Back.Out, !0, 100).onComplete.addOnce(() => {
            this.game.add.tween(this.prizeIcon).to({
                x: -230,
                alpha: 1
            }, 200, Phaser.Easing.Back.Out, !0);
            this.game.add.tween(this.dateIcon).to({
                x: 230,
                alpha: 1
            }, 200, Phaser.Easing.Back.Out, !0, 100);
            this.game.add.tween(this.startBtn.scale).to({
                x: 1,
                y: 1
            }, 400, Phaser.Easing.Bounce.Out, !0, 300);
        });
        this.startBtn.setCallbackDelay(50);
        this.startBtn.callback.addOnce(() => {
            this.game.device.webAudio && this.game.sound.play('tap');
            if (!0) {
                this.game.changeState('level', !0);
            } else {
                alert('今日好运指数不足,请明天再玩');
            }
        });
    }
}

export default title;