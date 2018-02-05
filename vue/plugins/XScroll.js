import Fn           from '../js/fn.js';
import Evt          from '../js/evt.js';
import Resize       from '../js/resize.js';
import MouseWheel   from '../js/mousewheel.js';



const XScroll = (()=>{
    //
    function createcode() {
        return Math.random().toString().substring(2);
    }



    let XScroll = function( elem, setting ) {
        this.target = elem;
        this.code = createcode();
        elem.setAttribute('xscroll-code', this.code);
        this.setting = Object.assign({}, this.setting, setting);
        // this.init();
        XScroll.cache(this.code, this);
        return this;
    };
    XScroll.cachestore = {};
    XScroll.cache = function( code, xscroll ) {
        if( xscroll ) {
            XScroll.cachestore[code] = xscroll;
        } else {
            return XScroll.cachestore[code];
        }
    };
    XScroll.get = function( elem ) {
        return elem.getAttribute ? XScroll.cache( elem.getAttribute('xscroll-code') ) : XScroll.cache( elem );
    };
    XScroll.prototype = {
        inited:         false,
        code:           '',
        setting: {
            class:          '',
            wheelspeed:     0.1,
            xbar:           true,
            ybar:           true
        },
        target:         null,
        wrapper:        null,
        container:      null,
        scroll_x:       null,
        scroll_y:       null,
        block_x:        null,
        block_y:        null,
        locked_x:       false,
        locked_y:       false,
        padding: {
            top:        0,
            bottom:     0,
            left:       0,
            right:      0
        },
        size: {
            content_width:       0,
            content_height:      0
        },
        //创建DOM
        create() {
            Fn.addclass(this.target, 'xscroll '+this.setting.class);
            this.target.innerHTML = '<div><div>'+ this.target.innerHTML +'</div></div>';

            this.wrapper = this.target.firstChild;
            this.container = this.wrapper.firstChild;
            this.scroll_x = document.createElement('div');
            this.block_x = document.createElement('div');
            this.scroll_y = document.createElement('div');
            this.block_y = document.createElement('div');

            this.scroll_x.appendChild(this.block_x);
            this.scroll_y.appendChild(this.block_y);
            this.target.appendChild(this.scroll_x);
            this.target.appendChild(this.scroll_y);

            this.wrapper.className = 'xscroll-wrapper';
            this.container.className = 'xscroll-container';
            this.scroll_x.className = 'xscroll-bar xscroll-x';
            this.scroll_y.className = 'xscroll-bar xscroll-y';
            this.block_x.className = 'xscroll-block';
            this.block_y.className = 'xscroll-block';
            return this;
        },
        //初始化
        init() {
            if( this.inited ) {
                return this;
            }
            let styles;
            styles = Fn.getstyle(this.target);
            this.padding.top        = Fn.px(styles.paddingTop);
            this.padding.bottom     = Fn.px(styles.paddingBottom);
            this.padding.left       = Fn.px(styles.paddingLeft);
            this.padding.right      = Fn.px(styles.paddingRight);
            this.getcontentsize();

            // debugger;
            Fn.setstyle(this.wrapper, {
                top:                this.padding.top +'px',
                bottom:             this.padding.bottom +'px',
                left:               this.padding.left +'px',
                right:              this.padding.right +'px'
            });

            Fn.setstyle(this.scroll_x, {
                // marginLeft:         (this.padding.left + px(styles.marginLeft)) +'px',
                // marginRight:        (this.padding.right + px(styles.marginRight)) +'px'
                marginLeft:         this.padding.left +'px',
                marginRight:        this.padding.right +'px'
            });

            Fn.setstyle(this.scroll_y, {
                // marginTop:          (this.padding.top + px(styles.marginTop)) +'px',
                // marginBottom:       (this.padding.bottom + px(styles.marginBottom)) +'px'
                marginTop:          this.padding.top +'px',
                marginBottom:       this.padding.bottom +'px'
            });

            this.event();
            this.resize();

            this.inited = true;
            return this;
        },
        //
        event() {
            let _this = this;
            this.wheelevent();
            this.dragevent(this.block_x);
            this.dragevent(this.block_y);
            Evt.on(window, 'resize', (evt) => {
                this.resize();
            });
            Evt.onresize(this.container, (evt) => {
                this.resize();
            });
            // Evt.on(this.wrapper, 'mouseenter', (evt) => {
            //     this.resize();
            // });
            // Evt.on(this.wrapper, 'mouseleave', (evt) => {
            //     this.resize();
            // });
            Evt.on(this.scroll_x, 'mouseover', (evt) => {
                Fn.addclass(this.scroll_x, 'active');
                Fn.setstyle(this.scroll_x, { zIndex: '2' });
            });
            Evt.on(this.scroll_y, 'mouseover', (evt) => {
                Fn.addclass(this.scroll_y, 'active');
                Fn.setstyle(this.scroll_y, { zIndex: '2' });
            });
            Evt.on(this.scroll_x, 'mouseleave', (evt) => {
                if( !this.locked_x ) {
                    Fn.removeclass(this.scroll_x, 'active');
                    Fn.setstyle(this.scroll_x, { zIndex: '1' });
                }
            });
            Evt.on(this.scroll_y, 'mouseleave', (evt) => {
                if( !this.locked_y ) {
                    Fn.removeclass(this.scroll_y, 'active');
                    Fn.setstyle(this.scroll_y, { zIndex: '1' });
                }
            });
            Evt.on(this.scroll_x, 'selectstart', (evt) => {
                return false;
            });
            Evt.on(this.scroll_y, 'selectstart', (evt) => {
                return false;
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
            let _this, isvertical, starttop, startleft, start, end, range, dist, t, l, scroll;
            _this = this;
            isvertical = this.block_y === elem;
            start = { x: 0, y: 0 };
            end = { x: 0, y: 0 };
            range = { minleft: 0, maxleft: 0, mintop: 0, maxtop: 0 };
            dist = { minx: 0, maxx: 0, miny:0, maxy:0, x: 0, y: 0 };
            scroll = { max: 0, top: 0, left: 0 };
            // to = { up: false, down: false, left: false, right: false };

            let dragstart, dragmove, dragend;
            dragstart = function(evt) {
                _this.resize();
                if (isvertical) {
                    _this.locked_y = true;

                    starttop = elem.offsetTop;
                    start.y = evt.clientY;
                    dist.maxy = _this.wrapper.offsetHeight - _this.block_y.offsetHeight - _this.block_y.offsetTop;
                    range.maxtop = _this.wrapper.offsetHeight - _this.block_y.offsetHeight;
                    scroll.max = _this.size.content_height - _this.wrapper.offsetHeight;

                } else {
                    _this.locked_x = true;

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
                if (isvertical) {
                    if (!_this.locked_y) {
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
                    if (!_this.locked_x) {
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
                if( isvertical ) {
                    _this.locked_y = false;

                    Fn.removeclass(_this.scroll_y, 'active');
                    Fn.setstyle(_this.scroll_y, { zIndex: '1' });

                } else {
                    _this.locked_x = false;

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
        },
        //
        getcontentsize() {
            let styles;
            styles = Fn.getstyle(this.wrapper);
            this.size.content_width = this.wrapper.scrollWidth;// + px(styles.marginLeft) + px(styles.marginRight);
            this.size.content_height = this.wrapper.scrollHeight;// + px(styles.marginTop) + px(styles.marginBottom);
        },
        //
        resize() {
            this.getcontentsize();
            Fn.setstyle(this.block_x, { width: Math.pow(this.wrapper.offsetWidth, 2) / this.size.content_width + 'px' });
            Fn.setstyle(this.block_y, { height: Math.pow(this.wrapper.offsetHeight, 2) / this.size.content_height + 'px' });

            // this.setting.xbar  = this.size.content_width > this.wrapper.clientWidth ? true : false;
            // this.setting.ybar = this.size.content_height > this.wrapper.clientHidth ? true : false;
            if( this.setting.xbar && this.size.content_width > this.wrapper.clientWidth ) {
                Fn.setstyle(this.scroll_x, { display: 'block' });
            } else {
                Fn.setstyle(this.scroll_x, { display: 'none' });
            }

            // this.getcontentsize();
            if( this.setting.ybar && this.size.content_height > this.wrapper.clientHeight ) {
                Fn.setstyle(this.scroll_y, { display: 'block' });
            } else {
                Fn.setstyle(this.scroll_y, { display: 'none' });
            }
            // debugger;
        }
    };

    return XScroll;
})();

XScroll.install = function(Vue, options) {
    Vue.component('x-scroll', {
        props: {},
        template: `
            <div ref="target" class="xscroll">
                <div ref="wrapper" class="xscroll-wrapper">
                    <div ref="container" class="xscroll-container">
                        <slot></slot>
                    </div>
                </div>
                <div ref="scroll_x" class="xscroll-bar xscroll-x">
                    <div ref="block_x" class="xscroll-block"></div>
                </div>
                <div ref="scroll_y" class="xscroll-bar xscroll-y">
                    <div ref="block_y" class="xscroll-block"></div>
                </div>
            </div>
        `,
        data() {
            return {
                xscroll: null
            };
        },
        mounted() {
            this.xscroll = new XScroll( this.$refs.target, {wheelspeed: 2} );
            // this.xscroll.target = this.$refs.target;
            this.xscroll.wrapper    = this.$refs.wrapper;
            this.xscroll.container  = this.$refs.container;
            this.xscroll.scroll_x   = this.$refs.scroll_x;
            this.xscroll.scroll_y   = this.$refs.scroll_y;
            this.xscroll.block_x    = this.$refs.block_x;
            this.xscroll.block_y    = this.$refs.block_y;
            this.xscroll.init();
            // this.$refs;
        }
    });
};

export default XScroll;