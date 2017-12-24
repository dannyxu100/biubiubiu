<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 标签 -->
            <div class="section">
                <h2>标签</h2>
                <h3>.tag</h3>
                <div></div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:10px;">
                        <div class="cell-5-5">
                            <p class="fsize-32">
                                据说这是一份最好吃的中国披萨 <span class="tag">煎饼果子</span>
                            </p>
                            <p class="fsize-26">
                                据说这是一份最好吃的中国披萨 <span class="tag">煎饼果子</span>
                            </p>
                            <p class="fsize-18">
                                据说这是一份最好吃的中国披萨 <span class="tag">煎饼果子</span>
                            </p>
                            <p class="fsize-14">
                                据说这是一份最好吃的中国披萨 <span class="tag">煎饼果子</span>
                            </p>
                            <p class="fsize-12">
                                据说这是一份最好吃的中国披萨 <span class="tag">煎饼果子</span>
                            </p>
                        </div>

                    </div>
                </div>
                <br/>

                <h3>.tag-theme | .tag-key | .tag-light | .tag-nice  | .tag-black </h3>
                <div>其他风格</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:10px;">
                        <div class="cell-5-5">
                            <p class="fsize-14">
                                <span class="tag tag-theme">香菜</span>
                                <span class="tag tag-key">火腿</span>
                                <span class="tag tag-light">煎鸡蛋</span>
                                <span class="tag tag-nice">生菜</span>
                                <span class="tag tag-black">胡萝卜</span>
                            </p>
                        </div>

                    </div>
                </div>
                <br/>

                <h3>.tag-circle </h3>
                <div>椭圆</div>
                <br/>
                <div class="grid">
                    <div class="grid-row" style="margin-bottom:10px;">
                        <div class="cell-5-5">
                            <p class="fsize-14">
                                <span class="tag tag-circle tag-theme">套餐一</span>
                                <span class="tag tag-circle tag-key">套餐二</span>
                                <span class="tag tag-circle tag-light">套餐三</span>
                                <span class="tag tag-circle tag-nice">套餐四</span>
                                <span class="tag tag-circle tag-black">9</span>
                                <span class="tag tag-circle">63</span>
                            </p>
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