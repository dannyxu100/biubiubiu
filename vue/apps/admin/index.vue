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
                    .prefix-box-shadow(0 3px 5px 0 rgba(19, 74, 94,.1));
                    .prefix-transition();
                }
                .tit {
                    display: block;
                    position: relative;
                    z-index: 2;
                    width: 96px;
                    height: 26px;
                    line-height: 26px;
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
                        .prefix-box-shadow(0 3px 30px 5px rgba(255, 255, 255,.5));
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
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/users.svg)"></i>
                    <span class="tit">用户</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/users2.svg)"></i>
                    <span class="tit">用户</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/menu.svg)"></i>
                    <span class="tit">菜单</span>
                </a>
            </div>
            <div class="apps-group">
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/documents.svg)"></i>
                    <span class="tit">分类</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/text.svg)"></i>
                    <span class="tit">文章</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/check.svg)"></i>
                    <span class="tit">审核</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/charts.svg)"></i>
                    <span class="tit">报表</span>
                </a>
            </div>
            <div class="apps-group">
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/password.svg)"></i>
                    <span class="tit">密码</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/edit.svg)"></i>
                    <span class="tit">编辑</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/setting.svg)"></i>
                    <span class="tit">权限</span>
                </a>
            </div>
            <div class="apps-group">
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/submit.svg)"></i>
                    <span class="tit">提交</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/pay.svg)"></i>
                    <span class="tit">支付</span>
                </a>
                <a class="apps-item" href="javascript:void(0);">
                    <i class="ico" style="background-image:url(/public/images/apps/task.svg)"></i>
                    <span class="tit">任务</span>
                </a>
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