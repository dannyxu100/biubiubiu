<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <!-- <div class="wrapper wrapper-scroll wrapper-box wrapper-theme"> -->
    <div class="wrapper-box wrapper-theme">
        <div class="container">
            <!-- 气泡菜单 -->
            <div class="section">
                <h2>气泡菜单</h2>
                <h3>.popmenu</h3>
                <div></div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu">
                                <a class="popmenu-item" href="javascript:;">新建</a>
                                <a class="popmenu-item" href="javascript:;">打开</a>
                                <a class="popmenu-item" href="javascript:;">保存</a>
                                <div class="split"></div>
                                <a class="popmenu-item" href="javascript:;">退出</a>
                            </div>
                        </div>

                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu">
                                <div class="popmenu-item">
                                    <div class="hd"></div>
                                    <div class="md">后退</div>
                                    <div class="ft"></div>
                                </div>
                                <div class="popmenu-item">
                                    <div class="hd"></div>
                                    <div class="md">暂停</div>
                                    <div class="ft"></div>
                                </div>
                                <div class="popmenu-item selected">
                                    <div class="hd"></div>
                                    <div class="md">前进</div>
                                    <div class="ft"></div>
                                </div>
                                <div class="split"></div>
                                <div class="popmenu-item">
                                    <div class="hd"></div>
                                    <div class="md">弹出</div>
                                    <div class="ft"></div>
                                </div>
                                <div class="popmenu-item">
                                    <div class="hd"></div>
                                    <div class="md">字幕</div>
                                    <div class="ft"></div>
                                </div>
                            </div>
                        </div>

                        <div class="cell-12-4 demo-popmenuopen">
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu popmenu-selectable">
                                <div class="popmenu-item">名称排序</div>
                                <div class="popmenu-item">价格排序</div>
                                <div class="popmenu-item disabled">信用排序</div>
                                <div class="split"></div>
                                <div class="popmenu-item selected">倒序</div>
                                <div class="popmenu-item">正序</div>
                            </div>
                        </div>

                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu">
                                <div class="popmenu-item">
                                    <div class="hd">复制</div>
                                    <div class="md"></div>
                                    <div class="ft">
                                        <small>Ctrl + C</small>
                                    </div>
                                </div>
                                <div class="popmenu-item">
                                    <div class="hd">剪切</div>
                                    <div class="md"></div>
                                    <div class="ft">
                                        <small>Ctrl + X</small>
                                    </div>
                                </div>
                                <div class="popmenu-item selected">
                                    <div class="hd">粘贴</div>
                                    <div class="md"></div>
                                    <div class="ft">
                                        <small>Ctrl + V</small>
                                    </div>
                                </div>
                                <div class="split"></div>
                                <div class="popmenu-item">字体</div>
                                <div class="popmenu-item">颜色</div>
                            </div>
                        </div>

                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu">
                                <div class="popmenu-item">
                                    <div class="hd">复制</div>
                                    <div class="md"></div>
                                    <div class="ft">
                                        <label>99</label>
                                    </div>
                                </div>
                                <div class="popmenu-item">
                                    <div class="hd">剪切</div>
                                    <div class="md"></div>
                                    <div class="ft">
                                        <label>99</label>
                                    </div>
                                </div>
                                <div class="popmenu-item selected">
                                    <div class="hd">粘贴</div>
                                    <div class="md"></div>
                                    <div class="ft">
                                        <label>99</label>
                                    </div>
                                </div>
                                <div class="split"></div>
                                <div class="popmenu-item">字体</div>
                                <div class="popmenu-item">颜色</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.popmenu-icon</h3>
                <div>自定义图标</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu popmenu-icon">
                                <a class="popmenu-item" href="javascript:;">
                                    <i class="icon iconfont icon-user-inverse"></i>
                                    <span>用户中心</span>
                                </a>
                                <a class="popmenu-item" href="javascript:;">
                                    <i class="icon iconfont icon-lock"></i>
                                    <span>修改密码</span>
                                </a>
                                <a class="popmenu-item" href="javascript:;">
                                    <span>我的收藏</span>
                                </a>
                                <div class="split"></div>
                                <a class="popmenu-item" href="javascript:;">
                                    <i class="icon iconfont icon-setting-inverse"></i>
                                    <span>设置</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>


                <h3>popmenu .popmenu-sub .popmenu-item</h3>
                <div>多级嵌套菜单，向左弹出.popmenu-tree-left，向上弹出.popmenu-tree-top，显示箭头.hassub</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-6 demo-popmenuopen">
                            <div class="popmenu popmenu-tree">
                                <div class="popmenu-item hassub">
                                    <span>市场部门</span>

                                    <div class="popmenu-sub">
                                        <div class="popmenu-item hassub">
                                            <span>部门一</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">宣传组</div>
                                                <div class="popmenu-item">策划组</div>
                                                <div class="popmenu-item">公关组</div>
                                            </div>
                                        </div>
                                        <div class="popmenu-item hassub">
                                            <span>部门二</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">宣传组</div>
                                                <div class="popmenu-item">策划组</div>
                                                <div class="popmenu-item">公关组</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="popmenu-item hassub">
                                    <span>技术部</span>

                                    <div class="popmenu-sub">
                                        <div class="popmenu-item hassub">
                                            <span>前端</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">设计组</div>
                                                <div class="popmenu-item">交互组</div>
                                                <div class="popmenu-item">程序组</div>
                                            </div>
                                        </div>
                                        <div class="popmenu-item hassub">
                                            <span>后端</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">架构</div>
                                                <div class="popmenu-item">业务组</div>
                                                <div class="popmenu-item">数据组</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="popmenu-item disabled">财务部</div>
                                <div class="split"></div>
                                <div class="popmenu-item">秘书处</div>
                                <div class="popmenu-item">总经办</div>
                            </div>
                        </div>

                        <div class="cell-12-6 demo-popmenuopen">
                            <div class="popmenu popmenu-tree-left popmenu-tree-top">
                                <div class="popmenu-item hassub">
                                    <span>市场部门</span>

                                    <div class="popmenu-sub">
                                        <div class="popmenu-item hassub">
                                            <span>部门一</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">宣传组</div>
                                                <div class="popmenu-item">策划组</div>
                                                <div class="popmenu-item">公关组</div>
                                            </div>
                                        </div>
                                        <div class="popmenu-item hassub">
                                            <span>部门二</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">宣传组</div>
                                                <div class="popmenu-item">策划组</div>
                                                <div class="popmenu-item">公关组</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="popmenu-item hassub">
                                    <span>技术部</span>

                                    <div class="popmenu-sub">
                                        <div class="popmenu-item hassub">
                                            <span>前端</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">设计组</div>
                                                <div class="popmenu-item">交互组</div>
                                                <div class="popmenu-item">程序组</div>
                                            </div>
                                        </div>
                                        <div class="popmenu-item hassub">
                                            <span>后端</span>

                                            <div class="popmenu-sub">
                                                <div class="popmenu-item">架构</div>
                                                <div class="popmenu-item">业务组</div>
                                                <div class="popmenu-item">数据组</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="popmenu-item disabled">财务部</div>
                                <div class="split"></div>
                                <div class="popmenu-item">秘书处</div>
                                <div class="popmenu-item">总经办</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.popmenu-large | .popmenu-small</h3>
                <div>大尺寸、小尺寸</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu popmenu-small">
                                <a class="popmenu-item" href="javascript:;">新建</a>
                                <a class="popmenu-item" href="javascript:;">打开</a>
                                <a class="popmenu-item" href="javascript:;">保存</a>
                                <div class="split"></div>
                                <a class="popmenu-item" href="javascript:;">退出</a>
                            </div>
                        </div>

                        <div class="cell-12-4 demo-popmenuopen">
                            <div class="popmenu popmenu-large">
                                <a class="popmenu-item" href="javascript:;">新建</a>
                                <a class="popmenu-item" href="javascript:;">打开</a>
                                <a class="popmenu-item" href="javascript:;">保存</a>
                                <div class="split"></div>
                                <a class="popmenu-item" href="javascript:;">退出</a>
                            </div>
                        </div>

                        <div class="cell-12-4 demo-popmenuopen">
                        </div>
                    </div>

                </div>
                <br/>

                <h3>.btngroup .btn-popmenu .popmenu</h3>
                <div>弹出菜单按钮组，.popmenu必须放在.btngroup子元素的最后</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-5-1 demo-popmenuopen">
                            <div class="btngroup">
                                <button class="btn btn-popmenu active">
                                    <span>默认</span> <i class="iconfont icon-down-min"></i>
                                </button>

                                <div class="popmenu active">
                                    <a class="popmenu-item" href="javascript:;">新建</a>
                                    <a class="popmenu-item" href="javascript:;">打开</a>
                                    <a class="popmenu-item" href="javascript:;">保存</a>
                                    <div class="split"></div>
                                    <a class="popmenu-item" href="javascript:;">退出</a>
                                </div>
                            </div>
                        </div>

                        <div class="cell-5-1">
                            <div class="btngroup">
                                <button class="btn btn-popmenu active">
                                    <span>激活</span>
                                    <i class="iconfont icon-down-min"></i>
                                </button>

                                <div class="popmenu active">
                                    <a class="popmenu-item" href="javascript:;">新建</a>
                                    <a class="popmenu-item" href="javascript:;">打开</a>
                                    <a class="popmenu-item" href="javascript:;">保存</a>
                                    <div class="split"></div>
                                    <a class="popmenu-item" href="javascript:;">退出</a>
                                </div>
                            </div>
                        </div>

                        <div class="cell-5-1">
                            <div class="btngroup">
                                <button class="btn btn-popmenu-icon active">
                                    <i class="iconfont icon-down-min"></i>
                                </button>
                                <button class="btn">提交</button>

                                <div class="popmenu active">
                                    <a class="popmenu-item" href="javascript:;">新建</a>
                                    <a class="popmenu-item" href="javascript:;">打开</a>
                                    <a class="popmenu-item" href="javascript:;">保存</a>
                                    <div class="split"></div>
                                    <a class="popmenu-item" href="javascript:;">退出</a>
                                </div>
                            </div>
                        </div>

                        <div class="cell-5-1">
                            <div class="btngroup">
                                <button class="btn">提交</button>
                                <button class="btn btn-popmenu-icon btn-popmenu-left btn-popmenu-top active">
                                    <i class="iconfont icon-up-min"></i>
                                </button>

                                <div class="popmenu active">
                                    <a class="popmenu-item" href="javascript:;">新建</a>
                                    <a class="popmenu-item" href="javascript:;">打开</a>
                                    <a class="popmenu-item" href="javascript:;">保存</a>
                                    <div class="split"></div>
                                    <a class="popmenu-item" href="javascript:;">退出</a>
                                </div>
                            </div>
                        </div>

                        <div class="cell-5-1">
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:5px;">
                        <div class="cell-12-6 demo-popmenuopen">
                            <div class="btngroup btngroup-full">
                                <button class="btn btn-full btn-popmenu active">
                                    <span>自适应按钮组100%宽度</span> <i class="iconfont icon-down-min"></i>
                                </button>

                                <div class="popmenu popmenu-full active">
                                    <a class="popmenu-item" href="javascript:;">新建</a>
                                    <a class="popmenu-item" href="javascript:;">打开</a>
                                    <a class="popmenu-item" href="javascript:;">保存</a>
                                    <div class="split"></div>
                                    <a class="popmenu-item" href="javascript:;">退出</a>
                                </div>
                            </div>
                        </div>

                        <div class="cell-12-6 demo-popmenuopen">
                            <div class="btngroup">
                                <button class="btn btn-popmenu active">
                                    <span>内容居中</span> <i class="iconfont icon-down-min"></i>
                                </button>

                                <div class="popmenu popmenu-full active">
                                    <div class="popmenu-item">
                                        <div class="hd"></div>
                                        <div class="md">后退</div>
                                        <div class="ft"></div>
                                    </div>
                                    <div class="popmenu-item">
                                        <div class="hd"></div>
                                        <div class="md">暂停</div>
                                        <div class="ft"></div>
                                    </div>
                                    <div class="popmenu-item">
                                        <div class="hd"></div>
                                        <div class="md">前进</div>
                                        <div class="ft"></div>
                                    </div>
                                    <div class="split"></div>
                                    <div class="popmenu-item">
                                        <div class="hd"></div>
                                        <div class="md">弹出</div>
                                        <div class="ft"></div>
                                    </div>
                                    <div class="popmenu-item">
                                        <div class="hd"></div>
                                        <div class="md">字幕</div>
                                        <div class="ft"></div>
                                    </div>
                                </div>
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