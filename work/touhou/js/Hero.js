(function(){
    var d = 0.05;

    var Hero = JM.Hero = function(opts){
        Hero.superclass.constructor.call(this, opts);
        this.frameSize = [32, 48];
        this.frames = [[0, 0, d], [32, 0, d], [64, 0, d], [96, 0, d], [128, 0, d], [160, 0, d], [192, 0, d], [224, 0, d]];
        this.width = 32;
        this.height = 48;
        this.x = 320;
        this.y = 240;
        this.fire_interval = 0;
        this.speed = [300, 300];
    };
    JM.inherit(Hero, JM.Gif);

    Hero.prototype.render = function(context){
        Hero.superclass.render.call(this, context);

        context.save();
        context.fillStyle = "#FF0000";
        context.beginPath();
        context.arc(this.x + this.width / 2, this.y + this.height / 2, 5, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.restore();
        
        //context.drawImage(this.image, 0, 0);
        
    };

    Hero.prototype.keydown = function(e){
        if(e.keyCode == JM.Event.KEY.W || e.keyCode == JM.Event.KEY.UP){
            this.up = true;
        }
        if(e.keyCode == JM.Event.KEY.S || e.keyCode == JM.Event.KEY.DOWN){
            this.down = true;
        }
        if(e.keyCode == JM.Event.KEY.A || e.keyCode == JM.Event.KEY.LEFT){
            this.left = true;
        }
        if(e.keyCode == JM.Event.KEY.D || e.keyCode == JM.Event.KEY.RIGHT){
            this.right = true;
        }
        if(e.keyCode == JM.Event.KEY.K || e.keyCode == JM.Event.KEY.SHIFT){
            this.slow = true;
        }
        if(e.keyCode == JM.Event.KEY.J || e.keyCode == JM.Event.KEY.Z){
            this.fire = true;
        }
    };

    Hero.prototype.keyup = function(e){
        if(e.keyCode == JM.Event.KEY.W || e.keyCode == JM.Event.KEY.UP){
            this.up = false;
        }
        if(e.keyCode == JM.Event.KEY.S || e.keyCode == JM.Event.KEY.DOWN){
            this.down = false;
        }
        if(e.keyCode == JM.Event.KEY.A || e.keyCode == JM.Event.KEY.LEFT){
            this.left = false;
        }
        if(e.keyCode == JM.Event.KEY.D || e.keyCode == JM.Event.KEY.RIGHT){
            this.right = false;
        }
        if(e.keyCode == JM.Event.KEY.K || e.keyCode == JM.Event.KEY.SHIFT){
            this.slow = false;
        }
        if(e.keyCode == JM.Event.KEY.J || e.keyCode == JM.Event.KEY.Z){
            this.fire = false;
        }
    };

    Hero.prototype.frames_a = function(type){
        var frames = [];
        switch(type){
            case 'left':
                for(var i = 0; i < 8; i++){
                    frames[i] = [i*32, 48, d];
                }
                return frames;
            case 'right':
                for(var i = 0; i < 8; i++){
                    frames[i] = [i*32, 96, d];
                }
                return frames;
            default:
                for(var i = 0; i < 8; i++){
                    frames[i] = [i*32, 0, d];
                }
                return frames;
        }
    };
    
    Hero.prototype.update = function(timer){
        this.sy = this.sx = 0;
        this.frames = this.frames_a('');
        this.loop_index = 0;
        if(this.up){
            this.sy = -this.speed[1];
        }
        if(this.down){
            this.sy = this.speed[1];
        }
        if(this.right){
            this.sx = this.speed[0];
            this.frames = this.frames_a('right');
            this.loop_index = 5;
        }
        if(this.left){
            this.sx = -this.speed[0];
            this.frames = this.frames_a('left');
            this.loop_index = 5;
        }
        if(this.slow){
            this.sy /= 3;
            this.sx /= 3;
        }
        if(this.fire && this.fire_interval > 0.05){
            var me = this;
            var b = new JM.Bullet({
                y: me.y,
                x: me.x + me.width / 2,
                sy: -1200,
                atk: 10, // 攻击力
                width: 10,
                height: 10,
                collision: function(target){
                    if(target._namespace == JM.Sprite.NS.ENEMY){
                        this.isDied = true;
                    }
                },                
            });
            b.addTarget('boss');            
            stage.addSprite(b);
            this.fire_interval = 0;
        }
        this.fire_interval += timer.step;

        if(this.x < 0){
            this.x = 0;
        }else if(this.x > stage.width - this.width){
            this.x = stage.width - this.width;
        }

        if(this.y < 0){
            this.y = 0;
        }else if(this.y > stage.height - this.height){
            this.y = stage.height - this.height;
        }
    };

    Hero.prototype.getCollision = function(){
        return {
            type: 2,
            x: this.x + this.width / 2 - 2.5,
            y: this.y + this.height / 2 - 2.5,
            r: 5
        };
    };
    Hero.prototype.collision = function(target){
        if(target.namespace == JM.Sprite.NS.ENEMY_BUTTET){
            this.isDied = true;
        }
    };
})();