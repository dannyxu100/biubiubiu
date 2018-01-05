<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <!-- <div class="wrapper wrapper-scroll wrapper-box wrapper-theme"> -->
    <div class="wrapper-box wrapper-theme">
        <div class="container">
            <!-- 布局 -->
            <div class="section">
                <h2>布局</h2>
                <h3>.grid .row .cell-5-1</h3>
                <div>奇数等分，最小份为1/5</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <template v-for="i in 5">
                        <div class="cell-5-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-5-2">
                            <button class="fillblock" >2</button>
                        </div>
                        <template v-for="i in 3">
                        <div class="cell-5-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-5-3">
                            <button class="fillblock" >3</button>
                        </div>
                        <template v-for="i in 2">
                        <div class="cell-5-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-5-4">
                            <button class="fillblock" >4</button>
                        </div>
                        <div class="cell-5-1">
                            <button class="fillblock" >1</button>
                        </div>
                    </div>

                    <div class="grid-row">
                        <div class="cell-5-5">
                            <button class="fillblock" >5</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.grid .row .cell-7-1</h3>
                <div>奇数等分，最小份为1/7</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <template v-for="i in 7">
                        <div class="cell-7-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-7-2">
                            <button class="fillblock" >2</button>
                        </div>
                        <template v-for="i in 5">
                        <div class="cell-7-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-7-3">
                            <button class="fillblock" >3</button>
                        </div>
                        <template v-for="i in 4">
                        <div class="cell-7-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-7-4">
                            <button class="fillblock" >4</button>
                        </div>
                        <template v-for="i in 3">
                        <div class="cell-7-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-7-5">
                            <button class="fillblock" >5</button>
                        </div>
                        <template v-for="i in 2">
                        <div class="cell-7-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-7-6">
                            <button class="fillblock" >6</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="fillblock" >1</button>
                        </div>
                    </div>

                    <div class="grid-row">
                        <div class="cell-7-7">
                            <button class="fillblock" >7</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.grid .row .cell-12-1</h3>
                <div>偶数等分，最小份为1/12</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <template v-for="i in 12">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-2">
                            <button class="fillblock" >2</button>
                        </div>
                        <template v-for="i in 10">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-3">
                            <button class="fillblock" >3</button>
                        </div>
                        <template v-for="i in 9">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-4">
                            <button class="fillblock" >4</button>
                        </div>
                        <template v-for="i in 8">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-5">
                            <button class="fillblock" >5</button>
                        </div>
                        <template v-for="i in 7">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-6">
                            <button class="fillblock" >6</button>
                        </div>
                        <template v-for="i in 6">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-7">
                            <button class="fillblock" >7</button>
                        </div>
                        <template v-for="i in 5">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-8">
                            <button class="fillblock" >8</button>
                        </div>
                        <template v-for="i in 4">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-9">
                            <button class="fillblock" >9</button>
                        </div>
                        <template v-for="i in 3">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-10">
                            <button class="fillblock" >10</button>
                        </div>
                        <template v-for="i in 2">
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-11">
                            <button class="fillblock" >11</button>
                        </div>
                        <div class="cell-12-1">
                            <button class="fillblock" >1</button>
                        </div>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-12">
                            <button class="fillblock" >12</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.grid .grid-row-full</h3>
                <div>无间隙</div>
                <br/>
                <div class="grid">
                    <div class="grid-row-full">
                        <template v-for="i in 5">
                        <div class="cell-5-1">
                            <button class="fillblock" >1</button>
                        </div>
                        </template>
                    </div>
                </div>
                <br/>

                <h3>嵌套布局</h3>
                <div>通过.row的嵌套使用，可以完美实现10列和14列的布局</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-6">
                            <div class="grid-row">
                                <template v-for="i in 5">
                                <div class="cell-5-1">
                                    <button class="fillblock" >1</button>
                                </div>
                                </template>
                            </div>
                        </div>
                        <div class="cell-12-6">
                            <div class="grid-row">
                                <template v-for="i in 5">
                                <div class="cell-5-1">
                                    <button class="fillblock" >1</button>
                                </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-6">
                            <div class="grid-row">
                                <template v-for="i in 7">
                                <div class="cell-7-1">
                                    <button class="fillblock" >1</button>
                                </div>
                                </template>
                            </div>
                        </div>
                        <div class="cell-12-6">
                            <div class="grid-row">
                                <template v-for="i in 7">
                                <div class="cell-7-1">
                                    <button class="fillblock" >1</button>
                                </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.grid-btngroup</h3>
                <div>参见按钮组部分文档</div>
                <br/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions}             from 'vuex';
    import CGrid                                from './common/grid';

    export default {
        components: {
            'c-grid':             CGrid,
            'c-grid-row':         CGrid.Row,
            'c-grid-cell':        CGrid.Cell
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ])
        },
        created() {
        }
    }
</script>