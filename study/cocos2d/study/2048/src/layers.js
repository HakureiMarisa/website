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
    gameArray: [[], [], [], []],
    cardPosition: [[], [], [], []],
    leftArray: new Array(),//剩余的可用格子数组
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var background = new cc.LayerColor(cc.color(180, 170, 160, 255), size.width, size.height); // 灰色背景
        this.addChild(background, 0);
        var draw = new cc.DrawNode();
        this.addChild(draw, 1);
        var length = this._space * 4;
        var x_index = (size.width - length) / 2;
       
        for(var index = 0; index < 5; index++){
            draw.drawSegment(cc.p(x_index + index * this._space, this.margin_buttom), cc.p(x_index + index * this._space, this.margin_buttom + length), 1, cc.color(255, 255, 255, 255)); // 竖线
            draw.drawSegment(cc.p(x_index, this.margin_buttom + index * this._space), cc.p(x_index + length, this.margin_buttom + index * this._space), 1, cc.color(255, 255, 255, 255)); // 横线
        }
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function(key, event){
                var o = event.getCurrentTarget();
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
                            console.log(event.getCurrentTarget().leftArray);
                            for(var i = 0; i < 4; i++){
                                console.log(event.getCurrentTarget().gameArray[i][0].getNumber(),event.getCurrentTarget().gameArray[i][1].getNumber(),event.getCurrentTarget().gameArray[i][2].getNumber(),event.getCurrentTarget().gameArray[i][3].getNumber());
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
        for(var i in this.gameArray){
            for(var j in this.gameArray[i]){
                if(this.gameArray[i][j].getNumber() == 0){
                    this.leftArray[array_length] = [i, j];
                    array_length++;
                }                
            }         
        }  
    },
    addCard: function(){
        var i = parseInt(Math.random() * this.leftArray.length);
        var num = Math.random() < 0.3 ? 4 : 2;
        this.gameArray[this.leftArray[i][0]][this.leftArray[i][1]].setNumber(num);
        this.leftArray.slice(i, 1);       
    },
    isOver: function(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(j < 3 && this.gameArray[i][j].getNumber() == this.gameArray[i][j + 1].getNumber()){
                    return false;
                }
                if(i < 3 && this.gameArray[i][j].getNumber() == this.gameArray[i + 1][j].getNumber()){
                    return false;
                }
            }
        }
        return true;
    },
    slideUp: function(){
        for(var i=0; i<4; i++){
            for(var j=3; j>-1; j--){                
                for(var k = j - 1; k > -1; k--){
                    if(this.gameArray[i][j].getNumber() == 0){
                        this.gameArray[i][j].setNumber(this.gameArray[i][k].getNumber());
                        this.gameArray[i][k].setNumber(0);
                    }else{
                        if(this.gameArray[i][k].getNumber() != 0){
                            if(this.gameArray[i][k].getNumber() == this.gameArray[i][j].getNumber()){
                                this.gameArray[i][j].setNumber(this.gameArray[i][j].getNumber() * 2);
                                this.gameArray[i][k].setNumber(0);
                            }
                            break;
                        }
                    }                   
                }
            }
        }
        this.afterAction();
    },
    slideLeft: function(){
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){                
                for(var k = j + 1; k < 4; k++){
                    if(this.gameArray[j][i].getNumber() == 0){
                        this.gameArray[j][i].setNumber(this.gameArray[k][i].getNumber());
                        this.gameArray[k][i].setNumber(0);
                    }else{
                        if(this.gameArray[k][i].getNumber() != 0){
                            if(this.gameArray[k][i].getNumber() == this.gameArray[j][i].getNumber()){
                                this.gameArray[j][i].setNumber(this.gameArray[j][i].getNumber() * 2);
                                this.gameArray[k][i].setNumber(0);
                            }
                            break;
                        }
                    }                   
                }
            }
        }
        this.afterAction();
    },
    slideDown: function(){
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){                
                for(var k = j + 1; k < 4; k++){
                    if(this.gameArray[i][j].getNumber() == 0){
                        this.gameArray[i][j].setNumber(this.gameArray[i][k].getNumber());
                        this.gameArray[i][k].setNumber(0);
                    }else{
                        if(this.gameArray[i][k].getNumber() != 0){
                            if(this.gameArray[i][k].getNumber() == this.gameArray[i][j].getNumber()){
                                this.gameArray[i][j].setNumber(this.gameArray[i][j].getNumber() * 2);
                                this.gameArray[i][k].setNumber(0);
                            }
                            break;
                        }
                    }                   
                }
            }
        }
        this.afterAction();
    },
    slideRight: function(){
        for(var i=0; i<4; i++){
            for(var j=3; j>-1; j--){                
                for(var k = j - 1; k > -1; k--){
                    if(this.gameArray[j][i].getNumber() == 0){
                        this.gameArray[j][i].setNumber(this.gameArray[k][i].getNumber());
                        this.gameArray[k][i].setNumber(0);
                    }else{
                        if(this.gameArray[k][i].getNumber() != 0){
                            if(this.gameArray[k][i].getNumber() == this.gameArray[j][i].getNumber()){
                                this.gameArray[j][i].setNumber(this.gameArray[j][i].getNumber() * 2);
                                this.gameArray[k][i].setNumber(0);
                            }
                            break;
                        }
                    }                   
                }
            }
        }
        this.afterAction();
    },
    afterAction: function(){       
        if(this.leftArray.length != 0){  
            this.reflashLeftArray();
            this.addCard();            
        }
        if(this.isOver()){
            alert('over');
        }
    }
});