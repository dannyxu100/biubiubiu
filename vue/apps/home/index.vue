<style lang="less">
    @import "../../less/mixins/prefix.less";
    body {
        .prefix-transition();
        & *{
            font-size: 22px;
        }
    }
    .wrapper {
        background-image: url(/vue/images/bg.jpg);
        background-repeat: no-repeat;
    }
</style>

<template>
	<div class="wrapper wrapper-box">
        welcome to you! {{mode}}
        <button @click="open">开</button>
        <button @click="close">关</button>
	</div>
</template>

<script>
    // import "./../less/run.less";
    import {mapGetters, mapActions}         from 'vuex';
	export default {
        components: {},
        data() {
            return {
				mode: 'HOME',
				userid4modal: '',
				showdetail: false
			}
        },
        computed: {},
		created() {},
        methods:{
            //展开左栏
            open(){

            },
            //收起左栏
            close(){

            }
        }
    }
</script>