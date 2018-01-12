import Fn           from '../js/fn.js';
import Evt          from '../js/evt.js';
import Drag         from '../js/drag.js';
import MouseWheel   from '../js/mousewheel.js';



const XColorPicker = (() => {
    //
    function createcode() {
        return Math.random().toString().substring(2);
    }

    let XColorPicker = function( elem, setting ) {
        this.elem = elem;
        this.code = createcode();
        elem.setAttribute('xcolorpicker-code', this.code);
        Object.assign(this.setting, setting);
        // this.init();
        XColorPicker.cache(this.code, this);
        return this;
    };
    XColorPicker.cachestore = {};
    XColorPicker.cache = function( code, xcolorpicker ) {
        if( xcolorpicker ) {
            XColorPicker.cachestore[code] = xcolorpicker;
        } else {
            return XColorPicker.cachestore[code];
        }
    };
    XColorPicker.get = function( elem ) {
        return elem.getAttribute ? XColorPicker.cache( elem.getAttribute('xcolorpicker-code') ) : XColorPicker.cache( elem );
    };
    XColorPicker.prototype = {
        inited:         false,
        code:           '',
        setting: {
            class:          '',
            wheelspeed:     0.1,
            xbar:           true,
            ybar:           true
        },
        elem:           null,
        colorpad: {
            elem:       null,
            light:      null,
            dark:       null,
            pointer:    null,
            locked:     false
        },
        rainbow: {
            elem:       null,
            color:      null,
            pointer:    null,
            locked:     false
        },
        values: {
            elem:       null,
            hex:        null,
            rgb: {
                r:      null,
                g:      null,
                b:      null
            },
            hsb: {
                h:      null,
                s:      null,
                b:      null
            }
        },
        block: {
            elem:       null,
            new:        null,
            old:        null
        },
        btns: {
            elem:       null,
            cancel:     null,
            submit:     null
        },

        //创建DOM
        create() {
            Fn.addclass(this.elem, 'xcolorpicker '+ this.setting.class);
            this.elem.innerHTML = `
                <div class="colorpad">
                    <div class="colorpad-light"></div>
                    <div class="colorpad-dark"></div>
                    <div class="pointer"></div>
                </div>
                <div class="rainbow">
                    <div class="rainbow-color"></div>
                    <div class="pointer"></div>
                </div>
                <div class="values">
                    <div class="values-hex">
                        <div class="value-item">
                            <span class="tit"># </span>
                            <input class="txt" />
                        </div>
                    </div>
                    <div class="values-rgb">
                        <div class="value-item">
                            <span class="tit">R:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">G:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">B:</span>
                            <input class="txt" />
                        </div>
                    </div>
                    <div class="values-hsb">
                        <div class="value-item">
                            <span class="tit">H:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">S:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">B:</span>
                            <input class="txt" />
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="block-box block-box-new">
                        <div class="block-color"></div>
                    </div>
                    <div class="block-box block-box-old">
                        <div class="block-color"></div>
                    </div>
                </div>
                <div class="btns">
                    <button class="btn btn-small btns-cancel">取消</button>
                    <button class="btn btn-small btn-theme btns-submit">确定</button>
                </div>
            `;

            let childs = this.elem.childNodes;
            this.colorpad.elem    = childs[0];
            this.rainbow.elem     = childs[1];
            this.values.elem      = childs[2];
            this.block.elem       = childs[3];
            this.btns.elem        = childs[4];

            childs = this.colorpad.elem.childNodes;
            this.colorpad.light      = childs[0];
            this.colorpad.dark       = childs[1];
            this.colorpad.pointer    = childs[2];

            childs = this.rainbow.elem.childNodes;
            this.rainbow.color      = childs[0];
            this.rainbow.pointer    = childs[1];

            childs = this.values.elem.childNodes;
            this.values.hex         = childs[0].firstChild.lastChild;

            this.values.rgb.r       = childs[1].childNodes[0].lastChild;
            this.values.rgb.g       = childs[1].childNodes[1].lastChild;
            this.values.rgb.b       = childs[1].childNodes[2].lastChild;

            this.values.hsb.h       = childs[2].childNodes[0].lastChild;
            this.values.hsb.s       = childs[2].childNodes[1].lastChild;
            this.values.hsb.b       = childs[2].childNodes[2].lastChild;

            childs = this.block.elem.childNodes;
            this.block.new          = childs[0].firstChild;
            this.block.old          = childs[1].firstChild;

            childs = this.btns.elem.childNodes;
            this.btns.cancel        = childs[0];
            this.btns.submit        = childs[1];

            return this;
        },
        //初始化
        init() {
            if( this.inited ) {
                return this;
            }
            this.event();

            this.inited = true;
            return this;
        },
        //
        event() {
            let _this = this;
            // this.wheelevent();
            this.dragevent(this.rainbow);

            this.Drag(this.rainbow, {
                start: ()=>{

                },
                move: (evt, drag)=>{
                    t = starttop + drag.dist.y;
                    t = range.mintop <= t ? t : range.mintop;
                    t = t <= range.maxtop ? t : range.maxtop;
                    Fn.setstyle(_this.block_y, { top: t+'px' });
                },
                end: ()=>{

                }
            });
        },
        //
        wheelevent() {
            MouseWheel(this.target, (evt, delta) => {
                // this.resize();
                if (!evt.shiftKey) {
                    let t, curtop, stepsize, mintop, maxtop, maxscroll, scrolltop, todown, toup;
                    curtop = this.block_y.offsetTop;
                    stepsize = Math.ceil(this.block_y.offsetHeight * this.setting.wheelspeed);
                    mintop = 0;
                    maxtop = this.wrapper.offsetHeight - this.block_y.offsetHeight;
                    maxscroll = this.size.content_height - this.wrapper.offsetHeight;
                    todown = delta < 0 && curtop < maxtop;          //向下
                    toup = 0 < delta && mintop < curtop;            //向上
                    if (todown || toup) {
                        t = this.block_y.offsetTop - delta * stepsize;
                        t = mintop <= t ? t : mintop;
                        t = t <= maxtop ? t : maxtop;
                        Fn.setstyle(this.block_y, { top: t+'px' });

                        scrolltop = t * maxscroll / maxtop;
                        this.wrapper.scrollTop = scrolltop;

                        if (!(mintop === t || t === maxtop)) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                } else {
                    let l, curleft, stepsize, minleft, maxleft, maxscroll, scrollleft, toleft, toright;
                    curleft = this.block_x.offsetLeft;
                    stepsize = Math.ceil(this.block_x.offsetWidth * this.setting.wheelspeed);
                    minleft = 0;
                    maxleft = this.wrapper.offsetWidth - this.block_x.offsetWidth;
                    maxscroll = this.size.content_width - this.wrapper.offsetWidth;
                    toleft = delta < 0 && curleft < maxleft;            //向左
                    toright = 0 < delta && minleft < curleft;           //向右
                    if (toleft || toright) {
                        l = this.block_x.offsetLeft - delta * stepsize;
                        l = minleft <= l ? l : minleft;
                        l = l <= maxleft ? l : maxleft;
                        Fn.setstyle(this.block_x, { left: l+'px' });

                        scrollleft = l * maxscroll / maxleft;
                        this.wrapper.scrollLeft = scrollleft;

                        if (!(minleft === l || l === maxleft)) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                }
            });
        },
        //
        dragevent(elem, locked) {
            let _this, israinbow, starttop, startleft, start, end, range, dist, t, l, scroll;
            _this = this;
            israinbow = this.rainbow === elem;


            start = { x: 0, y: 0 };
            end = { x: 0, y: 0 };
            range = {
                minleft: 0,
                maxleft: 0,
                mintop: 0,
                maxtop: 0
            };
            dist = { minx: 0, maxx: 0, miny:0, maxy:0, x: 0, y: 0 };
            scroll = { max: 0, top: 0, left: 0 };
            // to = { up: false, down: false, left: false, right: false };

            let dragstart, dragmove, dragend;
            dragstart = function(evt) {
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
            };
            dragmove = function(evt) {
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
            };
            dragend = function(evt) {
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

            Evt.on(elem, 'mousedown', dragstart);
        }
    };

    return XColorPicker;
})();

/*XColorPicker.install = function(Vue, options) {
    Vue.component('x-scroll', {
        props: {},
        template: `
            <div class="xcolorpicker">
                <div class="colorpad">
                    <div class="colorpad-light"></div>
                    <div class="colorpad-dark"></div>
                    <div class="pointer"></div>
                </div>
                <div ref="rainbow" class="rainbow" @mousedown="mousedown_rainbow" @mousemove="mousemove_rainbow" @mouseup="mouseup_rainbow">
                    <div class="rainbow-color"></div>
                    <div class="pointer"></div>
                </div>
                <div class="values">
                    <div class="values-hex">
                        <div class="value-item">
                            <span class="tit"># </span>
                            <input class="txt" />
                        </div>
                    </div>
                    <div class="values-rgb">
                        <div class="value-item">
                            <span class="tit">R:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">G:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">B:</span>
                            <input class="txt" />
                        </div>
                    </div>
                    <div class="values-hsb">
                        <div class="value-item">
                            <span class="tit">H:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">S:</span>
                            <input class="txt" />
                        </div>
                        <div class="value-item">
                            <span class="tit">B:</span>
                            <input class="txt" />
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="block-box block-box-new">
                        <div class="block-color"></div>
                    </div>
                    <div class="block-box block-box-old">
                        <div class="block-color"></div>
                    </div>
                </div>
                <div class="btns">
                    <button class="btn btn-small btns-cancel">取消</button>
                    <button class="btn btn-small btn-theme btns-submit">确定</button>
                </div>
            </div>
        `,
        data() {
            return {
                xscroll: null
            };
        },
        mounted() {
            this.xscroll = new XColorPicker( this.$refs.target );
            // this.xscroll.target = this.$refs.target;
            this.xscroll.wrapper = this.$refs.wrapper;
            this.xscroll.container = this.$refs.container;
            this.xscroll.scroll_x = this.$refs.scroll_x;
            this.xscroll.scroll_y = this.$refs.scroll_y;
            this.xscroll.block_x = this.$refs.block_x;
            this.xscroll.block_y = this.$refs.block_y;
            this.xscroll.init();
            // this.$refs;
        }
    });
};*/

export default XColorPicker;