<style lang="less">
    @import "../../less/mixins/prefix.less";

    .apps-container {
        margin: 20px;
        .apps-group {
            padding: 20px 0 0;
            border-bottom: 1px solid rgba(255,255,255,.15);
            font-size: 0;
            .apps-item {
                position: relative;
                top: 0;
                display: inline-block;
                font-size: 14px;
                margin-right: 20px;
                margin-bottom: 20px;
                text-decoration: none;
                .prefix-transition();
                .ico {
                    display: block;
                    margin: 0 auto 10px;
                    width: 58px;
                    height: 58px;
                    // border: 1px solid rgba(255,255,255,.2);
                    background-color: rgba(255,255,255,1);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 58px 58px;
                    .prefix-border-radius(9px);
                    .prefix-box-shadow(0 2px 3px 0 rgba(19, 74, 94,.1));
                    .prefix-transition();
                }
                .tit {
                    display: block;
                    position: relative;
                    z-index: 2;
                    width: 96px;
                    height: 26px;
                    line-height: 28px;
                    color: rgb(26, 182, 171);
                    font-size: 13px;
                    text-align: center;
                    .prefix-transition();
                }
                &:after {
                    opacity: 0;
                    content: "";
                    display: block;
                    position: absolute;
                    z-index: 1;
                    top: 70px;
                    left: 48px;
                    bottom: 0;
                    right: 0;
                    width: 0;
                    .prefix-border-radius(13px);
                    .prefix-gradient(25deg, rgba(0, 79, 147, .7), rgba(0, 166, 124, .8));
                    .prefix-transition();
                }
                &:hover {
                    top: -2px;
                    .ico {
                        background-color: rgba(255,255,255,1);
                        .prefix-box-shadow(0 3px 30px 5px rgba(190, 243, 255,.5));
                    }
                    .tit {
                        color: rgb(255,255,255);
                    }
                    &:after {
                        opacity: 1;
                        width: 96px;
                        left: 0;
                        .prefix-box-shadow(0 5px 10px 3px rgba(0, 166, 124,.3));
                    }
                }
            }
        }
    }

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box">
        <div class="apps-container">
            <div class="apps-group">
                <router-link class="apps-item" to="/admin-theme-color">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-color.svg)"></i>
                    <span class="tit">配色</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-font">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-font.svg)"></i>
                    <span class="tit">字体</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-grid">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-grid.svg)"></i>
                    <span class="tit">栅格</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-table">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-table.svg)"></i>
                    <span class="tit">表格</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-button">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-button-play.svg)"></i>
                    <span class="tit">按钮</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-popmenu">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-popmenu.svg)"></i>
                    <span class="tit">气泡菜单</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-check">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-checked.svg)"></i>
                    <span class="tit">选择项</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-select">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-list.svg)"></i>
                    <span class="tit">下拉</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-tabs">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-tabs.svg)"></i>
                    <span class="tit">标签页</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-tag">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-tag.svg)"></i>
                    <span class="tit">标签</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-input">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-input.svg)"></i>
                    <span class="tit">输入框</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-form">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-form.svg)"></i>
                    <span class="tit">表单</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-dialog">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-window.svg)"></i>
                    <span class="tit">对话框</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-icons">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-heart.svg)"></i>
                    <span class="tit">图标</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-section">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-text.svg)"></i>
                    <span class="tit">排版</span>
                </router-link>
                <router-link class="apps-item" to="/admin-theme-comm">
                    <i class="ico" style="background-image:url(/public/images/apps/theme-patch.svg)"></i>
                    <span class="tit">通用类</span>
                </router-link>
            </div>
            <div class="apps-group">
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/users.svg)"></i>
                    <span class="tit">用户</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/users2.svg)"></i>
                    <span class="tit">用户</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/menu.svg)"></i>
                    <span class="tit">菜单</span>
                </router-link>
            </div>
            <div class="apps-group">
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/documents.svg)"></i>
                    <span class="tit">分类</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/text.svg)"></i>
                    <span class="tit">文章</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/check.svg)"></i>
                    <span class="tit">审核</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/charts.svg)"></i>
                    <span class="tit">报表</span>
                </router-link>
            </div>
            <div class="apps-group">
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/password.svg)"></i>
                    <span class="tit">密码</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/edit.svg)"></i>
                    <span class="tit">编辑</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/setting.svg)"></i>
                    <span class="tit">权限</span>
                </router-link>
            </div>
            <div class="apps-group">
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/submit.svg)"></i>
                    <span class="tit">提交</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/pay.svg)"></i>
                    <span class="tit">支付</span>
                </router-link>
                <router-link class="apps-item" to="">
                    <i class="ico" style="background-image:url(/public/images/apps/task.svg)"></i>
                    <span class="tit">任务</span>
                </router-link>
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
                mode: 'HOME',
                userid4modal: '333',
                showdetail: false
            }
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