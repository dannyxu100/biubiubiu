<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box">
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'navs'
            ])
        },
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ]),
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