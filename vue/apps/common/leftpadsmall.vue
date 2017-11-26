<style lang="less">
    @import "../../less/mixins/prefix.less";

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