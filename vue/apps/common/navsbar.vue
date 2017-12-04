<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="navbar" :class="classesbar">
        <!-- welcome to you! {{mode}} - qqq23324112222 - {{showdetail}} 544 {{userid4modal}} -->
        <div ref="navs" class="navs">
            <template v-if="home.path">
            <a ref="home" class="nav home" :class="classesitem(home)" href="javascript:;" @click="switchnav(home)">
                <i class="iconfont" :class="classesicon(home)"></i>
            </a>
            </template>

            <transition-group name="navs">
            <template v-for="(item,idx) in list">
            <a ref="navlist" class="nav" :class="classesitem(item)" :key="item.name" href="javascript:;" @click="switchnav(item)">
                <i v-if="item.icon" class="iconfont" :class="classesicon(item)"></i>
                <span v-if="item.name">{{item.name}}</span>
                <span v-if="!item.icon && !item.name">未命名</span>
                <i v-if="hasclose" class="close iconfont icon-delete" @click.stop="closenav(item,idx)"></i>
            </a>
            </template>
            </transition-group>

            <transition name="scale">
            <template v-if="hasmore">
            <a ref="more" class="nav more"  href="javascript:;">
                <i class="iconfont icon-menu"></i>
            </a>
            </template>
            </transition>
        </div>
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
            home: {
                type: Object,
            },
            value: {
                type: String
            },
            hasclose: {
                type: Boolean,
                default: true
            },
            //@on-switch()                     //切换事件
        },
        data() {
            return {
                hasmore: false,                //是否显示more按钮
                mainnavs: [],
                morenavs: [],
            }
        },
        computed: {
            //
            classesbar() {
                let classes = {};
                if( this.hashome ){
                    classes['hashome'] = true;
                }
                if( this.hasmore ){
                    classes['hasmore'] = true;
                }
                return classes;
            },
            //
            hashome() {
                return !!this.home.path;
            }
        },
        watch: {
            list( newvalue, oldvalue ) {
                this.needmore();
            }
        },
        methods:{
            //
            init() {
                this.$navs = this.$refs.navs;
                this.$root.resizeadd(this.needmore);
            },
            //
            classesitem( item ) {
                let classes = {};
                if( this.value === item.name ){
                    classes['active'] = true;
                }
                if( item.class ){
                    this.$fn.each(item.class.split(' '), (classname, idx)=>{
                        classes[classname] = true;
                    });
                }
                return classes;
            },
            //
            classesicon( item ) {
                let classes = {};
                if( item.icon ){
                    this.$fn.each(item.icon.split(' '), (classname, idx)=>{
                        classes[classname] = true;
                    });
                }
                return classes;
            },
            //判断是否需要显示more
            needmore() {
                this.$nextTick(()=>{
                    this.hasmore = !!(this.$refs.navs.scrollWidth > this.$refs.navs.offsetWidth || this.$refs.navs.scrollHeight > this.$refs.navs.offsetHeight);
                    /*let max, width;
                    max = this.$refs.navs.offsetWidth;
                    width = 48+48;                                      //home+more 按钮宽度
                    this.mainnavs = [];
                    this.morenavs = [];
                    this.$fn.each(this.$refs.navlist, (nav, idx)=>{
                        width += nav.offsetWidth;
                        if( width <= max ){
                            this.mainnavs.push(nav.name);
                        } else {
                            this.morenavs.push(nav.name);
                        }
                    });
                    this.hasmore = 0 < this.morenavs.length ? true : false;*/
                });
            },
            //切换nav
            switchnav(item) {
                this.$emit('input', item.name);
                this.$emit('on-switch', item);
            },
            //移除nav
            closenav(item,idx) {
                if( this.value === item.name ) {            //当前nav为激活状态，移除前需要执行切换
                    if( idx < this.list.length-1 ) {
                        this.switchnav( this.list[idx+1] );
                    } else {
                        this.switchnav( this.list[idx-1] );
                    }
                }
                this.list.splice(idx, 1);                   //splice执行完毕后，后面的索引均发生变化
            }
        },
        mounted() {
            this.init();
        },
    }
</script>