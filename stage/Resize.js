import Game from '../initGame/Game';
import Config from '../config/Config';

class Resize extends Phaser.State {
    constructor () {
        super();
    }

    init () {
        Game.isDesktop = this.game.device.desktop;
    }

    create () {
        this.detectWeakDevice();
        this.setupScale();
        this.game.state.start('boot');
    }

    // 判断低版本的HostBrower
    detectWeakDevice () {
        if (Phaser.Device.isAndroidStockBrowser()) {
            Game.isWeakDevice = !0;
            this.game.renderType = Phaser.CANVAS;
        }
    }

    // 缩放设置
    setupScale () {
        Game.isDesktop ?
            this.scaleForDesktop() : this.scaleForMobile();
        this.world.displayObjectUpdateTransform = () => {
            if(!this.scale.correct) {
                this.world.x = this.game.width + this.game.camera.y;
                this.world.y = -this.game.camera.x;
                this.world.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
            } else {
                this.world.x = -this.game.camera.x;
                this.world.y = -this.game.camera.y;
                this.world.rotation = 0;
            }
            PIXI.DisplayObject.prototype.updateTransform.call(this.world);
        };
    }

    scaleForDesktop () {
        let gamescale = this.game.scale;
        gamescale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // 保持比例缩放
        this.resizeRender();
        gamescale.aspectRatio = Config.GAME_WIDTH / Config.GAME_HEIGHT; // 设置对应的宽高比
        // canvas居中
        gamescale.pageAlignHorizontally = !0;
        gamescale.pageAlignVertically = !0;
    }

    scaleForMobile () {
        let gamescale = this.game.scale;
        gamescale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // 添加屏幕尺寸变化的callback
        this.resizeRender();
        gamescale.onOrientationChange.add(this.resizeRender, this);
    }

    resizeRender () {
        // isDesktop 移动端切换pc无变化
        Config.refreshConfig(Game.isDesktop);
        this.game.scale.isLandscape ?
            (this.game.scale['correct'] = !0,
                    Game.direct = 1,
                    this.game.scale.setGameSize(Config.GAME_WIDTH, Config.GAME_HEIGHT)
            ) :
            (this.game.scale['correct'] = !1,
                    Game.direct = -1,
                    this.game.scale.setGameSize(Config.GAME_HEIGHT, Config.GAME_WIDTH)
            );
        this.state.getCurrentState().resize();
    }

}

export default Resize;