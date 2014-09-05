(function(){
    var Stage = JM.Stage = function(opts){
        this.sprites = this.sprites || [];
        JM.extend(this, opts);
        this.timer = {
            now: Date.now(),
            last: Date.now(),
            step: 0
        };
        this._initFlage = false;
        if(this.context == null) throw "JM.Stage 必须包含一个context.";
    }

    Stage.prototype._init = function(){
        this.timer = {
            now: Date.now(),
            last: Date.now(),
            step: 0
        };
        this._initFlage = true;
    };
    
    Stage.prototype.step = function(){  
        if(!this._initFlage){
            this._init();
        }
        var now = Date.now();       
        var last = this.timer.last = this.timer.now
        this.timer.now = now;
        this.timer.step = (now - last)/1000;
        this._update(); 
        this._render();
              
    }

    Stage.prototype._update = function(){
        for(var i in this.sprites){
            this.sprites[i]._update(this.timer);
        }
    }
    
    Stage.prototype._render = function(){
        this.context.clearRect(0, 0, this.width, this.height);
        for(var i in this.sprites){
            this.sprites[i].render(this.context);
        }       
    }
    
    Stage.prototype.addSprite = function(sprite){
        if(!sprite._id){
            sprite._id = Date.now();
        }
        this.sprites.push(sprite);
    }
    
    Stage.prototype.removeSprite = function(id){
        for(var i in this.sprites){
            if(this.sprites[i]._id == id){
                this.sprites.splice(i, 1); 
                break;
            }     
        }
    }
})();