<style lang="less">
    @import "../../less/mixins/prefix.less";

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