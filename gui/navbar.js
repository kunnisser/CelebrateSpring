import SimpleButton from './SimpleButton';
import {Rank, Rule, Prize, Info} from './panel';
class navbar extends Phaser.Group {
    constructor (game, world, modal) {
        super(game, world);
        this.init();
        this.modal = modal;
        this.generateNavs();
    }

    init () {
        this.btnKeyArr = ['rankBtn.png', 'rule-btn.png', 'prize-btn.png'];
        this.modalTitles = [
            {
                type: 'rankbar.png',
                text: '福字排行榜'
            },
            {
                type: 'rulebar.png',
                text: '活动规则'
            },
            {
                type: 'prizebar.png',
                text: '奖品设置'
            },
            {
                type: 'infobar.png',
                text: '我的福字'
            }
        ]
        this.btn = [];
        this.panelCont = [];
        this.panelCont.push(new Rank(this.game));
        this.panelCont.push(new Rule(this.game));
        this.panelCont.push(new Prize(this.game));
        this.panelCont.push(new Info(this.game));
    }

    generateNavs () {
        for (let [index, key] of new Map(this.btnKeyArr.map((key, index) => [index, key]))) {
            let btn = new SimpleButton(this.game, index * 116, 0, 'gameui', key);
            btn.scale.set(0);
            this.add(btn);
            this.game.add.tween(btn.scale).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Bounce.Out, !0, (index + 1) * 250);
            this.btn.push(btn);
            btn.setCallbackDelay(50);
            btn.callback.add(() => {
                this.game.device.webAudio && this.game.sound.play('toggle');
                this.modal.setModalType(this.modalTitles[index].type, this.modalTitles[index].text);
                this.modal.open();
                this.generateContent(index, this.panelCont);
            });
        }
    }

    endShowInfo () {
        this.modal.setModalType(this.modalTitles[3].type, this.modalTitles[3].text);
        this.modal.open();
        this.generateContent(3, this.panelCont);
    }

    generateContent (index, ct) {
        this.modal.contentWrap.removeAll();
        ct[index].visible = !0;
        this.modal.addContent(ct[index]);
    }

}

export default navbar;