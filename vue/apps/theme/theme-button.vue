<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 按钮 -->
            <div class="section">
                <h2>按钮</h2>
                <h3>.btn</h3>
                <div>buttn标签</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-7-1">
                            <button class="btn">default</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn">默认</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn border">边框</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn hover">激活</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn active">按下</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn loading">繁忙</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn" disabled>禁用</button>
                        </div>
                    </div>
                </div>
                <br/>

                <div>a标签</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="">
                        <div class="cell-7-1">
                            <a class="btn">default</a>
                        </div>
                        <div class="cell-7-1">
                            <a class="btn">默认</a>
                        </div>
                        <div class="cell-7-1">
                            <a class="btn border">边框</a>
                        </div>
                        <div class="cell-7-1">
                            <a class="btn hover">激活</a>
                        </div>
                        <div class="cell-7-1">
                            <a class="btn active">按下</a>
                        </div>
                        <div class="cell-7-1">
                            <a class="btn loading">繁忙</a>
                        </div>
                        <div class="cell-7-1">
                            <a class="btn" disabled>禁用</a>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btn-inverse</h3>
                <div>反色按钮</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="">
                        <div class="cell-7-1">
                            <button class="btn btn-inverse">inverse</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-inverse">反色</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-inverse border">边框</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-inverse hover">激活</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-inverse active">按下</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-inverse loading">繁忙</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-inverse" disabled>禁用</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btn-border</h3>
                <div>边框按钮</div>
                <br/>
                <div class="grid bgimg-dark" style="padding:20px;">
                    <div class="grid-row" style="">
                        <div class="cell-7-1">
                            <button class="btn btn-border">border</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border">默认</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border hover">激活</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border active">按下</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border loading">繁忙</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border" disabled>禁用</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btn-border-inverse</h3>
                <div>反色边框按钮</div>
                <br/>
                <div class="grid bgimg-light" style="padding:20px;">
                    <div class="grid-row" style="">
                        <div class="cell-7-1">
                            <button class="btn btn-border-inverse">inverse</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border-inverse">默认</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border-inverse hover">激活</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border-inverse active">按下</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border-inverse loading">繁忙</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-border-inverse" disabled>禁用</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btn-link</h3>
                <div>链接按钮</div>
                <br/>
                <div class="grid bgimg-light" style="padding:20px;">
                    <div class="grid-row" style="">
                        <div class="cell-7-1">
                            <button class="btn btn-link">link</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-link">链接</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-link hover">激活</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-link active">按下</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-link loading">繁忙</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-link" disabled>禁用</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btn-theme | .btn-key | .btn-light | .btn-nice</h3>
                <div>其他风格按钮</div>
                <br/>
                <div class="grid">
                    <div class="grid-row bgimg-light" style="padding:20px;">
                        <div class="cell-7-1">
                            <button class="btn btn-theme">主题</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-key">关键</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-light">闪亮</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-nice">友好</button>
                        </div>
                    </div>
                    <br/>
                    <div class="grid-row bgimg-dark" style="padding:20px;">
                        <div class="cell-7-1">
                            <button class="btn btn-theme">主题</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-key">关键</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-light">闪亮</button>
                        </div>
                        <div class="cell-7-1">
                            <button class="btn btn-nice">友好</button>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btn-big | .btn-small</h3>
                <div>大尺寸、小尺寸</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="">
                        <div class="cell-7-2">
                            <a class="btn btn-big">大尺寸按钮</a>
                        </div>
                        <div class="cell-7-2">
                            <a class="btn btn-small">小尺寸按钮</a>
                        </div>
                        <div class="cell-7-1">
                        </div>
                        <div class="cell-7-1">
                        </div>
                        <div class="cell-7-1">
                        </div>
                    </div>
                </div>
                <br/>

                <h3>自定义尺寸</h3>
                <div>自定义高度后，垂直居中问题，目前只能通过line-hight来解决</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="">
                        <div class="cell-5-1">
                            <a class="btn" style="height:80px;">默认状态</a>
                        </div>
                        <div class="cell-5-1">
                            <a class="btn" style="height:80px; line-height:62px;">设置行高</a>
                        </div>
                        <div class="cell-5-1">
                            <a class="btn btn-small" style="height:80px; line-height:66px;">小尺寸按钮</a>
                        </div>
                        <div class="cell-5-1">
                            <a class="btn btn-big" style="height:80px; line-height:58px;">大尺寸按钮</a>
                        </div>
                        <div class="cell-5-1">
                        </div>
                    </div>
                </div>
                <br/>

                <h3>块级元素</h3>
                <div>宽度100%</div>
                <br/>
                <div class="grid">
                    <div class="grid-row-full" style="margin-bottom:10px;">
                        <div class="cell-12-6">
                            <a class="btn btn-big btn-theme btn-full">提交</a>
                        </div>
                        <div class="cell-12-6">
                            <a class="btn btn-big btn-full">取消</a>
                        </div>
                    </div>
                    <div class="grid-row" style="">
                        <div class="cell-5-5">
                            <a class="btn btn-big btn-inverse btn-full">浏览更多</a>
                        </div>
                    </div>
                </div>
                <br/>
            </div>

            <!-- 按钮组 -->
            <div class="section">
                <h2>按钮组</h2>
                <h3>.btngroup</h3>
                <div></div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-4">
                            <div class="btngroup">
                                <button class="btn">左栏</button>
                                <button class="btn">中间</button>
                                <button class="btn">中间</button>
                                <button class="btn">右栏</button>
                            </div>
                        </div>

                        <div class="cell-12-2">&nbsp;</div>

                        <div class="cell-12-6">
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btngroup-list</h3>
                <div>.btngroup-list默认为块元素，可自定义设置宽度</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-6">
                            <div class="btngroup btngroup-list">
                                <button class="btn">顶栏</button>
                                <button class="btn">中间</button>
                                <button class="btn">中间</button>
                                <button class="btn">底栏</button>
                            </div>
                        </div>
                        <div class="cell-12-2">&nbsp;</div>
                        <div class="cell-12-4">
                            <div class="btngroup btngroup-list" style="width:160px;">
                                <button class="btn">顶栏</button>
                                <button class="btn">中间</button>
                                <button class="btn">中间</button>
                                <button class="btn">底栏</button>
                            </div>
                        </div>

                    </div>
                </div>
                <br/>

                <h3>.btngroup-table > .btn</h3>
                <div>.btn只能使用a标签</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-12">
                            <div class="btngroup btngroup-table">
                                <a class="btn" href="javascript:;">左栏</a>
                                <a class="btn" href="javascript:;">中间</a>
                                <a class="btn" href="javascript:;">右栏</a>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.btngroup-table > .btngroup > .btn</h3>
                <div>由于button标签不支持table-cell两端对齐，必须多嵌套一层.btngroup</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-12">
                            <div class="btngroup btngroup-table">
                                <div class="btngroup">
                                    <button class="btn">左栏</button>
                                </div>
                                <div class="btngroup">
                                    <button class="btn">中间</button>
                                </div>
                                <div class="btngroup">
                                    <button class="btn">右栏</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.grid-btngroup .grid-row .btn</h3>
                <div>如果嫌弃按钮间的边框无法重叠，可以使用.grid-full模拟（可是便不能根据数量动态变更，而渲染样式了）</div>
                <br/>
                <div class="grid grid-btngroup">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-4">
                            <button class="btn">左栏</button>
                        </div>
                        <div class="cell-12-4">
                            <button class="btn">中间</button>
                        </div>
                        <div class="cell-12-4">
                            <div class="btngroup">
                                <button class="btn">右栏</button>
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