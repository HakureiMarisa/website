(function(){
    var Gif = JM.Gif = function(opts){
        /**
         * 动画图片
         */
        this.image = null;
        /**
         * 帧列表
         * @format {
         *     x: 0,
         *     y: 0,
         *     duration: 0,
         *     collRect: [[left, top, width, height]]
         * }
         */
        this.frames = [];
        /**
         * 循环播放
         */
        this.loop = true;
        /**
         * 播放倍速
         */
        this.speed = 1;
        /**
         * @read only
         * 播放状态
         */
        this.playing = false;
        /**
         * @read only
         * 正在播放的帧索引(第一帧从0开始)
         */
        this.currentFrameIndex = 0;
        /**
         * @read only
         * 正在播放的帧对象
         */
        this.currentFrame = null;
        /**
         * @private
         * 当前帧已播放时间(ms)
         */
        this.__framePlayedDuration = 0;
        JM.extend(this, opts);
    };
    
    Gif.prototype.update = function(timer){
        
    };
    
    Gif.prototype.render = function(context){
        this._render(this.currentFrameIndex);
    };
    
    Gif.prototype._render = function(index){
        if(this.frames[index]) {
            this.currentFrameIndex = index;
            this.currentFrame = this.frames[index];
            this.__framePlayedDuration = 0;
        }
    };
    
})()