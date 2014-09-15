/**
 * 精灵组件
 */
(function() {
    var Sprite = JM.Sprite = function(opts) {
        this.x = 0;
        this.y = 0;
        this.sx= 0;
        this.sy = 0;

        this.width = 0;
        this.height = 0;
        JM.extend(this, opts);
    }

    /**
     * 设置精灵碰撞区域
     */
    Sprite.prototype.setCollision = function() {
    	
    }

    Sprite.prototype._testCollision = function(timer, context) {
        if((this.x > context.width) || (this.x < 0) || (this.y < 0) || (this.y > context.height)){           
            stage.removeSprite(this._id); 
        }
    }
    
    /**
     * 更新精灵状态
     */
    Sprite.prototype._update = function(timer) {
        // 计算精灵位置
        this.x += (this.sx * timer.step);
        this.y += (this.sy * timer.step);
        if(this.update){
        	this.update(timer);
        }
    }
    
    /**
     * 绘制精灵
     */
    Sprite.prototype.render = function(context) {
    	throw '自己实现精灵的渲染方法render';
    }
})();
