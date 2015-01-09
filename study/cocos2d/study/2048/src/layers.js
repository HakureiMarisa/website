var StartLayer = cc.Layer.extend({
    _o: null,
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();
        var menuItem = new cc.MenuItemFont('开始', this.main_game, this);
        var menu = new cc.Menu(menuItem);
        this.addChild(menu);
        menu.x = menu.y = 0;

        menuItem.x = size.width / 2;
        menuItem.y = size.height / 2;
        this._o = menuItem;
        
        var jump = cc.jumpBy(3, cc.p(300, 0), 50, 2);
        var spin1 = cc.rotateBy(1, 30);

        menuItem.runAction(spin1.repeatForever());
        //menuItem.runAction(cc.sequence(jump, jump.reverse()).repeatForever());
        
        console.log(menuItem.getPosition());
        menuItem.runAction(new cc.MoveTo(1, 100, 100));
        console.log(menuItem.getPosition());
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function(key, event){
                var o = event.getCurrentTarget();     
                switch(key){                       
                    case cc.KEY.x:                        
                        console.log(o._o.getPosition());
                        break;
                        
                }
            }                                    

        }, this);   
    },
    main_game: function(){
        cc.director.runScene(new GameLayer);
    }
});

var GameLayer = cc.Layer.extend({
    _space: 90,
    margin_buttom: 5,
    gameArray: [[], [], [], []],
    cardPosition: [[], [], [], []],
    leftArray: new Array(),//剩余的可用格子数组
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        //背景
        var background = new cc.LayerColor(cc.color(204, 192, 176, 255), size.width, size.height);
        this.addChild(background, 0);
        var draw = new cc.DrawNode();
        this.addChild(draw, 1);
        var length = this._space * 4;
        var x_index = (size.width - length) / 2;
       
        for(var index = 0; index < 5; index++){
            draw.drawSegment(cc.p(x_index + index * this._space, this.margin_buttom), cc.p(x_index + index * this._space, this.margin_buttom + length), 10, cc.color(187, 173, 160, 255)); // 竖线
            draw.drawSegment(cc.p(x_index, this.margin_buttom + index * this._space), cc.p(x_index + length, this.margin_buttom + index * this._space), 10, cc.color(187, 173, 160, 255)); // 横线
        }
        
        //新游戏       
        var t = new cc.LabelTTF('新游戏', 25);
        var c = new cc.LayerColor(cc.color(143, 122, 102), t.width, t.height);
        //c.ignoreAnchorPointForPosition(false);
        t.addChild(c, -1);       

        var t1 = new cc.LabelTTF('新游戏', 25);
        var c1 = new cc.LayerColor(cc.color(159, 139, 119), t1.width, t1.height);
        //c1.ignoreAnchorPointForPosition(false);
        t1.addChild(c1, -1);
        
        var restartItem = new cc.MenuItemSprite(t, t1, this.newGame, this);
        var restartMenu = new cc.Menu(restartItem);
        restartMenu.x = size.width / 2;
        restartMenu.y = size.height - 20;
        this.addChild(restartMenu, 2);
        
        
        //分数
        var sorceText = new Score(size.width);        
        sorceText.y = size.height - 80;
        sorceText.setName('score');
        this.addChild(sorceText);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function(key, event){
                var o = event.getCurrentTarget();     
                //设置actionDone竟然没用，我哭了，反正先放着           
                if(typeof o.actionDone == 'undefined') o.actionDone = true;
                if(o.actionDone){
                    o.actionDone = false;
                    switch(key){
                        case cc.KEY.w:
                        case cc.KEY.up:
                            event.getCurrentTarget().slideUp();
                            break;
                        case cc.KEY.a:
                        case cc.KEY.left:
                            event.getCurrentTarget().slideLeft();
                            break;
                        case cc.KEY.s:
                        case cc.KEY.down:
                            event.getCurrentTarget().slideDown();
                            break;
                        case cc.KEY.d:
                        case cc.KEY.right:
                            event.getCurrentTarget().slideRight();
                            break;
                        case cc.KEY.x:
                            console.log('-----显示-----');
                            for(var i = 3; i >= 0; i--){
                                console.log(event.getCurrentTarget().gameArray[0][i].getNumber(),event.getCurrentTarget().gameArray[1][i].getNumber(),event.getCurrentTarget().gameArray[2][i].getNumber(),event.getCurrentTarget().gameArray[3][i].getNumber());
                            }
                            
                            console.log('-----剩余-----');
                            for(var i in event.getCurrentTarget().leftArray){
                                console.log(event.getCurrentTarget().leftArray[i]);
                            };
                                              
                            console.log('-----位置-----');
                            for(var i = 3; i >= 0; i--){
                                console.log(event.getCurrentTarget().gameArray[0][i].getPosition(),event.getCurrentTarget().gameArray[1][i].getPosition(),event.getCurrentTarget().gameArray[2][i].getPosition(),event.getCurrentTarget().gameArray[3][i].getPosition());
                            }                            
                            break;
                            
                    }
                    o.actionDone = true;
                }                                    
            }
        }, this);        
        
        this.initCardPosition();
        this.initGameArray();
        this.reflashLeftArray();
        this.addCard();
        this.addCard();
        /*
        var move = new cc.MoveTo(1, 50, 50);
        var moveback = new cc.MoveTo(0, 300, 300);
        var action = new cc.Sequence(
                move,
                moveback
        );
        this.gameArray[1][1].setNumber(2048);
        this.gameArray[1][1].runAction(action);
        
        var move1 = new cc.MoveTo(1, 55, 55);
        var moveback1 = new cc.MoveTo(0, 305, 305);
        var action1 = new cc.Sequence(
                move1,
                moveback1
        );
        this.gameArray[2][1].setNumber(1024);
        this.gameArray[2][1].runAction(action1);
        */
        
    },
    initCardPosition: function(){
        var size = cc.director.getWinSize();
        var length = this._space * 4;
        var x_index = (size.width - length) / 2;
        
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                var x = x_index + this._space * i + this._space / 2 ;
                var y = this.margin_buttom + this._space * j + this._space / 2 ;
                this.cardPosition[i][j] = [x, y];
            }
        }
    },
    initGameArray: function(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                var card = new Card(0);
                card.setPosition(this.cardPosition[i][j][0], this.cardPosition[i][j][1]);
                this.addChild(card, 10);               
                this.gameArray[i][j] = card;
            }
        }
    },
    reflashLeftArray: function(){       
        var array_length = 0;
        this.leftArray = new Array();
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(this.gameArray[i][j].getDirct() == 0){
                    this.leftArray[array_length] = [i, j];
                    array_length++;
                }                
            }         
        }  
    },
    addCard: function(){
        var i = parseInt(Math.random() * this.leftArray.length);
        var num = Math.random() < 0.3 ? 4 : 2;
        var card = this.gameArray[this.leftArray[i][0]][this.leftArray[i][1]];
        card.setNumber(num);
        card.scale = 0;
        var action = new cc.ScaleTo(0.2, 1);
        card.runAction(action);       
        this.leftArray.splice(i, 1);       
    },
    isOver: function(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(j < 3 && this.gameArray[i][j].getDirct() == this.gameArray[i][j + 1].getDirct()){
                    return false;
                }
                if(i < 3 && this.gameArray[i][j].getDirct() == this.gameArray[i + 1][j].getDirct()){
                    return false;
                }
            }
        }
        return true;
    },
    slideUp: function(){
        var changed = false;
        for(var i=0; i<4; i++){
            for(var j=3; j>-1; j--){                
                for(var k = j - 1; k > -1; k--){
                    if(this.gameArray[i][j].getNumber() == 0){
                        this.gameArray[i][j].setNumber(this.gameArray[i][k].getNumber());
                        this.gameArray[i][k].setNumber(0);
                        changed = true;
                    }else{
                        if(this.gameArray[i][k].getNumber() != 0){
                            if(this.gameArray[i][k].getNumber() == this.gameArray[i][j].getNumber()){
                                this.gameArray[i][j].setNumber(this.gameArray[i][j].getNumber() * 2);
                                this.equalCardAction(this.gameArray[i][j]);
                                this.gameArray[i][k].setNumber(0);
                                changed = true;
                            }
                            break;
                        }
                    }                   
                }
            }
        }
        this.afterAction(changed);
    },   
    slideDown: function(){
        var changed = false;
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){                
                for(var k = j + 1; k < 4; k++){
                    if(this.gameArray[i][j].getNumber() == 0){
                        this.gameArray[i][j].setNumber(this.gameArray[i][k].getNumber());
                        this.gameArray[i][k].setNumber(0);
                        changed = true;
                    }else{
                        if(this.gameArray[i][k].getNumber() != 0){
                            if(this.gameArray[i][k].getNumber() == this.gameArray[i][j].getNumber()){
                                this.gameArray[i][j].setNumber(this.gameArray[i][j].getNumber() * 2);
                                this.equalCardAction(this.gameArray[i][j]);
                                this.gameArray[i][k].setNumber(0);
                                changed = true;
                            }
                            break;
                        }
                    }                   
                }
            }
        }
        this.afterAction(changed);
    },
    slideRight: function(){
        var changed = false;
        for(var i=0; i<4; i++){
            for(var j=3; j>-1; j--){                
                for(var k = j - 1; k > -1; k--){
                    if(this.gameArray[j][i].getNumber() == 0){
                        this.gameArray[j][i].setNumber(this.gameArray[k][i].getNumber());
                        this.gameArray[k][i].setNumber(0);
                        changed = true;
                    }else{
                        if(this.gameArray[k][i].getNumber() != 0){
                            if(this.gameArray[k][i].getNumber() == this.gameArray[j][i].getNumber()){
                                this.gameArray[j][i].setNumber(this.gameArray[j][i].getNumber() * 2);
                                this.equalCardAction(this.gameArray[j][i]);
                                this.gameArray[k][i].setNumber(0);
                                changed = true;
                            }
                            break;
                        }
                    }                   
                }
            }
        }
        this.afterAction(changed);
    },
    slideLeft: function(){
        var changed = false;
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){                
                for(var k = j + 1; k < 4; k++){
                    var result  = this.slideCardAction(k, j, i);
                    if(result == 1){
                        changed = true;
                    }else if(result == 2){
                        changed = true;
                        break;
                    }else if(result == 3){
                        break;
                    }
                }
            }
        }
        this.afterAction(changed);
    },
    slideCardAction: function(fx, tx, y){
        if(this.gameArray[tx][y].getDirct() == 0 && this.gameArray[fx][y].getDirct() != 0){
            this.gameArray[tx][y].setDirct(this.gameArray[fx][y].getDirct());
            this.gameArray[fx][y].setDirct(0);
            var move = new cc.MoveTo(0.2, this.cardPosition[tx][y][0], this.cardPosition[tx][y][1]);
            var moveback = new cc.MoveTo(0, this.cardPosition[fx][y][0], this.cardPosition[fx][y][1]);
            var action = new cc.Sequence(
                    move,
                    new cc.CallFunc(this.onCallback1, this, [fx, tx, y]),
                    moveback
            );
            this.gameArray[fx][y].runAction(action);
            return 1;
        }else if(this.gameArray[tx][y].getDirct() != 0 && this.gameArray[fx][y].getDirct() != 0){
            if(this.gameArray[tx][y].getDirct() == this.gameArray[fx][y].getDirct()){
                this.gameArray[tx][y].setDirct(this.gameArray[fx][y].getDirct() * 2);
                this.gameArray[fx][y].setDirct(0);
                var move = new cc.MoveTo(0.2, this.cardPosition[tx][y][0], this.cardPosition[tx][y][1]);
                var moveback = new cc.MoveTo(0, this.cardPosition[fx][y][0], this.cardPosition[fx][y][1]);
                var action = new cc.Sequence(
                        move,
                        new cc.CallFunc(this.onCallback1, this, [fx, tx, y]),
                        moveback
                );
                this.gameArray[fx][y].runAction(action);
                
                /*var action = new cc.Sequence(new cc.ScaleTo(0.07,1.5), new cc.ScaleTo(0.07,1));
                this.gameArray[tx][y].runAction(action);*/
                var score = this.getChildByName('score');
                score.setScore(score.getScore() + this.gameArray[fx][y].getDirct());
                return 2;
            }
            return 3;
        }
        return 0;
    },
    onCallback1:function (target, data) {
        var k = data[0];
        var j = data[1];
        var i = data[2];
        this.gameArray[j][i].setNumber(this.gameArray[j][i].getDirct());
        this.gameArray[k][i].setNumber(this.gameArray[k][i].getDirct());
    },
    equalCardAction:function(card){
          
    },
    afterAction: function(changed){ 
        if(changed){
            this.reflashLeftArray();
            if(this.leftArray.length != 0){           
                this.addCard();  
                if(this.leftArray.length == 0 && this.isOver()){
                    alert('over');
                }
            } 
        }              
    },
    newGame: function(){
        console.log('新游戏');
    }
});