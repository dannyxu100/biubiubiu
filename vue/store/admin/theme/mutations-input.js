import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

//设置输入框尺寸
function input_size(height, lineheight, fontsize, fontweight, radius) {
    return `
        height: ${height};
        line-height: ${lineheight};
        font-size: ${fontsize};   //unit(@fontsize, em);
        font-weight: ${fontweight};
        .prefix-border-radius(${radius});
    `;
}
//设置输入框风格
function input_style(color, bordercolor, bgcolor, bordercolorfocus, shadowfocus) {
    return `
        color: ${color};
        border-color: ${bordercolor};
        background-color: ${bgcolor};
        &:focus,
        &.active {
            border-color: ${bordercolorfocus};
            .prefix-box-shadow(${shadowfocus});
        }
    `;
}


export default {
    [MT.CSS_FRAMEWORK]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  input

            ====================================================*/
            .${namespace}input,
            .${namespace}textarea {
                width: 160px;
                border-width: 1px;
                padding-top: 3px;
                padding-bottom: 3px;
                padding-right: 3px;
                padding-left: 14px;
                border: transparent;
                border-style: solid;
                vertical-align: middle;
                color: #666666;
                border-color: #dddddd;
                background-color: transparent;
                -webkit-transition: border-color linear 0.15s;
                -ms-transition: border-color linear 0.15s;
                -moz-transition: border-color linear 0.15s;
                transition: border-color linear 0.15s;
                -webkit-box-shadow: none;
                -ms-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
            }
            .${namespace}input:focus,
            .${namespace}textarea:focus,
            .${namespace}input.active,
            .${namespace}textarea.active {
              border-color: #666666;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .${namespace}input:focus,
            .${namespace}textarea:focus,
            .${namespace}input.active,
            .${namespace}textarea.active {
              outline: none;
            }
            .${namespace}input.readonly,
            .${namespace}textarea.readonly,
            .${namespace}input[readonly],
            .${namespace}textarea[readonly],
            .${namespace}input.disabled,
            .${namespace}textarea.disabled,
            .${namespace}input[disabled],
            .${namespace}textarea[disabled],
            .${namespace}input.readonly:focus,
            .${namespace}textarea.readonly:focus,
            .${namespace}input[readonly]:focus,
            .${namespace}textarea[readonly]:focus,
            .${namespace}input.disabled:focus,
            .${namespace}textarea.disabled:focus,
            .${namespace}input[disabled]:focus,
            .${namespace}textarea[disabled]:focus,
            .${namespace}input.readonly.active,
            .${namespace}textarea.readonly.active,
            .${namespace}input[readonly].active,
            .${namespace}textarea[readonly].active,
            .${namespace}input.disabled.active,
            .${namespace}textarea.disabled.active,
            .${namespace}input[disabled].active,
            .${namespace}textarea[disabled].active {
              border-style: dotted;
              border-color: #dddddd;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            .${namespace}input.disabled,
            .${namespace}textarea.disabled,
            .${namespace}input[disabled],
            .${namespace}textarea[disabled] {
              color: #aaaaaa;
              cursor: not-allowed;
            }
            .${namespace}input {
              border-width: 0px 0px 1px 0px;
              height: 35px;
              line-height: 1.5;
              font-size: 14px;
              font-weight: 400;
              -moz-border-radius: 0em;
              -webkit-border-radius: 0em;
              border-radius: 0em;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .${namespace}input:focus,
            .${namespace}input.active {
              border-width: 0px 0px 2px 0px;
              padding-bottom: 2px;
            }
            .${namespace}input.readonly,
            .${namespace}input[readonly],
            .${namespace}input.disabled,
            .${namespace}input[disabled],
            .${namespace}input.readonly:focus,
            .${namespace}input[readonly]:focus,
            .${namespace}input.disabled:focus,
            .${namespace}input[disabled]:focus,
            .${namespace}input.readonly.active,
            .${namespace}input[readonly].active,
            .${namespace}input.disabled.active,
            .${namespace}input[disabled].active {
              border-width: 0px 0px 1px 0px;
              padding-bottom: 3px;
            }
            .${namespace}textarea {
              border-width: 1px;
              resize: none;
              height: 105px;
              line-height: 1.5;
              font-size: 14px;
              font-weight: 400;
              -moz-border-radius: 0.3em;
              -webkit-border-radius: 0.3em;
              border-radius: 0.3em;
            }
            .${namespace}textarea:focus,
            .${namespace}textarea.active {
              border-width: 2px;
              padding-top: 2px;
              padding-bottom: 2px;
              padding-right: 2px;
              padding-left: 13px;
            }
            .${namespace}textarea.readonly,
            .${namespace}textarea[readonly],
            .${namespace}textarea.disabled,
            .${namespace}textarea[disabled],
            .${namespace}textarea.readonly:focus,
            .${namespace}textarea[readonly]:focus,
            .${namespace}textarea.disabled:focus,
            .${namespace}textarea[disabled]:focus,
            .${namespace}textarea.readonly.active,
            .${namespace}textarea[readonly].active,
            .${namespace}textarea.disabled.active,
            .${namespace}textarea[disabled].active {
              border-width: 1px 1px 1px 1px;
              padding-top: 3px;
              padding-bottom: 3px;
              padding-right: 3px;
              padding-left: 14px;
            }
            .${namespace}input-full,
            .${namespace}textarea-full {
              width: 100%;
            }
            .${namespace}input-small {
              height: 28px;
              line-height: 1.5;
              font-size: 12px;
              font-weight: 400;
              -moz-border-radius: 0em;
              -webkit-border-radius: 0em;
              border-radius: 0em;
            }
            .${namespace}input-large {
              height: 45px;
              line-height: 1.5;
              font-size: 16px;
              font-weight: 400;
              -moz-border-radius: 0em;
              -webkit-border-radius: 0em;
              border-radius: 0em;
            }
            .${namespace}input-theme,
            .${namespace}textarea-theme {
              color: #666666;
              border-color: #dddddd;
              background-color: transparent;
            }
            .${namespace}input-theme:focus,
            .${namespace}textarea-theme:focus,
            .${namespace}input-theme.active,
            .${namespace}textarea-theme.active {
              border-color: #05c3f9;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .${namespace}input-key,
            .${namespace}textarea-key {
              color: #666666;
              border-color: #dddddd;
              background-color: transparent;
            }
            .${namespace}input-key:focus,
            .${namespace}textarea-key:focus,
            .${namespace}input-key.active,
            .${namespace}textarea-key.active {
              border-color: #f95339;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .${namespace}input-light,
            .${namespace}textarea-light {
              color: #666666;
              border-color: #dddddd;
              background-color: transparent;
            }
            .${namespace}input-light:focus,
            .${namespace}textarea-light:focus,
            .${namespace}input-light.active,
            .${namespace}textarea-light.active {
              border-color: #ffd301;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .${namespace}input-nice,
            .${namespace}textarea-nice {
              color: #666666;
              border-color: #dddddd;
              background-color: transparent;
            }
            .${namespace}input-nice:focus,
            .${namespace}textarea-nice:focus,
            .${namespace}input-nice.active,
            .${namespace}textarea-nice.active {
              border-color: #01c677;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
        `;
    }
};


