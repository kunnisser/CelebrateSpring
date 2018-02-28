import Game from '../initGame/Game';
class Rank extends Phaser.Group {
    constructor (game) {
        super(game);
        this.style = {
            font: '26px 微软雅黑',
            fill: '#000000'
        };
        this.init();
        this.visible = !1;
    }
    init () {
        let localData = [];
        for (let i = 0; i< 30; i++) {
            localData.push({
                rank: '1',
                nickName: '紧急的西红柿蛋汤鸡蛋鸡蛋汤鸡蛋汤的打法',
                score: '123'
            });
        }
        this.rankData = Game.isDevelopement ? localData : Game.UserInfo.rank;
        this.removeAll(!0);
        this.game.add.text(0, 0, '', this.style, this);
        for (let [i, data] of new Map(this.rankData.map((data, i) => [i, data]))) {
            let text = '第 ' + data.rank + ' 名 : ' + data.nickName.substr(0, 8) + '   ' + data.score + '个';
            let line = this.game.add.text(0, 0, '', this.style, this);
            line.setText(text);
            i % 2 ? line.x = 510 : line.x = 50;
            line.y = 20 + 60 * Math.floor(i / 2);
        }
    }
}

class Info extends Phaser.Group {
    constructor (game) {
        super(game);
        this.style = {
            font: '36px 微软雅黑',
            fill: '#000000'
        };
        this.init();
        this.visible = !1;
    }

    init () {
        let localData = {
            currentScore: 10,
            highest: 10,
            myRank: 1,
            preScore: 0
        };
        let rankData = Game.isDevelopement ? localData : Game.UserInfo;
        this.removeAll(!0);
        let textArr = [
            {
                title: '本轮集福个数 : ',
                key: 'currentScore'
            }
            ,
            {
                title: '历史最高集福 : ',
                key: 'highest'
            },
            {
                title: '当前福字排行 : 第 ',
                key: 'myRank'
            },
            {
                title: '距上一名还差 : ',
                key: 'preScore'
            }
        ];
        this.removeAll(!0);
        this.game.add.text(0, 0, '', this.style, this);
        for (let [i, data] of new Map(textArr.map((data, i) => [i, data]))) {
            let text = data.title + (rankData[data.key] ? rankData[data.key] : '0')  + (i === 2 ? ' 名' : ' 个');
            let line = this.game.add.text(300, 0, '', this.style, this);
            line.setText(text);
            line.y = 70 + 70 * i;
        }
    }
}

class Rule extends Phaser.Group {
    constructor (game) {
        super(game);
        this.style = {
            font: '26px 微软雅黑',
            fill: '#000000'
        };
        this.init();
    }

    init () {
        let textArr = ['', '1. 页面上的5扇门内，只有1扇门内有“福”字，其余4扇门内为囧囧狗；当5扇\n门移动结束后，点击门寻找“福”字；'
        , '2. 若打开门后找到“福”字，则本轮游戏集得的“福”字增加一个；若打开门\n后没有找到“福”字，本轮游戏的“好运指数”将减少一次，每轮游戏的“好\n运指数”共有3次，若3次机会用完，则本轮游戏结束；',
        '3. 每次寻找“福”字限时5秒，若在规定时间内没有寻找“福”字，“好运指\n数”将减少一次；',
            '4. 每轮游戏过程中，找到的“福”字越多，门的移动速度将越快。'];
        for (let [index, ta] of new Map(textArr.map((ta, index) => [index, ta]))) {
            let line = this.game.add.text(40 , 0, ta, this.style, this);
            index === 0 && (line.y = 0);
            index === 1 && (line.y = 36);
            index === 2 && (line.y = 126);
            index === 3 && (line.y = 256);
            index === 4 && (line.y = 346);
        }
        this.visible = !1;
    }
}

class Prize extends Phaser.Group {
    constructor (game) {
        super(game);
        this.style = {
            font: '26px 微软雅黑',
            fill: '#000000',
            align: 'center'
        };
        this.init();
    }

    init () {
        let prizeArr = [];
        let iconArr = ['prize1.png', 'prize2.png', 'prize3.png', 'prize4.png'];
        let text = [
            {
                name: '一等奖',
                prizename: '小米电饭煲',
                index: '1'
            },
            {
                name: '二等奖',
                prizename: '米动手表青春版',
                index: '2-4'
            },
            {
                name: '三等奖',
                prizename: '小米体重秤',
                index: '5-9'
            },
            {
                name: '四等奖',
                prizename: '囧囧狗U盘',
                index: '10-29'
            }
        ];
        for (let i = 0; i < 4; i++) {
            let pa = this.game.add.group(this, 'prizearr');
            pa.x = 160 + (i) * 220;
            pa.y = 120;
            let icon = this.game.add.image(0, 0, 'gameui', iconArr[i], pa);
            icon.anchor.set(0.5);
            let name = this.game.add.text(0, 120, text[i].name, this.style, pa);
            name.anchor.set(0.5);
            let prizename = this.game.add.text(0, 160, text[i].prizename, this.style, pa);
            prizename.anchor.set(0.5);
            let index = this.game.add.text(0, 220, '第 ' + text[i].index + ' 名', this.style, pa);
            index.anchor.set(0.5);
            prizeArr.push(pa);
        }
        this.visible = !1;
    }
}


export {Rank, Info, Rule, Prize};