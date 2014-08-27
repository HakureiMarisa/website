(function(win){
    var JM = win.JM = win.JM || {};
    
    /*
     * 继承
     */
    JM.inherit = function(childClass, parentClass){
        childClass.prototype = new parentClass();
        childClass.prototype.constructor = childClass;
        childClass.superclass = parentClass.prototype;
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
})(window);