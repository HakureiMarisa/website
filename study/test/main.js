(function(){
    var game = {
        res : [{
            id : "hero",
            size : 372,
            src : "/assets/img/rocket_20_48.png"
        }, {
            id : "ray",
            size : 69,
            src : "images/ray.png"
        }, {
            id : "btns",
            size : 77,
            src : "images/btns.png"
        }],
    };

    game.init = function(){
        // 初始化游戏场景容器，设定背景渐变样式
        var container = Q.getDOM("container");
        container.style.background = "-moz-linear-gradient(top, #00889d, #94d7e1, #58B000)";
        container.style.background = "-webkit-gradient(linear, 0 0, 0 bottom, from(#00889d), to(#58B000), color-stop(0.5,#94d7e1))";
        container.style.background = "-o-linear-gradient(top, #00889d, #94d7e1, #58B000)";
        container.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr=#00889d, endColorstr=#94d7e1)";

        var canvas = Quark.createDOM("canvas", {
            width : 480,
            height : 320,
            style : {
                position : "absolute",
                backgroundColor : "#eee"
            }
        });
        container.appendChild(canvas);
        context = new Quark.CanvasContext({
            canvas : canvas
        });        

        // 加载图片素材
        var loader = new Q.ImageLoader();
        loader.addEventListener("loaded", Q.delegate(this.onLoadLoaded, this));
        loader.addEventListener("complete", Q.delegate(this.onLoadComplete, this));
        loader.load(this.res);
    };
    // 加载进度条
    game.onLoadLoaded = function(e){
        this.loader.innerHTML = "正在加载资源中，请稍候...<br>";
        this.loader.innerHTML += "("
                + Math.round(e.target.getLoadedSize() / e.target.getTotalSize()
                        * 100) + "%)";
    };
    // 加载完成
    game.onLoadComplete = function(e){
        e.target.removeAllEventListeners();
        Q.getDOM("container").removeChild(this.loader);
        this.loader = null;
        this.images = e.images;
        //初始化一些类
        //ns.Ball.init();
        //ns.Num.init();
        //启动游戏
        this.startup();
    }
    
    game.startup = function(){
     // 初始化舞台
        var stage = new Q.Stage({
            context : context,
            width : 480,
            height : 320,
            update : function(){
                frames++;
            }
        });

        // 初始化timer并启动
        timer = new Q.Timer(1000 / 60);
        timer.addListener(stage);
        timer.start();

        // 注册舞台事件，使舞台上的元素能接收交互事件
        em = new Q.EventManager();

        // 创建自机，并添加到舞台
        hero = new Hero({
            x : 200,
            y : 160,
            speed : [3, 3]
        });
        stage.addChild(hero);

        // 按键事件
        em.register(document, ["keydown", "keyup"], function(e){
            hero.move(e)
        }, false, false);
        // em.register(document, "keyup", hero.keyup, false, false);
    };

    /显示当前FPS值
    game.showFPS = function(){
        var me = this, fpsContainer = Quark.getDOM("fps");
        setInterval(function(){
            fpsContainer.innerHTML = "FPS:" + me.frames;
            me.frames = 0;
        }, 1000);
    } 
    window.onload = game.init();
})();