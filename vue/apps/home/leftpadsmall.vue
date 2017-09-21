<style lang="less">
    @import "../../less/mixins/prefix.less";

    .leftpadsmall {
        .btn-toggle {
            display: block;
            width: 100%;
            height: 50px;
            border: none;
            background: rgba(255,255,255,.2);
            cursor: pointer;
            outline: none;
            color: #fff;
            font-size: 24px;
            .prefix-appearance();
            .prefix-transition();
            &:hover {
                background: rgba(255,255,255,.4);
            }
        }
    }
</style>

<template>
    <div class="leftpadsmall wrapper">
        <button class="btn-toggle" @click="toggle_leftbar()">=</button>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {

        },
        props:{

        },
        data() {
            return {}
        },
        computed: {

        },
        methods:{
            ...mapActions([
                'toggle_leftbar'
            ])
        },
        created() {
            // debugger;
        },
    }
</script>