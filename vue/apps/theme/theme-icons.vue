<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <!-- <div class="wrapper wrapper-scroll wrapper-box wrapper-theme"> -->
    <div class="wrapper-box wrapper-theme">
        <div class="container">
            <!-- 图标 -->
            <div class="section">
                <h2>图标</h2>
                <h3>.iconfont.icon-*</h3>
                <div>字体图标生成工具：<a href="http://www.iconfont.cn/" target="_blank">ICONFONT.CN</a></div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-12 demo-iconfont">
                            <i class="iconfont icon-done"></i>
                            <i class="iconfont icon-delete"></i>
                            <i class="iconfont icon-add"></i>
                            <br/>
                            <i class="iconfont icon-down"></i>
                            <i class="iconfont icon-down-min"></i>
                            <i class="iconfont icon-right"></i>
                            <i class="iconfont icon-right-min"></i>
                            <i class="iconfont icon-up"></i>
                            <i class="iconfont icon-up-min"></i>
                            <i class="iconfont icon-left"></i>
                            <i class="iconfont icon-left-min"></i>
                            <br/>
                            <i class="iconfont icon-ok"></i>
                            <i class="iconfont icon-error"></i>
                            <i class="iconfont icon-plus"></i>
                            <i class="iconfont icon-stop"></i>
                            <i class="iconfont icon-info"></i>
                            <i class="iconfont icon-warning"></i>
                            <i class="iconfont icon-circle"></i>
                            <i class="iconfont icon-dot"></i>
                            <br/>
                            <i class="iconfont icon-menu"></i>
                            <i class="iconfont icon-list"></i>
                            <i class="iconfont icon-load"></i>
                            <i class="iconfont icon-refresh"></i>
                            <i class="iconfont icon-back"></i>
                            <i class="iconfont icon-search"></i>
                            <i class="iconfont icon-trash"></i>
                            <i class="iconfont icon-lock"></i>
                            <i class="iconfont icon-lock-inverse"></i>
                            <br/>
                            <i class="iconfont icon-window"></i>
                            <i class="iconfont icon-window-inverse"></i>
                            <i class="iconfont icon-apps"></i>
                            <i class="iconfont icon-layer"></i>
                            <i class="iconfont icon-pc"></i>
                            <i class="iconfont icon-pc-inverse"></i>
                            <i class="iconfont icon-switch"></i>
                            <i class="iconfont icon-switch-inverse"></i>
                            <i class="iconfont icon-setting"></i>
                            <i class="iconfont icon-setting-inverse"></i>
                            <i class="iconfont icon-exit"></i>
                            <br/>
                            <i class="iconfont icon-document"></i>
                            <i class="iconfont icon-file"></i>
                            <i class="iconfont icon-file-inverse"></i>
                            <i class="iconfont icon-edit"></i>
                            <i class="iconfont icon-folder"></i>
                            <i class="iconfont icon-pic"></i>
                            <i class="iconfont icon-mail"></i>
                            <br/>
                            <i class="iconfont icon-link"></i>
                            <i class="iconfont icon-chart"></i>
                            <i class="iconfont icon-chart-inverse"></i>
                            <i class="iconfont icon-cart"></i>
                            <i class="iconfont icon-cart-inverse"></i>
                            <i class="iconfont icon-money"></i>
                            <br/>
                            <i class="iconfont icon-download"></i>
                            <i class="iconfont icon-download-inverse"></i>
                            <i class="iconfont icon-upload"></i>
                            <i class="iconfont icon-upload-inverse"></i>
                            <i class="iconfont icon-date"></i>
                            <i class="iconfont icon-time"></i>
                            <i class="iconfont icon-location"></i>
                            <br/>
                            <i class="iconfont icon-show"></i>
                            <i class="iconfont icon-hide"></i>
                            <i class="iconfont icon-radio"></i>
                            <i class="iconfont icon-radio-hover"></i>
                            <i class="iconfont icon-radio-checked"></i>
                            <i class="iconfont icon-checkbox"></i>
                            <i class="iconfont icon-checkbox-hover"></i>
                            <i class="iconfont icon-checkbox-checked"></i>
                            <br/>
                            <i class="iconfont icon-user"></i>
                            <i class="iconfont icon-user-circle"></i>
                            <i class="iconfont icon-user-inverse"></i>
                            <i class="iconfont icon-chat"></i>
                            <i class="iconfont icon-phone"></i>
                            <i class="iconfont icon-phone-circle"></i>
                            <br/>
                            <i class="iconfont icon-theme"></i>
                            <i class="iconfont icon-theme-inverse"></i>
                            <i class="iconfont icon-like"></i>
                            <i class="iconfont icon-like-inverse"></i>
                            <i class="iconfont icon-good"></i>
                            <i class="iconfont icon-good-circle"></i>
                            <i class="iconfont icon-notice"></i>
                            <i class="iconfont icon-notice-circle"></i>
                            <i class="iconfont icon-rocket"></i>
                            <i class="iconfont icon-light"></i>
                            <br/>

                        </div>
                    </div>
                </div>
                <br/>

                <h3>保留图标</h3>
                <div>你可以使用工具生成自定义的字体图标文件，但是一定要包含以下这些图标样式，以保证UI的正常使用。</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-12 demo-iconfont-sys">
                            <i class="iconfont icon-done"></i>
                            <i class="iconfont icon-delete"></i>
                            <i class="iconfont icon-left"></i>
                            <i class="iconfont icon-left-min"></i>
                            <i class="iconfont icon-right"></i>
                            <i class="iconfont icon-right-min"></i>
                            <i class="iconfont icon-down"></i>
                            <i class="iconfont icon-down-min"></i>
                            <i class="iconfont icon-up"></i>
                            <i class="iconfont icon-up-min"></i>
                            <i class="iconfont icon-radio"></i>
                            <i class="iconfont icon-radio-hover"></i>
                            <i class="iconfont icon-radio-checked"></i>
                            <i class="iconfont icon-checkbox"></i>
                            <i class="iconfont icon-checkbox-hover"></i>
                            <i class="iconfont icon-checkbox-checked"></i>
                            <i class="iconfont icon-date"></i>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>

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
        computed: {},
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ])
        },
        created() {
        }
    }
</script>