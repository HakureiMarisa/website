/*
 * 自机类
 */
function Hero(img, position, speed){
    this.position = position;
    this.speed = speed;
    this.ori_speed = speed;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.openfire = true;
    this.counter = 0;   //开火计数器
    this.fireinterval = 0.05; //发弹间隔
    
    this.img = img;
    
    this.refresh = function(context, objs, dt){
        this.draw(context);
        this.move(context, objs);
        this.fire(objs, dt);
    };
    
    this.draw = function(context){
        context.drawImage(this.img, this.position[0], this.position[1]);
    };
    
    this.move = function(context){
        new Move(this, context);
    };
    
    this.fire = function(array, dt) {
        this.counter += dt;
        if ((this.openfire == true) && (this.counter >= this.fireinterval)) {
            var img = new Image();
            img.src = "assets/img/buttle.png";
           
                //var x = radius * Math.sin(angle * (2 * Math.PI / 360));
                //var y = radius * Math.cos(angle * (2 * Math.PI / 360));
            array.push(new Bullet(img, [this.position[0] + this.img.width / 2, this.position[1]], [0, -8]));
          
            this.counter = 0;
        }
    };
    
    this.keydown = function(event) {
        if (event.keyCode == 65) {
            this.left = true;
        }
        if (event.keyCode == 68) {
            this.right = true;
        }
        if (event.keyCode == 87) {
            this.up = true;
        }
        if (event.keyCode == 83) {
            this.down = true;
        }
        if (event.keyCode == 74) {
            this.openfire = true;
        }
        if (event.keyCode == 75) {  
            console.log(this.ori_speed);
            this.speed = [1, 1];
            console.log(this.ori_speed);
        }
//      if (event.keyCode == 32) {
//          this.type = EXPLODING;
//      }
    };
    
    this.keyup = function(event) {
        if (event.keyCode == 65) {
            this.left = false;
        }
        if (event.keyCode == 68) {
            this.right = false;
        }
        if (event.keyCode == 87) {
            this.up = false;
        }
        if (event.keyCode == 83) {
            this.down = false;
        }
        if (event.keyCode == 74) {
            this.openfire = false;
        }
        if (event.keyCode == 75) {
            this.speed = this.ori_speed;           
        }
    };
}