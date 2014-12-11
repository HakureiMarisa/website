(function(){
    var Game = JM.Game = function(opts){
        this.stage = null;
        this.FPS = 60;
        JM.extend(this, opts);
        
        this._interval = null;
    }

    Game.prototype.init = function(){
        this.timer = {
            now: Date.now(),
            last: Date.now(),
            step: 0
        };
    }
    
    Game.prototype.start = function(){
        this._run();
    };
    
    Game.prototype.pause = function(){   
        this.status = 'pause';
    };
    
    Game.prototype.resume = function(){ 
        this.status = 'running';
    	this._run();
    };
    
    Game.prototype._run = function(){   
    	var me = this;

    	 var now = Date.now();       
         var last = this.timer.last = this.timer.now;
         this.timer.now = now;
         this.timer.step = (now - last)/1000;
    	
    	me.stage.step(this.timer);
    	if(this.status == 'pause'){
    	    clearTimeout(this._interval);
    	}else{
    	    this._interval = setTimeout(function(){
                me._run();
            }, 1000/this.FPS);
    	}  	
    };
})();