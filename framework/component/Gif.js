(function() {
	var Gif = JM.Gif = function(opts) {
		
		this.image = null;
		/*
		 * 帧定义，[[
		 * x,  : 图片横轴位置
		 * y,  : 图片中轴位置
		 * duration : 当前帧持续时间
		 * ]]
		 */
		this.frames = [];
		this.loop = true;
		this.playing = true;
		/*
		 * 第几帧
		 */
		this.index = 0;
		/*
		 * 当前帧播放持续时间
		 */
		this._duration = 0;			    

		JM.extend(this, opts);
	};

	Gif.prototype._gotoFrame = function(index) {
		if (this.frames[index]) {
			this.index = index;
			this._duration = 0;
		}
	};

	Gif.prototype._nextFrame = function() {
		if (this.index < this.frames.length - 1) {
			this._gotoFrame(this.index + 1);
		} else if (this.loop) {
			this._gotoFrame(0);
		} else {
			this.stop();
		}
	};
	
	Gif.prototype.init = function() {
		this._gotoFrame(0);
	};

	Gif.prototype.play = function() {
		this.playing = true;
	};

	Gif.prototype.stop = function() {
		this.playing = false;
	};

	Gif.prototype.update = function(timer) {
		if (!this.playing) {
			
		}else if(this._duration >= this.frames[this.index][2]) {
			this._nextFrame();
		}else{		
			this._duration += timer.step;
		}
	};

	Gif.prototype.render = function(context){
		var frame = this.frames[this.index];
		//console.log(frame);
		context.drawImage(this.image, frame[0], frame[1], this.width, this.height, 0, 0, 40, 30);
	};
})();