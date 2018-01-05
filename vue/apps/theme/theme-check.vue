<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <!-- <div class="wrapper wrapper-scroll wrapper-box wrapper-theme wrapper-white"> -->
    <div class="wrapper-box wrapper-theme wrapper-white">
        <div class="container">
            <!-- 单选、复选 -->
            <div class="section">
                <h2>单选、复选</h2>
                <h3>.checkbox .radiobox</h3>
                <div></div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:10px;">
                        <div class="cell-12-2">
                            <label class="checkbox">
                                <input type="checkbox" name="group1" value="1"/>
                                <span class="checkbox-text">默认</span>
                            </label>
                        </div>
                        <div class="cell-12-2">
                            <label class="checkbox hover">
                                <input type="checkbox" name="group1" value="2"/>
                                <span class="checkbox-text">激活</span>
                            </label>
                        </div>
                        <div class="cell-12-2">
                            <label class="checkbox checked">
                                <input type="checkbox" name="group1" value="3"/>
                                <span class="checkbox-text">选中</span>
                            </label>
                        </div>
                        <div class="cell-12-2">
                            <label class="checkbox disabled">
                                <input type="checkbox" name="group1" value="4"/>
                                <span class="checkbox-text">禁用</span>
                            </label>
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:30px;">
                        <div class="cell-12-2">
                            <label class="radio">
                                <input type="radio" name="group2" value="1"/>
                                <span class="radio-text">默认</span>
                            </label>
                        </div>
                        <div class="cell-12-2">
                            <label class="radio hover">
                                <input type="radio" name="group2" value="2"/>
                                <span class="radio-text">激活</span>
                            </label>
                        </div>
                        <div class="cell-12-2">
                            <label class="radio checked">
                                <input type="radio" name="group2" value="3"/>
                                <span class="radio-text">选中</span>
                            </label>
                        </div>
                        <div class="cell-12-2">
                            <label class="radio disabled">
                                <input type="radio" name="group2" value="4"/>
                                <span class="radio-text">禁用</span>
                            </label>
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:30px;">
                        <div class="cell-12-6">
                            <label class="checkbox">
                                <input type="checkbox" name="group3" value="1"/>
                                <span class="checkbox-text">煎饼</span>
                            </label>
                            <label class="checkbox checked">
                                <input type="checkbox" name="group3" value="2"/>
                                <span class="checkbox-text">烧饼</span>
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="group3" value="3"/>
                                <span class="checkbox-text">炊饼</span>
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="group3" value="4"/>
                                <span class="checkbox-text">铁饼</span>
                            </label>
                        </div>
                        <div class="cell-12-6">
                            <label class="radio">
                                <input type="radio" name="group4" value="1"/>
                                <span class="radio-text">胖子</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="group4" value="2"/>
                                <span class="radio-text">老子</span>
                            </label>
                            <label class="radio checked">
                                <input type="radio" name="group4" value="3"/>
                                <span class="radio-text">腰子</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="group4" value="4"/>
                                <span class="radio-text">鬼子</span>
                            </label>
                        </div>
                    </div>

                    <div class="grid-row" style="margin-bottom:30px;">
                        <div class="cell-12-6">
                            <label class="checkbox checkbox-full">
                                <input type="checkbox" name="group3" value="1"/>
                                <span class="checkbox-text">煎饼</span>
                            </label>
                            <label class="checkbox checkbox-full checked">
                                <input type="checkbox" name="group3" value="2"/>
                                <span class="checkbox-text">烧饼</span>
                            </label>
                            <label class="checkbox checkbox-full">
                                <input type="checkbox" name="group3" value="3"/>
                                <span class="checkbox-text">炊饼</span>
                            </label>
                            <label class="checkbox checkbox-full">
                                <input type="checkbox" name="group3" value="4"/>
                                <span class="checkbox-text">铁饼</span>
                            </label>
                        </div>
                        <div class="cell-12-6">
                            <label class="radio radio-full">
                                <input type="radio" name="group4" value="1"/>
                                <span class="radio-text">胖子</span>
                            </label>
                            <label class="radio radio-full">
                                <input type="radio" name="group4" value="2"/>
                                <span class="radio-text">老子</span>
                            </label>
                            <label class="radio radio-full checked">
                                <input type="radio" name="group4" value="3"/>
                                <span class="radio-text">腰子</span>
                            </label>
                            <label class="radio radio-full">
                                <input type="radio" name="group4" value="4"/>
                                <span class="radio-text">鬼子</span>
                            </label>
                        </div>
                    </div>

                </div>
                <br/>

                <h3>.checkbox-theme .radio-theme | *-key  | *-light  | *-nice </h3>
                <div>其他风格按钮</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-1">
                            <label class="checkbox checkbox-theme">
                                <input type="checkbox" name="group1" value="1"/>
                                <span class="checkbox-text">主题</span>
                            </label>
                            <label class="checkbox checkbox-theme hover">
                                <input type="checkbox" name="group1" value="1"/>
                                <span class="checkbox-text">激活</span>
                            </label>
                            <label class="checkbox checkbox-theme checked">
                                <input type="checkbox" name="group1" value="1"/>
                                <span class="checkbox-text">选中</span>
                            </label>
                            <label class="checkbox checkbox-theme disabled">
                                <input type="checkbox" name="group1" value="1"/>
                                <span class="checkbox-text">禁用</span>
                            </label>
                        </div>
                        <div class="cell-12-1">
                            <label class="checkbox checkbox-key">
                                <input type="checkbox" name="group1" value="2"/>
                                <span class="checkbox-text">关键</span>
                            </label>
                            <label class="checkbox checkbox-key hover">
                                <input type="checkbox" name="group1" value="2"/>
                                <span class="checkbox-text">激活</span>
                            </label>
                            <label class="checkbox checkbox-key checked">
                                <input type="checkbox" name="group1" value="2"/>
                                <span class="checkbox-text">选中</span>
                            </label>
                            <label class="checkbox checkbox-key disabled">
                                <input type="checkbox" name="group1" value="2"/>
                                <span class="checkbox-text">禁用</span>
                            </label>
                        </div>
                        <div class="cell-12-1">
                            <label class="checkbox checkbox-light">
                                <input type="checkbox" name="group1" value="3"/>
                                <span class="checkbox-text">闪亮</span>
                            </label>
                            <label class="checkbox checkbox-light hover">
                                <input type="checkbox" name="group1" value="3"/>
                                <span class="checkbox-text">激活</span>
                            </label>
                            <label class="checkbox checkbox-light checked">
                                <input type="checkbox" name="group1" value="3"/>
                                <span class="checkbox-text">选中</span>
                            </label>
                            <label class="checkbox checkbox-light disabled">
                                <input type="checkbox" name="group1" value="3"/>
                                <span class="checkbox-text">禁用</span>
                            </label>
                        </div>
                        <div class="cell-12-1">
                            <label class="checkbox checkbox-nice">
                                <input type="checkbox" name="group1" value="4"/>
                                <span class="checkbox-text">友好</span>
                            </label>
                            <label class="checkbox checkbox-nice hover">
                                <input type="checkbox" name="group1" value="4"/>
                                <span class="checkbox-text">激活</span>
                            </label>
                            <label class="checkbox checkbox-nice checked">
                                <input type="checkbox" name="group1" value="4"/>
                                <span class="checkbox-text">选中</span>
                            </label>
                            <label class="checkbox checkbox-nice disabled">
                                <input type="checkbox" name="group1" value="4"/>
                                <span class="checkbox-text">禁用</span>
                            </label>
                        </div>
                    </div>
                    <br/>

                    <div class="grid-row">
                        <div class="cell-12-1">
                            <label class="radio radio-theme">
                                <input type="radio" name="group1" value="1"/>
                                <span class="radio-text">主题</span>
                            </label>
                            <label class="radio radio-theme hover">
                                <input type="radio" name="group1" value="1"/>
                                <span class="radio-text">激活</span>
                            </label>
                            <label class="radio radio-theme checked">
                                <input type="radio" name="group1" value="1"/>
                                <span class="radio-text">选中</span>
                            </label>
                            <label class="radio radio-theme disabled">
                                <input type="radio" name="group1" value="1"/>
                                <span class="radio-text">禁用</span>
                            </label>
                        </div>
                        <div class="cell-12-1">
                            <label class="radio radio-key">
                                <input type="radio" name="group1" value="2"/>
                                <span class="radio-text">关键</span>
                            </label>
                            <label class="radio radio-key hover">
                                <input type="radio" name="group1" value="2"/>
                                <span class="radio-text">激活</span>
                            </label>
                            <label class="radio radio-key checked">
                                <input type="radio" name="group1" value="2"/>
                                <span class="radio-text">选中</span>
                            </label>
                            <label class="radio radio-key disabled">
                                <input type="radio" name="group1" value="2"/>
                                <span class="radio-text">禁用</span>
                            </label>
                        </div>
                        <div class="cell-12-1">
                            <label class="radio radio-light">
                                <input type="radio" name="group1" value="3"/>
                                <span class="radio-text">闪亮</span>
                            </label>
                            <label class="radio radio-light hover">
                                <input type="radio" name="group1" value="3"/>
                                <span class="radio-text">激活</span>
                            </label>
                            <label class="radio radio-light checked">
                                <input type="radio" name="group1" value="3"/>
                                <span class="radio-text">选中</span>
                            </label>
                            <label class="radio radio-light disabled">
                                <input type="radio" name="group1" value="3"/>
                                <span class="radio-text">禁用</span>
                            </label>
                        </div>
                        <div class="cell-12-1">
                            <label class="radio radio-nice">
                                <input type="radio" name="group1" value="4"/>
                                <span class="radio-text">友好</span>
                            </label>
                            <label class="radio radio-nice hover">
                                <input type="radio" name="group1" value="4"/>
                                <span class="radio-text">激活</span>
                            </label>
                            <label class="radio radio-nice checked">
                                <input type="radio" name="group1" value="4"/>
                                <span class="radio-text">选中</span>
                            </label>
                            <label class="radio radio-nice disabled">
                                <input type="radio" name="group1" value="4"/>
                                <span class="radio-text">禁用</span>
                            </label>
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