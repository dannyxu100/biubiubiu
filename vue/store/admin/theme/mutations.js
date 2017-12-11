import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Btn                      from './mutations-btn.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
    [MT.MERGE_DATA] ( state, newdata ) {
        state.data_copy = Vue.api.copy( state.data );       //备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    },
    [MT.INIT_BASIC]( state ) {
        let basic = state.data.basic;
        basic.fontcolor = {
            def:        basic.colors.black.ladder.normal.hex,
            weak:       basic.colors.gray.ladder.darker.hex,
            title:      'inherit',
            hr:         basic.colors.gray.ladder.lighter.hex,
            small:      basic.colors.gray.ladder.darker.hex,
            link:       basic.colors.theme.ladder.dark.hex,
            linkhover:  basic.colors.theme.ladder.darker.hex,
        };
        basic.bgcolor = {
            def:        basic.colors.white.ladder.light.hex,
            weak:       basic.colors.white.ladder.normal.hex
        };
        basic.rem2px = 1/basic.defpx;                                                                       // 1/16 = 0.0625;
        basic.lineheight.auto = Math.floor(basic.fontsize.def/basic.rem2px * basic.lineheight.def);         //动态行高，根据字体大小计算

        basic.table.fontsize = basic.fontsize.def;
        basic.table.radius = basic.radius.r6;
    },
    [MT.CSS_BASIC]( state ) {
        let basic, csstext;
        basic = state.data.basic;
        basic.fontfamily.def = basic.fontfamily.ios.concat( basic.fontfamily.en, basic.fontfamily.zh, basic.fontfamily.sys ).join(',');
    },
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
                color: #ddd;
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: #ddd;
            }
            input:-ms-input-placeholder,
            textarea:-ms-input-placeholder {
                color: #ddd;
            }
            input::-webkit-input-placeholder,
            textarea::-webkit-input-placeholder {
                color: #ddd;
            }

            /*修正iconfont*/
            .iconfont {
                display: inline-block;
                font-size: inherit;
                line-height: 1;
            }
        `;
    },
    [MT.CSS_GRID]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        function makecell( column ) {
            let list = [], item;
            for(let i=1; i<=column; i++){
                // item = `${namespace}cell-${column}-${size}`;
                list.push(`.${namespace}cell-${column}-${i}`);
            }
            return list.join(',') + `{
                position: relative;
                float: left;
                padding: 0 ${basic.grid.colspace}px;
            }`;
        }
        function makecellwidth( column ) {
            let list = [], item;
            for(let i=1; i<=column; i++){
                // item = `${namespace}cell-${column}-${size}`;
                list.push(`
                .${namespace}cell-${column}-${i} {
                    width: ${(i/column)*100}%;
                }
                `);
            }
            return list.join('');
        }

        state.data.csstext += `
            /*====================================================

                  grid

            ====================================================*/

            /*栅栏布局*/
            .${namespace}grid {
                width: 100%;
            }
            .${namespace}grid-row,
            .${namespace}grid-row-full {
                ${Comm.clearfix(state, `.${namespace}grid-row-full`)}
            }
            .${namespace}grid-row {
                margin-top: ${basic.grid.rowspace*2}px;
            }
            .${namespace}grid-row:first-child {
                margin-top: 0;
            }

            ${makecell(5)}
            ${makecell(7)}
            ${makecell(12)}

            ${makecellwidth(5)}
            ${makecellwidth(7)}
            ${makecellwidth(12)}

            [class^="cell-"]:first-child {
                padding-left: 0;
            }
            [class^="cell-"]:last-child {
                padding-right: 0;
            }

            .${namespace}grid-row-full {
                margin: 0 !important;
                & > [class^="cell-"] {
                    padding: 0 !important;
                }
            }
        `;
    },
    [MT.CSS_TABLE]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
            /*====================================================

                 table

            ====================================================*/
            /*默认表格*/
            .${namespace}table {
                border-collapse: collapse;          /*边框合并为一个单一的边框，忽略 border-spacing 和 empty-cells 属性*/
                color: ${basic.table.color.def};
                font-size: ${basic.table.fontsize}em;
                background: ${basic.table.bgcolor.def};
            }
            .${namespace}table > caption {
                padding: 8px 15px;
                color: ${basic.table.caption.color};
                text-align: left;
                font-weight: ${basic.fontweight.bold};
                background: ${basic.table.caption.bgcolor};
            }
            .${namespace}table > thead > tr > th,
            .${namespace}table > tbody > tr > th,
            .${namespace}table > tfoot > tr > th,
            .${namespace}table > tr > th,
            .${namespace}table > thead > tr > td,
            .${namespace}table > tbody > tr > td,
            .${namespace}table > tfoot > tr > td,
            .${namespace}table > tr > td {
                padding: 8px 15px;
            }
            .${namespace}table > thead > tr > th,
            .${namespace}table > tbody > tr > th,
            .${namespace}table > tfoot > tr > th,
            .${namespace}table > tr > th {
                padding: 8px 15px;
                text-align: left;
                border-bottom: 1px solid ${basic.table.bordercolor.def};
                color: ${basic.table.color.head};
                font-weight: ${basic.fontweight.bold};
            }
            .${namespace}table > thead > tr > th,
            .${namespace}table > thead > tr > td {
                color: ${basic.table.color.head};
            }
            .${namespace}table > tbody > tr > th,
            .${namespace}table > tbody > tr > td {
                color: ${basic.table.color.body};
            }
            .${namespace}table > tfoot > tr > th,
            .${namespace}table > tfoot > tr > td {
                color: ${basic.table.color.foot};
            }
            .${namespace}table-full {
                width: 100%;
            }
            .${namespace}table-line > thead > tr > th,
            .${namespace}table-line > tbody > tr > th,
            .${namespace}table-line > tfoot > tr > th,
            .${namespace}table-line > tr > th {
                border-bottom: 1px solid ${basic.table.bordercolor.def};
            }
            .${namespace}table-line > thead > tr > td,
            .${namespace}table-line > tbody > tr > td,
            .${namespace}table-line > tfoot > tr > td,
            .${namespace}table-line > tr > td {
                border-top: 1px solid ${basic.table.bordercolor.def};
            }
            .${namespace}table-grid > caption {
                border-bottom: 1px solid ${basic.table.bordercolor.head};
            }
            .${namespace}table-grid > thead > tr > th,
            .${namespace}table-grid > tbody > tr > th,
            .${namespace}table-grid > tfoot > tr > th,
            .${namespace}table-grid > tr > th,
            .${namespace}table-grid > thead > tr > td,
            .${namespace}table-grid > tbody > tr > td,
            .${namespace}table-grid > tfoot > tr > td,
            .${namespace}table-grid > tr > td {
                border: 1px solid ${basic.table.bordercolor.def};
                border-width: 1px 0 0 1px;
                /*border-width: 0px 1px 1px 0px;*/
            }
            .${namespace}table-grid > thead > tr:first-child > th,
            .${namespace}table-grid > tbody:first-child > tr:first-child > th,
            .${namespace}table-grid > thead > tr:first-child > td,
            .${namespace}table-grid > tbody:first-child > tr:first-child > td {
                border-top-width: 0;
            }
            .${namespace}table-grid > thead > tr > th:first-child,
            .${namespace}table-grid > tfoot > tr > th:first-child,
            .${namespace}table-grid > tbody > tr > th:first-child,
            .${namespace}table-grid > thead > tr > td:first-child,
            .${namespace}table-grid > tfoot > tr > td:first-child,
            .${namespace}table-grid > tbody > tr > td:first-child {
                border-left-width: 0;
            }
            .${namespace}table-grid-border {
                display: inline-table;
                border: 3px solid ${basic.table.bordercolor.box};
                overflow: hidden;
                ${Prefix.border_radius(state, basic.table.radius+'em')}
            }
            .${namespace}table-grid-border .table {
                width: 100%;
            }
            .${namespace}table-min > thead > tr > th,
            .${namespace}table-min > tbody > tr > th,
            .${namespace}table-min > tfoot > tr > th,
            .${namespace}table-min > tr > th,
            .${namespace}table-min > thead > tr > td,
            .${namespace}table-min > tbody > tr > td,
            .${namespace}table-min > tfoot > tr > td,
            .${namespace}table-min > tr > td {
                padding: 1px 5px;
            }
            .${namespace}table-min > thead > tr > th,
            .${namespace}table-min > tbody > tr > th,
            .${namespace}table-min > tfoot > tr > th,
            .${namespace}table-min > tr > th {
                padding: 3px 5px;
            }
            .${namespace}table-diff > tbody > tr:nth-of-type(even) {
                background-color: ${basic.table.bgcolor.diff};
            }
            .${namespace}table-hover > tbody > tr:hover {
                background-color: ${basic.table.bgcolor.hover};
            }
            .${namespace}table-hover > tbody > tr:hover > td {
                color: ${basic.table.color.hover};
            }
        `;
    },
    ...Btn,
};


