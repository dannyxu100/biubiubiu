import Evt          from '../js/evt.js';


const Drag = (function() {
    let Drag = (elem, setting) => {
        return new Drag.prototype.init(elem, setting);
    };
    Drag.prototype = {
        setting: {
            start:    null,
            move:     null,
            end:      null
        },
        elem:       null,
        draging:    false,
        start: {                    //mouse拖动开始点
            x:  0,
            y:  0
        },
        end: {                      //mouse拖动结束点
            x:  0,
            y:  0
        },
        dist: {                     //拖动位移距离
            x:  0,
            y:  0
        },
        offsetstart: {
            top: 0,
            left: 0
        },
        offsetend: {
            top: 0,
            left: 0
        },

        init(elem, setting) {
            this.elem = elem;
            Object.assign(this.setting, setting);
            this.event();
            return this;
        },
        //初始化事件
        event() {
            Evt.on(this.elem, 'mousedown', this.dragstart);
        },
        //拖拽开始
        dragstart(evt) {
            this.draging = true;
            this.start.x = evt.clientX;
            this.start.y = evt.clientY;
            this.dist.x = 0;
            this.dist.y = 0;
            this.offsetstart.top = this.elem.offsetTop;
            this.offsetstart.left = this.elem.offsetLeft;

            if( this.elem.setCapture ) {                //设置鼠标捕获
                this.elem.setCapture();
            } else {
                evt.preventDefault();                   //阻止默认动作
            }

            Evt.on(document, 'mousemove', this.dragmove);
            Evt.on(document, 'mouseup', this.dragend);
            // console.log('start');

            if( this.setting.start ) {
                this.setting.start.call(this.elem, evt, this);
            }
        },
        //拖拽中
        dragmove(evt) {
            if (!this.draging) {
                return;
            }
            this.end.x = evt.clientX;
            this.end.y = evt.clientY;
            this.dist.x = this.end.x - this.start.x;
            this.dist.y = this.end.y - this.start.y;
            this.offsetend.top = this.elem.offsetTop;
            this.offsetend.left = this.elem.offsetLeft;

            // console.log('mousemove');
            if( this.setting.move ) {
                this.setting.move.call(this.elem, evt, this);
            }
        },
        //拖拽结束
        dragend(evt) {
            this.draging = false;

            if( this.elem.releaseCapture ) {                 //释放鼠标捕获
                this.elem.releaseCapture();
            }

            Evt.off(document, 'mousemove', this.dragmove);
            Evt.off(document, 'mouseup', this.dragend);
            // console.log('end');

            if( this.setting.end ) {
                this.setting.end.call(this.elem, evt, this);
            }
        }
    };
    Drag.prototype.init.prototype = Drag.prototype;
    return Drag;
})();

export default Drag;