var Card = cc.Sprite.extend({
    _dirct: 0,  
    
    ctor:function (num) {
        this._super();
        
        var _num = new cc.LabelTTF(num);  
        _num._setFont('normal bold 60px Arial');
        this.addChild(_num);   
        _num.setName('number');
        this.setNumber(num, 0);
        
        
        var c = new cc.LayerColor(cc.color(204, 192, 179), 70, 70);
        c.ignoreAnchorPointForPosition(false);  
        c.setName('background');
        this.addChild(c, -1);
    },
    setNumber: function(num){
        var labelText = this.getChildByName('number');
        labelText.setString(num);
        this.visible = num != 0;
        this.setDirct(num);
        this._setCardAttribute(num, labelText);
    },
    setDirct: function(num){
        this._dirct = num;
    },
    getDirct: function(){
        return this._dirct;
    },
    _setCardAttribute:function(num, labelText){
        var background = this.getChildByName('background');
        switch (num) {
            case 2:
                labelText.setFontSize(50);
                labelText.setFontFillColor(cc.color(119, 110, 101));
                background.setColor(cc.color(238, 228, 218));
                break;
            case 4:
                labelText.setFontSize(50);
                labelText.setFontFillColor(cc.color(119, 110, 101));
                background.setColor(cc.color(237, 224, 200));
                break;
            case 8:
                labelText.setFontSize(50);
                labelText.setFontFillColor(cc.color(255, 255, 255));
                background.setColor(cc.color(242, 177, 121));
                break;
            case 16:
                labelText.setFontSize(40);
                labelText.setFontFillColor(cc.color(255, 255, 255));
                background.setColor(cc.color(245, 149, 99));
                break;
            case 32:
                labelText.setFontSize(40);
                background.setColor(cc.color(246, 124, 95));
                break;
            case 64:
                labelText.setFontSize(40);
                background.setColor(cc.color(246, 94, 59));
                break;
            case 128:
                labelText.setFontSize(28);
                background.setColor(cc.color(237 , 207 , 114));
                break;
            case 256:
                labelText.setFontSize(28);
                background.setColor(cc.color(237 , 207, 97));
                break;
            case 512:
                labelText.setFontSize(28);
                background.setColor(cc.color(0 , 9, 192));
                break;
            case 1024:
                labelText.setFontSize(21);
                background.setColor(cc.color(51 , 181 , 229));
                break;
            case 2048:
                labelText.setFontSize(21);
                background.setColor(cc.color(255,0,0));
                break;
        }
    },
    getNumber:function() {
        return parseInt(this.getChildByName('number').getString());
    }
});

var Score = cc.Sprite.extend({
    ctor: function(pw){
        this._super();
        var text = new cc.LabelTTF('分数:');
        text.setName('label');
        text.setFontSize(21);
        text.setAnchorPoint(0, 0.5);
        this.addChild(text);
 
        var score = new cc.LabelTTF('0');
        this.addChild(score);
        score.setName('score');
        score.setFontSize(21);
        score.setAnchorPoint(0, 0.5);
        score.x = text.width;
        this._setAttribute(pw);
    },
    _setAttribute: function(pw){
        pw = pw || this.getParent().width;
        var score = this.getChildByName('score');
        var label = this.getChildByName('label');
        this.x = (pw - (score.width + label.width)) / 2;
    },
    setScore: function(score){
        var labelText = this.getChildByName('score');
        labelText.setString(score);
        this._setAttribute();
    },
    getScore:function(){
        return parseInt(this.getChildByName('score').getString());
    }
});

var NewGame = cc.Sprite.extend({
   ctor: function(isNew){
       this._super();
       var t = new cc.LabelTTF('新游戏', 25);       
       if(isNew){
           t.setString('zz');
       }
       //this.addChild(t, 1);

       var c = new cc.LayerColor(cc.color(143, 122, 102), t.width + 10, t.height + 10);
       c.ignoreAnchorPointForPosition(false);
       this.addChild(c, 1);       
   } 
});