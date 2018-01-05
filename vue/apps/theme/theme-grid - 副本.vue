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
                <c-grid>
                    <c-grid-row>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="5" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="5" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="5" :span="4">
                            <button class="fillblock" >4</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="5" :span="5">
                            <button class="fillblock" >5</button>
                        </c-grid-cell>
                    </c-grid-row>
                </c-grid>

                <br/>

                <h3>.grid .row .cell-7-1</h3>
                <div>奇数等分，最小份为1/7</div>
                <br/>
                <c-grid>
                    <c-grid-row>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="7" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="7" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="7" :span="4">
                            <button class="fillblock" >4</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="7" :span="5">
                            <button class="fillblock" >5</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="7" :span="6">
                            <button class="fillblock" >6</button>
                        </c-grid-cell>
                        <c-grid-cell :max="7" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="7" :span="7">
                            <button class="fillblock" >7</button>
                        </c-grid-cell>
                    </c-grid-row>
                </c-grid>

                <br/>

                <h3>.grid .row .cell-12-1</h3>
                <div>偶数等分，最小份为1/12</div>
                <br/>
                <c-grid>
                    <c-grid-row>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="4">
                            <button class="fillblock" >4</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="4">
                            <button class="fillblock" >4</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="4">
                            <button class="fillblock" >4</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="5">
                            <button class="fillblock" >5</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="5">
                            <button class="fillblock" >5</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="6">
                            <button class="fillblock" >6</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="6">
                            <button class="fillblock" >6</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="7">
                            <button class="fillblock" >7</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="5">
                            <button class="fillblock" >5</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="8">
                            <button class="fillblock" >8</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="4">
                            <button class="fillblock" >4</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="9">
                            <button class="fillblock" >9</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="3">
                            <button class="fillblock" >3</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="10">
                            <button class="fillblock" >10</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="2">
                            <button class="fillblock" >2</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="11">
                            <button class="fillblock" >11</button>
                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row>
                        <c-grid-cell :max="12" :span="12">
                            <button class="fillblock" >12</button>
                        </c-grid-cell>
                    </c-grid-row>
                </c-grid>

                <br/>

                <h3>.grid .grid-row-full</h3>
                <div>无间隙</div>
                <br/>
                <c-grid>
                    <c-grid-row class="grid-row-full">
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                        <c-grid-cell :max="5" :span="1">
                            <button class="fillblock" >1</button>
                        </c-grid-cell>
                    </c-grid-row>
                </c-grid>

                <br/>

                <h3>嵌套布局</h3>
                <div>通过.row的嵌套使用，可以完美实现10列和14列的布局</div>
                <br/>
                <c-grid>
                    <c-grid-row class="grid-row-full">
                        <c-grid-cell :max="12" :span="6">
                            <c-grid-row>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                            </c-grid-row>

                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="6">
                            <c-grid-row>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="5" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                            </c-grid-row>

                        </c-grid-cell>
                    </c-grid-row>

                    <c-grid-row class="grid-row-full">
                        <c-grid-cell :max="12" :span="6">
                            <c-grid-row>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                            </c-grid-row>

                        </c-grid-cell>
                        <c-grid-cell :max="12" :span="6">
                            <c-grid-row>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                                <c-grid-cell :max="7" :span="1">
                                    <button class="fillblock" >1</button>
                                </c-grid-cell>
                            </c-grid-row>

                        </c-grid-cell>
                    </c-grid-row>
                </c-grid>

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