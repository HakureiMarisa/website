function Bullet(image, position, speed){
    this.image = image;
    this.speed = speed;

    this.position = position;
    
    this.refresh = function(context, objs){
        this.draw(context, objs);
        this.move(context, objs);

    };
    
    this.draw = function(context) {
        context.drawImage(this.image, this.position[0] - this.image.width / 2, this.position[1] - this.image.height / 2);
    }
    
    this.collision = function(){
        
    }
    
    this.move = function(context, array) {
        this.position[0] += this.speed[0];
        this.position[1] += this.speed[1];
        
        if (!this.isInCanvas(context)) {
            for (i in array) {
                if (array[i] === this) {
                    array.splice(i, 1);
                    break;
                }
            }
        }
    }
    
    this.isInCanvas = function(context) {
        if (this.position[0] + this.image.width / 2 < 0 || this.position[0] - this.image.width / 2 > context.canvas.width) {
            return false;
        }
        if (this.position[1] + this.image.height / 2 < 0 || this.position[1] - this.image.height / 2 > context.canvas.height) {
            return false;
        }
        return true;
    }
}