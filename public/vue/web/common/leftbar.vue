
<template>
    <div class="leftbar" v-show="show" >
        <button @click="open">开</button>
    </div>
</template>

<script>
	export default {
        components: {},
        data() {
            return {}
        },
        computed: {},
        props:{
            show: {
                type: Boolean,
                required: true
            },
            mode: {
                type: String,
                default: 'NORMAL'
            }
        },
		created() {},
        methods: {
            //展开左栏
            open(){

            },
            //收起左栏
            close(){

            }
        }
    }
</script>

<style>

</style>
