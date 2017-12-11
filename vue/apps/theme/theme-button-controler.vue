<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme-ctrl">
        <div class="container">
            <!-- 颜色 -->
            <div class="section">
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-4">
                            按钮
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.grid.colspace"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">
                            按钮
                        </div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.grid.rowspace"/>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="submit">保存</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        data() {
            return {}
        },
        computed: {
            //
            ...mapGetters([
                'basic'
            ])
        },
        methods: {
            //
            submit() {
                let promi = this.$fn.ajax('/admin/less', {
                    data: JSON.stringify(this.basic)
                });
            }
        },
        created() {}
    }
</script>