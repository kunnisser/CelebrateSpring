import Graphics from '../utils/Graphics';
import Game from '../initGame/Game';

class Modal extends Phaser.Group {
    constructor (game, world) {
        super(game, world);
        this.init();
        this.addCloseBtn();
        this.addScrollView();
    }

    init () {
        let modalStyle = {
            font: '36px 微软雅黑',
            fill: '#ffffff'
        };
        this.tapState = !1;
        this.startDragY = 0;
        this.maskWidth = 960;
        this.maskHeight = 410;
        this.cushion = this.game.add.image(0, 0, Graphics.createRectTexture(this.game, 1, 1, '#000000', 'cushion'), null, this);
        this.cushion.anchor.set(0.5);
        this.cushion.alpha = 0.3;
        this.cushion.inputEnabled = !0;
        this.titlebar = this.game.add.image(0, -220, 'gamebar', 'rankbar.png', this);
        this.titlebar.anchor.set(0.5);
        this.panel = this.game.add.image(0, 46, 'gamebar', 'panel.png', this);
        this.panel.anchor.set(0.5);
        this.titleText = this.game.add.text(0, -220, '', modalStyle, this);
        this.titleText.anchor.set(0.5);
        this.visible = !1;
    }

    addScrollView () {
        this.overflowRect = this.game.add.graphics(0, 0, this);
        this.overflowRect.beginFill(0xffffff);
        this.overflowRect.drawRect(-480, -160, this.maskWidth, this.maskHeight);
        this.contentWrap = this.game.add.group(this);
        this.contentWrap.position.set(-480, -160);
        this.contentWrap.mask = this.overflowRect;
    }

    addContent (ct) {
        this.contentWrap.add(ct);
        this.scrollInput();
        this.contentWrap.position.y = -160;
    }

    scrollInput () {
        this.overflowRect.events.onInputDown.add(this.onInputDown, this);
        this.overflowRect.events.onInputUp.add(this.onInputUp, this);
        if (this.contentWrap.height > 410) {
            this.overflowRect.inputEnabled = !0;
        } else {
            this.overflowRect.inputEnabled = !1;
        }
    }

    onInputDown () {
        this.tapState = !0;
        this.startDragY = this.contentWrap.position.y;
    }

    onInputUp () {
        if (this.tapState) {
            this.tapState = !1;
            this.contentWrap.position.y > -160 && this.game.add.tween(this.contentWrap).to({
                y: -160
            }, 400, Phaser.Easing.Cubic.Out, !0);
            this.contentWrap.position.y <= (-this.contentWrap.height + this.maskHeight -160) && this.game.add.tween(this.contentWrap.position).to({
                y: -this.contentWrap.height + this.maskHeight -160
            }, 400, Phaser.Easing.Cubic.Out, !0);
        }
    }

    update () {
        this.tapState && this.scroll();
    }

    scroll () {
        let pointer = this.game.input.activePointer;
        let distanceY = (pointer.y - pointer.positionDown.y) * 2.66;
        let distanceX = (pointer.x - pointer.positionDown.x) * 2.66;
        let newY = this.startDragY + distanceY * Game.direct;
        let newX = this.startDragY + distanceX * Game.direct;
        let newPosition = Game.direct > 0 ? newY : newX;
        newPosition = Phaser.Math.clamp(newPosition, -this.contentWrap.height + this.maskHeight - 180, -140);
        this.contentWrap.position.y = newPosition;
    }

    setModalType (type, text) {
        this.titlebar.frameName = type;
        this.titleText.setText(text);
    }

    addCloseBtn () {
        this.closebtn = this.game.add.image(490, -240, 'gameui', 'closebtn.png', this);
        this.closebtn.anchor.set(0.5);
        this.closebtn.inputEnabled = !0;
        this.closebtn.events.onInputDown.add(this.close, this);
    }

    open () {
        this.visible = !0;
    }

    close () {
        this.visible = !1;
    }
}

export default Modal;