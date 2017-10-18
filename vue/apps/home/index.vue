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
        // background: #fff;
        color: #fff;
        .topnavs {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: rgba(255,255,255,.2);
            // padding-left: 20px;
            font-size: 0;
            .nav {
                display: inline-block;
                padding: 0 20px;
                height: 50px;
                font-size: 15px;
                line-height: 50px;
                color: #fff;
                cursor: pointer;
                .prefix-transition();
                &:hover {
                    background: rgba(255,255,255,.2);
                }
                &.active {
                    color: #37e3d6;
                    background: rgba(255,255,255,1);
                    cursor: default;
                }
                &.home {
                    padding: 0 16px;
                    color: #b6fffb;
                    cursor: pointer;
                    &:hover {
                        color: #fff;
                    }
                }
            }
        }
        .content {
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,.1);
        }
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