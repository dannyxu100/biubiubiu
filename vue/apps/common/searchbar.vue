<style lang="less">
    @import "../../less/mixins/prefix.less";

    .searchbar {
        display: inline-block;
        position: relative;
        min-width: 130px;
        height: 50px;
        vertical-align: middle;
        .searchbar-wrapper {
            display: block;
            position: absolute;
            top: 7px;
            left: 0;
            right: 0;
            bottom: 0;
            height: 36px;
            background: rgba(82, 172, 200, 0.32);
            .prefix-border-radius(18px);
            .prefix-transition(background linear .3s);
            // .prefix-box-shadow(inset 0 0 0 1px rgba(45, 135, 164, .05));
            &.active {
                background: rgba(82, 172, 200, 0.5);
            }
            .searchbar-box {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                padding-left: 35px;
                background-image: url(/public/images/search.svg);
                background-size: 22px 18px;
                background-position: 8px 9px;
                background-repeat: no-repeat;
                input {
                    width: 100%;
                    height: 36px;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    color: rgba(255,255,255,.9);
                    .prefix-placeholder(rgba(255,255,255,.3));
                }
            }
        }
    }
</style>

<template>
    <div class="searchbar">
        <label class="searchbar-wrapper" :class="wrapperclasses">
            <div class="searchbar-box">
                <input placeholder="搜索内容..." @focus="focus" @blur="blur"/>
            </div>
        </label>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        props:{
            value: {
                type: String
            }
        },
        data() {
            return {
                isfocus: false
            }
        },
        computed: {
            wrapperclasses() {
                return {
                    'active': this.isfocus
                }
            }
        },
        methods:{
            //
            focus() {
                this.isfocus = true;
            },
            //
            blur() {
                this.isfocus = false;
            },
            //搜索
            search() {
                this.$emit('input', this.value);
                this.$emit('onsearch', this.value);
            },
        },
        mounted() {
            // debugger;
        },
    }
</script>