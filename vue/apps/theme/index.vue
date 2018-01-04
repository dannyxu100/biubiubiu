<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <!-- <div class="wrapper wrapper-scroll wrapper-box"> -->
    <div class="wrapper-box wrapper-theme">
        <div class="apps-container">
            <div class="apps-group">
                <template v-for="(nav,path) in navs.maps" v-if="'/theme'!==path">
                    <a class="apps-item" :key="nav.name" href="javascript:;" @click="$root.routerpath(path)">
                        <i class="ico" :style="styleimage(nav)"></i>
                        <span class="tit">{{nav.name}}</span>
                    </a>
                </template>
            </div>
            <div class="apps-group">
                <router-link class="apps-item" to="/plugins-xscroll">
                    <i class="ico" style="background-image:url(/public/images/apps/x-scroll.svg)"></i>
                    <span class="tit">滚动条</span>
                </router-link>
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
        computed: {
            ...mapGetters([
                'navs'
            ])
        },
        methods: {
            //收起展开左栏
            ...mapActions([
                'toggle_leftbar'
            ]),
            //
            init() {
                // debugger;
            },
            //应用图标
            styleimage( nav ) {
                return {'background-image':`url(${nav.image})`};
            }
        },
        created() {
            this.init();
        }
    }
</script>