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
                            主题色
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.theme.ladder.normal.rgb" @blur="changecolor(basic.colors.theme)"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">
                            关键色
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.key.ladder.normal.rgb" @blur="changecolor(basic.colors.key)"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">
                            闪亮色
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.light.ladder.normal.rgb" @blur="changecolor(basic.colors.light)"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">
                            友好色
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.colors.nice.ladder.normal.rgb" @blur="changecolor(basic.colors.nice)"/>
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
                let ladder, normal, tmp;
                ladder = coloritem.ladder;
                normal = new Color( ladder.normal.rgb );

                ladder.normal.rgb = normal.$rgb;
                ladder.normal.hex = normal.$hex;

                if( ladder.light ){
                    tmp = Color.lighten(normal, 30);
                    ladder.light.rgb = tmp.$rgb;
                    ladder.light.hex = tmp.$hex;
                }
                if( ladder.lighter ){
                    tmp = Color.lighten(normal, 90);
                    ladder.lighter.rgb = tmp.$rgb;
                    ladder.lighter.hex = tmp.$hex;
                }
                if( ladder.lightest ){
                    tmp = Color.lighten(normal, 196);
                    ladder.lightest.rgb = tmp.$rgb;
                    ladder.lightest.hex = tmp.$hex;
                }
                if( ladder.dark ){
                    tmp = Color.darken(normal, 60);
                    ladder.dark.rgb = tmp.$rgb;
                    ladder.dark.hex = tmp.$hex;
                }
                if( ladder.darker ){
                    tmp = Color.darken(normal, 80);
                    ladder.darker.rgb = tmp.$rgb;
                    ladder.darker.hex = tmp.$hex;
                }
                if( ladder.darkest ){
                    tmp = Color.darken(normal, 120);
                    ladder.darkest.rgb = tmp.$rgb;
                    ladder.darkest.hex = tmp.$hex;
                }

                tmp = Color.inverse(normal);
                coloritem.complementary.rgb = tmp.$rgb;
                coloritem.complementary.hex = tmp.$hex;
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