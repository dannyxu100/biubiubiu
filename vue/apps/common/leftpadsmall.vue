<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="leftpadsmall wrapper">
        <button class="btn-toggle" @click="toggle_leftpad()">
            <i class="iconfont icon-down" :class="{active:leftpadsmall.show}"></i>
        </button>
        <ul class="appsbar">
            <template v-for="(nav,path) in navs.used">
            <li class="appsbar-item" :style="styleimage(nav)" @click="$root.routerpath(path)">
                <div class="tip">{{nav.name}}</div>
            </li>
            </template>
        </ul>
        <div class="appsbar-split"></div>
        <ul class="appsbar">
            <li class="appsbar-item add" style="background-image:url(/public/images/apps/plus.svg)">
                <div class="tip">新增常用</div>
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
                'leftpadsmall',
                'navs'
            ])
        },
        methods:{
            ...mapActions([
                'toggle_leftpad'
            ]),
            //应用图标
            styleimage( nav ) {
                return {'background-image':`url(${nav.image})`};
            }
        },
        created() {
            // debugger;
        },
    }
</script>