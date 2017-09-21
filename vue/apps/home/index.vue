<style lang="less">
    @import "../../less/mixins/prefix.less";

    // body {
    //     .prefix-transition();
    //     & *{
    //         font-size: 22px;
    //     }
    // }
    .wrapper {
        // background-image: url(/public/images/avatar.png);
        background-repeat: no-repeat;
    }
    .homepage {
        background: #fff;
    }
</style>

<template>
	<div class="homepage wrapper wrapper-box">
        welcome to you! {{mode}} - qqq23324112222 - {{showdetail}} 544 {{userid4modal}}
	</div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

	export default {
        components: {},
        data() {
            return {
				mode: 'HOME',
				userid4modal: '333',
				showdetail: false
			}
        },
        computed: {},
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ])
        },
        created() {}
    }
</script>