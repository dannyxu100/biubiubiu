<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 下拉框 -->
            <div class="section">
                <h2>下拉框</h2>
                <h3>.select</h3>
                <div></div>
                <br/>
                <div class="grid" style="margin:150px 0px 350px;">
                    <div class="grid-row">
                        <div class="cell-12-2">
                            <div class="select">
                                <div class="select-box">
                                    <input class="select-text" disabled type="text" placeholder="请选择" value="" />
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                        <div class="cell-12-2">
                            <div class="select active">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京"  readonly/>
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item disabled" value="shanghai">上海</li>
                                    <li class="split"></li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item disabled" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                        <div class="cell-12-2">
                            <div class="select active">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="上海"/>
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京北京北京北京北京北京北京北京</li>
                                    <li class="select-item selected" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                        <div class="cell-12-2">
                            <div class="select active top">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="上海"/>
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item selected" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <h3>.select-big | .select-min</h3>
                <div>大尺寸、小尺寸</div>
                <br/>
                <div class="grid" style="margin-bottom: 150px;">
                    <div class="grid-row">
                        <div class="cell-12-4">
                            <button class="btn btn-min">参照按钮</button>
                            <div class="select select-min active">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="" />
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <button class="btn">参照按钮</button>
                            <div class="select active">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="" />
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <button class="btn btn-big">参照按钮</button>
                            <div class="select select-big active">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="北京" readonly />
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <h3>块级元素</h3>
                <div>宽度100%</div>
                <br/>
                <div class="grid">
                    <div class="grid-row-full" style="margin-bottom:10px;">
                        <div class="cell-12-6">
                            <a class="btn btn-big btn-theme btn-full">提交</a>
                        </div>
                        <div class="cell-12-6">
                            <div class="select select-big select-full select-center top">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="北京" readonly />
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="grid-row" style="margin-bottom:200px;">
                        <div class="cell-5-5">
                            <div class="select select-big select-full active">
                                <div class="select-box">
                                    <input class="select-text" type="text" placeholder="请选择" value="北京" readonly />
                                </div>
                                <ul class="select-list">
                                    <li class="select-item" value="beijing">北京</li>
                                    <li class="select-item" value="shanghai">上海</li>
                                    <li class="select-item" value="guangzhou">广州</li>
                                    <li class="select-item" value="shenzhen">深圳</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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