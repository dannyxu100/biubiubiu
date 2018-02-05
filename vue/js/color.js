const Color = (function(){
    let regx_rgb = /^(rgb\()?(\d{1,3}\,\d{1,3}\,\d{1,3})\)?$/i,
        regx_hex = /^\#?([0-9A-F]{3,6})$/i,
        regx_hex_short = /^\#?([0-9A-F]{3})$/i,
        regx_hex_long = /^\#?([0-9A-F]{6})$/i;

    let Color = function( /*hex | r,g,b | rgb(,,)*/ ){
        let args, match;
        args = Array.prototype.slice.call(arguments, 0);
        if( 1 === args.length ) {
            if( args[0] instanceof Color ) {
                this.set_hex( args[0].$hex );
                this.hex2rgb();
                this.rgb2hsl();
                this.rgb2hsv();

            } else if( match = args[0].match(regx_hex) ) {
                this.set_hex( match[1] );
                this.hex2rgb();
                this.rgb2hsl();
                this.rgb2hsv();

            } else if ( match = args[0].match(regx_rgb) ) {
                this.set_rgb.apply( this, match[2].split(',') );
                this.rgb2hex();
                this.rgb2hsl();
                this.rgb2hsv();
            }
        } else if( 3 === args.length ) {
            this.set_rgb.apply(this, args);
            this.rgb2hex();
            this.rgb2hsl();
            this.rgb2hsv();
        }
        return this;
    };
    Color.prototype = {
        $r:     0,
        $g:     0,
        $b:     0,
        $a:     1,
        $hex:   '#000000',
        $rgb:   'rgb(0,0,0)',
        $rgba:  'rgb(0,0,0, 1)',

        $h:     0,
        $s:     0,
        $l:     0,
        $hsl:   'hsl(0, 0%, 0%)',
        $hsla:  'hsl(0, 0%, 0%, 1)',

        $vh:     0,
        $vs:     0,
        $vv:     0,
        $hsv:   'hsv(0, 0%, 0%)',

        //设置透明度
        set_alpha(alpha) {
            alpha = Number(alpha);
            this.$a = alpha;
            this.$rgba = `rgba(${this.$r},${this.$g},${this.$b}, ${this.$a})`;
        },
        //
        set_hex(hex) {
            hex = 0 === hex.indexOf('#') ? hex : '#'+hex;
            this.$hex = hex;
        },
        //
        set_rgb(red, green, blue) {
            red     = parseInt(red);
            green   = parseInt(green);
            blue    = parseInt(blue);
            red     = red < 0 ? 0 : ( 255 < red ? 255 : red);
            green   = green < 0 ? 0 : ( 255 < green ? 255 : green);
            blue    = blue < 0 ? 0 : ( 255 < blue ? 255 : blue);
            this.$r = red;
            this.$g = green;
            this.$b = blue;
            this.$rgb = `rgb(${this.$r},${this.$g},${this.$b})`;
            this.$rgba = `rgba(${this.$r},${this.$g},${this.$b}, ${this.$a})`;
        },
        //
        set_hsl(hue, saturation, lightness) {
            hue         = parseInt(hue < 1 ? hue*360 : hue);
            saturation  = parseInt(saturation < 1 ? saturation*100 : saturation);
            lightness   = parseInt(lightness < 1 ? lightness*100 : lightness);
            hue         = hue < 0 ? 0 : ( 360 < hue ? 360 : hue);
            saturation  = saturation < 0 ? 0 : ( 100 < saturation ? 100 : saturation);
            lightness   = lightness < 0 ? 0 : ( 100 < lightness ? 100 : lightness);
            this.$h = hue;
            this.$s = saturation;
            this.$l = lightness;
            this.$hsl = `hsl(${this.$h},${this.$s}%,${this.$l}%)`;
            this.$hsla = `hsla(${this.$h},${this.$s},${this.$l}, ${this.$a})`;
        },
        //
        set_hsv(hue, saturation, brightness) {
            hue         = parseInt(hue < 1 ? hue*360 : hue);
            saturation  = parseInt(saturation < 1 ? saturation*100 : saturation);
            brightness  = parseInt(brightness < 1 ? brightness*100 : brightness);
            hue         = hue < 0 ? 0 : ( 360 < hue ? 360 : hue);
            saturation  = saturation < 0 ? 0 : ( 100 < saturation ? 100 : saturation);
            brightness  = brightness < 0 ? 0 : ( 100 < brightness ? 100 : brightness);
            this.$vh = hue;
            this.$vs = saturation;
            this.$vv = brightness;
            this.$hsv = `hsl(${this.$vh},${this.$vs}%,${this.$vv}%)`;
        },
        //
        hex2rgb() {
            this.set_rgb.apply( this, Color.hex2rgb(this.$hex) );
        },
        //
        rgb2hex() {
            this.set_hex( Color.rgb2hex(this.$r, this.$g, this.$b) );
        },
        //
        hsl2rgb() {
            this.set_rgb.apply( this, Color.hsl2rgb(this.$h/360, this.$s/100, this.$l/100) );
        },
        //
        rgb2hsl() {
            this.set_hsl.apply( this, Color.rgb2hsl(this.$r, this.$g, this.$b) );
        },
        //
        hsv2rgb() {debugger;
            this.set_rgb.apply( this, Color.hsv2rgb(this.$vh/360, this.$vs/100, this.$vv/100) );
        },
        //
        rgb2hsv() {
            this.set_hsv.apply( this, Color.rgb2hsv(this.$r, this.$g, this.$b) );
        },
        //增亮
        //value可以是0~255，也可以是小数
        lighten(value) {
            value = 0 < value && value < 1 ? value *= 255 : value;
            this.set_rgb(this.$r+value, this.$g+value, this.$b+value);
            this.rgb2hex();
            return this;
        },
        //加深
        //value可以是0~255，也可以是小数
        darken(value) {
            return this.lighten( -value );
        },
        //透明度
        opacity(value) {
            this.set_alpha( value );
            return this;
        },
        //互补色
        inverse() {
            this.set_rgb(255-this.$r, 255-this.$g, 255-this.$b);
            this.rgb2hex();
            return this;
        }
    };

    //转为Color类型
    Color.create = (color) => {
        if( color instanceof Color ){
            return new Color(color.$rgb);
        } else {
            return new Color(color);
        }
    };
    //rgb转hex
    Color.rgb2hex = (r,g,b) => {
        // rgb = 'string' === typeof rgb ? Color.getrgb(rgb) : rgb;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };
    //hex转rgb
    Color.hex2rgb = (hex) => {
        let rgb = []; // 定义rgb数组
        if ( regx_hex_short.test(hex) ) {                   //判断传入是否为#三位十六进制数
            let sizhex = '#';
            hex.replace(/[0-9A-F]/ig, function(kw) {
                sizhex += kw + kw;                          //把三位16进制数转化为六位
            });
            hex = sizhex;                                   //保存回hex
        }
        if ( regx_hex_long.test(hex) ) {                    //判断传入是否为#六位十六进制数
            hex.replace(/[0-9A-F]{2}/ig, function(kw) {
                rgb.push(eval('0x' + kw));                  //十六进制转化为十进制并存如数组
            });
            return rgb;                                     //输出RGB颜色
        } else {
            return null;
        }
    };
    //
    Color.rgb2hsl = (r, g, b) => {
        let _r, _g, _b, _min, _max, del_max, h, s, l;
        //r, g and b input range = 0 ÷ 255
        //h, s and l output range = 0 ÷ 1.0
        _r = (r / 255);
        _g = (g / 255);
        _b = (b / 255);

        _min = Math.min(_r, _g, _b);                        //min. value of rgb
        _max = Math.max(_r, _g, _b);                        //max. value of rgb
        del_max = _max - _min;                              //delta rgb value

        l = (_max + _min) / 2;

        if (del_max === 0) {                                 //this is a gray, no chroma...
            h = 0;
            s = 0;
        } else {                                            //chromatic data...
            if (l < 0.5) {
                s = del_max / (_max + _min);
            } else {
                s = del_max / (2 - _max - _min);
            }

            let del_r, del_g, del_b;
            del_r = (((_max - _r) / 6) + (del_max / 2)) / del_max;
            del_g = (((_max - _g) / 6) + (del_max / 2)) / del_max;
            del_b = (((_max - _b) / 6) + (del_max / 2)) / del_max;

            if (_r === _max) {
                h = del_b - del_g;
            } else if (_g === _max) {
                h = (1 / 3) + del_r - del_b;
            } else if (_b === _max) {
                h = (2 / 3) + del_g - del_r;
            }

            if (h < 0) { h += 1; }
            if (h > 1) { h -= 1; }
        }
        return [h,s,l];
    };
    //
    Color.hsl2rgb = (h, s, l) => {
        function hue_2_rgb(v1, v2, vh) {
            if (vh < 0) { vh += 1; }
            if (vh > 1) { vh -= 1; }
            if ((6 * vh) < 1) { return (v1 + (v2 - v1) * 6 * vh); }
            if ((2 * vh) < 1) { return v2; }
            if ((3 * vh) < 2) { return (v1 + (v2 - v1) * ((2 / 3) - vh) * 6); }
            return v1;
        }
        let r, g, b, var_1, var_2;
        //h, s and l input range = 0 ÷ 1.0
        //r, g and b output range = 0 ÷ 255
        if (s === 0) {
            r = l * 255;
            g = l * 255;
            b = l * 255;
        } else {
            if (l < 0.5) {
                var_2 = l * (1 + s);
            } else {
                var_2 = (l + s) - (s * l);
            }
            var_1 = 2 * l - var_2;
            r = 255 * hue_2_rgb(var_1, var_2, h + (1 / 3));
            g = 255 * hue_2_rgb(var_1, var_2, h);
            b = 255 * hue_2_rgb(var_1, var_2, h - (1 / 3));
        }
        return [r, g, b];
    };
    //
    Color.rgb2hsv = (r, g, b) => {
        let _r, _g, _b, _min, _max, del_max, h, s, v;
        //r, g and b input range = 0 ÷ 255
        //h, s and v output range = 0 ÷ 1.0
        _r = (r / 255);
        _g = (g / 255);
        _b = (b / 255);

        _min = Math.min(_r, _g, _b);                        //min. value of rgb
        _max = Math.max(_r, _g, _b);                        //max. value of rgb
        del_max = _max - _min;                              //delta rgb value

        v = _max;

        if (del_max === 0) {                                 //this is a gray, no chroma...
            h = 0;
            s = 0;
        } else {                                            //chromatic data...
            s = del_max / _max;

            let del_r, del_g, del_b;
            del_r = (((_max - _r) / 6) + (del_max / 2)) / del_max;
            del_g = (((_max - _g) / 6) + (del_max / 2)) / del_max;
            del_b = (((_max - _b) / 6) + (del_max / 2)) / del_max;

            if (_r === _max) {
                h = del_b - del_g;
            } else if (_g === _max) {
                h = (1 / 3) + del_r - del_b;
            } else if (_b === _max) {
                h = (2 / 3) + del_g - del_r;
            }

            if (h < 0) { h += 1; }
            if (h > 1) { h -= 1; }
        }
        return [h,s,v];
    };
    //
    Color.hsv2rgb = (h, s, v) => {
        let r, g, b;
        //h, s and v input range = 0 ÷ 1.0
        //r, g and b output range = 0 ÷ 255
        if (s === 0) {
            r = v * 255;
            g = v * 255;
            b = v * 255;
        } else {
            let var_h, var_i, var_1, var_2, var_3, var_r, var_g, var_b;
            var_h = h * 6;
            if (var_h === 6) {
                var_h = 0;                  //h must be < 1
            }
            var_i = Math.floor(var_h);
            var_1 = v * (1 - s);
            var_2 = v * (1 - s * (var_h - var_i));
            var_3 = v * (1 - s * (1 - (var_h - var_i)));

            if (var_i === 0) {
                var_r = v;
                var_g = var_3;
                var_b = var_1;
            } else if (var_i === 1) {
                var_r = var_2;
                var_g = v;
                var_b = var_1;
            } else if (var_i === 2) {
                var_r = var_1;
                var_g = v;
                var_b = var_3;
            } else if (var_i === 3) {
                var_r = var_1;
                var_g = var_2;
                var_b = v;
            } else if (var_i === 4) {
                var_r = var_3;
                var_g = var_1;
                var_b = v;
            } else {
                var_r = v;
                var_g = var_1;
                var_b = var_2;
            }

            r = var_r * 255;
            g = var_g * 255;
            b = var_b * 255;
        }
        return [r, g, b];
    };
    //判断明暗(RGB 模式转换成 YUV 模式，而 Y 是明亮度（灰阶）)
    Color.islight = (color) => {
        color = Color.create( color );
        return (color.$r*0.299 + color.$g*0.587 + color.$b*0.114) >= 192 ? true : false;
    };
    //变亮
    Color.lighten = (color, value) => {
        return Color.create( color ).lighten( value );
    };
    //变暗
    Color.darken = (color, value) => {
        return Color.create( color ).darken( value );
    };
    //透明度
    Color.opacity = (color, value) => {
        return Color.create( color ).opacity( value );
    };
    //计算互补色
    Color.inverse = (color) => {
        return Color.create( color ).inverse();
    };

    return Color;
})();

export default Color;
