import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
    [MT.CSS_FORM]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  form

            ====================================================*/
            .${namespace}form {
                margin: ${basic.form.margin.top}px ${basic.form.margin.right}px ${basic.form.margin.bottom}px ${basic.form.margin.left}px;
                padding: ${basic.form.padding.top}px ${basic.form.padding.right}px ${basic.form.padding.bottom}px ${basic.form.padding.left}px;
            }
            .${namespace}form .${namespace}formsub {
                margin: ${basic.form.margin_sub.top}px ${basic.form.margin_sub.right}px ${basic.form.margin_sub.bottom}px ${basic.form.margin_sub.left}px;
            }
            .${namespace}form .${namespace}formitem,
            .${namespace}form .${namespace}formitem-line {
                ${basic.form.margin_item.top}px ${basic.form.margin_item.right}px ${basic.form.margin_item.bottom}px ${basic.form.margin_item.left}px;
                ${Comm.inlineblock_clearspace(state)}
            }
            .${namespace}form .${namespace}formitem > .label,
            .${namespace}form .${namespace}formitem-line > .label {
                display: inline-block;
                min-width: ${basic.form.label.minwidth}px;
                height: ${basic.control.height.def}px;
                line-height: ${basic.control.height.def}px;
                margin: ${basic.form.label.margin.top}px ${basic.form.label.margin.right}px ${basic.form.label.margin.bottom}px ${basic.form.label.margin.left}px;
                color: ${basic.form.label.color};
                font-size: ${basic.form.label.fontsize}px;
                vertical-align: top;
            }
            .${namespace}form .${namespace}formitem > small,
            .${namespace}form .${namespace}formitem-line > small,
            .${namespace}form .${namespace}formitem > .small,
            .${namespace}form .${namespace}formitem-line > .small {
              display: inline-block;
              height: 35px;
              line-height: 35px;
              margin-left: 15px;
              vertical-align: middle;
              color: #aaaaaa;
              font-size: 12px;
            }
            .${namespace}form .${namespace}formitem-line > .label {
              display: block;
              height: auto;
              line-height: 1;
              margin-left: 0;
              margin-right: 0;
              margin-bottom: 10px;
            }
            .${namespace}form .${namespace}formitem-line > small,
            .${namespace}form .${namespace}formitem-line > .small {
              display: block;
              height: auto;
              line-height: 1;
              margin-left: 0;
              padding: 8px 0;
            }
            .${namespace}form .must:before {
              color: #f95339;
              font-weight: 700;
              line-height: 1;
              content: "*";
            }
        `;
    }
};


