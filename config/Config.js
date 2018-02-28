import Base from './Base';

class Config {
    static SOURCE_GAME_WIDTH = 2 * Base.init().x;
    static SOURCE_GAME_HEIGHT = 2 * Base.init().y;
    static GAME_WIDTH = Config.SOURCE_GAME_WIDTH;
    static GAME_HEIGHT = Config.SOURCE_GAME_HEIGHT;
    static HALF_GAME_WIDTH = Config.SOURCE_GAME_WIDTH * .5;
    static HALF_GAME_HEIGHT = Config.SOURCE_GAME_HEIGHT * .5;
    static WORLD_SCALE = 1;
    static refreshConfig (isDesktop) {
        if (isDesktop) {
            Config.GAME_WIDTH = 1334;
            Config.GAME_HEIGHT = 750;
            Config.HALF_GAME_WIDTH = Config.GAME_WIDTH * .5;
            Config.HALF_GAME_HEIGHT = Config.GAME_HEIGHT * .5;
        } else {
            Config.GAME_WIDTH = 2 * Base.init().x;
            Config.GAME_HEIGHT = 2 * Base.init().y;
            Config.HALF_GAME_WIDTH = Base.init().x;
            Config.HALF_GAME_HEIGHT = Base.init().y;
        }
    }
}

export default Config;