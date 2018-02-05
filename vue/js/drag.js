import Fn           from '../js/fn.js';
import Evt          from '../js/evt.js';


const Drag = (()=>{
    let Drag = function(elem, setting){
        this.elem = elem;
        this.setting = Object.assign({}, this.setting, setting);
        this.event();
        return this;
    };
    Drag.prototype = {
        setting: {
            start:    null,
            move:     null,
            end:      null,
            dragable: true,
            mintop:   false,
            maxtop:   false,
            minleft:  false,
            maxleft:  false
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
            //
        },
        //初始化事件
        event() {
            let dragstart, dragmove, dragend;
            //拖拽开始
            dragstart = (evt)=>{
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

                Evt.on(document, 'mousemove', dragmove);
                Evt.on(document, 'mouseup', dragend);
                // console.log('start');

                if( this.setting.start ) {
                    this.setting.start.call(this.elem, evt, this);
                }
            };
            //拖拽中
            dragmove = (evt)=>{
                if (!this.draging) {
                    return;
                }
                this.end.x = evt.clientX;
                this.end.y = evt.clientY;
                this.dist.x = this.end.x - this.start.x;
                this.dist.y = this.end.y - this.start.y;
                if( this.setting.dragable ) {
                    this.offsetend.top = this.offsetstart.top + this.dist.y;
                    this.offsetend.top = Drag.rangelimit(this.offsetend.top, this.setting.mintop, this.setting.maxtop);

                    this.offsetend.left = this.offsetstart.left + this.dist.x;
                    this.offsetend.left = Drag.rangelimit(this.offsetend.left, this.setting.minleft, this.setting.maxleft);
                    // console.log(this.offsetend.top);
                    // console.log(this.offsetend.left);
                    Fn.setstyle(this.elem, {
                        top:   this.offsetend.top +'px',
                        left:  this.offsetend.left +'px'
                    });
                }
                // console.log(this);

                if( this.setting.move ) {
                    this.setting.move.call(this.elem, evt, this);
                }
            };
            //拖拽结束
            dragend = (evt)=>{
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
            };

            Evt.on(this.elem, 'mousedown', dragstart);
        }
    };
    Drag.rangelimit = function(target, min, max){
        if( false !== min ){
            target = min <= target ? target : min;
        }
        if( false !== min ){
            target = target <= max ? target : max;
        }
        return target;
    };

    return Drag;
})();

export default Drag;