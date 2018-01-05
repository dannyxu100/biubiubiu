<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <!-- <div class="wrapper wrapper-scroll wrapper-box wrapper-theme"> -->
    <div class="wrapper-box wrapper-theme">
        <div class="container">
            <!-- 表格 -->
            <div class="section">
                <h2>表格</h2>
                <h3>.table</h3>
                <div></div>
                <br/>

                <div class="grid">
                    <div class="grid-row" style="margin-bottom:50px;">
                        <div class="cell-12-6">
                            <div style="margin-bottom:10px;">.table 默认状态</div>
                            <table class="table">
                                <tr>
                                    <th>影片名</th>
                                    <th>主演</th>
                                    <th>类型</th>
                                    <th>地区</th>
                                </tr>
                                <tr>
                                    <td>超能陆战队</td>
                                    <td>斯科特·埃德希特、瑞恩·波特</td>
                                    <td>动画</td>
                                    <td>美国</td>
                                </tr>
                                <tr>
                                    <td>超体</td>
                                    <td>斯嘉丽·约翰逊</td>
                                    <td>科幻</td>
                                    <td>美国</td>
                                </tr>
                                <tr>
                                    <td>星际穿越</td>
                                    <td>马修·麦康纳</td>
                                    <td>科幻</td>
                                    <td>美国</td>
                                </tr>
                            </table>
                        </div>
                        <div class="cell-12-6">
                            <div style="margin-bottom:10px;">使用th元素 表头样式</div>
                            <table class="table">
                                <tr>
                                    <th>影片名</th>
                                    <th>主演</th>
                                    <th>类型</th>
                                    <th>地区</th>
                                </tr>
                                <tr>
                                    <td>哆啦A梦:伴我同行</td>
                                    <td>水田山葵、大原惠美</td>
                                    <td>动画</td>
                                    <td>美国</td>
                                </tr>
                                <tr>
                                    <td>杀破狼2</td>
                                    <td>托尼·贾、吴京</td>
                                    <td>犯罪</td>
                                    <td>大陆</td>
                                </tr>
                                <tr>
                                    <td>匆匆那年</td>
                                    <td>倪妮、彭于晏</td>
                                    <td>爱情</td>
                                    <td>大陆</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:50px;">
                        <div class="cell-12-6">
                            <div style="margin-bottom:10px;">.table-line 行模式</div>
                            <div class="table-grid-border">
                                <table class="table table-line">
                                    <caption>今日热门影片</caption>
                                    <tr>
                                        <th>影片名</th>
                                        <th>主演</th>
                                        <th>类型</th>
                                        <th>地区</th>
                                    </tr>
                                    <tr>
                                        <td>夏洛特烦恼</td>
                                        <td>沈腾、马丽</td>
                                        <td>喜剧</td>
                                        <td>大陆</td>
                                    </tr>
                                    <tr>
                                        <td>西游记之大圣归来</td>
                                        <td>张磊、林子杰</td>
                                        <td>动画</td>
                                        <td>大陆</td>
                                    </tr>
                                    <tr>
                                        <td>星际穿越</td>
                                        <td>马修·麦康纳</td>
                                        <td>科幻</td>
                                        <td>美国</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="cell-12-6">
                            <div style="margin-bottom:10px;">.table-grid-border .table-grid 网格模式</div>
                            <div class="table-grid-border">
                                <table class="table table-grid">
                                    <caption>今日热门影片</caption>
                                    <thead>
                                        <tr>
                                            <th>影片名</th>
                                            <th>主演</th>
                                            <th>类型</th>
                                            <th>地区</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>超能陆战队</td>
                                            <td>斯科特·埃德希特、瑞恩·波特</td>
                                            <td>动画</td>
                                            <td>美国</td>
                                        </tr>
                                        <tr>
                                            <td>超体</td>
                                            <td>斯嘉丽·约翰逊</td>
                                            <td>科幻</td>
                                            <td>美国</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>星际穿越</td>
                                            <td>马修·麦康纳</td>
                                            <td>科幻</td>
                                            <td>美国</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:50px;">
                        <div class="cell-12-6">
                            <div style="margin-bottom:10px;">.table-diff 奇偶行区分模式</div>
                            <table class="table table-diff">
                                <caption>今日热门影片</caption>
                                <thead>
                                    <tr>
                                        <th>影片名</th>
                                        <th>主演</th>
                                        <th>类型</th>
                                        <th>地区</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>超能陆战队</td>
                                        <td>斯科特·埃德希特、瑞恩·波特</td>
                                        <td>动画</td>
                                        <td>美国</td>
                                    </tr>
                                    <tr>
                                        <td>超体</td>
                                        <td>斯嘉丽·约翰逊</td>
                                        <td>科幻</td>
                                        <td>美国</td>
                                    </tr>
                                    <tr>
                                        <td>星际穿越</td>
                                        <td>马修·麦康纳</td>
                                        <td>科幻</td>
                                        <td>美国</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="cell-12-6">
                            <div style="margin-bottom:10px;">.table-hover 鼠标指向高亮</div>
                            <table class="table table-hover">
                                <caption>今日热门影片</caption>
                                <thead>
                                    <tr>
                                        <th>影片名</th>
                                        <th>主演</th>
                                        <th>类型</th>
                                        <th>地区</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>夏洛特烦恼</td>
                                        <td>沈腾、马丽</td>
                                        <td>喜剧</td>
                                        <td>大陆</td>
                                    </tr>
                                    <tr>
                                        <td>西游记之大圣归来</td>
                                        <td>张磊、林子杰</td>
                                        <td>动画</td>
                                        <td>大陆</td>
                                    </tr>
                                    <tr>
                                        <td>星际穿越</td>
                                        <td>马修·麦康纳</td>
                                        <td>科幻</td>
                                        <td>美国</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:50px;">
                        <div class="cell-12-12">
                            <div style="margin-bottom:10px;">.table-min 紧凑模式</div>
                            <table class="table table-grid table-min">
                                <thead>
                                    <tr>
                                        <th>影片名</th>
                                        <th>主演</th>
                                        <th>类型</th>
                                        <th>地区</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>超能陆战队</td>
                                        <td>斯科特·埃德希特、瑞恩·波特</td>
                                        <td>动画</td>
                                        <td>美国</td>
                                    </tr>
                                    <tr>
                                        <td>超体</td>
                                        <td>斯嘉丽·约翰逊</td>
                                        <td>科幻</td>
                                        <td>美国</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>星际穿越</td>
                                        <td>马修·麦康纳</td>
                                        <td>科幻</td>
                                        <td>美国</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:50px;">
                        <div class="cell-12-12">
                            <div style="margin-bottom:10px;">.table-full 宽度100%</div>
                            <div class="table-grid-border table-full">
                                <table class="table table-grid">
                                    <caption>今日热门影片</caption>
                                    <thead>
                                        <tr>
                                            <th>影片名</th>
                                            <th>主演</th>
                                            <th>类型</th>
                                            <th>地区</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>超能陆战队</td>
                                            <td>斯科特·埃德希特、瑞恩·波特</td>
                                            <td>动画</td>
                                            <td>美国</td>
                                        </tr>
                                        <tr>
                                            <td>超体</td>
                                            <td>斯嘉丽·约翰逊</td>
                                            <td>科幻</td>
                                            <td>美国</td>
                                        </tr>
                                        <tr>
                                            <td>星际穿越</td>
                                            <td>马修·麦康纳</td>
                                            <td>科幻</td>
                                            <td>美国</td>
                                        </tr>
                                    </tbody>
                                </table>
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
    import CTable                           from './common/table';

    export default {
        components: {
            'c-table':             CTable
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