import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
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
    }
};


