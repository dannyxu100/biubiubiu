<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme-ctrl">
        <div class="container">
            <!-- 颜色 -->
            <div class="section">
                <div class="grid">
                    <div class="row">
                        <div class="cell-12-4">
                            主题
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.theme.ladder.normal.rgb" @blur="changecolor(basic.colors.theme)"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell-12-4">
                            关键的
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.key.ladder.normal.rgb" @blur="changecolor(basic.colors.key)"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell-12-4">
                            闪亮的
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.light.ladder.normal.rgb" @blur="changecolor(basic.colors.light)"/>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="submit">保存</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        data() {
            return {
                selectfont: {
                    ios:    ['-apple-system','sf_ui_textlight','"Lucida Family"'],
                    zh:     ['"Hiragino Sans GB"','"Hiragino Sans GB W3"','"Microsoft YaHei UI"','"Microsoft YaHei"','"WenQuanYi Micro Hei"','SimHei','SimSun','KaiTi','FangSong'],
                    en:     ['"ff-tisa-web-pro-1"','"ff-tisa-web-pro-2"','"Lucida Grande"','"Lucida Sans Unicode"','"Open Sans"','"Helvetica Neue"','Helvetica','"Nimbus Sans L"','Arial','"Trebuchet MS"','Verdana','Tahoma','Georgia','"Times New Roman"','Cursive','"Courier New"'],
                    sys:    ['MS Sans Serif','sans-serif', 'Serif'],
                }
            }
        },
        computed: {
            //
            ...mapGetters([
                'basic'
            ])
        },
        filters: {
            symbolclear( value ) {
                return value.replace(/\"/g, '');
            }
        },
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ]),
            //展示字体
            styleoption( font ) {
                return {'font-family': font};
            },
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
                }
            },
            //rgb转hex
            rgb2hex( rgb ) {
                rgb = 'string' === typeof rgb ? this.getrgb(rgb) : rgb;
                return "#" + ((1 << 24) + (rgb.$R << 16) + (rgb.$G << 8) + rgb.$B).toString(16).slice(1).toUpperCase();
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
            },
            //设置颜色
            changecolor( color ) {
                let ladder, rgb;
                ladder = color.ladder;
                rgb = this.getrgb( ladder.normal.rgb );
                ladder.normal.rgb = [rgb.$R, rgb.$G, rgb.$B].join(',');
                ladder.normal.hex = this.rgb2hex( rgb );

                if( ladder.light ){
                    ladder.light.rgb = this.lighten( rgb, 30 );
                    ladder.light.hex = this.rgb2hex( ladder.light.rgb );
                }
                if( ladder.lighter ){
                    ladder.lighter.rgb = this.lighten( rgb, 90 );
                    ladder.lighter.hex = this.rgb2hex( ladder.lighter.rgb );
                }
                if( ladder.lightest ){
                    ladder.lightest.rgb = this.lighten( rgb, 196 );
                    ladder.lightest.hex = this.rgb2hex( ladder.lightest.rgb );
                }
                if( ladder.dark ){
                    ladder.dark.rgb = this.darken( rgb, 20 );
                    ladder.dark.hex = this.rgb2hex( ladder.dark.rgb );
                }
                if( ladder.darker ){
                    ladder.darker.rgb = this.darken( rgb, 60 );
                    ladder.darker.hex = this.rgb2hex( ladder.darker.rgb );
                }
                if( ladder.darkest ){
                    ladder.darkest.rgb = this.darken( rgb, 80 );
                    ladder.darkest.hex = this.rgb2hex( ladder.darkest.rgb );
                }

                color.complementary.rgb = this.complementarycolor( rgb );
                color.complementary.hex = this.rgb2hex( color.complementary.rgb );
            },
            //
            submit() {
                let promi = this.$fn.ajax('/admin/less', {
                    data: JSON.stringify(this.basic)
                });
            }
        },
        created() {
        }
    }
</script>