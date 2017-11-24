<style lang="less">
    @import "../../less/mixins/prefix.less";

    .rightpad {

    }
</style>

<template>
	<div class="rightpad wrapper">
	</div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        props:{},
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'rightpad'
            ])
        },
        methods:{
            ...mapActions([
                'toggle_rightpad'
            ])
        },
        created() {
            // debugger;
        },
    }
</script>