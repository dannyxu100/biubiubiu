<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 遮罩层 -->
            <div class="section">
                <h2>遮罩层</h2>
                <h3>.mask</h3>
                <div></div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-6">
                            <div class="mask hide"></div>

                        </div>
                    </div>
                </div>
                <br/>
            </div>

            <!-- 对话框 -->
            <div class="section">
                <h2>对话框</h2>
                <h3>.dlg</h3>
                <div>由于主张简洁统一的交互语言，这里的对话框都是模态。（如果需要非模态对话框，可以自己写一个，其实也很简单）</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-6 demo-dlg">
                            <div class="dlg">
                                <div class="mask"></div>
                                <div class="dlg-container">
                                    <div class="dlg-head">
                                        <div class="dlg-title">对话框标题</div>
                                        <button class="dlg-close"></button>
                                    </div>
                                    <div class="dlg-body">
                                        这里是内容区...
                                    </div>
                                    <div class="dlg-foot">
                                        <div class="fright">
                                            <button class="btn">取消</button>
                                            <button class="btn btn-theme">确认</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cell-12-6 demo-dlg">
                            <div class="dlg dlg-nomask">
                                <div class="mask"></div>
                                <div class="dlg-container">
                                    <div class="dlg-head">
                                        <div class="dlg-title">对话框标题</div>
                                        <button class="dlg-close"></button>
                                    </div>
                                    <div class="dlg-body">
                                        这里是内容区...
                                    </div>
                                    <div class="dlg-foot">
                                        <div class="fright">
                                            <button class="btn">取消</button>
                                            <button class="btn btn-theme">确认</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>


                <h3>.dlg-alert | .dlg-confirm | .dlg-prompt</h3>
                <div>提示框、确认框、输入框</div>
                <br/>
                <div class="grid">
                    <div class="grid-row-full">
                        <div class="cell-12-6 demo-dlg">
                            <div class="dlg dlg-alert">
                                <div class="mask"></div>
                                <div class="dlg-container">
                                    <div class="dlg-body">
                                        信息保存成功
                                    </div>
                                    <div class="dlg-foot">
                                        <button class="btn dlg-ok">确认</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cell-12-6 demo-dlg">
                            <div class="dlg dlg-confirm">
                                <div class="mask"></div>
                                <div class="dlg-container">
                                    <div class="dlg-body">
                                        确定要删除吗？
                                    </div>
                                    <div class="dlg-foot">
                                        <button class="btn dlg-cancel">取消</button>
                                        <button class="btn dlg-yes">确认</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-row-full">
                        <div class="cell-12-6 demo-dlg">
                            <div class="dlg dlg-prompt">
                                <div class="mask"></div>
                                <div class="dlg-container">
                                    <div class="dlg-body">
                                        <label class="dlg-label">用户手机号码</label>
                                        <input type="text" class="input input-full dlg-input" name="" value="" placeholder="请输入" />
                                    </div>
                                    <div class="dlg-foot">
                                        <button class="btn dlg-cancel">取消</button>
                                        <button class="btn dlg-yes">确认</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cell-12-6 demo-dlg">
                            <div class="dlg dlg-prompt">
                                <div class="mask"></div>
                                <div class="dlg-container">
                                    <div class="dlg-body">
                                        <label class="dlg-label">个性签名</label>
                                        <textarea type="text" class="textarea textarea-full dlg-textarea" name="" value="" placeholder="请输入" ></textarea>
                                    </div>
                                    <div class="dlg-foot">
                                        <button class="btn dlg-cancel">取消</button>
                                        <button class="btn dlg-yes">确认</button>
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