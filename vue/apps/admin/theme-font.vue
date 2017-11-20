<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 字体 -->
            <div class="section">
                <h2>字体</h2>
                <h3>中文</h3>
                <div></div>
                <br/>
                <div>
                    <template v-for="(font,idx) in basic.fontfamily.zh">
                        <select class="selector-font" v-model="basic.fontfamily.zh[idx]">
                            <option disabled value="">请选择</option>
                            <template v-for="(sfont,sidx) in selectfont.zh">
                            <option :value="sfont"><span :style="styleoption(sfont)">{{sfont}}</span></option>
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
                    zh: ['"Hiragino Sans GB"', '"Hiragino Sans GB W3"', '"Microsoft YaHei UI"', '"Microsoft YaHei"', '"WenQuanYi Micro Hei"']
                }
            }
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
            //展示字体
            styleoption( font ) {
                return {'font-family': font};
            }
        },
        created() {}
    }
</script>