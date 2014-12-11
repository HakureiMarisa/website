/**
 * 精灵组件
 */
(function(){
    var Sprite = JM.Sprite = function(opts){
        this.x = 0;
        this.y = 0;
        this.sx = 0;
        this.sy = 0;
        //角度
        this.rotation = 0;

        this.width = 0;
        this.height = 0;
        JM.extend(this, opts);
    };

    Sprite.prototype.addTarget = function(target){
        this._targets = this._targets || [];
        this._targets.push(target);
        
    };

    Sprite.prototype.afterUpdate = function(stage){
        if((this.x > stage.width) || (this.x < 0) || (this.y < 0) || (this.y > stage.height)){
            this.isDied = true;
            return;
        }
        //console.log(this._targets);
        if(this._targets){
            for( var i in this._targets){             
                var target = stage.getSprite(this._targets[i]);
                if(target && JM.testCollision(this.getCollision(), target.getCollision())){
                    this.collision(target);
                    target.collision(this);
                }
            }
        }
    };
    /*
     * 获取碰撞体积
     */
    Sprite.prototype.getCollision = function(){
        return {
            type: 1,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    };

    /*
     * 碰撞处理
     */
    Sprite.prototype.collision = function(target){

    };

    /**
     * 更新精灵状态
     */
    Sprite.prototype._update = function(timer){
        // 计算精灵位置
        this.x += (this.sx * timer.step);
        this.y += (this.sy * timer.step);
        if(this.update){
            this.update(timer);
        }
    };

    /**
     * 绘制精灵
     */
    Sprite.prototype.render = function(context){
        // 旋转
        if(this.rotation % 360 > 0){
            context.save();
            context.translate(this.x, this.y);

            var offset = [this.width / 2, this.height / 2];
            context.translate(offset[0], offset[1]);
            context.rotate(this.rotation % 360 / 180 * Math.PI);
            context.translate(-offset[0], -offset[1]);
            context.restore();
        }
        if(this.img){
            this.frame_x = this.frame_x || 0;
            this.frame_y = this.frame_y || 0;
            this.frameSize_width = this.frameSize_width || this.width;
            this.frameSize_height = this.frameSize_height || this.height;
  
            context.drawImage(this.img, this.frame_x, this.frame_y, this.frameSize_width, this.frameSize_height, this.x, this.y, this.width, this.height);
        }else{
            context.fillRect(this.x, this.y, this.width, this.height);
        }    
    };
    
    Sprite.NS = {
         HERO: '自机',  
         HERO_BULLET: '自机弹',
         HERO_BOOM: '自机炸',
         ENEMY: '敌机',
         ENEMY_BULLET: '敌机弹',
         ITEM: '道具',
    }; 
})();
