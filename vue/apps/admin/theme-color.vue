<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <button @click="submit">保存</button>
        <div class="container">
            <!-- 基调配色 -->
            <h2>基调配色</h2>
            <h3>色块</h3>
            <div>.bgtheme | .bgkey | .bglight | .bgnice | .bgblack | .bgwhite | .bggray</div>
            <br/>
            <div class="grid">
                <div class="grid-row" style="">
                    <template v-for="(color, colorkey) in basic.colors">
                    <div class="cell-7-1">
                        <template v-for="(item, itemkey) in color.ladder">
                        <div v-if="item" class="colorblock" :class="classesblock(item, itemkey)" :style="stylebgcolor(item, itemkey)">
                            <div>{{item.name}}</div>
                            <div>{{item.class}}</div>
                            <div>{{item.hex}}</div>
                            <div v-if="true === color.editable && 'normal'===itemkey">
                                <input class="inputcolor" v-model="item.rgb" @blur="changecolor(color)"/>
                            </div>
                            <div v-else>{{item.rgb}}</div>
                        </div>
                        <div v-else class="colorblock empty"></div>
                        </template>
                    </div>
                    </template>
                </div>
            </div>

            <br/>
            <div>我这个配色方案中还给出一些辅助色，参考一下得了</div>
            <br/>
            <div class="grid">
                <div class="grid-row" style="">
                    <template v-for="(color, colorkey) in basic.colors">
                    <div v-if="color.complementary" class="cell-7-1">
                        <div class="colorblock-min" :style="stylebgcolor4min(color)">
                            <div>{{color.complementary.hex}}</div>
                            <div>{{color.complementary.rgb}}</div>
                        </div>
                    </div>
                    </template>
                    <!-- <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#ED0145">
                            <div>#ED0145</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#D13079">
                            <div>#D13079</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#710AAA">
                            <div>#710AAA</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#FF6000">
                            <div>#FF6000</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#FFBA73">
                            <div>#FFBA73</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#F8F1CE">
                            <div>#F8F1CE</div>
                        </div>
                    </div> -->
                </div>
            </div>
            <br/>
            <br/>


            <h3>文本</h3>
            <div>深暗色调</div>
            <div>.ftheme | .fkey | .fnice | .fblack</div>
            <ul class="textbox5">
                <li class="ftheme">Look inside</li>
                <li class="ftheme">看看</li>
                <li class="ftheme">Look inside your tiny mind</li>
                <li class="ftheme">看看你那浅薄的思想</li>
            </ul>
            <ul class="textbox5">
                <li class="fkey">then look a bit harder</li>
                <li class="fkey">放远大点吧</li>
                <li class="fkey">Cause we're so uninspired</li>
                <li class="fkey">因为那里装不下灵魂</li>
            </ul>
            <ul class="textbox5">
                <li class="fnice">So sick and tired of all the hatred you harbor</li>
                <li class="fnice">如此恶心另人厌倦 全是罪恨</li>
                <li class="fnice">So you say</li>
                <li class="fnice">所以你说</li>
            </ul>
            <ul class="textbox5">
                <li class="fblack">It's not okay to be gay</li>
                <li class="fblack">你不认同同性恋</li>
                <li class="fblack">Well I think you're just evil</li>
                <li class="fblack">然而我覺得你是個魔鬼</li>
            </ul>

            <div>明亮色调</div>
            <div>.flight | .fwhite | .fgray</div>
            <ul class="textbox10 bgimg-dark">
                <li class="flight">You're just some racist who can't tie my laces</li>
                <li class="flight">你就是一种种族歧视 連鞋帶都不配給我系</li>
                <li class="flight">Your point of view is medieval</li>
                <li class="flight">你的觀點已經過時</li>
            </ul>
            <ul class="textbox10 bgimg-dark">
                <li class="fgray">Fuck you (Fuck you)</li>
                <li class="fgray">去你的</li>
                <li class="fgray">Fuck you very, very much</li>
                <li class="fgray">真的是去你媽的</li>
            </ul>
            <ul class="textbox10 bgimg-dark">
                <li class="fwhite">Cause your words don't translate</li>
                <li class="fwhite">因为我们语言不通</li>
                <li class="fwhite">And it's getting quite late</li>
                <li class="fwhite">那只会耽误时间</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        data() {
            return {}
        },
        computed: {
            //
            ...mapGetters([
                'basic'
            ])

        },
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ])
            //色块样式
            classesblock( item, itemkey ) {
                let classes = {};
                if( !this.islight(item.rgb) ) {
                    classes['fwhite'] = true;
                }
                if( 'normal' === itemkey ) {
                    classes['active'] = true;
                }
                return classes;
            },
            //实时预览色块颜色
            stylebgcolor( item, itemkey ) {
                return {'background-color': 'rgb('+ item.rgb +')'};
            },
            //实时预览色块颜色(辅助色)
            stylebgcolor4min( color ) {
                return {'border-color': 'rgb('+ color.complementary.rgb +')'};
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
            //判断明暗(RGB 模式转换成 YUV 模式，而 Y 是明亮度（灰阶）)
            islight( rgb ) {
                let graylevel;
                rgb = this.getrgb( rgb );
                graylevel = rgb.$R * 0.299 + rgb.$G * 0.587 + rgb.$B * 0.114;
                return graylevel >= 192 ? true : false;
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
        created() {}
    }
</script>