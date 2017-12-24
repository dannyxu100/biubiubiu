<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">

            <!-- 输入框 -->
            <div class="section" id="section-input">
                <h2>输入框</h2>
                <h3>.input | .textarea</h3>
                <div>默认样式（HTML5新类型各个浏览器支持程度不同）。</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-5-1">
                            <input type="text" class="input" value="default" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            <input type="text" class="input" value="默认" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            <input type="text" class="input active" value="激活" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            <input type="text" class="input" value="只读" placeholder="请输入" readonly/>
                        </div>
                        <div class="cell-5-1">
                            <input type="text" class="input" value="禁用" placeholder="请输入" disabled/>
                        </div>
                    </div>
                    <br/>
                    <div class="grid-row">
                        <div class="cell-5-1">
                            <textarea class="textarea" placeholder="请输入">default</textarea>
                        </div>
                        <div class="cell-5-1">
                            <textarea class="textarea" placeholder="请输入">默认</textarea>
                        </div>
                        <div class="cell-5-1">
                            <textarea class="textarea active" placeholder="请输入">激活</textarea>
                        </div>
                        <div class="cell-5-1">
                            <textarea class="textarea" placeholder="请输入" readonly>只读</textarea>
                        </div>
                        <div class="cell-5-1">
                            <textarea class="textarea" placeholder="请输入" disabled>禁用</textarea>
                        </div>
                    </div>
                    <!-- <div class="grid-row">
                        <div class="cell-5-1">
                            text：<input type="text" class="input" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            password：<input type="password" class="input" value="" placeholder="请输入密码"/>
                        </div>
                        <div class="cell-5-1">
                            number：<input type="number" class="input" value="" placeholder="数值"/>
                        </div>
                        <div class="cell-5-1">
                            search：<input type="search" class="input" value="" placeholder="搜索关键字"/>
                        </div>
                        <div class="cell-5-1">
                            email：<input type="email" class="input" value="" placeholder="邮件地址"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-5-1">
                            month：<input type="month" class="input" value="" placeholder="月份"/>
                        </div>
                        <div class="cell-5-1">
                            date：<input type="date" class="input" value="" placeholder="日期"/>
                        </div>
                        <div class="cell-5-1">
                            time：<input type="time" class="input" value="" placeholder="时间"/>
                        </div>
                        <div class="cell-5-1">
                            week：<input type="week" class="input" value="" placeholder="第几周"/>
                        </div>
                        <div class="cell-5-1">
                            url：<input type="url" class="input" value="" placeholder="网址"/>
                        </div>
                    </div> -->
                </div>
                <br/>

                <h3>.input-theme | .input-key | .input-light | .input-nice</h3>
                <div>其他风格输入框</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-5-1">
                            theme：<input type="text" class="input input-theme" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            key：<input type="text" class="input input-key" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            light：<input type="text" class="input input-light" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            nice：<input type="text" class="input input-nice" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                        </div>
                    </div>

                    <div class="grid-row">
                        <div class="cell-5-1">
                            active：<input type="text" class="input input-theme active" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            active：<input type="text" class="input input-key active" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            active：<input type="text" class="input input-light active" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                            active：<input type="text" class="input input-nice active" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-5-1">
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.input-small | .input-large</h3>
                <div>大尺寸、小尺寸</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-4">
                            <button class="btn btn-small">参照按钮</button>
                            <input type="text" class="input input-small" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-12-4">
                            <button class="btn">参照按钮</button>
                            <input type="text" class="input" value="" placeholder="请输入"/>
                        </div>
                        <div class="cell-12-4">
                            <button class="btn btn-large">参照按钮</button>
                            <input type="text" class="input input-large" value="" placeholder="请输入"/>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.input-full</h3>
                <div>宽度100%</div>
                <br/>
                <div class="grid">
                    <!-- <div class="grid-row">
                        <div class="cell-12-12">
                            <input type="text" class="input input-small input-full" value="" placeholder="请输入"/>
                        </div>
                    </div> -->
                    <div class="grid-row">
                        <div class="cell-12-12">
                            <input type="text" class="input input-theme input-full" value="" placeholder="请输入"/>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 组合输入框 -->
            <div class="section" id="section-inputgroup">
                <h2>组合输入框</h2>
                <h3>.inputgroup .addons .text</h3>
                <div>组合输入框</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <div class="addons">
                                    <span class="text">￥</span>
                                </div>
                                <input type="number" class="input" value="" placeholder="数值"/>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <input type="number" class="input" value="" placeholder="数值"/>
                                <div class="addons">
                                    <span class="text">元</span>
                                </div>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <input type="number" class="input" value="" placeholder="数值"/>
                                <div class="addons">
                                    <span class="text">元</span>
                                    <span class="text">（人民币）</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-row">
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <div class="addons">
                                    <button class="btn border">搜索</button>
                                </div>
                                <input type="text" class="input" value="" placeholder="搜索关键字"/>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <input type="text" class="input input-theme" value="" placeholder="搜索关键字"/>
                                <div class="addons">
                                    <button class="btn btn-theme border">搜索</button>
                                </div>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <input type="text" class="input input-theme active" value="" placeholder="搜索关键字"/>
                                <div class="addons">
                                    <button class="btn btn-theme border">搜索</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>大尺寸、小尺寸</h3>
                <div>*-small | *-large</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <input type="number" class="input input-small" value="" placeholder="数值"/>
                                <div class="addons">
                                    <span class="text text-small">元</span>
                                </div>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <div class="addons">
                                    <span class="text">￥</span>
                                </div>
                                <input type="number" class="input" value="" placeholder="数值"/>
                            </div>
                        </div>
                        <div class="cell-12-4">
                            <div class="inputgroup">
                                <input type="number" class="input input-large" value="" placeholder="数值"/>
                                <div class="addons">
                                    <span class="text text-large">元</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>自定义宽度</h3>
                <div>设置.inputgroup元素的宽度</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-12">
                            <div class="inputgroup" style="width:528px">
                                <div class="addons">
                                    <button class="btn btn-theme border">搜索</button>
                                    <button class="btn btn-theme border" style="padding:8px 3px;"><i class="iconfont icon-down-min"></i></button>
                                </div>
                                <input type="text" class="input input-theme active" value="" placeholder="搜索关键字"/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.inputgroup-full</h3>
                <div>宽度100%</div>
                <br/>
                <div class="grid">
                    <!-- <div class="grid-row">
                        <div class="cell-12-12">
                            <div class="inputgroup inputgroup-full">
                                <input type="text" class="input" value="" placeholder="搜索关键字"/>
                                <div class="addons">
                                    <button class="btn border">搜索</button>
                                    <button class="btn border">其他</button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="grid-row">
                        <div class="cell-12-12">
                            <div class="inputgroup inputgroup-full">
                                <input type="text" class="input input-theme" value="" placeholder="搜索关键字"/>
                                <div class="addons">
                                    <button class="btn btn-theme border">搜索</button>
                                    <button class="btn btn-theme border">其他</button>
                                    <button class="btn btn-theme border" style="padding:8px 3px;"><i class="iconfont icon-down-min"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="grid-row">
                        <div class="cell-12-12">
                            <div class="inputgroup inputgroup-full">
                                <div class="addons">
                                    <button class="btn btn-theme btn-large border"><i class="iconfont icon-search"></i> 搜索</button>
                                </div>
                                <input type="text" class="input input-theme input-large active" value="" placeholder="搜索关键字"/>
                            </div>
                        </div>
                    </div> -->
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