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

            } else if ( match = args[0].match( regx_rgb ) ) {
                this.set_rgb.apply( this, match[2].split(',') );

            }
        } else if( 3 === args.length ) {
            this.set_rgb.apply(this, args);

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
        //
        set_alpha( alpha ) {
            this.$a = alpha;
            this.$rgb = `rgb(${this.$r},${this.$g},${this.$b})`;
            this.$rgba = `rgba(${this.$r},${this.$g},${this.$b}, ${this.$a})`;
        },
        //
        set_hex( hex ) {
            hex = 0 === hex.indexOf('#') ? hex : '#'+hex;
            this.$hex = hex;
        },
        //
        set_rgb( r, g, b ) {
            r = r < 0 ? 0 : ( 255 < r ? 255 : r);
            g = g < 0 ? 0 : ( 255 < g ? 255 : g);
            b = b < 0 ? 0 : ( 255 < b ? 255 : b);
            this.$r = r;
            this.$g = g;
            this.$b = b;
            this.$rgb = `rgb(${this.$r},${this.$g},${this.$b})`;
            this.$rgba = `rgba(${this.$r},${this.$g},${this.$b}, ${this.$a})`;
        }
    };

    //拆分rgb数值
    Color.getrgb = ( str )=>{
        let rgb;
        if( regx_hex.test(str) ){
            str = Color.hex2rgb( str );
        }
        if ( regx_rgb.test(str) ) {
            rgb = str.split(',');
        } else {
            rgb = [0,0,0];
        }
        let r, g, b;
        r = rgb[0] < 0 ? 0 : ( 255 < rgb[0] ? 255 : rgb[0]);
        g = rgb[1] < 0 ? 0 : ( 255 < rgb[1] ? 255 : rgb[1]);
        b = rgb[2] < 0 ? 0 : ( 255 < rgb[2] ? 255 : rgb[2]);
        return {
            $R: parseInt(r),
            $G: parseInt(g),
            $B: parseInt(b)
        };
    };
    //rgb转hex
    Color.rgb2hex = ( rgb ) => {
        rgb = 'string' === typeof rgb ? Color.getrgb(rgb) : rgb;
        return '#' + ((1 << 24) + (rgb.$R << 16) + (rgb.$G << 8) + rgb.$B).toString(16).slice(1).toUpperCase();
    };
    //hex转rgb
    Color.hex2rgb = ( color, hex ) => {
        if( !(color instanceof Color) ){
            color = Color.init();
        }

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
            color.set_rgb( rgb[0], rgb[1], rgb[2] );
            return rgb.join(',');                           //输出RGB格式颜色
        } else {
            // console.log(`Input ${hex} is wrong!`);
            return '0,0,0';
        }
    };
    //变亮
    Color.lighten = ( rgb, value ) => {
        rgb = 'string' === typeof rgb ? Color.getrgb(rgb) : rgb;
        let r, g, b;
        r = rgb.$R+value;
        r = r < 0 ? 0 : ( 255 < r ? 255 : r);
        g = rgb.$G+value;
        g = g < 0 ? 0 : ( 255 < g ? 255 : g);
        b = rgb.$B+value;
        b = b < 0 ? 0 : ( 255 < b ? 255 : b);
        return [ r, g, b ].join(',');
    };
    //变暗
    Color.darken = ( rgb, value ) => {
        return Color.lighten( rgb, -value );
    };
    //计算互补色
    Color.complementarycolor = ( rgb ) => {
        rgb = 'string' === typeof rgb ? Color.getrgb(rgb) : rgb;
        return [255-rgb.$R, 255-rgb.$G, 255-rgb.$B].join(',');
    };

    return Color;
})();

let a = new Color('123,223,44');
debugger;

export default Color;
