var Hero = function(props){
    Hero.superClass.constructor.call(this, props);

    this.speed = props.speed;
    this.init();
};
Q.inherit(Hero, Q.DisplayObjectContainer);

Hero.prototype.init = function(){
    var img = new Image();
    img.src = '/assets/img/rocket_20_48.png';

    var head = new Q.Bitmap({
        image : img,
        x : 5,
        y : 0
    });

    this.addChild(head);

    // 初始化数据。
    this.up = this.down = this.right = this.left = false;
};

// 按键
Hero.prototype.move = function(e){
    var key = e.keyCode;
    var flag = e.type == 'keydown';
    if(key == Q.KEY.A || key == Q.KEY.LEFT){
        this.left = flag;
    }
    if(key == Q.KEY.D || key == Q.KEY.RIGHT){
        this.right = flag;
    }
    if(key == Q.KEY.W || key == Q.KEY.UP){
        this.up = flag;
    }
    if(key == Q.KEY.S || key == Q.KEY.DOWN){
        this.down = flag;
    }
};

Hero.prototype.update = function(){
    if(this.left){
        this.x -= this.speed[0];
    }
    if(this.right){
        this.x += this.speed[0];
    }
    if(this.up){
        this.y -= this.speed[1];
    }
    if(this.down){
        this.y += this.speed[1];
    }
};