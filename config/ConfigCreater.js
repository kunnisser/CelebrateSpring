import Config from './Config';

class ConfigCreater {
    constructor () {}
    static createConfig () {
        let w = Config.GAME_WIDTH;
        let h = Config.GAME_HEIGHT;
        return {
            width: 1334,
            height: 750,
            renderer: Phaser.CANVAS,
            antialias: !0,
            parent: 'canvas',
            enableDebug: !0
        };
    };
}

export default ConfigCreater;