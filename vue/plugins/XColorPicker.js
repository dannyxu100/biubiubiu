import Fn           from '../js/fn.js';
import Evt          from '../js/evt.js';
import Drag         from '../js/drag.js';
import MouseWheel   from '../js/mousewheel.js';
import Color        from '../js/color.js';



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
        isshow:         false,
        code:           '',
        setting: {
            class:      ''
        },
        elem:           null,
        handle:         null,
        wrapper:        null,
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
        color: {
            base:       '',
            old:        '',
            new:        '',
            hex:        '',
            rgb:        [],
            hsb:        []
        },

        //创建DOM
        create() {
            Fn.addclass(this.elem, 'xcolorpicker '+ this.setting.class);
            this.elem.innerHTML = `
                <div ref="handle" class="xcolorpicker-handle"></div>
                <div ref="wrapper" class="xcolorpicker-wrapper">
                    <div class="xcolorpicker-colorpad">
                        <div class="colorpad-light"></div>
                        <div class="colorpad-dark"></div>
                        <div class="pointer"></div>
                    </div>
                    <div class="xcolorpicker-rainbow">
                        <div class="rainbow-color"></div>
                        <div class="pointer"></div>
                    </div>
                    <div class="xcolorpicker-values">
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
                    <div class="xcolorpicker-block">
                        <div class="block-box block-box-new">
                            <div class="block-color"></div>
                        </div>
                        <div class="block-box block-box-old">
                            <div class="block-color"></div>
                        </div>
                    </div>
                    <div class="xcolorpicker-btns">
                        <button class="btn btn-small btns-cancel">取消</button>
                        <button class="btn btn-small btn-theme btns-submit">确定</button>
                    </div>
                </div>
            `;

            let childs = this.elem.childNodes;
            this.handle     = childs[0];
            this.wrapper    = childs[1];

            childs = this.wrapper.childNodes;
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
            // debugger;
            if( this.inited ) {
                return this;
            }
            // this.color.base = new Color(255,0,0);
            this.show();
            this.event();
            this.computecolor(()=>{
                this.hide();
                this.inited = true;
            });
            return this;
        },
        //
        event() {
            let click2doc = (evt)=>{
                this.hide();
            };
            Evt.on(this.elem, 'click', (evt)=>{
                evt.stopPropagation();
                if( true === this.isshow ) {
                    return;
                }
                this.show();
                Evt.off(document, 'click', click2doc).on(document, 'click', click2doc);
            });

            /*MouseWheel(this.target, (evt, delta) => {
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
                }
            });*/

            let RBP, CPP;
            RBP = {
                top:        0,
                newtop:     0,
                min:        0,
                max:        this.rainbow.elem.offsetHeight
            };
            CPP = {
                top:        0,
                left:       0,
                newtop:     0,
                newleft:    0,
                mintop:     -this.colorpad.pointer.offsetHeight/2,
                minleft:    -this.colorpad.pointer.offsetWidth/2,
                maxtop:     this.colorpad.elem.offsetHeight-this.colorpad.pointer.offsetHeight/2,
                maxleft:    this.colorpad.elem.offsetWidth-this.colorpad.pointer.offsetWidth/2
            };
            new Drag(this.rainbow.elem, {
                dragable: false,
                start: (evt, drag)=>{
                    // debugger;
                    Fn.setstyle(this.rainbow.pointer, {top: (evt.offsetY-this.rainbow.pointer.offsetHeight/2) +'px'});
                    RBP.top = this.rainbow.pointer.offsetTop;

                    this.computecolor();
                },
                move: (evt, drag)=>{
                    // debugger;
                    RBP.newtop = RBP.top + drag.dist.y;
                    RBP.newtop = Drag.rangelimit(RBP.newtop, RBP.min, RBP.max);
                    Fn.setstyle(this.rainbow.pointer, {top: RBP.newtop +'px'});

                    this.computecolor();
                },
                end: ()=>{
                    // debugger;
                }
            });
            new Drag(this.colorpad.elem, {
                dragable: false,
                start: (evt)=>{
                    // debugger;
                    if( this.colorpad.pointer !== evt.target ) {
                        Fn.setstyle(this.colorpad.pointer, {
                            top: (evt.offsetY-this.colorpad.pointer.offsetHeight/2) +'px',
                            left: (evt.offsetX-this.colorpad.pointer.offsetWidth/2) +'px'
                        });
                    }
                    CPP.top = this.colorpad.pointer.offsetTop;
                    CPP.left = this.colorpad.pointer.offsetLeft;

                    this.computecolor();
                },
                move: (evt, drag)=>{
                    // debugger;
                    CPP.newtop  = CPP.top + drag.dist.y;
                    CPP.newleft = CPP.left + drag.dist.x;
                    CPP.newtop  = Drag.rangelimit(CPP.newtop, CPP.mintop, CPP.maxtop);
                    CPP.newleft = Drag.rangelimit(CPP.newleft, CPP.minleft, CPP.maxleft);
                    Fn.setstyle(this.colorpad.pointer, {
                        top:   CPP.newtop +'px',
                        left:  CPP.newleft +'px'
                    });

                    this.computecolor();
                },
                end: ()=>{
                    // debugger;
                }
            });
        },
        //
        show() {
            Fn.addclass(this.elem, 'open');
            this.isshow = true;
        },
        //
        hide() {
            Fn.removeclass(this.elem, 'open');
            this.isshow = false;
        },
        //
        computecolor: Fn.later(function(fnafter) {
            // rgb(255,0,0), rgb(255,0,255), rgb(0,0,255), rgb(0,255,255), rgb(0,255,0), rgb(255,255,0), rgb(255,0,0)
            let basevalue, transit, scale, stage, value;
            basevalue = this.rainbow.pointer.offsetTop;
            transit = this.rainbow.elem.offsetHeight/6;                         //6个渐变间隔
            scale = this.rainbow.elem.offsetHeight/(255*6);                     //像素高度与颜色差值比例
            stage = Math.floor(basevalue/transit);
            value = (basevalue%transit)/scale;
            // console.log(`basevalue:${basevalue}, transit:${transit}, stage:${stage}, value:${value}`);
            // debugger;
            if( 0 === stage ) {
                this.color.base = new Color(255, 0, value);
            } else if( 1 === stage ) {
                this.color.base = new Color(255-value, 0, 255);
            } else if( 2 === stage ) {
                this.color.base = new Color(0, value, 255);
            } else if( 3 === stage ) {
                this.color.base = new Color(0, 255, 255-value);
            } else if( 4 === stage ) {
                this.color.base = new Color(value, 255, 0);
            } else if( 5 === stage ) {
                this.color.base = new Color(255, 255-value, 0);
            } else {
                this.color.base = new Color(255,0,0);
            }

            let x, y, s, b;
            x = this.colorpad.pointer.offsetLeft + this.colorpad.pointer.offsetWidth/2;
            y = this.colorpad.pointer.offsetTop + this.colorpad.pointer.offsetHeight/2;
            s = x/this.colorpad.light.offsetWidth*100;
            b = (this.colorpad.dark.offsetHeight-y)/this.colorpad.dark.offsetHeight*100;

            this.color.new = new Color(this.color.base);
            this.color.new.set_hsv(this.color.new.$vh, s, b);
            this.color.new.hsv2rgb();
            this.color.new.rgb2hsl();
            this.color.new.rgb2hex();

            this.color.hex = this.color.new.$hex;
            this.color.rgb = [this.color.new.$r, this.color.new.$g, this.color.new.$b];
            this.color.hsb = [this.color.new.$vh, this.color.new.$vs, this.color.new.$vv];

            this.drawcolor();

            if( fnafter ) {
                fnafter.call(this);
            }
        }, 10),
        //
        drawcolor() {
            this.values.hex.value   = this.color.hex.replace('#', '');
            this.values.rgb.r.value = this.color.rgb[0];
            this.values.rgb.g.value = this.color.rgb[1];
            this.values.rgb.b.value = this.color.rgb[2];

            this.values.hsb.h.value = this.color.hsb[0];
            this.values.hsb.s.value = this.color.hsb[1];
            this.values.hsb.b.value = this.color.hsb[2];
            Fn.setstyle(this.colorpad.elem, {backgroundColor: this.color.base.$rgb});
            Fn.setstyle(this.block.new, {backgroundColor: this.color.new.$rgb});
            Fn.setstyle(this.colorpad.pointer, {borderColor: this.color.new.$inverse});
        }
    };

    return XColorPicker;
})();

