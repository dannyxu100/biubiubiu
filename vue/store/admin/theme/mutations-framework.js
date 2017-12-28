import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
    [MT.CSS_FRAMEWORK]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  framework

            ====================================================*/
            *{
                ${Prefix.box_sizing(state)}
            }
            *:after,
            *:before{
                ${Prefix.box_sizing(state)}
            }

            html{
                font-size: 16px;
                font-family: ${basic.fontfamily.def};
            }
            @media (max-width: 480px){
                html{
                    font-size: 12px;
                }
            }
            @media (min-width: 480px){
                html{
                    font-size: 12px;
                }
            }
            @media (min-width: 768px){
                html{
                    font-size: 14px;
                }
            }
            @media (min-width: 1280px){
                html{
                    font-size: 16px;
                }
            }
            @media (min-width: 1600px){
                html{
                    font-size: 16px;
                }
            }
            body {
                font-family: ${basic.fontfamily.def};
                line-height: ${basic.lineheight.def};
                color: ${basic.fontcolor.def};
                background-color: ${basic.bgcolor.def};
            }

            .${namespace}h1, h1,
            .${namespace}h2, h2,
            .${namespace}h3, h3,
            .${namespace}h4, h4,
            .${namespace}h5, h5,
            .${namespace}h6, h6{
                color: ${basic.fontcolor.title};
                font-family: ${basic.fontfamily.title};
                font-weight: ${basic.fontweight.title};
                line-height: ${basic.lineheight.title};
                margin: ${basic.lineheight.auto}px 0 ${basic.lineheight.auto/2}px;
            }
            .h1 > small, h1 > small,
            .h2 > small, h2 > small,
            .h3 > small, h3 > small,
            .h4 > small, h4 > small,
            .h5 > small, h5 > small,
            .h6 > small, h6 > small,
            .h1 > .small, h1 > .small,
            .h2 > .small, h2 > .small,
            .h3 > .small, h3 > .small,
            .h4 > .small, h4 > .small,
            .h5 > .small, h5 > .small,
            .h6 > .small, h6 > .small {
                font-weight: normal;
                line-height: 1;
                color: ${basic.fontcolor.small};
                font-size: 0.65em;
            }
            .${namespace}h1, h1 { ${Comm.font_size(state, basic.fontsize.xxxl)} }
            .${namespace}h2, h2 { ${Comm.font_size(state, basic.fontsize.xxl)} }
            .${namespace}h3, h3 { ${Comm.font_size(state, basic.fontsize.xl)} }
            .${namespace}h4, h4 { ${Comm.font_size(state, basic.fontsize.l)} }
            .${namespace}h5, h5 { ${Comm.font_size(state, basic.fontsize.m)} }
            .${namespace}h6, h6 { ${Comm.font_size(state, basic.fontsize.def)} }

            hr {
                margin: ${basic.lineheight.def} 0 ${basic.lineheight.def};
                border: 0;
                border-top: 1px ${basic.border.style.dashed} ${basic.fontcolor.hr};
            }

            p {
                margin:0 0 ${basic.lineheight.auto/2}px;
            }

            a {
                color: ${basic.fontcolor.link};
                text-decoration: none;
            }
            a:hover {
                color: ${basic.fontcolor.linkhover};
                text-decoration: underline;
            }

            input {
                /*font-family: ${basic.fontfamily.def};*/
            }
            input::-ms-clear {
                display:none;
            }


            /* 修正placeholder颜色 */
            :-moz-placeholder {  /* Mozilla Firefox 4 to 18 */
                color: ${basic.fontcolor.placeholder};
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: ${basic.fontcolor.placeholder};
            }
            input:-ms-input-placeholder,
            textarea:-ms-input-placeholder {
                color: ${basic.fontcolor.placeholder};
            }
            input::-webkit-input-placeholder,
            textarea::-webkit-input-placeholder {
                color: ${basic.fontcolor.placeholder};
            }

            /* 修正selection颜色 */
            ::-moz-selection {
                background: ${basic.colors.white.ladder.light.hex};
                color: ${basic.colors.theme.ladder.darker.hex};
            }
            ::-webkit-selection {
                background: ${basic.colors.white.ladder.light.hex};
                color: ${basic.colors.theme.ladder.darker.hex};
            }
            ::selection {
                background: ${basic.colors.white.ladder.light.hex};
                color: ${basic.colors.theme.ladder.darker.hex};
            }

            /*修正iconfont*/
            .iconfont {
                display: inline-block;
                font-size: inherit;
                line-height: 1;
            }
        `;
    }
};


