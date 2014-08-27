/*
 * 移动类
 */
function Move(obj, context){
    if (obj.left) {
        obj.position[0] -= obj.speed[0];
    }
    if (obj.right) {
        obj.position[0] += obj.speed[0];
    }

    if (obj.up) {
        obj.position[1] -= obj.speed[1];
    }
    if (obj.down) {
        obj.position[1] += obj.speed[1];
    }
    
    if (obj.position[0] < 0) { 
        obj.position[0] = 0;
    }

    if (obj.position[0] > context.canvas.width - obj.img.width) {
        obj.position[0] = context.canvas.width - obj.img.width;
    }
    
    if (obj.position[1] < 0) {
        obj.position[1] = 0;
    }

    if (obj.position[1] > context.canvas.height - obj.img.height) {
        obj.position[1] = context.canvas.height - obj.img.height;
    }
}