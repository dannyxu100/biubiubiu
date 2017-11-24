<style lang="less">
    @import "../../less/mixins/prefix.less";

    .leftpadsmall {
        overflow: visible;
        .btn-toggle {
            display: block;
            width: 100%;
            height: 50px;
            padding: 0;
            border: none;
            background: rgba(255,255,255,.2);
            cursor: pointer;
            outline: none;
            color: rgba(255,255,255,1);
            font-size: 24px;
            .prefix-appearance();
            .prefix-transition();
            i {
                display: inline-block;
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 22px;
                color: rgba(255,255,255,.8);
                .prefix-transform(rotate(90deg));
                .prefix-transition();
                &::before {
                    position: relative;
                    top: 0;
                    .prefix-transition();
                }
                &.active {
                    .prefix-transform(rotate(-90deg));
                    &::before {
                        top: 3px;
                    }
                    &:hover {
                        &::before {
                            top: 6px;
                        }
                    }
                }
            }
            &:hover {
                background: rgba(255,255,255,.3);
                i {
                    color: rgba(255,255,255,1);
                }
            }
        }

        .appsbar {
            margin: 0;
            padding: 0;
            .appsbar-item {
                position: relative;
                left: 0;
                margin: 10px auto;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(255,255,255,.2);
                background-color: rgba(255,255,255,1);
                background-repeat: no-repeat;
                background-position: center;
                background-size: 40px 40px;
                cursor: pointer;
                list-style: none;
                .prefix-border-radius(9px);
                .prefix-transition();
                .tip {
                    display: block;
                    opacity: 0;
                    position: absolute;
                    top: 7px;
                    left: 45px;
                    width: 0;
                    overflow: hidden;
                    height: 26px;
                    line-height: 26px;
                    white-space: nowrap;
                    font-size: 13px;
                    color: rgb(255,255,255);
                    background: rgba(0, 132, 176, .9);
                    .prefix-border-radius(13px);
                    .prefix-gradient(25deg, rgba(0, 79, 147, .8), rgba(0, 166, 124, .9));
                    .prefix-box-shadow(0 5px 10px 3px rgba(0, 166, 124,.3));
                    .prefix-transition();
                }
                &:hover {
                    left: 2px;
                    background-color: rgba(255,255,255,1);
                    .prefix-box-shadow(0 3px 30px 5px rgba(255, 255, 255,.5));
                    .tip {
                        opacity: 1;
                        width: auto;
                        padding: 0 20px;
                    }
                }
            }
        }
        .appsbar-split {
            margin: 13px auto;
            width: 40px;
            border-top: 1px solid rgba(255,255,255, .2);
        }
    }
</style>

<template>
    <div class="leftpadsmall wrapper">
        <button class="btn-toggle" @click="toggle_leftpad()">
            <i class="iconfont icon-down" :class="{active:leftpadsmall.show}"></i>
        </button>
        <ul class="appsbar">
            <li class="appsbar-item" style="background-image:url(/public/images/apps/users.svg)">
                <div class="tip">用户管理</div>
            </li>
            <li class="appsbar-item" style="background-image:url(/public/images/apps/password.svg)">
                <span class="tip">修改密码</span>
            </li>
        </ul>
        <div class="appsbar-split"></div>
        <ul class="appsbar">
            <li class="appsbar-item" style="background-image:url(/public/images/apps/check.svg)">
                <div class="tip">审核</div>
            </li>
            <li class="appsbar-item" style="background-image:url(/public/images/apps/charts.svg)">
                <span class="tip">报表</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {

        },
        props:{

        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'leftpadsmall'
            ])
        },
        methods:{
            ...mapActions([
                'toggle_leftpad'
            ])
        },
        created() {
            // debugger;
        },
    }
</script>