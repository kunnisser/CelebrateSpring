import Config from '../config/Config';
import Title from '../gui/title';
import PersonInfo from '../gui/personInfo';
import Navbar from '../gui/Navbar';
import Modal from '../gui/modal';
import Game from '../initGame/Game';

class Menu extends Phaser.State {
    constructor () {
        super();
    }

    init (obj) {
        this.frompreload = obj.param;
        this.overlay = obj.overlay;
        this.addGameBg();
        this.addTitle();
        this.addPersonInfo();
        this.addModal();
        this.addNavbar();
        this.frompreload && this.handleMusicOnStart();
        this.resize();
    }

    create () {
        this.hideOverlay();
    }

    handleMusicOnStart () {
        this.startMusic();
    }

    startMusic () {
        Game.mainMusicLoop && Game.mainMusicLoop.play();
    }

    addGameBg () {
        this.Bg = this.game.add.image(0, 0, 'bg', null, this.world);
    }

    addTitle () {
        this.title = new Title(this.game, this.world);
    }

    addPersonInfo () {
        this.personInfo = new PersonInfo(this.game, this.world);
        this.personInfo.position.set(70, 70);
    }

    addNavbar () {
        this.navbar = new Navbar(this.game, this.world, this.modal);
        this.world.swap(this.navbar, this.modal);
    }

    addModal () {
        this.modal = new Modal(this.game, this.world);
    }

    resizeBg () {
        this.Bg.width = Config.GAME_WIDTH;
        this.Bg.height = Config.GAME_HEIGHT;
    }

    resizeTitle () {
        this.title.x = Config.HALF_GAME_WIDTH;
        this.title.y = Config.HALF_GAME_HEIGHT;
        this.title.scale.set(Config.GAME_HEIGHT / 750);
    }

    resizeNavbar () {
        this.navbar.x = Config.GAME_WIDTH - 308;
        this.navbar.y = 72;
    }

    resizeModal () {
        this.modal.x = Config.HALF_GAME_WIDTH;
        this.modal.y = Config.HALF_GAME_HEIGHT;
        this.modal.cushion.scale.set(Config.GAME_WIDTH, Config.GAME_HEIGHT);
    }

    resize () {
        this.resizeBg();
        this.resizeTitle();
        this.resizeNavbar();
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

export default Menu;