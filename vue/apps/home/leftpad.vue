<style lang="less">
    @import "../../less/mixins/prefix.less";

    .leftpad {
        .avatarbox {
            display:inline-block;
            position: relative;
            width: 100%;
            height: 220px;
            // background: rgba(93, 128, 184, .7);
            .prefix-gradient(0deg, rgba(12,235,235,1), rgba(32,227,178,1));
            .btn-toggle {
                position: absolute;
                top: 0;
                right: 0;
                display: block;
                width: 50px;
                height: 50px;
                border: none;
                cursor: pointer;
                outline: none;
                color: #fff;
                font-size: 24px;
                background: rgba(255,255,255,0);
                .prefix-appearance();
                .prefix-transition();
                &:hover {
                    background: rgba(255,255,255,.2);
                }
            }
            .avatar-image {
                margin: 60px auto 0;
                width: 80px;
                height: 80px;
                background-color: rgba(255,255,255,.9);
                .prefix-border-radius(50px);
            }
        }
    }
</style>

<template>
	<div class="leftpad wrapper">
        <div class="avatarbox">
            <button class="btn-toggle" @click="toggle_leftbar()">=</button>
            <div class="avatar-image"></div>
        </div>
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
        computed: {},
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