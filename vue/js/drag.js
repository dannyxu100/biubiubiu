import Evt          from '../js/evt.js';


const Drag = (function() {
    let Drag = (elem, handler) => {
        return new Drag.prototype.init(elem, handler);
    };
    Drag.prototype = {
        elem: null,

        init(elem, handler) {
            this.elem = elem;
            this.handler = handler;
            this.bind();
            return this;
        },
        //拖拽开始
        dragstart(evt) {
            _this.resize();
            if (israinbow) {
                _this.rainbow.locked = true;

                starttop = elem.offsetTop;
                start.y = evt.clientY;
                dist.maxy = _this.wrapper.offsetHeight - _this.block_y.offsetHeight - _this.block_y.offsetTop;
                range.maxtop = _this.wrapper.offsetHeight - _this.block_y.offsetHeight;
                scroll.max = _this.size.content_height - _this.wrapper.offsetHeight;

            } else {
                _this.colorpad.locked = true;

                startleft = elem.offsetLeft;
                start.x = evt.clientX;
                dist.maxx = _this.wrapper.offsetWidth - _this.block_x.offsetWidth - _this.block_x.offsetLeft;
                range.maxleft = _this.wrapper.offsetWidth - _this.block_x.offsetWidth;
                scroll.max = _this.size.content_width - _this.wrapper.offsetWidth;

            }

            if( elem.setCapture ) {                     //设置鼠标捕获
                elem.setCapture();
            } else {
                evt.preventDefault();                   //阻止默认动作
            }

            Evt.on(document, 'mousemove', dragmove);
            Evt.on(document, 'mouseup', dragend);

            // console.log('start');
        },
        //拖拽中
        dragmove(evt) {
            if (israinbow) {
                if (!_this.rainbow.locked) {
                    return;
                }

                end.y = evt.clientY;
                dist.y = end.y - start.y;

                t = starttop + dist.y;
                t = range.mintop <= t ? t : range.mintop;
                t = t <= range.maxtop ? t : range.maxtop;
                Fn.setstyle(_this.block_y, { top: t+'px' });

                scroll.top = t * scroll.max / range.maxtop;
                _this.wrapper.scrollTop = scroll.top;

            } else {
                if (!_this.colorpad.locked) {
                    return;
                }

                end.x = evt.clientX;
                dist.x = end.x - start.x;

                l = startleft + dist.x;
                l = range.minleft <= l ? l : range.minleft;
                l = l <= range.maxleft ? l : range.maxleft;
                Fn.setstyle(_this.block_x, { left: l+'px' });

                scroll.left = l * scroll.max / range.maxleft;
                _this.wrapper.scrollLeft = scroll.left;
            }

            // console.log('mousemove');
        },
        //拖拽结束
        dragend(evt) {
            if( israinbow ) {
                _this.rainbow.locked = false;

                Fn.removeclass(_this.scroll_y, 'active');
                Fn.setstyle(_this.scroll_y, { zIndex: '1' });

            } else {
                _this.colorpad.locked = false;

                Fn.removeclass(_this.scroll_x, 'active');
                Fn.setstyle(_this.scroll_x, { zIndex: '1' });
            }

            if( elem.releaseCapture ) {                 //设置鼠标捕获
                elem.releaseCapture();
            }

            Evt.off(document, 'mousemove', dragmove);
            Evt.off(document, 'mouseup', dragend);

            // console.log('end');
        };
    };
    Drag.prototype.init.prototype = Drag.prototype;
    return Drag;
})();

export default Drag;