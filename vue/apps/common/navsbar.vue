<style lang="less">
    @import "../../less/mixins/prefix.less";

    .navbar {
        position: relative;
        // padding-left: 20px;
        height: 50px;
        font-size: 0;
        // .prefix-box-shadow(0 2px 5px 1px rgba(0, 166, 124,.1));
        .nav {
            display: inline-block;
            padding: 0 20px;
            height: 50px;
            font-size: 14px;
            font-weight: 700;
            line-height: 50px;
            color: rgba(188, 255, 248, .8);
            // color: transparent;
            // text-shadow: 0 0 2px #fff;
            cursor: pointer;
            text-decoration: none;
            .prefix-transition(all linear .2s);
            &:hover {
                color: rgb(255, 255, 255);
                background: rgba(255,255,255,.2);
            }
            &.active {
                color: rgb(0, 169, 180);
                background: rgba(255,255,255,1);
                cursor: default;
            }
            &.home {
                padding: 0 16px;
                .iconfont {
                    font-size: 16px;
                    font-weight: 400;
                    vertical-align: middle;
                }
            }
        }
    }
</style>

<template>
    <div class="navbar">
        <!-- welcome to you! {{mode}} - qqq23324112222 - {{showdetail}} 544 {{userid4modal}} -->
        <template v-for="(item,idx) in list">
            <a class="nav" :class="classesitem(item)" @click="switchnav(item)">
                <i v-if="item.icon" class="iconfont icon-apps"></i>
                <span v-if="item.value">{{item.value}}</span>
            </a>
        </template>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        props:{
            list: {
                type: Array,
                required: true
            },
            value: {
                type: String
            }
            //@on-switch()                     //切换事件
        },
        data() {
            return {}
        },
        computed: {},
        methods:{
            //
            classesitem( item ) {
                let classes = {};
                if( this.value===item.value ){
                    classes['active'] = true;
                }
                if( item.class ){
                    this.$fn.each(item.class.split(' '), (classname, idx)=>{
                        classes[classname] = true;
                    });
                }
                return classes;
            },
            //切换nav
            switchnav(item) {
                this.$emit('input', item.value);
                this.$emit('on-switch', item);
            }
        },
        mounted() {
            // debugger;
        },
    }
</script>