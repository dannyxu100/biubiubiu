<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme-ctrl">
        <div class="container">
            <!-- 颜色 -->
            <div class="section">
                <div class="grid">
                    <h2>标题</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">字色</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.caption.color"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">底色</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.grid.rowspace"/>
                        </div>
                    </div>
                    <br/>

                    <h2>字色</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">头部</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">主体</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.color.body"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">脚部</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.color.foot"/>
                        </div>
                    </div>
                    <br/>

                    <h2>底色</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">奇偶行</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.bgcolor.diff"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.bgcolor.hover"/>
                        </div>
                    </div>
                    <br/>

                    <h2>边框</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">表格容器</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.bordercolor.box"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">表头</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.bordercolor.head"/>
                        </div>
                    </div>
                    <br/>

                    <h2>其他</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">字号</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.fontsize"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">倒角弧度</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.table.radius"/>
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