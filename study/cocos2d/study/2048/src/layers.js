var StartLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();
        var menuItem = new cc.MenuItemFont('开始', this.main_game, this);
        var menu = new cc.Menu(menuItem);
        this.addChild(menu);
        menu.x = menu.y = 0;

        menuItem.x = size.width / 2;
        menuItem.y = size.height / 2;

        var jump = cc.jumpBy(3, cc.p(300, 0), 50, 2);
        var spin1 = cc.rotateBy(1, 30);

        menuItem.runAction(spin1.repeatForever());
        // menuItem.runAction(cc.sequence(jump,
        // jump.reverse()).repeatForever());

    },
    main_game: function(){
        cc.director.runScene(new GameLayer);
    }
});

var GameLayer = cc.Layer.extend({
    _space: 90,
    margin_buttom: 5,
    gameArray: [],
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();
        this.addCard(2);

        var background = new cc.LayerColor(cc.color(180, 170, 160, 255), size.width, size.height); // 灰色背景
        this.addChild(background, 0);
        var draw = new cc.DrawNode();
        this.addChild(draw, 1);
        var length = this._space * 4;
        var x_index = (size - length) / 2;

        for(var index = 0; index < 5; index++){
            draw.drawSegment(cc.p(x_index + index * this._space, this.margin_buttom), cc.p(x_index + index * this._space, this.margin_buttom + length), 1, cc.color(255, 255, 255, 255)); // 竖线
            draw.drawSegment(cc.p(x_index, this.margin_buttom + index * this._space), cc.p(x_index + length, this.margin_buttom + index * this._space), 1, cc.color(255, 255, 255, 255)); // 横线
        }
    },
    addCard: function(num){

    }
});