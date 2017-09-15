<style>

</style>

<template>
	<div >12333333333
        {{mode}}
	</div>
</template>

<script>
    // import "./../less/run.less";
    import store 												from './vuex/store.js';
    import {

    } 					                                        from './vuex/getter.js'
    import {

    } 															from './vuex/action.js';

	export default {
        components: {},
        store: store,
		vuex: {
            getters: {},
            actions: {}
		},
        data() {
            return {
				mode: 'USER',
				userid4modal: '',
				showdetail: false
			}
        },
        computed: {},
		created() {
            // debugger;
        },
        methods:{}
    }
</script>