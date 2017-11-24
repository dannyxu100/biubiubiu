<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 颜色 -->
            <div class="section">
                主题色：<input class="inputcolor" v-model="basic.colors.theme.rgb" @blur="changecolor(color)"/>
            </div>

            <!-- 字体 -->
            <div class="section">
                <h2>字体&nbsp;&nbsp;<small>优先级从上而下，自左向右</small></h2>
                <h3>IOS</h3>
                <div></div>
                <div>
                    <template v-for="(font,idx) in basic.fontfamily.ios">
                        <select class="selector-font" v-model="basic.fontfamily.ios[idx]">
                            <option disabled value="">请选择</option>
                            <template v-for="(sfont,sidx) in selectfont.ios">
                            <option :value="sfont"><span :style="styleoption(sfont)">{{sfont | symbolclear}}</span></option>
                            </template>
                        </select>
                    </template>
                </div>
                <br/>

                <h3>中文</h3>
                <div></div>
                <div>
                    <template v-for="(font,idx) in basic.fontfamily.zh">
                        <select class="selector-font" v-model="basic.fontfamily.zh[idx]">
                            <option disabled value="">请选择</option>
                            <template v-for="(sfont,sidx) in selectfont.zh">
                            <option :value="sfont"><span :style="styleoption(sfont)">{{sfont | symbolclear}}</span></option>
                            </template>
                        </select>
                    </template>
                </div>
                <br/>

                <h3>英文</h3>
                <div></div>
                <div>
                    <template v-for="(font,idx) in basic.fontfamily.en">
                        <select class="selector-font" v-model="basic.fontfamily.en[idx]">
                            <option disabled value="">请选择</option>
                            <template v-for="(sfont,sidx) in selectfont.en">
                            <option :value="sfont"><span :style="styleoption(sfont)">{{sfont | symbolclear}}</span></option>
                            </template>
                        </select>
                    </template>
                </div>
                <br/>

                <h3>系统</h3>
                <div></div>
                <div>
                    <template v-for="(font,idx) in basic.fontfamily.sys">
                        <select class="selector-font" v-model="basic.fontfamily.sys[idx]">
                            <option disabled value="">请选择</option>
                            <template v-for="(sfont,sidx) in selectfont.sys">
                            <option :value="sfont"><span :style="styleoption(sfont)">{{sfont | symbolclear}}</span></option>
                            </template>
                        </select>
                    </template>
                </div>
                <br/>
            </div>

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
            }
        },
        created() {
        }
    }
</script>