XColorPicker.install = function(Vue, options) {
    Vue.component('x-color-picker', {
        props: {},
        template: `
            <div ref="xcolorpicker" class="xcolorpicker">
                <div ref="handle" class="xcolorpicker-handle"></div>
                <div ref="wrapper" class="xcolorpicker-wrapper">
                    <div ref="colorpad" class="xcolorpicker-colorpad">
                        <div ref="colorpad_light" class="colorpad-light"></div>
                        <div ref="colorpad_dark" class="colorpad-dark"></div>
                        <div ref="colorpad_pointer" class="pointer"></div>
                    </div>
                    <div ref="rainbow" class="xcolorpicker-rainbow">
                        <div ref="rainbow_color" class="rainbow-color"></div>
                        <div ref="rainbow_pointer" class="pointer"></div>
                    </div>
                    <div ref="values" class="xcolorpicker-values">
                        <div class="values-hex">
                            <div class="value-item">
                                <span class="tit"># </span>
                                <input ref="values_hex" class="txt" />
                            </div>
                        </div>
                        <div class="values-rgb">
                            <div class="value-item">
                                <span class="tit">R:</span>
                                <input ref="values_rgb_r" class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">G:</span>
                                <input ref="values_rgb_g" class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">B:</span>
                                <input ref="values_rgb_b" class="txt" />
                            </div>
                        </div>
                        <div class="values-hsb">
                            <div class="value-item">
                                <span class="tit">H:</span>
                                <input ref="values_hsb_h" class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">S:</span>
                                <input ref="values_hsb_s" class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">B:</span>
                                <input ref="values_hsb_b" class="txt" />
                            </div>
                        </div>
                    </div>
                    <div ref="block" class="xcolorpicker-block">
                        <div class="block-box block-box-new">
                            <div ref="block_new" class="block-color"></div>
                        </div>
                        <div class="block-box block-box-old">
                            <div ref="block_old" class="block-color"></div>
                        </div>
                    </div>
                    <div ref="btns" class="xcolorpicker-btns">
                        <button ref="btns_cancel" class="btn btn-small btns-cancel">取消</button>
                        <button ref="btns_submit" class="btn btn-small btn-theme btns-submit">确定</button>
                    </div>
                </div>
            </div>
        `,
        data() {
            return {};
        },
        mounted() {
            this.xcpr = new XColorPicker(this.$refs.xcolorpicker);
            this.xcpr.handle        = this.$refs.handle;
            this.xcpr.wrapper       = this.$refs.wrapper;

            this.xcpr.colorpad.elem    = this.$refs.colorpad;
            this.xcpr.rainbow.elem     = this.$refs.rainbow;
            this.xcpr.values.elem      = this.$refs.values;
            this.xcpr.block.elem       = this.$refs.block;
            this.xcpr.btns.elem        = this.$refs.btns;

            this.xcpr.colorpad.light     = this.$refs.colorpad_light;
            this.xcpr.colorpad.dark      = this.$refs.colorpad_dark;
            this.xcpr.colorpad.pointer   = this.$refs.colorpad_pointer;

            this.xcpr.rainbow.color      = this.$refs.rainbow_color;
            this.xcpr.rainbow.pointer    = this.$refs.rainbow_pointer;

            this.xcpr.values.hex         = this.$refs.values_hex;
            this.xcpr.values.rgb.r       = this.$refs.values_rgb_r;
            this.xcpr.values.rgb.g       = this.$refs.values_rgb_g;
            this.xcpr.values.rgb.b       = this.$refs.values_rgb_b;

            this.xcpr.values.hsb.h       = this.$refs.values_hsb_h;
            this.xcpr.values.hsb.s       = this.$refs.values_hsb_s;
            this.xcpr.values.hsb.b       = this.$refs.values_hsb_b;

            this.xcpr.block.new          = this.$refs.block_new;
            this.xcpr.block.old          = this.$refs.block_old;

            this.xcpr.btns.cancel        = this.$refs.btns_cancel;
            this.xcpr.btns.submit        = this.$refs.btns_submit;

            this.xcpr.init();
        }
    });
};

export default XColorPicker;