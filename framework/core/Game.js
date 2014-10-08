(function(){
    var Game = JM.Game = function(opts){
        this.stage = null;
        this.FPS = 60;
        JM.extend(this, opts);
        
        this._interval = null;
    }

    Game.prototype.start = function(){   
    	if(this.init){
    		this.init();
    	}
        this._run();
    };
    
    Game.prototype.pause = function(){   
        clearInterval(this._interval);
    };
    
    Game.prototype.resume = function(){   
    	this._run();
    };
    
    Game.prototype._run = function(){   
    	var me = this;
    	me.stage.step();
    	this._interval = setTimeout(function(){
    		me._run();
		}, 1000/this.FPS);
    };
})();