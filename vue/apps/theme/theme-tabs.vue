<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 标签页 -->
            <div class="section">
                <h2>标签页</h2>
                <h3>.tabs</h3>
                <div></div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:10px;">
                        <div class="cell-12-6">
                            <div class="tabs">
                                <ul class="tabs-navs">
                                    <li class="tabs-nav">参数</li>
                                    <li class="tabs-nav active">详情</li>
                                    <li class="tabs-nav">评论</li>
                                    <li class="tabs-nav">图册</li>
                                    <li class="tabs-nav">更多 <i class="iconfont icon-right-min"></i></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <br/>

                <h3>.tabs.tabs-small</h3>
                <div>小尺寸</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:10px;">
                        <div class="cell-12-6">
                            <div class="tabs tabs-small">
                                <ul class="tabs-navs">
                                    <li class="tabs-nav active">红色</li>
                                    <li class="tabs-nav">蓝色</li>
                                    <li class="tabs-nav">黑色</li>
                                    <li class="tabs-nav">其他 <i class="iconfont icon-right-min"></i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.tabs .tabs-nav-popmenu .popmenu</h3>
                <div>弹出气泡菜单</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:10px;">
                        <div class="cell-12-6 demo-popmenuopen">
                            <div class="tabs">
                                <ul class="tabs-navs">
                                    <li class="tabs-nav active">首页</li>
                                    <li class="tabs-nav">基本信息</li>
                                    <li class="tabs-nav">详情</li>
                                    <li class="tabs-nav tabs-nav-popmenu active">
                                        <span>更多</span>
                                        <div class="popmenu active">
                                            <a class="popmenu-item" href="javascript:;">新建</a>
                                            <a class="popmenu-item" href="javascript:;">打开</a>
                                            <a class="popmenu-item" href="javascript:;">保存</a>
                                            <div class="split"></div>
                                            <a class="popmenu-item" href="javascript:;">退出</a>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
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