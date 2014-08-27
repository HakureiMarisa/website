function Enemy(img, position, speed){
    this.position = position;
    this.speed = speed;
    
    this.draw = function(context){
        context.drawImage(img, this.position[0], this.position[1], 100, 100);
    }
    
    this.refresh = function(context, objs, dt){
        this.draw(context);
        ///this.move(context, objs);
        this.fire(objs, dt);
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
} 