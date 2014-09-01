/**
 * 精灵组件
 */
(function() {
    var Sprite = JM.Sprite = function(opts) {

        /**
         * 当前动画
         */
        this.anim = null;

        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;

        this.width = 0;
        this.height = 0;
        JM.extend(this, opts);
    }

    /**
     * 设置精灵碰撞区域
     */
    Sprite.prototype.setCollision = function() {
    	
    }

    /**
     * 更新精灵状态
     */
    Sprite.prototype._update = function(timer) {
        // 计算精灵位置
        this.x += this.speedX * timer.step;
        this.y += this.speedY * timer.step;
        
        // 更新当前动画帧状态
        if(this.anim) {
            this.anim.update(timer);
        }
        if(this.update){
        	this.update(timer);
        }
    }
    
    /**
     * 绘制精灵
     */
    Sprite.prototype.render = function(context) {
        var anim = this.anim;
        if(anim) {
        	anim.render(context);
        }else{
        	throw '自己实现精灵的渲染方法render';
        }
    }
})();
