(function(){
    var Bullet = JM.Bullet = function(opts){
        Bullet.superclass.constructor.call(this, opts);
    };
    JM.inherit(Bullet, JM.Sprite);

    Bullet.prototype.render = function(context){
        Bullet.superclass.render.call(this, context);    
    };
    
    /*
    Bullet.prototype.afterUpdate = function(timer, context){
        //console.log(jue);
        var buttle = {
            type: 1,
            x: this.x - 12,
            y: this.y - 64,
            width: 24,
            height: 64
        };
        var jue = stage.getSprite('boss');
        var enem = jue.getCollision();
        
        if(JM.testCollision(buttle, enem)){
            this.isDied = true;
            jue.hp -= this.atk;
        }
    };
   
    render: function(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(270 * Math.PI / 180);
        context.drawImage(me.image, 0, 178, 64, 12, 0, 0, 64, 12);
        context.drawImage(me.image, 0, 178, 64, 12, 0, -12, 64, 12);
        // context.fillRect(0, -12, 64, 12);
        context.restore();
    },*/
    
    Bullet.prototype.getCollision = function(){
        return {
            type: 2,
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            r: 5
        };
    };

})();