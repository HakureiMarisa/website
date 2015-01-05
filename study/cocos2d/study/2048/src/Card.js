var Card = cc.Sprite.extend({
    ctor:function (num) {
        this._super();
        
        var _num = new cc.LabelTTF(num);       
        this.addChild(_num);   
        _num.setName('number');
        this.setNumber(num);
    },
    setNumber: function(num){
        var labelText = this.getChildByName('number');
        labelText.setString(num);
        this.visible = num != 0;
        this._setCardAttribute(num, labelText);
    },
    _setCardAttribute:function(num, labelText){
        switch (num) {
            case 2:
                labelText.setFontSize(50);
                //backgroundPic.setColor(cc.color(240,230,220));
                break;
            case 4:
                labelText.setFontSize(50);
                //backgroundPic.setColor(cc.color(240,220,200));
                break;
            case 8:
                labelText.setFontSize(50);
                //backgroundPic.setColor(cc.color(240,180,120));
                break;
            case 16:
                labelText.setFontSize(40);
                //backgroundPic.setColor(cc.color(240,140,90));
                break;
            case 32:
                labelText.setFontSize(40);
                //backgroundPic.setColor(cc.color(240,120,90));
                break;
            case 64:
                labelText.setFontSize(40);
                //backgroundPic.setColor(cc.color(240,90,60));
                break;
            case 128:
                labelText.setFontSize(28);
                //backgroundPic.setColor(cc.color(240,90,60));
                break;
            case 256:
                labelText.setFontSize(28);
                //backgroundPic.setColor(cc.color(240,200,70));
                break;
            case 512:
                labelText.setFontSize(28);
                //backgroundPic.setColor(cc.color(240,200,70));
                break;
            case 1024:
                labelText.setFontSize(21);
                //backgroundPic.setColor(cc.color(0,130,0));
                break;
            case 2048:
                labelText.setFontSize(21);
                //backgroundPic.setColor(cc.color(255,0,0));
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