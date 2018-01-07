<style lang="less">
</style>

<template>
    <!-- <div class="wrapper wrapper-scroll wrapper-box"> -->
    <div class="wrapper-box wrapper-theme">
        <div class="row">
            <div class="cell-12-4">
                <div class="xcolorpicker">
                    <div class="colorpad">
                        <div class="colorpad-light"></div>
                        <div class="colorpad-dark"></div>
                        <div class="pointer"></div>
                    </div>
                    <div ref="rainbow" class="rainbow" @mousedown="mousedown_rainbow" @mousemove="mousemove_rainbow" @mouseup="mouseup_rainbow">
                        <div class="rainbow-color"></div>
                        <div class="pointer"></div>
                    </div>
                    <div class="values">
                        <div class="values-hex">
                            <div class="value-item">
                                <span class="tit"># </span>
                                <input class="txt" />
                            </div>
                        </div>
                        <div class="values-rgb">
                            <div class="value-item">
                                <span class="tit">R:</span>
                                <input class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">G:</span>
                                <input class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">B:</span>
                                <input class="txt" />
                            </div>
                        </div>
                        <div class="values-hsb">
                            <div class="value-item">
                                <span class="tit">H:</span>
                                <input class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">S:</span>
                                <input class="txt" />
                            </div>
                            <div class="value-item">
                                <span class="tit">B:</span>
                                <input class="txt" />
                            </div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="block-box block-box-new">
                            <div class="block-color"></div>
                        </div>
                        <div class="block-box block-box-old">
                            <div class="block-color"></div>
                        </div>
                    </div>
                    <div class="btns">
                        <button class="btn btn-small btns-cancel">取消</button>
                        <button class="btn btn-small btn-theme btns-submit">确定</button>
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
            // ]),
            //
            mousedown_rainbow() {

            }
        },
        created() {}
    }
</script>