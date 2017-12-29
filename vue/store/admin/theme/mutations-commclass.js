import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';


//生产常用尺寸字体
function loop_make_fontsize( state, size, step ) {
    step = step || 2;
    let namespace, remsize, csstext;
    namespace = state.data.basic.namespace;
    remsize = size * state.data.basic.rem2px;
    csstext = `
        ${namespace}fsize-${size} {
            ${Comm.font_size(state, remsize)}
        }
    `;
    if( size - step >= 10 ) {
        return csstext + loop_make_fontsize( state, size - step );
    } else {
        return csstext;
    }
}
//生产常用字间距
function loop_make_letterspace( state, size, step ) {
    step = step || 0.1;
    let namespace, numsize, csstext;
    namespace = state.data.basic.namespace;
    numsize = size*10;
    csstext = `
        ${namespace}fontspace-${numsize} {
            letter-spaceing: ${size}em;
        }
    `;
    if( size - step > 0 ) {
        return csstext + loop_make_letterspace( state, (size*10-step*10)/10 );
    } else {
        return csstext;
    }
}

export default {
    [MT.CSS_COMMCLASS]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  commonclass

            ====================================================*/
            /*背景颜色*/
            .${namespace}bgtheme-lightest {
                background-color: ${basic.colors.theme.ladder.lightest.hex} !important;
            }
            .${namespace}bgtheme-lighter {
                background-color: ${basic.colors.theme.ladder.lighter.hex} !important;
            }
            .${namespace}bgtheme-light {
                background-color: ${basic.colors.theme.ladder.light.hex} !important;
            }
            .${namespace}bgtheme {
                background-color: ${basic.colors.theme.ladder.normal.hex} !important;
            }
            .${namespace}bgtheme-dark {
                background-color: ${basic.colors.theme.ladder.dark.hex} !important;
            }
            .${namespace}bgtheme-darker {
                background-color: ${basic.colors.theme.ladder.darker.hex} !important;
            }

            .${namespace}bgkey-light {
                background-color: ${basic.colors.key.ladder.light.hex} !important;
            }
            .${namespace}bgkey {
                background-color: ${basic.colors.key.ladder.normal.hex} !important;
            }
            .${namespace}bgkey-dark {
                background-color: ${basic.colors.key.ladder.dark.hex} !important;
            }
            .${namespace}bgkey-darker {
                background-color: ${basic.colors.key.ladder.darker.hex} !important;
            }

            .${namespace}bglight-lightest {
                background-color: ${basic.colors.light.ladder.lightest.hex} !important;
            }
            .${namespace}bglight-lighter {
                background-color: ${basic.colors.light.ladder.lighter.hex} !important;
            }
            .${namespace}bglight-light {
                background-color: ${basic.colors.light.ladder.light.hex} !important;
            }
            .${namespace}bglight {
                background-color: ${basic.colors.light.ladder.normal.hex} !important;
            }
            .${namespace}bglight-dark {
                background-color: ${basic.colors.light.ladder.dark.hex} !important;
            }
            .${namespace}bglight-darker {
                background-color: ${basic.colors.light.ladder.darker.hex} !important;
            }

            .${namespace}bgnice-lighter {
                background-color: ${basic.colors.nice.ladder.lighter.hex} !important;
            }
            .${namespace}bgnice-light {
                background-color: ${basic.colors.nice.ladder.light.hex} !important;
            }
            .${namespace}bgnice {
                background-color: ${basic.colors.nice.ladder.normal.hex} !important;
            }
            .${namespace}bgnice-dark {
                background-color: ${basic.colors.nice.ladder.dark.hex} !important;
            }
            .${namespace}bgnice-darker {
                background-color: ${basic.colors.nice.ladder.darker.hex} !important;
            }

            .${namespace}bgblack-light {
                background-color: ${basic.colors.black.ladder.light.hex} !important;
            }
            .${namespace}bgblack {
                background-color: ${basic.colors.black.ladder.normal.hex} !important;
            }
            .${namespace}bgblack-dark {
                background-color: ${basic.colors.black.ladder.dark.hex} !important;
            }
            .${namespace}bgblack-darker {
                background-color: ${basic.colors.black.ladder.darker.hex} !important;
            }
            .${namespace}bgblack-darkest {
                background-color: ${basic.colors.black.ladder.darkest.hex} !important;
            }

            .${namespace}bggray-lighter {
                background-color: ${basic.colors.gray.ladder.lighter.hex} !important;
            }
            .${namespace}bggray-light {
                background-color: ${basic.colors.gray.ladder.light.hex} !important;
            }
            .${namespace}bggray {
                background-color: ${basic.colors.gray.ladder.normal.hex} !important;
            }
            .${namespace}bggray-dark {
                background-color: ${basic.colors.gray.ladder.dark.hex} !important;
            }
            .${namespace}bggray-darker {
                background-color: ${basic.colors.gray.ladder.darker.hex} !important;
            }
            .${namespace}bggray-darkest {
                background-color: ${basic.colors.gray.ladder.darkest.hex} !important;
            }

            .${namespace}bgwhite-light {
                background-color: ${basic.colors.white.ladder.light.hex} !important;
            }
            .${namespace}bgwhite {
                background-color: ${basic.colors.white.ladder.normal.hex} !important;
            }
            .${namespace}bgwhite-dark {
                background-color: ${basic.colors.white.ladder.dark.hex} !important;
            }
            .${namespace}bgwhite-darker {
                background-color: ${basic.colors.white.ladder.darker.hex} !important;
            }
            .${namespace}bgwhite-darkest {
                background-color: ${basic.colors.white.ladder.darkest.hex} !important;
            }

            /*文字颜色*/
            .${namespace}ftheme {
                color: ${basic.colors.theme.ladder.darker.hex} !important;
            }
            .${namespace}fkey {
                color: ${basic.colors.key.ladder.darker.hex} !important;
            }
            .${namespace}flight {
                color: ${basic.colors.light.ladder.darker.hex} !important;
            }
            .${namespace}fnice {
                color: ${basic.colors.nice.ladder.darker.hex} !important;
            }
            .${namespace}fblack {
                color: ${basic.colors.black.ladder.normal.hex} !important;
            }
            .${namespace}fgray {
                color: ${basic.colors.gray.ladder.darker.hex} !important;
            }
            .${namespace}fwhite {
                color: ${basic.colors.white.ladder.light.hex} !important;
            }

            /*字体粗细*/
            /*.${namespace}fsize-[12,14,16,18,20,...,32]*/
            ${loop_make_fontsize(state, 32)}

            /*字体粗细*/
            .${namespace}bold {
                font-weight: ${basic.fontweight.bold} !important;
            }
            .${namespace}normal {
                font-weight: ${basic.fontweight.def} !important;
            }


            /*字间距*/
            /*.${namespace}fontspace-[1,2,3,4,5,6,7,8,9,10]*/
            ${loop_make_letterspace(state, 1)}


            /*段落*/
            .${namespace}indent p {
                text-indent: 2em;
            }


            /*边框*/
            .${namespace}dotted {
                border-style: ${basic.border.style.dotted} !important;
            }
            .${namespace}double {
                border-style: ${basic.border.style.double} !important;
            }
            .${namespace}dashed {
                border-style: ${basic.border.style.dashed} !important;
            }


            /*圆角*/
            /*.${namespace}radius-[1,2,3,4,5,6,7,8,9,10]*/
            .loop-makeradius(1);
            /*.${namespace}radiusp-[10,20,30,40,50]*/
            .loop-makeradiusp(50);


            /*显示隐藏*/
            .${namespace}unvisible {
                visibility: hidden !important;
            }
            .${namespace}hide {
                display: none !important;
            }
            .${namespace}show {
                display: block !important;
            }


            /*浮动*/
            .${namespace}fleft {
                float: left !important;
            }

            .${namespace}fright {
                float: right !important;
            }

            .${namespace}clearfix {
                .comm-clearfix();
            }


            /*定位*/
            .${namespace}fixed {
                position: fixed !important;
            }



            /*内容对齐*/
            .${namespace}textleft {
                text-align: left !important;
            }
            .${namespace}textcenter {
                text-align: center !important;
            }
            .${namespace}textright {
                text-align: right !important;
            }


            /*滚动*/
            .${namespace}noscroll {
                overflow: hidden !important;
            }

        `;
    }
};


