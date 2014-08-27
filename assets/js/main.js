function main(){
    const FPS = 100;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    
    var buffer_canvas = document.createElement('canvas');
    buffer_canvas.width = canvas.width;
    buffer_canvas.height = canvas.height;
    var buffer_context = buffer_canvas.getContext('2d');
    
    //全局对象列表，在画布上需要画出的对象
    var objs = new Array();
    var time_line = new Date().getTime();
    var ltime = time_line;
    
    this.manage = function() {
        var ctime= new Date().getTime();
        var dt = (ctime - ltime) / 1000;
        ltime = ctime;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        buffer_context.clearRect(0, 0, buffer_canvas.width, buffer_canvas.height);
        
        for (i in objs) {
            if (objs[i].refresh) {
                objs[i].refresh(buffer_context, objs, dt);
            }
        }
        
        context.drawImage(buffer_canvas, 0, 0);
    }
    
    this.run = function() {
        var rocketImg = new Image();
        rocketImg.src = "assets/img/rocket_20_48.png";
        objs.push(new Hero(rocketImg, [buffer_canvas.width / 2 , buffer_canvas.height - 100], [3, 3]));
        
        var boss = new Image();
        boss.src = "assets/img/boss.jpg";
        objs.push(new Enemy(boss, [buffer_canvas.width / 2 - 50 , 10], [0, 0]));
        
        setInterval(this.manage, 1000 / FPS);
    }
    
    document.onkeydown = function(event) {
        for (i in objs) {
            if (objs[i].keydown) {
                objs[i].keydown(event);
            }
        }
    }
    
    document.onkeyup = function(event) {
        for (i in objs) {
            if (objs[i].keyup) {
                objs[i].keyup(event);
            }
        }
    }
}