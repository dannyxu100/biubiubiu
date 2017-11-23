<style lang="less">
    @import "../../less/mixins/prefix.less";

    .leftpad {
        .avatarbox {
            display:inline-block;
            position: relative;
            width: 100%;
            height: 220px;
            // background: rgba(93, 128, 184, .7);
            background-image: url(/public/images/bg-star.png);
            &::before {
                content: "";
                opacity: .9;
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                // .prefix-gradient(0deg, rgb(12,235,235), rgb(32,227,178));
                .prefix-gradient(25deg, rgb(0, 208, 255), rgb(0, 255, 196));
            }
            .avatarbox-content {
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                .btn-toggle {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: block;
                    padding: 0;
                    width: 50px;
                    height: 50px;
                    border: none;
                    cursor: pointer;
                    outline: none;
                    background: rgba(255,255,255,0);
                    .prefix-appearance();
                    .prefix-transition();
                    i {
                        display: inline-block;
                        width: 50px;
                        height: 50px;
                        line-height: 50px;
                        font-size: 22px;
                        color: #fff;
                        .prefix-transform(rotate(-90deg));
                        .prefix-transition(all linear .3s);
                        &::before {
                            position: relative;
                            top: 0;
                            .prefix-transition();
                        }
                        &.active {
                            .prefix-transform(rotate(90deg));
                            &:hover {
                                &::before {
                                    top: 3px;
                                }
                            }
                        }
                    }
                    &:hover {
                        background: rgba(255,255,255,.3);
                    }
                }
                .avatar-image {
                    position: relative;
                    top: 0;
                    margin: 60px auto 0;
                    width: 64px;
                    height: 64px;
                    background-color: rgba(255,255,255,.9);
                    background-repeat: no-repeat;
                    background-size: cover;
                    .prefix-border-radius(50px);
                    .prefix-transition();
                    &:hover {
                        top: -2px;
                        .prefix-box-shadow(3px 10px 30px 3px rgb(102, 255, 233,.1));
                    }
                }
                .avatar-name {
                    margin: 10px auto 0;
                    width: 160px;
                    text-align: center;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    .prefix-border-radius(12px);
                }
                .avatar-remark {
                    margin: 3px auto 0;
                    width: 160px;
                    text-align: center;
                    color: rgb(144, 255, 227);
                    font-size: 13px;
                }
            }
        }

        .menusbox {
            position: absolute;
            top: 220px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: auto;
            .menus-group {
                .groupname {
                    margin: 25px 20px 0;
                    font-size: 12px;
                    // color: rgb(0, 188, 182);
                    color: rgb(0, 68, 90);
                }
                .menu {
                    .name {
                        position: relative;
                        display: block;
                        padding: 13px 20px;
                        font-size: 15px;
                        color: rgb(60, 122, 145);
                        cursor: pointer;
                        text-decoration: none;
                        .prefix-transition();
                        &:hover,
                        &.active {
                            color: rgb(19, 74, 94);
                        }
                        i {
                            margin-right: 10px;
                            font-size: 16px;
                        }
                    }
                    .child {
                        padding-left: 40px;
                        padding-bottom: 20px;
                    }
                    &.haschild {
                        .name {
                            padding: 4px 20px;
                        }
                        & > .name {
                            padding: 13px 20px;
                            &::after {
                                position: absolute;
                                top: 0;
                                right: 20px;
                                bottom: 0;
                                width: 50px;
                                height: 50px;
                                line-height: 50px;
                                text-align: center;
                                color: rgb(106, 148, 164);
                                font-family: "iconfont" !important;
                                font-size: 20px;
                                font-style: normal;
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                                content: "\e64d";                           //
                                // .prefix-transform(rotate(90deg));        //旋转向下
                            }
                            &.active {
                                &::after {
                                    color: rgb(19, 74, 94);
                                }
                            }
                        }
                    }
                }
                & > .menu {
                    border-bottom: 1px solid rgb(190, 226, 231);
                }
            }
        }
    }
</style>

<template>
	<div class="leftpad wrapper">
        <div class="avatarbox">
            <div class="avatarbox-content">
                <button class="btn-toggle" @click="toggle_leftbar()">
                    <i class="iconfont icon-down" :class="{active:leftbar.show}"></i>
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
                'leftbar'
            ])
        },
        methods:{
            ...mapActions([
                'toggle_leftbar'
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