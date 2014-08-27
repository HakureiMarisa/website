(function(){
    var Game = JM.Game = function(opts){
        this.stage = null;
        this.FPS = 60;
        JM.extend(this, opts);
    }

    Game.prototype.start = function(){   
        var me = this;
        setInterval(function(){me.stage.step();}, 1000/this.FPS);
    };
    
})();