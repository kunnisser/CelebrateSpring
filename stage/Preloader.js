import Config from '../config/Config';
import Game from '../initGame/Game';

class Preloader extends Phaser.State {
    constructor () {
        super();
    }

    init () {
        this.addBackground();
        this.addPreloadBar();
        this.addLoadingInfo();
        this.addCompanyInfo();
        this.resize();
    }

    preload () {
        this.loadFontAssets();
        this.loadImages();
        this.loadGraphics();
        this.loadAudio();
        this.load.setPreloadSprite(this.innerPreloaderSprite);
    }

    create () {
        this.initMainMusicLoop();
        this.game.changeState('menu', !0);
    }

    loadFontAssets () {
        this.load.bitmapFont('digits',
            '/CelebrateSpring/assets/fonts/font.png',
            '/CelebrateSpring/assets/fonts/font.fnt', null);
    }

    loadImages () {
        this.load.image('avator', Game.isDevelopement? 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=92569760,1420926555&fm=58&w=48&h=48&img.PNG' : Game.UserInfo.headImgUrl);
        this.load.image('bg', '/CelebrateSpring/assets/images/bg.png');
    }

    loadGraphics () {
        this.load.atlasJSONHash('gamebg',
            '/CelebrateSpring/assets/images/gamebg.png',
            '/CelebrateSpring/assets/hashjson/gamebg.json');
        this.load.atlasJSONHash('gameui',
            '/CelebrateSpring/assets/images/gameui.png',
            '/CelebrateSpring/assets/hashjson/gameui.json');
        this.load.atlasJSONHash('gamebar',
            '/CelebrateSpring/assets/images/gamebar.png',
            '/CelebrateSpring/assets/hashjson/gamebar.json');
    }

    loadAudio () {
        this.load.audio('main_loop', ['/CelebrateSpring/assets/audio/main_loop.ogg', '/CelebrateSpring/assets/audio/main_loop.m4a'], !0);
        this.load.audio('tap', ['/CelebrateSpring/assets/audio/tap.wav'], !0);
        this.load.audio('hurt', ['/CelebrateSpring/assets/audio/hurt.wav'], !0);
        this.load.audio('game_over', ['/CelebrateSpring/assets/audio/gameOver.ogg', '/CelebrateSpring/assets/audio/gameOver.m4a'], !0);
        this.load.audio('toggle', ['/CelebrateSpring/assets/audio/toggle.ogg', '/CelebrateSpring/assets/audio/toggle.m4a'], !0);
        this.load.audio('goal', ['/CelebrateSpring/assets/audio/goal.wav'], !0);
    }

    initMainMusicLoop () {
        Game.mainMusicLoop = this.sound.add('main_loop', Game.fullVolume, !0, !0);
        Game.mainMusicLoop.touchLocked = !1;
    }

    addBackground () {
        this.bg = this.game.add.image(0, 0, 'preloader', 'BG0000');
    }

    addPreloadBar () {
        this.outerPreloaderSprite = this.game.add.image(0, 0, 'preloader', 'Preloader_Back0000');
        this.outerPreloaderSprite.anchor.set(.5);
        this.innerPreloaderSprite = this.game.add.image(0, 0, 'preloader', 'Preloader_Front0000');
    }

    addLoadingInfo () {
        let loadingStyle = {
            font: '40px GrilledCheeseBTNToasted',
            fill: '#FFFFFF',
            align: 'center'
        };
        this.loadingText = this.game.add.text(0, 0, '', loadingStyle);
        this.loadingText.anchor.set(.5);
        this.loadingText.setShadow(4, 4, '#999');
        this.game.time.events.add(100, () => {
            this.loadingText.setText('loading...');
        });
    }

    loadUpdate () {
        this.loadingText.setText(this.load.progress + '%');
    }

    addCompanyInfo () {
        let info = '技术支持：江苏一站地网络科技有限公司\nwww.ezhandi.com , 2018';
        let style = {
            font: '26px Verdana',
            fill: '#FFFFFF',
            align: 'center'
        };
        this.copyright = this.game.add.text(0, 0, info, style);
        this.copyright.lineSpacing = 10;
        this.copyright.anchor.set(.5);
        this.copyright.setShadow(2, 2, '#333');
    }

    resizeBackground () {
        this.bg.width = Config.GAME_WIDTH + 1;
        this.bg.height = Config.GAME_HEIGHT + 1;
    }

    resizePreloadBar () {
        this.outerPreloaderSprite.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT);
        this.innerPreloaderSprite.position.set(Config.HALF_GAME_WIDTH - this.innerPreloaderSprite.width * .5 - 1,
            Config.HALF_GAME_HEIGHT - this.innerPreloaderSprite.height * .5 - 1);
    }

    resizeText () {
        this.loadingText.position.set(Config.HALF_GAME_WIDTH, Config.HALF_GAME_HEIGHT + this.outerPreloaderSprite.height + 10);
        this.copyright.position.set(Config.HALF_GAME_WIDTH, Config.GAME_HEIGHT - this.copyright.height);
    }

    resize () {
        this.resizeBackground();
        this.resizePreloadBar();
        this.resizeText();
    }

    shutdown () {
        this.cache.removeImage('preloader', !0);
    }
}

export default Preloader;