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