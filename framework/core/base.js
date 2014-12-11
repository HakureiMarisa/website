(function(win){
    var JM = win.JM = win.JM || {};
    
    /*
     * 继承
     */
    JM.inherit = function(childClass, parentClass){
        var Constructor = new Function();
        Constructor.prototype = parentClass.prototype;
        childClass.prototype = new Constructor();
        childClass.prototype.constructor = childClass;
        childClass.superclass = parentClass.prototype;

        if(childClass.prototype.constructor == Object.prototype.constructor) {
            childClass.prototype.constructor = parentClass;
        }
    };
    
    JM.extend = function(obj, newobj){
        for(var key in newobj){
            obj[key] = newobj[key];
        }
        return obj;
    };
    
    JM.isArray = function(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';  
    };
    
    /**
     * 检测显示对象obj是否与点x，y发生了碰撞。
     * @param {DisplayObject} obj 要检测的显示对象。
     * @param {Number} x 指定碰撞点的x坐标。
     * @param {Number} y 指定碰撞点的y坐标。
     * @param {Boolean} usePolyCollision 指定是否采用多边形碰撞。默认为false。
     * @return {Number} 如果点x，y在对象obj内为1，在外为-1，在边上为0。
     */
    JM.hitTestPoint = function(obj, x, y, usePolyCollision){
    	//var b = obj.getBounds(), len = b.length;
    	var b = obj, len = b.length;
    	var hit = x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height;
    	
    	if(hit && usePolyCollision)
    	{
    		var cross = 0, onBorder = false, minX, maxX, minY, maxY;		
    		for(var i = 0; i < len; i++)
    		{
    			var p1 = b[i], p2 = b[(i+1)%len];			
    			
    			if(p1.y == p2.y && y == p1.y)
    			{
    				p1.x > p2.x ? (minX = p2.x, maxX = p1.x) : (minX = p1.x, maxX = p2.x);
    				if(x >= minX && x <= maxX)
    				{
    					onBorder = true;
    					continue;
    				}
    			}
    			
    			p1.y > p2.y ? (minY = p2.y, maxY = p1.y) : (minY = p1.y, maxY = p2.y);
    			if(y < minY || y > maxY) continue;
    			
    			var nx = (y - p1.y)*(p2.x - p1.x) / (p2.y - p1.y) + p1.x;
    			if(nx > x) cross++;
    			else if(nx == x) onBorder = true;			
    		}
    		
    		if(onBorder) return 0;
    		else if(cross % 2 == 1) return 1;
    		return -1;
    	}
    	return hit ? 1 : -1;
    };

    /**
     * 检测显示对象obj1和obj2是否发生了碰撞。
     * @param {DisplayObject} obj1 要检测的显示对象。
     * @param {DisplayObject} obj2 要检测的显示对象。
     * @param {Boolean} usePolyCollision 指定是否采用多边形碰撞。默认为false。
     * @return {Boolean} 发生碰撞为true，否则为false。
     */
    JM.hitTestObject = function(obj1, obj2, usePolyCollision){
    	//var b1 = obj1.getBounds(), b2 = obj2.getBounds();
    	var b1 = obj1, b2 = obj2;

    	var hit = b1.x <= b2.x + b2.width && b2.x <= b1.x + b1.width && 
    				   b1.y <= b2.y + b2.height && b2.y <= b1.y + b1.height;
    	
    	if(hit && usePolyCollision)
    	{
    		hit = JM.polygonCollision(b1, b2);
    		return hit !== false;
    	}
    	return hit;
    };

    /**
     * 采用Separating Axis Theorem(SAT)的多边形碰撞检测方法。
     * @private
     * @param {Array} poly1 多边形顶点组成的数组。格式如：[{x:0, y:0}, {x:10, y:0}, {x:10, y:10}, {x:0, y:10}]。
     * @param {Array} poly2 多边形顶点组成的数组。格式与参数poly1相同。
     * @param {Boolean} 发生碰撞为true，否则为false。 
     */
    JM.polygonCollision = function(poly1, poly2){	
    	var result = doSATCheck(poly1, poly2, {overlap:-Infinity, normal:{x:0, y:0}});
    	if(result) return doSATCheck(poly2, poly1, result);
    	return false;
    };

    
    JM.testCollision = function(obj1, obj2){
        switch(obj1.type + obj2.type) {
            case 2:
                return obj1.x <= obj2.x + obj2.width && obj2.x <= obj1.x + obj1.width && 
                obj1.y <= obj2.y + obj2.height && obj2.y <= obj1.y + obj1.height;
                break;
            case 3:
                var rect = obj1;
                var circle = obj2;
                if(obj1.type == 2){
                    rect = obj2;
                    circle = obj1;
                }
                //左上角
                var lu = {x: rect.x, y: rect.y};
                //左下角
                var ld = {x: rect.x, y: rect.y + rect.height};
                //右上角
                var ru = {x: rect.x + rect.width, y: rect.y};
                //右下角
                var rd = {x: rect.x + rect.width, y: rect.y + rect.height};
                if(this.calcDist(circle, lu) < circle.r 
                        || this.calcDist(circle, ld) < circle.r 
                        || this.calcDist(circle, ru) < circle.r
                        || this.calcDist(circle, rd) < circle.r
                        || (lu.x < circle.x && circle.x < ru.x && ((lu.y - circle.r) < circle.y && circle.y < (rd.y + circle.r)))
                        || (lu.y < circle.y && circle.y < ld.y && ((lu.x - circle.r) < circle.x && circle.x < (ru.x + circle.r)))
                ){
                    return true;
                }
                return false;
                break;
            case 4:
                return Math.sqrt(Math.pow(obj1.x - obj2.x, 2)+ Math.pow(obj1.x - obj2.x, 2)) > obj1.r + obj2.r;
                break;
            default:
                break;
        }      
    };
    /*
     * 计算两点距离
     */
    JM.calcDist = function(point1, point2){       
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    };
    
    function doSATCheck(poly1, poly2, result){
    	var len1 = poly1.length, len2 = poly2.length, currentPoint, nextPoint, distance, min1, max1, min2, max2, dot, overlap, normal = {x:0, y:0};
    	
    	for(var i = 0; i < len1; i++)
    	{
    		currentPoint = poly1[i];
    		nextPoint = poly1[(i < len1-1 ? i+1 : 0)];
    		
    		normal.x = currentPoint.y - nextPoint.y;
    		normal.y = nextPoint.x - currentPoint.x;
    		
    		distance = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
    		normal.x /= distance;
    		normal.y /= distance;
    		
    		min1 = max1 = poly1[0].x * normal.x + poly1[0].y * normal.y;		
    		for(var j = 1; j < len1; j++)
    		{
    			dot = poly1[j].x * normal.x + poly1[j].y * normal.y;
    			if(dot > max1) max1 = dot;
    			else if(dot < min1) min1 = dot;
    		}
    		
    		min2 = max2 = poly2[0].x * normal.x + poly2[0].y * normal.y;		
    		for(j = 1; j < len2; j++)
    		{
    			dot = poly2[j].x * normal.x + poly2[j].y * normal.y;
    			if(dot > max2) max2 = dot;
    			else if(dot < min2) min2 = dot;
    		}
    		
    		if(min1 < min2)
    		{
    			overlap = min2 - max1;
    			normal.x = -normal.x;
    			normal.y = -normal.y;
    		}else
    		{
    			overlap = min1 - max2;
    		}
    		
    		if(overlap >= 0)
    		{
    			return false;
    		}else if(overlap > result.overlap)
    		{
    			result.overlap = overlap;
    			result.normal.x = normal.x;
    			result.normal.y = normal.y;
    		}
    	}
    	
    	return result;
    };
})(window);