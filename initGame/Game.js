import configCreater from '../config/ConfigCreater';
import Resize from '../stage/Resize';
import Boot from '../stage/Boot';
import Preloader from '../stage/Preloader';
import Menu from '../stage/Menu';
import Level from '../stage/Level';

class Game extends Phaser.Game {
    constructor () {
        let baseConfig = configCreater.createConfig();
        super(baseConfig);
        this.state.add('resize', Resize, !0);
        this.state.add('boot', Boot, !1);
        this.state.add('preloader', Preloader, !1);
        this.state.add('menu', Menu, !1);
        this.state.add('level', Level, !1);
    }

    changeState (nextState, obj) {
        this.plugins.plugins[0].changeState(nextState, obj);
    }

    static isDevelopement = !0;

    static isDesktop = !0;

    static isWeakDevice = !1;

    static fullVolume = 0.25;

    static direct = 1;

    static UserInfo = {};
}

export default Game;