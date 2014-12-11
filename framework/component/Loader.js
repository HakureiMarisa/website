(function(){

    var Loader = JM.Loader = function(source){
        this.loading = true; // ready-only

        this._index = 0;
        this._images = [];

        this._source = source;
    };
    
    Loader.prototype.load = function(callback){
        var source = this._source;
        for(var i in source) {
            var img = new Image();
            /*if(img.complete){
                //console.log('complete');
                callback();
            }else{*/
                var me = this;
                img.onload = function(){
                    var id = source[me._index].id;
                    me._index++;
                    callback(id, me._index);                 
                };
                //me._index++;
            /*}*/
            img.src = source[i].src;
            this._images[source[i].id] = img;
            img = null;
        }
    };
    
    Loader.prototype.getImg = function(id){
        return this._images[id];
    };

})();