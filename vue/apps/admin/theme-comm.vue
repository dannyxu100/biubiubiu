<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 通用类名 -->
            <div class="section">
                <h2>通用类名</h2>
                <h3>.fsize-*</h3>
                <p>字体尺寸，可选.fsize-[12,14,16,18,20,22,24,26,28,30,32]，（默认支持自适应尺寸，单位rem，兼容px）</p>
                <div>
                    <div class="grid">
                        <div class="grid-row">
                            <div class="cell-12-2">
                                <span class="fsize-12">fsize-12</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-14">fsize-14</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-14">fsize-16</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-18">fsize-18</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-20">fsize-20</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-22">fsize-22</span>
                            </div>
                        </div>

                        <div class="grid-row">
                            <div class="cell-12-2">
                                <span class="fsize-24">fsize-24</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-26">fsize-26</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-28">fsize-28</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-30">fsize-30</span>
                            </div>
                            <div class="cell-12-2">
                                <span class="fsize-32">fsize-32</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3>.bold</h3>
                <p>文本设置为加粗</p>

                <h3>.normal</h3>
                <p>文本设置为默认</p>

                <h3>.dotted</h3>
                <p>边框风格设置为小圆点</p>

                <h3>.double</h3>
                <p>边框风格设置为双实线</p>

                <h3>.dashed</h3>
                <p>边框风格设置为小短线</p>

                <h3>.indent</h3>
                <p>内部p标签首行缩进2em</p>

                <h3>.radius-*</h3>
                <p>设置四个边框倒角的圆角度数，可选.radius-[1,2,3,4,5,6,7,8,9,10]  .radiusp-[10,20,30,40,50]</p>
                <div class="clearfix">
                    <div class="rdsbox fleft radius-2">.radius-1</div>
                    <div class="rdsbox fleft radius-3">.radius-3</div>
                    <div class="rdsbox fleft radius-4">.radius-4</div>
                    <div class="rdsbox fleft radius-5">.radius-5</div>
                    <div class="rdsbox fleft radius-6">.radius-6</div>
                    <div class="rdsbox fleft radius-7">.radius-7</div>
                    <div class="rdsbox fleft radius-8">.radius-8</div>
                    <div class="rdsbox fleft radius-9">.radius-9</div>
                    <div class="rdsbox fleft radius-10">.radius-10</div>
                </div>
                <div class="clearfix">
                    <div class="rdsboxp fleft radiusp-10">.radiusp-10</div>
                    <div class="rdsboxp fleft radiusp-20">.radiusp-20</div>
                    <div class="rdsboxp fleft radiusp-30">.radiusp-30</div>
                    <div class="rdsboxp fleft radiusp-30">.radiusp-30</div>
                    <div class="rdsboxp fleft radiusp-40">.radiusp-40</div>
                    <div class="rdsboxp fleft radiusp-50">.radiusp-50</div>
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