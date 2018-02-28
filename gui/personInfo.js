import Graphics from '../utils/Graphics';
class personInfo extends Phaser.Group {
    constructor (game, world) {
        super(game, world);
        this.score = 0;
        this.currentLife = 3;
        this.piStyle = {
          font: '24px 微软雅黑',
          fill: '#ffebaf',
          fontWeight: 'Bold'
    };
        this.init();
    }

    init () {
        this.generateAvator();
        this.addScore();
        this.lifeGroup = this.game.add.group(this, 'lifeGp');
        this.setLife(this.currentLife);
        this.addChance();
    }

    generateAvator () {
        this.avatorBg = this.game.add.graphics(0, 0, this);
        this.avatorBg.beginFill(0xffffff);
        this.avatorBg.drawRoundedRect(0, 0, 84, 84, 5);
        this.avatorBg.endFill();
        this.avatorBg.anchor.set(0.5);
        this.avatorBg.position.set(-42, -42);
        this.avator = this.game.add.image(0, 0, 'avator', null, this);
        this.avator.width = 76;
        this.avator.height = 76;
        this.avator.anchor.set(0.5);
    }

    addScore () {
        this.scoreText = this.game.add.text(60, -35, '集 福 个 数 : ' + this.score + ' 个', this.piStyle, this);
    }

    setScore (score) {
        this.scoreText.setText('集 福 个 数 : ' + score + ' 个');
    }

    addChance () {
        this.lifeGroup.position.set(210, 13);
        this.chanceText = this.game.add.text(60, 5, '好 运 指 数 : ', this.piStyle, this);
    }

    setLife (cf) {
        this.lifeGroup.removeAll();
        for (let i = 0; i < cf; i++) {
            let l = this.generateLifeOn();
            l.x = i * 60;
            this.lifeGroup.add(l);
        }

        for (let i = 0; i < 3 - cf; i++) {
            let l = this.generateLifeOff();
            l.x = (2 - i) * 60;
            this.lifeGroup.add(l);
        }
    }

    generateLifeOn () {
        let lifeOn = this.game.add.graphics(0, 0);
        lifeOn.lineStyle(5, 0xffebaf, 0.8);
        lifeOn.beginFill(0xffebaf);
        lifeOn.drawRoundedRect(0, 0, 50, 16, 5);
        lifeOn.endFill();
        return lifeOn;
    }

    generateLifeOff () {
        let lifeOff = this.game.add.graphics(0, 0);
        lifeOff.lineStyle(5, 0xffebaf, 0.8);
        lifeOff.drawRoundedRect(0, 0, 50, 16, 5);
        return lifeOff;
    }
}

export default personInfo;