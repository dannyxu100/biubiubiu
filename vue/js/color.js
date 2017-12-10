const color = {
    //拆分rgb数值
    getrgb( str ){
        let rgb;
        if( /^\#[0-9A-F]{3,6}$/i.test(str) ){
            str = this.hex2rgb( str );
        }
        if ( /^\d{1,3}\,\d{1,3}\,\d{1,3}$/i.test(str) ) {
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
            $B: parseInt(b),
        };
    },
    //rgb转hex
    rgb2hex( rgb ) {
        rgb = 'string' === typeof rgb ? this.getrgb(rgb) : rgb;
        return '#' + ((1 << 24) + (rgb.$R << 16) + (rgb.$G << 8) + rgb.$B).toString(16).slice(1).toUpperCase();
    },
    //hex转rgb
    hex2rgb( hex ) {
        var rgb = []; // 定义rgb数组
        if (/^\#[0-9A-F]{3}$/i.test(hex)) {                 //判断传入是否为#三位十六进制数
            let sizhex = '#';
            hex.replace(/[0-9A-F]/ig, function(kw) {
                sizhex += kw + kw;                          //把三位16进制数转化为六位
            });
            hex = sizhex;                                   //保存回hex
        }
        if (/^#[0-9A-F]{6}$/i.test(hex)) {                  //判断传入是否为#六位十六进制数
            hex.replace(/[0-9A-F]{2}/ig, function(kw) {
                rgb.push(eval('0x' + kw));                  //十六进制转化为十进制并存如数组
            });
            return rgb.join(',');                           //输出RGB格式颜色
        } else {
            // console.log(`Input ${hex} is wrong!`);
            return '0,0,0';
        }
    },
    //变亮
    lighten( rgb, value ) {
        rgb = 'string' === typeof rgb ? this.getrgb(rgb) : rgb;
        let r, g, b;
        r = rgb.$R+value;
        r = r < 0 ? 0 : ( 255 < r ? 255 : r);
        g = rgb.$G+value;
        g = g < 0 ? 0 : ( 255 < g ? 255 : g);
        b = rgb.$B+value;
        b = b < 0 ? 0 : ( 255 < b ? 255 : b);
        return [ r, g, b ].join(',');
    },
    //变暗
    darken( rgb, value ) {
        return this.lighten( rgb, -value );
    },
    //计算互补色
    complementarycolor( rgb ) {
        rgb = 'string' === typeof rgb ? this.getrgb(rgb) : rgb;
        return [255-rgb.$R, 255-rgb.$G, 255-rgb.$B].join(',');
    }
};

export default color;
