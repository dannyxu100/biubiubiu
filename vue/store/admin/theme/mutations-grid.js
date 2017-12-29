import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
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
            ${Comm.clearfix(
                state,
                `.${namespace}grid-row`,
                `.${namespace}grid-row-full`
            )}
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
    }
};


