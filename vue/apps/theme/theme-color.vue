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
                    <template v-for="(color, colorkey) in basic.colors">
                    <div class="cell-7-1">
                        <template v-for="(item, itemkey) in color.ladder">
                        <div v-if="item" class="colorblock" :class="classesblock(item, itemkey)" :style="stylebgcolor(item, itemkey)">
                            <div>{{item.name}}</div>
                            <div>{{item.class}}</div>
                            <div>{{item.hex}}</div>
                            <div>{{item.rgb}}</div>
                        </div>
                        <div v-else class="colorblock empty"></div>
                        </template>
                    </div>
                    </template>
                </div>
            </div>

            <br/>
            <div>我这个配色方案中还给出一些辅助色，参考一下得了</div>
            <br/>
            <div class="grid">
                <div class="grid-row" style="">
                    <template v-for="(color, colorkey) in basic.colors">
                    <div v-if="color.complementary" class="cell-7-1">
                        <div class="colorblock-min" :style="stylebgcolor4min(color)">
                            <div>{{color.complementary.hex}}</div>
                            <div>{{color.complementary.rgb}}</div>
                        </div>
                    </div>
                    </template>
                    <!-- <div class="cell-7-1">
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
                    </div> -->
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
    import Color                            from '_JS_/color.js';

    export default {
        components: {},
        data() {
            return {}
        },
        computed: {
            //
            ...mapGetters([
                'basic'
            ])

        },
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ])
            //色块样式
            classesblock( item, itemkey ) {
                let classes = {};
                if( !Color.islight(item.rgb) ) {
                    classes['fwhite'] = true;
                } else {
                    classes['fblack'] = true;
                }
                if( 'normal' === itemkey ) {
                    classes['active'] = true;
                }
                return classes;
            },
            //实时预览色块颜色
            stylebgcolor( item, itemkey ) {
                return {'background-color': item.rgb};
            },
            //实时预览色块颜色(辅助色)
            stylebgcolor4min( color ) {
                return {'border-color': color.complementary.rgb};
            },
        },
        created() {
            debugger;
        }
    }
</script>