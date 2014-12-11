(function(){
    var Stage = JM.Stage = function(opts){
        this.width = 0;
        this.height = 0;
        this.sprites = [];
        JM.extend(this, opts);
    };

    
    Stage.prototype.step = function(timer){  
    
        this._update(timer);        
        this._afterUpdate(timer);
        this._render(timer);
    };

    Stage.prototype._update = function(timer){
        if(this.sprites.length > 30){
            alert('cc');
        }
        
        //更新每个精灵的状态
        for(var i in this.sprites){
            if(this.sprites[i].isDied){
                this.removeSprite(this.sprites[i]);
                continue;
            }       
            this.sprites[i]._update(timer);
        }
    };
    
    Stage.prototype._render = function(timer){
        this.context.clearRect(0, 0, this.width, this.height);
        for(var i in this.sprites){
            this.sprites[i].render(this.context);
        }       
    };
    
    Stage.prototype._afterUpdate = function(timer){
        //判断每个精灵的状态，用以决定此精灵是否还有必要存在
        for(var i in this.sprites){
            this.sprites[i].afterUpdate(this);
        }      
    };
    
    Stage.prototype.addSprite = function(sprite, namespace){
        if(!sprite._id){
            sprite._id = Math.random();
        }     
        
        if(namespace){
            sprite._namespace = namespace;
        }
        
        this.sprites.push(sprite);
    };
    
    Stage.prototype.getSprite = function(namespace){
        var sprite = [];
        for(var i in this.sprites){
            if(this.sprites[i]._namespace == namespace){
                sprite.push(this.sprites[i]);
            }     
        }

        if(sprite.length == 1){
            return sprite[0];
        }else if(sprite.length == 0){
            return null;
        }
        return sprite;
    };
    
    Stage.prototype.removeSprite = function(obj){
        var compare_key = '_id';
        if(typeof obj == 'String'){
            compare_key = '_namespace';
        }
        
        for(var i in this.sprites){
            if(eval("this.sprites[i]." + compare_key + " == obj." + compare_key)){
                this.sprites.splice(i, 1); 
                break;
            }     
        }
    };
})();