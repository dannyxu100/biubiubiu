<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 基调配色 -->
            <h2>基调配色</h2>
            <h3>色块</h3>
            <div>.bgtheme | .bgkey | .bglight | .bgnice | .bgblack | .bgwhite | .bggray</div>
            <br/>
            <div class="grid">
                <div class="grid-row" style="">
                    <div class="cell-7-1">
                        <div class="colorblock bgtheme-lightest">
                            <div>主题-最亮</div>
                            <div>.bgtheme-lightest</div>
                            <div>#D8F6FE</div>
                        </div>
                        <div class="colorblock bgtheme-lighter fwhite">
                            <div>主题-较亮</div>
                            <div>.bgtheme-lighter</div>
                            <div>#74DEFC</div>
                        </div>
                        <div class="colorblock bgtheme-light fwhite">
                            <div>主题-亮</div>
                            <div>.bgtheme-light</div>
                            <div>#43D3FC</div>
                        </div>
                        <div class="colorblock active bgtheme fwhite">
                            <div>主题</div>
                            <div>.bgtheme</div>
                            <div>#05C3F9</div>
                        </div>
                        <div class="colorblock bgtheme-dark fwhite">
                            <div>主题-暗</div>
                            <div>.bgtheme-dark</div>
                            <div>#319DBB</div>
                        </div>
                        <div class="colorblock bgtheme-darker fwhite">
                            <div>主题-较暗</div>
                            <div>.bgtheme-darker</div>
                            <div>#027FA2</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock empty"></div>
                        <div class="colorblock empty"></div>
                        <div class="colorblock bgkey-light fwhite">
                            <div>关键的-亮</div>
                            <div>.bgkey-light</div>
                            <div>#FC7E6A</div>
                        </div>
                        <div class="colorblock active bgkey fwhite">
                            <div>关键的</div>
                            <div>.bgkey</div>
                            <div>#F95339</div>
                        </div>
                        <div class="colorblock bgkey-dark fwhite">
                            <div>关键的-暗</div>
                            <div>.bgkey-dark</div>
                            <div>#BB5D4F</div>
                        </div>
                        <div class="colorblock bgkey-darker fwhite">
                            <div>关键的-较暗</div>
                            <div>.bgkey-darker</div>
                            <div>#A22613</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock bglight-lightest">
                            <div>闪亮的-最亮</div>
                            <div>.bglight-lightest</div>
                            <div>#FFFFC5</div>
                        </div>
                        <div class="colorblock bglight-lighter">
                            <div>闪亮的-较亮</div>
                            <div>.bglight-lighter</div>
                            <div>#FFFF73</div>
                        </div>
                        <div class="colorblock bglight-light">
                            <div>闪亮的-亮</div>
                            <div>.bglight-light</div>
                            <div>#FFFF41</div>
                        </div>
                        <div class="colorblock active bglight">
                            <div>闪亮的</div>
                            <div>.bglight</div>
                            <div>#FFFF01</div>
                        </div>
                        <div class="colorblock bglight-dark ">
                            <div>闪亮的-暗</div>
                            <div>.bglight-dark</div>
                            <div>#FFF201</div>
                        </div>
                        <div class="colorblock bglight-darker ">
                            <div>闪亮的-较暗</div>
                            <div>.bglight-darker</div>
                            <div>#FFD301</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock empty"></div>
                        <div class="colorblock bgnice-lighter fwhite">
                            <div>友好的-较亮</div>
                            <div>.bgnice-lighter</div>
                            <div>#67E3B1</div>
                        </div>
                        <div class="colorblock bgnice-light fwhite">
                            <div>友好的-亮</div>
                            <div>.bgnice-light</div>
                            <div>#39E39E</div>
                        </div>
                        <div class="colorblock active bgnice fwhite">
                            <div>友好的</div>
                            <div>.bgnice</div>
                            <div>#01C677</div>
                        </div>
                        <div class="colorblock bgnice-dark fwhite">
                            <div>友好的-暗</div>
                            <div>.bgnice-dark</div>
                            <div>#269568</div>
                        </div>
                        <div class="colorblock bgnice-darker fwhite">
                            <div>友好的-较暗</div>
                            <div>.bgnice-darker</div>
                            <div>#00814D</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock empty"></div>
                        <div class="colorblock empty"></div>
                        <div class="colorblock bgblack-light fwhite">
                            <div>黑-亮</div>
                            <div>.bgblack-light</div>
                            <div>#666</div>
                        </div>
                        <div class="colorblock active bgblack fwhite">
                            <div>黑</div>
                            <div>.bgblack</div>
                            <div>#444</div>
                        </div>
                        <div class="colorblock bgblack-dark fwhite">
                            <div>黑-基础</div>
                            <div>.bgblack-dark</div>
                            <div>#333</div>
                        </div>
                        <div class="colorblock bgblack-darker fwhite">
                            <div>黑-暗</div>
                            <div>.bgblack-darker</div>
                            <div>#222</div>
                        </div>
                        <div class="colorblock bgblack-darkest fwhite">
                            <div>黑-最暗</div>
                            <div>.bgblack-darkest</div>
                            <div>#000</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock empty"></div>
                        <div class="colorblock bggray-lighter">
                            <div>灰-较亮</div>
                            <div>.bggray-lighter</div>
                            <div>#EEE</div>
                        </div>
                        <div class="colorblock bggray-light">
                            <div>灰-亮</div>
                            <div>.bggray-light</div>
                            <div>#DDD</div>
                        </div>
                        <div class="colorblock active bggray">
                            <div>灰</div>
                            <div>.bggray</div>
                            <div>#CCC</div>
                        </div>
                        <div class="colorblock bggray-dark fwhite">
                            <div>灰-暗</div>
                            <div>.bggray-dark</div>
                            <div>#BBB</div>
                        </div>
                        <div class="colorblock bggray-darker fwhite">
                            <div>灰-较暗</div>
                            <div>.bggray-darker</div>
                            <div>#AAA</div>
                        </div>
                        <div class="colorblock bggray-darkest fwhite">
                            <div>灰-最暗</div>
                            <div>.bggray-darkest</div>
                            <div>#999</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock empty"></div>
                        <div class="colorblock empty"></div>
                        <div class="colorblock bgwhite-light">
                            <div>白-亮</div>
                            <div>.bgwhite-light</div>
                            <div>#FFF</div>
                        </div>
                        <div class="colorblock active bgwhite">
                            <div>白</div>
                            <div>.bgwhite</div>
                            <div>#FAFAFA</div>
                        </div>
                        <div class="colorblock bgwhite-dark">
                            <div>白-暗</div>
                            <div>.bgwhite-dark</div>
                            <div>#F7F7F7</div>
                        </div>
                        <div class="colorblock bgwhite-darker">
                            <div>白-较暗</div>
                            <div>.bgwhite-darker</div>
                            <div>#F5F5F5</div>
                        </div>
                        <div class="colorblock bgwhite-darkest">
                            <div>白-最暗</div>
                            <div>.bgwhite-darkest</div>
                            <div>#F3F3F3</div>
                        </div>
                    </div>
                </div>
            </div>

            <br/>
            <div>我这个配色方案中还给出一些辅助色，参考一下得了</div>
            <br/>
            <div class="grid">
                <div class="grid-row" style="">
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#5ADBD3">
                            <div>#5ADBD3</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#ED0145">
                            <div>#ED0145</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#D13079">
                            <div>#D13079</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#710AAA">
                            <div>#710AAA</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#FF6000">
                            <div>#FF6000</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#FFBA73">
                            <div>#FFBA73</div>
                        </div>
                    </div>
                    <div class="cell-7-1">
                        <div class="colorblock-min" style="border-color:#F8F1CE">
                            <div>#F8F1CE</div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>


            <h3>文本</h3>
            <div>深暗色调</div>
            <div>.ftheme | .fkey | .fnice | .fblack</div>
            <ul class="textbox5">
                <li class="ftheme">Look inside</li>
                <li class="ftheme">看看</li>
                <li class="ftheme">Look inside your tiny mind</li>
                <li class="ftheme">看看你那浅薄的思想</li>
            </ul>
            <ul class="textbox5">
                <li class="fkey">then look a bit harder</li>
                <li class="fkey">放远大点吧</li>
                <li class="fkey">Cause we're so uninspired</li>
                <li class="fkey">因为那里装不下灵魂</li>
            </ul>
            <ul class="textbox5">
                <li class="fnice">So sick and tired of all the hatred you harbor</li>
                <li class="fnice">如此恶心另人厌倦 全是罪恨</li>
                <li class="fnice">So you say</li>
                <li class="fnice">所以你说</li>
            </ul>
            <ul class="textbox5">
                <li class="fblack">It's not okay to be gay</li>
                <li class="fblack">你不认同同性恋</li>
                <li class="fblack">Well I think you're just evil</li>
                <li class="fblack">然而我覺得你是個魔鬼</li>
            </ul>

            <div>明亮色调</div>
            <div>.flight | .fwhite | .fgray</div>
            <ul class="textbox10 bgimg-dark">
                <li class="flight">You're just some racist who can't tie my laces</li>
                <li class="flight">你就是一种种族歧视 連鞋帶都不配給我系</li>
                <li class="flight">Your point of view is medieval</li>
                <li class="flight">你的觀點已經過時</li>
            </ul>
            <ul class="textbox10 bgimg-dark">
                <li class="fgray">Fuck you (Fuck you)</li>
                <li class="fgray">去你的</li>
                <li class="fgray">Fuck you very, very much</li>
                <li class="fgray">真的是去你媽的</li>
            </ul>
            <ul class="textbox10 bgimg-dark">
                <li class="fwhite">Cause your words don't translate</li>
                <li class="fwhite">因为我们语言不通</li>
                <li class="fwhite">And it's getting quite late</li>
                <li class="fwhite">那只会耽误时间</li>
            </ul>
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