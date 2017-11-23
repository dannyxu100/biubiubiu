<style lang="less">
    @import "../../less/mixins/prefix.less";

    .iconsdocker {
        display: inline-block;
        position: relative;
        // padding-left: 20px;
        height: 50px;
        font-size: 0;
        vertical-align: middle;
        // .prefix-box-shadow(0 2px 5px 1px rgba(0, 166, 124,.1));
        .icon {
            display: inline-block;
            padding: 0 10px;
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
            }
            i {
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
        }
    }
</style>

<template>
    <div class="iconsdocker">
        <!-- welcome to you! {{mode}} - qqq23324112222 - {{showdetail}} 544 {{userid4modal}} -->
        <template v-for="(item,idx) in list">
            <a class="icon" :class="classesitem(item)" @hover="hover(item)" @click="click(item)">
                <i v-if="item.icon" class="iconfont icon-apps"></i>
                <i class="ico" :style="iconstyles(item)"></i>
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
            //图标动态样式
            iconstyles( item ) {
                return {
                    'background-image': `url(${item.iconpath || ''})`
                };
            },
            //
            hover( item ) {
                this.$emit('hover', item);
            },
            //
            click( item ) {
                this.$emit('click', item);
            }
        },
        mounted() {
            // debugger;
        },
    }
</script>