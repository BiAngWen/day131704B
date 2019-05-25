var myTouch = (function() {
    //tap  swiper
    /**
     * 封装swiper
     * @param {元素} el 
     * @param {方向} direction 
     * @param {执行的回调函数} cb 
     * 
     * 1 定义变量  记录起始点  结束点
     * 2 按下的时候 记录起始点 startPoint
     * 3 按下的时候 记录结束点 endPoint
     * 
     */
    function swiper(el, direction, cb) { //事件对象，穿什么事件，干什么是个函数
        var startPoint = null,
            endPoint = null,
            distance = 30;
        el.addEventListener("touchstart", function(e) { //手指摁下
            var ev = e.touches[0];
            // console.log(e);
            startPoint = {
                x: ev.clientX,
                y: ev.clientY
            }
        })
        el.addEventListener("touchmove", function(e) { //手指移动
            var ev = e.touches[0];
            if (startPoint) {
                endPoint = {
                    x: ev.clientX,
                    y: ev.clientY
                }
            }
        })
        el.addEventListener("touchend", function(e) { //抬起
            if (startPoint && endPoint && direction === dire(startPoint, endPoint)) {
                cb && cb()
            }
            clearSwiper()
        })

        function clearSwiper() {
            startPoint = null;
            endPoint = null;
        }

        function dire(start, end) {
            //返回一个方向
            var dire = "",
                diffX = start.x - end.x,
                diffY = start.y - end.y,
                abX = Math.abs(diffX),
                abY = Math.abs(diffY);
            console.log(diffX)
            if (abX > distance || abY > distance) { //保证滑动
                if (abX > abY) { //判断上下滑动  左右滑动
                    // 左右滑动
                    dire = diffX > 0 ? "swiperLeft" : "swiperRight"
                } else { //上下滑动
                    dire = diffY > 0 ? "swiperUp" : "swiperDown"
                }
            }
            return dire;
        }
    }
    return {
        // tap/
        swiper //swiper:swiper
    }
})()