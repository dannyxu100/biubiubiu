<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme-ctrl">
        <div class="container">
            <!-- 颜色 -->
            <div class="section">
                <div class="grid">
                    <h2>尺寸</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.height.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">小尺寸</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.height.small"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">大尺寸</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.height.large"/>
                        </div>
                    </div>
                    <br/>

                    <h2>字号</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.fontsize.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">小尺寸</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.fontsize.small"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">大尺寸</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.fontsize.large"/>
                        </div>
                    </div>
                    <br/>

                    <h2>边距</h2>
                    <h3>默认</h3>
                    <div class="grid-row">
                        <div class="cell-12-4">上</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.def.top"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">下</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.def.bottom"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">左</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.def.left"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">右</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.def.right"/>
                        </div>
                    </div>
                    <h3>小尺寸</h3>
                    <div class="grid-row">
                        <div class="cell-12-4">上</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.small.top"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">下</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.small.bottom"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">左</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.small.left"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">右</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.small.right"/>
                        </div>
                    </div>
                    <h3>大尺寸</h3>
                    <div class="grid-row">
                        <div class="cell-12-4">上</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.large.top"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">下</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.large.bottom"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">左</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.large.left"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">右</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.padding.large.right"/>
                        </div>
                    </div>
                    <br/>

                    <h2>风格</h2>
                    <h3>默认</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.def.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>反相</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.inverse.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>主题</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.theme.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>关键</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.key.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>闪亮</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.light.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>友好</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.nice.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>边框按钮</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.border.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>反相边框按钮</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.borderinverse.shadow.disabled"/>
                        </div>
                    </div>

                    <h3>链接按钮</h3>
                    <h4>字色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.color.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.color.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.color.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.color.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.color.disabled"/>
                        </div>
                    </div>
                    <h4>边色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bordercolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bordercolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bordercolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bordercolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bordercolor.disabled"/>
                        </div>
                    </div>
                    <h4>底色</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bgcolor.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bgcolor.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bgcolor.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bgcolor.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.bgcolor.disabled"/>
                        </div>
                    </div>
                    <h4>阴影</h4>
                    <div class="grid-row">
                        <div class="cell-12-4">默认</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.shadow.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">鼠标指向</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.shadow.hover"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">焦点</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.shadow.focus"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">激活</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.shadow.active"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">禁用</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.style.link.shadow.disabled"/>
                        </div>
                    </div>
                    <br/>

                    <h2>其他</h2>
                    <div class="grid-row">
                        <div class="cell-12-4">倒角</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.radius"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">z-index</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.zindex.def"/>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="cell-12-4">z-index(激活)</div>
                        <div class="cell-12-8">
                            <input class="inputcolor" v-model="basic.btn.zindex.active"/>
                        </div>
                    </div>
                    <br/>

                </div>
            </div>

            <button @click="submit">保存</button>
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
        computed: {
            //
            ...mapGetters([
                'basic'
            ])
        },
        methods: {
            //
            submit() {
                let promi = this.$fn.ajax('/admin/less', {
                    data: JSON.stringify(this.basic)
                });
            }
        },
        created() {}
    }
</script>