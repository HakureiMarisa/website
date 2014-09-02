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
    	this._interval = setInterval(function(){
    		me.stage.step();
		}, 1000/this.FPS);
    };
})();