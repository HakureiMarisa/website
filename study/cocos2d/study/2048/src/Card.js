var Card = cc.Sprite.extend({
    ctor:function (num) {
        this._super();
        
        var _num = new cc.LabelTTF(num);
        _num.fontSize = 100;
        _num.setPosition(100, 200);
        _num.setName = 'num';
        this.addChild(_num);
    },
    getNumber:function() {
        return this.getChildByName('num');
    },
});