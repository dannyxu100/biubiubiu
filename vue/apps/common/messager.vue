<style lang="less">
    @import "../../less/mixins/prefix.less";

    .messager {

    }
</style>

<template>
    <div class="messager">
        <template v-for="(item,idx) in list">
            <li v-if="item.show" class="icon" :class="classesitem(item)">

            </li>
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
            }
            // @on-hover()
            // @on-click()
        },
        data() {
            return {}
        },
        computed: {},
        methods:{
            //
            classesitem( item ) {
                let classes = {};
                if( item.class ){
                    this.$fn.each(item.class.split(' '), (classname, idx)=>{
                        classes[classname] = true;
                    });
                }
                return classes;
            }
        },
        mounted() {
            // debugger;
        },
    }
</script>