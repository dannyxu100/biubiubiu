<style lang="less">
    @import "../../less/mixins/prefix.less";

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
                    <i class="ico" style="background-image:url(/public/images/apps/theme-badge.svg)"></i>
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
            ...mapActions([
                'toggle_leftbar'
            ])
        },
        created() {
        }
    }
</script>