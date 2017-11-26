<style lang="less">
    @import "../../less/mixins/prefix.less";

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
            // @on-search()
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
                this.$emit('on-search', this.value);
            },
        },
        mounted() {
            // debugger;
        },
    }
</script>