<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme-ctrl">
        <div class="container">
            <!-- 颜色 -->
            <div class="section">
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-4">
                            主题
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.theme.ladder.normal.rgb" @blur="changecolor(basic.colors.theme)"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">
                            关键的
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.key.ladder.normal.rgb" @blur="changecolor(basic.colors.key)"/>
                        </div>
                    </div>
                    <div class="grid-row">
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
    import Color                            from '_JS_/color.js';

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
            //设置颜色
            changecolor( coloritem ) {
                let ladder, rgb;
                ladder = coloritem.ladder;
                rgb = Color.getrgb( ladder.normal.rgb );
                ladder.normal.rgb = [rgb.$R, rgb.$G, rgb.$B].join(',');
                ladder.normal.hex = Color.rgb2hex( rgb );

                if( ladder.light ){
                    ladder.light.rgb = Color.lighten( rgb, 30 );
                    ladder.light.hex = Color.rgb2hex( ladder.light.rgb );
                }
                if( ladder.lighter ){
                    ladder.lighter.rgb = Color.lighten( rgb, 90 );
                    ladder.lighter.hex = Color.rgb2hex( ladder.lighter.rgb );
                }
                if( ladder.lightest ){
                    ladder.lightest.rgb = Color.lighten( rgb, 196 );
                    ladder.lightest.hex = Color.rgb2hex( ladder.lightest.rgb );
                }
                if( ladder.dark ){
                    ladder.dark.rgb = Color.darken( rgb, 20 );
                    ladder.dark.hex = Color.rgb2hex( ladder.dark.rgb );
                }
                if( ladder.darker ){
                    ladder.darker.rgb = Color.darken( rgb, 60 );
                    ladder.darker.hex = Color.rgb2hex( ladder.darker.rgb );
                }
                if( ladder.darkest ){
                    ladder.darkest.rgb = Color.darken( rgb, 80 );
                    ladder.darkest.hex = Color.rgb2hex( ladder.darkest.rgb );
                }

                coloritem.complementary.rgb = Color.complementarycolor( rgb );
                coloritem.complementary.hex = Color.rgb2hex( coloritem.complementary.rgb );
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