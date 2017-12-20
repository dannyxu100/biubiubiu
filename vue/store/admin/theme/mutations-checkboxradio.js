import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
    [MT.CSS_CHECKBOXRADIO]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                 checkbox and radio

            ====================================================*/
            .${namespace}checkbox,
            .${namespace}radio {
                display: inline-block;
                position: relative;
                padding: ${basic.chkradio.padding.top}px ${basic.chkradio.padding.right}px ${basic.chkradio.padding.bottom}px ${basic.chkradio.padding.left}px;
                vertical-align: middle;
                font-size: 0;
                color: ${basic.chkradio.color.def};
                cursor: ${basic.cursor.pointer};
            }
            .${namespace}checkbox input[type="checkbox"],
            .${namespace}radio input[type="checkbox"],
            .${namespace}checkbox input[type="radio"],
            .${namespace}radio input[type="radio"] {
                display: none;
            }
            .${namespace}checkbox .${namespace}checkbox-text,
            .${namespace}radio .${namespace}checkbox-text,
            .${namespace}checkbox .${namespace}radio-text,
            .${namespace}radio .${namespace}radio-text {
                display: inline-block;
                line-height: ${basic.chkradio.height}px;
                font-size: ${basic.chkradio.fontsize}px;
                vertical-align: middle;
            }
            .${namespace}checkbox:before,
            .${namespace}radio:before,
            .${namespace}checkbox:after,
            .${namespace}radio:after {
                display: block;
                position: absolute;
                top: 5px;
                left: 4px;
                line-height: 1;
                font-size: ${basic.chkradio.fontsize}px;
                text-align: center;
                content: "";
                ${Prefix.opacity(state, 1)}
                ${Prefix.transition(state)}
            }
            .${namespace}checkbox:before,
            .${namespace}radio:before {
                z-index: ${basic.chkradio.zindex.before};
            }
            .${namespace}checkbox:after,
            .${namespace}radio:after {
                z-index: ${basic.chkradio.zindex.after};
            }
            .${namespace}checkbox.checked,
            .${namespace}radio.checked {
                cursor: ${basic.cursor.def};
            }
            .${namespace}checkbox.disabled,
            .${namespace}radio.disabled,
            .${namespace}checkbox[disabled],
            .${namespace}radio[disabled] {
                cursor: ${basic.cursor.no};
            }
            .${namespace}checkbox.disabled:before,
            .${namespace}radio.disabled:before,
            .${namespace}checkbox[disabled]:before,
            .${namespace}radio[disabled]:before,
            .${namespace}checkbox.disabled:hover:before,
            .${namespace}radio.disabled:hover:before,
            .${namespace}checkbox[disabled]:hover:before,
            .${namespace}radio[disabled]:hover:before {
                ${Prefix.opacity(state, 0.4)}
            }
            .${namespace}checkbox .${namespace}checkbox-text {
                color: ${basic.chkradio.color.def};
            }
            .${namespace}checkbox:before {
                width: 16px;
                height: 16px;
                border: ${basic.chkradio.borderwidth_before}px solid ${basic.chkradio.style.def.bordercolor_before.def};
                background: ${basic.chkradio.style.def.bgcolor_before.def};
                ${Prefix.border_radius(state, basic.chkradio.radius_before.chk +'em')}
            }
            .${namespace}checkbox:after {
                width: 16px;
                height: 16px;
                line-height: 16px;
                display: none \\9;           /* ie hack */
                ${Prefix.opacity(state, 0)}
                ${Comm.iconfont(state, basic.chkradio.icon_after, basic.chkradio.fontsize +'px')}
            }
            .${namespace}checkbox:hover .${namespace}checkbox-text,
            .${namespace}checkbox.hover .${namespace}checkbox-text {
                color: ${basic.chkradio.color.hover};
            }
            .${namespace}checkbox:hover:before,
            .${namespace}checkbox.hover:before {
                border-color: ${basic.chkradio.style.def.bordercolor_before.hover};
                background: ${basic.chkradio.style.def.bgcolor_before.hover};
            }
            .${namespace}checkbox:hover:after,
            .${namespace}checkbox.hover:after {
                color: ${basic.chkradio.style.def.color_after.hover};
                display: block \\9;          /* ie hack */
                ${Prefix.opacity(state, 1)}
            }
            .${namespace}checkbox.checked .${namespace}checkbox-text {
                color: ${basic.chkradio.color.checked};
            }
            .${namespace}checkbox.checked:before {
                border-color: ${basic.chkradio.style.def.bordercolor_before.checked};
                background: ${basic.chkradio.style.def.bgcolor_before.checked};
            }
            .${namespace}checkbox.checked:after {
                color: ${basic.chkradio.style.def.color_after.checked};
                display: block \\9;          /* ie hack */
                ${Prefix.opacity(state, 1)}
            }
            .${namespace}checkbox.disabled .${namespace}checkbox-text,
            .${namespace}checkbox[disabled] .${namespace}checkbox-text {
                color: ${basic.chkradio.color.disabled};
            }
            .${namespace}checkbox.disabled:before,
            .${namespace}checkbox[disabled]:before,
            .${namespace}checkbox.disabled:hover:before,
            .${namespace}checkbox[disabled]:hover:before {
                border-color: ${basic.chkradio.style.def.bordercolor_before.disabled};
                background: ${basic.chkradio.style.def.bgcolor_before.disabled};
            }
            .${namespace}checkbox.disabled:after,
            .${namespace}checkbox[disabled]:after,
            .${namespace}checkbox.disabled:hover:after,
            .${namespace}checkbox[disabled]:hover:after {
                display: none \\9;           /* ie hack */
                ${Prefix.opacity(state, 0)}
            }

            .${namespace}radio .${namespace}radio-text {
                color: ${basic.chkradio.color.def};
            }
            .${namespace}radio:before {
                left: 3px;
                width: 17px;
                height: 17px;
                border: ${basic.chkradio.borderwidth_before}px solid ${basic.chkradio.style.def.bordercolor_before.def};
                background: ${basic.chkradio.style.def.bgcolor_before.def};
                ${Prefix.border_radius(state, basic.chkradio.radius_before.radio +'em')}
            }
            .${namespace}radio:after {
                top: 11px;
                left: 9px;
                width: 5px;
                height: 5px;
                background: ${basic.chkradio.style.def.bgcolor_after.def};
                display: none \\9;             /* ie hack */
                ${Prefix.opacity(state, 0)}
                ${Prefix.border_radius(state, basic.chkradio.radius_before.radio +'em')}
            }
            .${namespace}radio:hover .${namespace}radio-text,
            .${namespace}radio.hover .${namespace}radio-text {
                color: ${basic.chkradio.color.hover};
            }
            .${namespace}radio:hover:before,
            .${namespace}radio.hover:before {
                border-color: ${basic.chkradio.style.def.bordercolor_before.hover};
                background: ${basic.chkradio.style.def.bgcolor_before.hover};
            }
            .${namespace}radio:hover:after,
            .${namespace}radio.hover:after {
                background: ${basic.chkradio.style.def.bgcolor_after.hover};
                display: block \\9;              /* ie hack */
                ${Prefix.opacity(state, 1)}
            }
            .${namespace}radio.checked .${namespace}radio-text {
                color: ${basic.chkradio.color.checked};
            }
            .${namespace}radio.checked:before {
                border-color: ${basic.chkradio.style.def.bordercolor_before.checked};
                background: ${basic.chkradio.style.def.bgcolor_before.checked};
            }
            .${namespace}radio.checked:after {
                background: ${basic.chkradio.style.def.bgcolor_after.checked};
                display: block \\9;              /* ie hack */
                ${Prefix.opacity(state, 1)}
            }
            .${namespace}radio.disabled .${namespace}radio-text,
            .${namespace}radio[disabled] .${namespace}radio-text {
                color: ${basic.chkradio.color.disabled};
            }
            .${namespace}radio.disabled:before,
            .${namespace}radio[disabled]:before,
            .${namespace}radio.disabled:hover:before,
            .${namespace}radio[disabled]:hover:before {
                border-color: ${basic.chkradio.style.def.bordercolor_before.disabled};
                background: ${basic.chkradio.style.def.bgcolor_before.disabled};
            }
            .${namespace}radio.disabled:after,
            .${namespace}radio[disabled]:after,
            .${namespace}radio.disabled:hover:after,
            .${namespace}radio[disabled]:hover:after {
                background: ${basic.chkradio.style.def.bgcolor_after.disabled};
                display: none \\9;               /* ie hack */
                ${Prefix.opacity(state, 0)}
            }
            .${namespace}checkbox-theme:before,
            .${namespace}radio-theme:before {
                border-color: ${basic.chkradio.style.theme.bordercolor_before.def};
                background: ${basic.chkradio.style.theme.bgcolor_before.def};
            }
            .${namespace}checkbox-theme:hover:before,
            .${namespace}radio-theme:hover:before,
            .${namespace}checkbox-theme.hover:before,
            .${namespace}radio-theme.hover:before {
                border-color: ${basic.chkradio.style.theme.bordercolor_before.hover};
                background: ${basic.chkradio.style.theme.bgcolor_before.hover};
            }
            .${namespace}checkbox-theme:hover:after,
            .${namespace}radio-theme:hover:after,
            .${namespace}checkbox-theme.hover:after,
            .${namespace}radio-theme.hover:after {
                color: ${basic.chkradio.style.theme.color_after.hover};
            }
            .${namespace}checkbox-theme.checked:before,
            .${namespace}radio-theme.checked:before {
                border-color: ${basic.chkradio.style.theme.bordercolor_before.checked};
                background: ${basic.chkradio.style.theme.bgcolor_before.checked};
            }
            .${namespace}checkbox-theme.checked:after,
            .${namespace}radio-theme.checked:after {
                color: ${basic.chkradio.style.theme.color_after.checked};
            }
            .${namespace}checkbox-theme.disabled:before,
            .${namespace}radio-theme.disabled:before,
            .${namespace}checkbox-theme[disabled]:before,
            .${namespace}radio-theme[disabled]:before,
            .${namespace}checkbox-theme.disabled:hover:before,
            .${namespace}radio-theme.disabled:hover:before,
            .${namespace}checkbox-theme[disabled]:hover:before,
            .${namespace}radio-theme[disabled]:hover:before {
                border-color: ${basic.chkradio.style.theme.bordercolor_before.disabled};
                background: ${basic.chkradio.style.theme.bgcolor_before.disabled};
            }
            .${namespace}radio-theme:hover:after,
            .${namespace}radio-theme.hover:after {
                background: ${basic.chkradio.style.theme.bgcolor_after.hover};
            }
            .${namespace}radio-theme.checked:after {
                background: ${basic.chkradio.style.theme.bgcolor_after.checked};
            }
            .${namespace}checkbox-key:before,
            .${namespace}radio-key:before {
                border-color: ${basic.chkradio.style.key.bordercolor_before.def};
                background: ${basic.chkradio.style.key.bgcolor_before.def};
            }
            .${namespace}checkbox-key:hover:before,
            .${namespace}radio-key:hover:before,
            .${namespace}checkbox-key.hover:before,
            .${namespace}radio-key.hover:before {
                border-color: ${basic.chkradio.style.key.bordercolor_before.hover};
                background: ${basic.chkradio.style.key.bgcolor_before.hover};
            }
            .${namespace}checkbox-key:hover:after,
            .${namespace}radio-key:hover:after,
            .${namespace}checkbox-key.hover:after,
            .${namespace}radio-key.hover:after {
                color: ${basic.chkradio.style.key.color_after.hover};
            }
            .${namespace}checkbox-key.checked:before,
            .${namespace}radio-key.checked:before {
                border-color: ${basic.chkradio.style.key.bordercolor_before.checked};
                background: ${basic.chkradio.style.key.bgcolor_before.checked};
            }
            .${namespace}checkbox-key.checked:after,
            .${namespace}radio-key.checked:after {
                color: ${basic.chkradio.style.key.color_after.checked};
            }
            .${namespace}checkbox-key.disabled:before,
            .${namespace}radio-key.disabled:before,
            .${namespace}checkbox-key[disabled]:before,
            .${namespace}radio-key[disabled]:before,
            .${namespace}checkbox-key.disabled:hover:before,
            .${namespace}radio-key.disabled:hover:before,
            .${namespace}checkbox-key[disabled]:hover:before,
            .${namespace}radio-key[disabled]:hover:before {
                border-color: ${basic.chkradio.style.key.bordercolor_before.disabled};
                background: ${basic.chkradio.style.key.bgcolor_before.disabled};
            }
            .${namespace}radio-key:hover:after,
            .${namespace}radio-key.hover:after {
                background: ${basic.chkradio.style.key.bgcolor_after.hover};
            }
            .${namespace}radio-key.checked:after {
                background: ${basic.chkradio.style.key.bgcolor_after.checked};
            }
            .${namespace}checkbox-light:before,
            .${namespace}radio-light:before {
                border-color: ${basic.chkradio.style.light.bordercolor_before.def};
                background: ${basic.chkradio.style.light.bgcolor_before.def};
            }
            .${namespace}checkbox-light:hover:before,
            .${namespace}radio-light:hover:before,
            .${namespace}checkbox-light.hover:before,
            .${namespace}radio-light.hover:before {
                border-color: ${basic.chkradio.style.light.bordercolor_before.hover};
                background: ${basic.chkradio.style.light.bgcolor_before.hover};
            }
            .${namespace}checkbox-light:hover:after,
            .${namespace}radio-light:hover:after,
            .${namespace}checkbox-light.hover:after,
            .${namespace}radio-light.hover:after {
                color: ${basic.chkradio.style.light.color_after.hover};
            }
            .${namespace}checkbox-light.checked:before,
            .${namespace}radio-light.checked:before {
                border-color: ${basic.chkradio.style.light.bordercolor_before.checked};
                background: ${basic.chkradio.style.light.bgcolor_before.checked};
            }
            .${namespace}checkbox-light.checked:after,
            .${namespace}radio-light.checked:after {
                color: ${basic.chkradio.style.light.color_after.checked};
            }
            .${namespace}checkbox-light.disabled:before,
            .${namespace}radio-light.disabled:before,
            .${namespace}checkbox-light[disabled]:before,
            .${namespace}radio-light[disabled]:before,
            .${namespace}checkbox-light.disabled:hover:before,
            .${namespace}radio-light.disabled:hover:before,
            .${namespace}checkbox-light[disabled]:hover:before,
            .${namespace}radio-light[disabled]:hover:before {
                border-color: ${basic.chkradio.style.light.bordercolor_before.disabled};
                background: ${basic.chkradio.style.light.bgcolor_before.disabled};
            }
            .${namespace}radio-light:hover:after,
            .${namespace}radio-light.hover:after {
                background: ${basic.chkradio.style.light.bgcolor_after.hover};
            }
            .${namespace}radio-light.checked:after {
                background: ${basic.chkradio.style.light.bgcolor_after.checked};
            }
            .${namespace}checkbox-nice:before,
            .${namespace}radio-nice:before {
                border-color: ${basic.chkradio.style.nice.bordercolor_before.def};
                background: ${basic.chkradio.style.nice.bgcolor_before.def};
            }
            .${namespace}checkbox-nice:hover:before,
            .${namespace}radio-nice:hover:before,
            .${namespace}checkbox-nice.hover:before,
            .${namespace}radio-nice.hover:before {
                border-color: ${basic.chkradio.style.nice.bordercolor_before.hover};
                background: ${basic.chkradio.style.nice.bgcolor_before.hover};
            }
            .${namespace}checkbox-nice:hover:after,
            .${namespace}radio-nice:hover:after,
            .${namespace}checkbox-nice.hover:after,
            .${namespace}radio-nice.hover:after {
                color: ${basic.chkradio.style.nice.color_after.hover};
            }
            .${namespace}checkbox-nice.checked:before,
            .${namespace}radio-nice.checked:before {
                border-color: ${basic.chkradio.style.nice.bordercolor_before.checked};
                background: ${basic.chkradio.style.nice.bgcolor_before.checked};
            }
            .${namespace}checkbox-nice.checked:after,
            .${namespace}radio-nice.checked:after {
                color: ${basic.chkradio.style.nice.color_after.checked};
            }
            .${namespace}checkbox-nice.disabled:before,
            .${namespace}radio-nice.disabled:before,
            .${namespace}checkbox-nice[disabled]:before,
            .${namespace}radio-nice[disabled]:before,
            .${namespace}checkbox-nice.disabled:hover:before,
            .${namespace}radio-nice.disabled:hover:before,
            .${namespace}checkbox-nice[disabled]:hover:before,
            .${namespace}radio-nice[disabled]:hover:before {
                border-color: ${basic.chkradio.style.nice.bordercolor_before.disabled};
                background: ${basic.chkradio.style.nice.bgcolor_before.disabled};
            }
            .${namespace}radio-nice:hover:after,
            .${namespace}radio-nice.hover:after {
                background: ${basic.chkradio.style.nice.bgcolor_after.hover};
            }
            .${namespace}radio-nice.checked:after {
                background: ${basic.chkradio.style.nice.bgcolor_after.checked};
            }
            .${namespace}checkbox.checkbox-full,
            .${namespace}radio.radio-full {
                display: block;
                width: 100%;
            }
        `;
    }
};


