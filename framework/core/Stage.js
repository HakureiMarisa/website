(function(){
    var Stage = JM.Stage = function(opts){
        this.sprites = this.sprites || [];
        JM.extend(this, opts);
        this.timer = {
            now: Date.now(),
            last: Date.now(),
            step: 0
        };
        
        if(this.context == null) throw "JM.Stage 必须包含一个context.";
    }

    Stage.prototype.step = function(){  
        var now = Date.now();       
        var last = this.timer.last = this.timer.now
        this.timer.now = now;
        this.timer.step = (now - last)/1000;
        
        this._render();
        this._update();       
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
        this.sprites.push(sprite);
    }
})();