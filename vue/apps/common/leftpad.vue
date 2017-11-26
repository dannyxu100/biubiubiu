<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
	<div class="leftpad wrapper">
        <div class="avatarbox">
            <div class="avatarbox-content">
                <button class="btn-toggle" @click="toggle_leftpad()">
                    <i class="iconfont icon-down" :class="{active:leftpad.show}"></i>
                </button>
                <div class="avatar-image" style="background-image:url(/public/images/avatar.png)"></div>
                <div class="avatar-name">王小二</div>
                <div class="avatar-remark">市场部-专员</div>
            </div>
        </div>

        <div class="menusbox">
            <div class="menus-group">
                <div class="groupname"><!-- 常用功能 --></div>
                <div class="menu">
                    <a class="name" href="javascript:void(0)"><i class="iconfont icon-file-inverse"></i>发布文章</a>
                </div>
            </div>
            <div class="menus-group">
                <div class="groupname"><!-- 全部模块 --></div>
                <div class="menu haschild">
                    <span class="name" :class="{active:menu.theme}" @click="togglemenu('theme')">
                        <i class="iconfont icon-theme-inverse"></i>主题样式
                    </span>
                    <transition name="slide">
                    <div class="child" v-if="menu.theme" transition="slide">
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-color">配色</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-font">字体</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-grid">栅格</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-table">表格</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-button">按钮</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-popmenu">气泡菜单</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-check">选择项</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-select">下拉</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-tabs">标签页</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-tag">标签</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-input">输入框</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-form">表单</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-dialog">对话框</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-icons">字体图标</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-section">排版</router-link>
                        </div>
                        <div class="menu">
                            <router-link class="name" to="/admin-theme-comm">通用类</router-link>
                        </div>
                    </div>
                    </transition>
                </div>
                <div class="menu haschild">
                    <span class="name" :class="{active:menu.modules}" @click="togglemenu('modules')">
                        <i class="iconfont icon-window-inverse"></i>功能模块
                    </span>
                    <transition name="slide">
                    <div class="child" v-if="menu.modules" transition="slide">
                        <div class="menu">
                            <a class="name" href="javascript:void(0)">用户管理</a>
                        </div>
                        <div class="menu">
                            <a class="name" href="javascript:void(0)">订单管理</a>
                        </div>
                    </div>
                    </transition>
                </div>
                <div class="menu haschild">
                    <span class="name" :class="{active:menu.all}" @click="togglemenu('all')">
                        <i class="iconfont icon-list"></i>文章模块
                    </span>
                    <transition name="slide">
                    <div class="child" v-if="menu.all">
                        <div class="menu">
                            <a class="name" href="javascript:void(0)">文章管理</a>
                        </div>
                        <div class="menu">
                            <a class="name" href="javascript:void(0)">文章分类</a>
                        </div>
                    </div>
                    </transition>
                </div>
                <div class="menus-group">
                    <div class="groupname"><!-- 其他 --></div>
                    <div class="menu">
                        <a class="name" href="javascript:void(0)"><i class="iconfont icon-lock-inverse"></i>修改密码</a>
                    </div>
                    <div class="menu">
                        <a class="name" href="javascript:void(0)"><i class="iconfont icon-file-inverse"></i>退出登录</a>
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
        props:{},
        data() {
            return {
                menu: {
                    theme: true,
                    modules: false,
                    all: false
                }
            }
        },
        computed: {
            ...mapGetters([
                'leftpad'
            ])
        },
        methods:{
            ...mapActions([
                'toggle_leftpad'
            ]),
            //展开收起子菜单
            togglemenu( type ){
                this.menu[type] = !this.menu[type];
            }
        },
        created() {
            // debugger;
        },
    }
</script>