import Game from '../initGame/Game';
import StateTransition from "../../Rot/plugins/StateTransition";
import ProConfig from '../assets/hashjson/project';
import En from '../utils/Encrypt';
import XHR from '../utils/XHR';

class Boot extends Phaser.State {
    constructor () {
        super();
    }

    init () {
        Game.isDesktop = this.game.device.desktop;
        let bootFont = {
                font: '20px GrilledCheeseBTNToasted',
                fill: 'white'
            },
            bootText = this.game.add.text(0, 0, 'preload font', bootFont);
        bootText.destroy();
    }

    preload () {
        this.load.atlasJSONHash('preloader', '/CelebrateSpring/assets/images/preloader.png', '/CelebrateSpring/assets/hashjson/preloader.json');
    }

    create () {
        this.game.plugins.add(new StateTransition(this.game));
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = !0;
        this.game.renderer.clearBeforeRender = !1;
        Game.isDevelopement ? this.state.start('preloader') : this.loadXhr();
    }

    loadXhr () {
        this.xhr = new XHR();
        let check = this.xhr.request(ProConfig.project.api + '/yzdtp/score/check');
        check.then((resp) => {
            resp === 0 && (window.location.href = 'http://www.me2u.com.cn/yzdtp/score/login?activeid=2');
        });
        this.EndingTime = (new Date()).getTime();
        this.id = (new En).init('0');
        let reqXhr = this.xhr.post(ProConfig.project.api + '/yzdtp/score/getDetail', {
            num: 30,
            currentScore: 0,
            timestamp: this.EndingTime,
            wxopenId: this.id
        });
        reqXhr.then((res) => {
            Game.UserInfo = res;
            this.state.start('preloader');
        });
    }
}

export default Boot;