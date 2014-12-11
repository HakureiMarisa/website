var StartScene = cc.Scene.extend({
    ctor: function(){
        this._super();
        var lay = new StartLayer();
        this.addChild(lay);
    }
});