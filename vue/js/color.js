const Color = (function(){
    let regx_rgb = /^(rgb\()?(\d{1,3}\,\d{1,3}\,\d{1,3})\)?$/i,
        regx_hex = /^\#?([0-9A-F]{3,6})$/i,
        regx_hex_short = /^\#?([0-9A-F]{3})$/i,
        regx_hex_long = /^\#?([0-9A-F]{6})$/i;

    let Color = function( /*hex | r,g,b | rgb(,,)*/ ){
        let args, match;
        args = Array.prototype.slice.call( arguments, 0 );
        if( 1 === args.length ) {
            if( match = args[0].match( regx_hex ) ) {
                this.set_hex( match[1] );
                this.hex2rgb();

            } else if ( match = args[0].match( regx_rgb ) ) {
                this.set_rgb.apply( this, match[2].split(',') );
                this.rgb2hex();
            }
        } else if( 3 === args.length ) {
            this.set_rgb.apply(this, args);
            this.rgb2hex();
        }
        return this;
    };
    Color.prototype = {
        $r: 0,
        $g: 0,
        $b: 0,
        $a: 1,
        $hex:   '#000000',
        $rgb:   'rgb(0,0,0)',
        $rgba:  'rgb(0,0,0, 1)',
        //设置透明度
        set_alpha( alpha ) {
            alpha = Number(alpha);
            this.$a = alpha;
            this.$rgba = `rgba(${this.$r},${this.$g},${this.$b}, ${this.$a})`;
        },
        //
        set_hex( hex ) {
            hex = 0 === hex.indexOf('#') ? hex : '#'+hex;
            this.$hex = hex;
        },
        //
        set_rgb( red, green, blue ) {
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
        hex2rgb() {
            this.set_rgb.apply( this, Color.hex2rgb(this.$hex) );
        },
        //
        rgb2hex() {
            this.set_hex( Color.rgb2hex(this.$r, this.$g, this.$b) );
        },
        //增亮
        //value可以是0~255，也可以是小数
        lighten( value ) {
            value = 0 < value && value < 1 ? value *= 255 : value;
            this.set_rgb(this.$r+value, this.$g+value, this.$b+value);
            this.rgb2hex();
            return this;
        },
        //加深
        //value可以是0~255，也可以是小数
        darken( value ) {
            return this.lighten( -value );
        },
        //透明度
        opacity( value ) {
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
    Color.create = ( color ) => {
        if( color instanceof Color ){
            return new Color(color.$rgb);
        } else {
            return new Color(color);
        }
    };
    //rgb转hex
    Color.rgb2hex = ( r,g,b ) => {
        // rgb = 'string' === typeof rgb ? Color.getrgb(rgb) : rgb;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };
    //hex转rgb
    Color.hex2rgb = ( hex ) => {
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
    //判断明暗(RGB 模式转换成 YUV 模式，而 Y 是明亮度（灰阶）)
    Color.islight = ( color ) => {
        color = Color.create( color );
        return (color.$r*0.299 + color.$g*0.587 + color.$b*0.114) >= 192 ? true : false;
    };
    //变亮
    Color.lighten = ( color, value ) => {
        return Color.create( color ).lighten( value );
    };
    //变暗
    Color.darken = ( color, value ) => {
        return Color.create( color ).darken( value );
    };
    //透明度
    Color.opacity = ( color, value ) => {
        return Color.create( color ).opacity( value );
    };
    //计算互补色
    Color.inverse = ( color ) => {
        return Color.create( color ).inverse();
    };

    return Color;
})();

export default Color;
