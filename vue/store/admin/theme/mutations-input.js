import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

//设置输入框尺寸
function input_size(state, height, lineheight, fontsize, fontweight, radius) {
    return `
        height: ${height}px;
        line-height: ${lineheight};
        font-size: ${fontsize}px;
        font-weight: ${fontweight};
        .prefix-border-radius(${radius});
    `;
}
//设置输入框风格
function input_style(state, color, bgcolor, bordercolor, borderstyle, shadow) {
    return `
        color: ${color};
        background-color: ${bgcolor};
        border-style: ${borderstyle};
        border-color: ${bordercolor};
        ${Prefix.box_shadow(state, shadow)}
    `;
}
//设置输入框边框
function input_border(state, borderwidth, padding) {
    let p = {
        top:        padding.top - borderwidth.top,
        bottom:     padding.bottom - borderwidth.bottom,
        left:       padding.left - borderwidth.left,
        right:      padding.right - borderwidth.right
    };
    return `
        border-width: ${borderwidth.top}px ${borderwidth.right}px ${borderwidth.bottom}px ${borderwidth.left}px;
        padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px;
    `;
}


export default {
    [MT.CSS_INPUT]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  input

            ====================================================*/
            .${namespace}input,
            .${namespace}textarea {
                width: ${basic.input.width.def}px;
                ${input_style(
                    state,
                    basic.input.style.def.color.def,
                    basic.input.style.def.bgcolor.def,
                    basic.input.style.def.bordercolor.def,
                    basic.input.borderstyle.def,
                    basic.input.style.def.shadow.def
                )}
                ${Prefix.transition(state, 'border-color linear .15s')}
            }
            .${namespace}input:focus,
            .${namespace}textarea:focus,
            .${namespace}input.active,
            .${namespace}textarea.active {
                ${input_style(
                    state,
                    basic.input.style.def.color.focus,
                    basic.input.style.def.bgcolor.focus,
                    basic.input.style.def.bordercolor.focus,
                    basic.input.borderstyle.focus,
                    basic.input.style.def.shadow.focus
                )}
                ${Prefix.outline(state)}
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
                ${input_style(
                    state,
                    basic.input.style.def.color.disabled,
                    basic.input.style.def.bgcolor.disabled,
                    basic.input.style.def.bordercolor.disabled,
                    basic.input.borderstyle.disabled,
                    basic.input.style.def.shadow.disabled
                )}
                ${Prefix.user_select(state)}
            }
            .${namespace}input.disabled,
            .${namespace}textarea.disabled,
            .${namespace}input[disabled],
            .${namespace}textarea[disabled] {
                cursor: ${basic.cursor.no};
            }
            .${namespace}input {
                vertical-align: middle;
                ${input_size(
                    state,
                    basic.input.height.def,
                    basic.input.lineheight,
                    basic.input.fontsize.def,
                    basic.fontweight.def,
                    basic.input.radius.def
                )}
                ${input_border(
                    state,
                    basic.input.borderwidth.def,
                    basic.input.padding
                )}
                ${Comm.text_overflow(state)}
            }
            .${namespace}input:focus,
            .${namespace}input.active {
                ${input_border(
                    state,
                    basic.input.borderwidth.focus,
                    basic.input.padding
                )}
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
                ${input_border(
                    state,
                    basic.input.borderwidth.def,
                    basic.input.padding
                )}
            }
            .${namespace}textarea {
                resize: none;
                ${input_size(
                    state,
                    basic.input.height.textarea,
                    basic.input.lineheight,
                    basic.input.fontsize.def,
                    basic.fontweight.def,
                    basic.input.radius.textarea
                )}
                ${input_border(
                    state,
                    basic.input.borderwidth.textarea,
                    basic.input.padding
                )}
            }
            .${namespace}textarea:focus,
            .${namespace}textarea.active {
                ${input_border(
                    state,
                    basic.input.borderwidth.textarea_focus,
                    basic.input.padding
                )}
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
                ${input_border(
                    state,
                    basic.input.borderwidth.textarea,
                    basic.input.padding
                )}
            }
            .${namespace}input-full,
            .${namespace}textarea-full {
                width: 100%;
            }
            .${namespace}input-small {
                ${input_size(
                    state,
                    basic.input.height.small,
                    basic.input.lineheight,
                    basic.input.fontsize.small,
                    basic.fontweight.def,
                    basic.input.radius.def
                )}
            }
            .${namespace}input-large {
                ${input_size(
                    state,
                    basic.input.height.large,
                    basic.input.lineheight,
                    basic.input.fontsize.large,
                    basic.fontweight.def,
                    basic.input.radius.def
                )}
            }
            .${namespace}input-theme,
            .${namespace}textarea-theme {
                ${input_style(
                    state,
                    basic.input.style.theme.color.def,
                    basic.input.style.theme.bgcolor.def,
                    basic.input.style.theme.bordercolor.def,
                    basic.input.borderstyle.def,
                    basic.input.style.theme.shadow.def
                )}
            }
            .${namespace}input-theme:focus,
            .${namespace}textarea-theme:focus,
            .${namespace}input-theme.active,
            .${namespace}textarea-theme.active {
                ${input_style(
                    state,
                    basic.input.style.theme.color.focus,
                    basic.input.style.theme.bgcolor.focus,
                    basic.input.style.theme.bordercolor.focus,
                    basic.input.borderstyle.focus,
                    basic.input.style.theme.shadow.focus
                )}
            }
            .${namespace}input-key,
            .${namespace}textarea-key {
                ${input_style(
                    state,
                    basic.input.style.key.color.def,
                    basic.input.style.key.bgcolor.def,
                    basic.input.style.key.bordercolor.def,
                    basic.input.borderstyle.def,
                    basic.input.style.key.shadow.def
                )}
            }
            .${namespace}input-key:focus,
            .${namespace}textarea-key:focus,
            .${namespace}input-key.active,
            .${namespace}textarea-key.active {
                ${input_style(
                    state,
                    basic.input.style.key.color.focus,
                    basic.input.style.key.bgcolor.focus,
                    basic.input.style.key.bordercolor.focus,
                    basic.input.borderstyle.focus,
                    basic.input.style.key.shadow.focus
                )}
            }
            .${namespace}input-light,
            .${namespace}textarea-light {
                ${input_style(
                    state,
                    basic.input.style.light.color.def,
                    basic.input.style.light.bgcolor.def,
                    basic.input.style.light.bordercolor.def,
                    basic.input.borderstyle.def,
                    basic.input.style.light.shadow.def
                )}
            }
            .${namespace}input-light:focus,
            .${namespace}textarea-light:focus,
            .${namespace}input-light.active,
            .${namespace}textarea-light.active {
                ${input_style(
                    state,
                    basic.input.style.light.color.focus,
                    basic.input.style.light.bgcolor.focus,
                    basic.input.style.light.bordercolor.focus,
                    basic.input.borderstyle.focus,
                    basic.input.style.light.shadow.focus
                )}
            }
            .${namespace}input-nice,
            .${namespace}textarea-nice {
                ${input_style(
                    state,
                    basic.input.style.nice.color.def,
                    basic.input.style.nice.bgcolor.def,
                    basic.input.style.nice.bordercolor.def,
                    basic.input.borderstyle.def,
                    basic.input.style.nice.shadow.def
                )}
            }
            .${namespace}input-nice:focus,
            .${namespace}textarea-nice:focus,
            .${namespace}input-nice.active,
            .${namespace}textarea-nice.active {
                ${input_style(
                    state,
                    basic.input.style.nice.color.focus,
                    basic.input.style.nice.bgcolor.focus,
                    basic.input.style.nice.bordercolor.focus,
                    basic.input.borderstyle.focus,
                    basic.input.style.nice.shadow.focus
                )}
            }
        `;
    },
    [MT.CSS_INPUTGROUP]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  inputgroup

            ====================================================*/
            .${namespace}inputgroup {
                display: inline-table;
                border-collapse: separate;
                position: relative;
                width: 220px;
            }
            .${namespace}inputgroup .${namespace}input {
                display: table-cell;
                position: relative;
                z-index: ${basic.input.group.zindex.def};
                width: 100%;
                margin-left: ${-basic.input.borderwidth.group.left}px;
                ${input_border(
                    state,
                    basic.input.borderwidth.group,
                    basic.input.padding
                )}
                ${Prefix.border_radius(state, '0 '+ basic.input.radius.group +'em '+ basic.input.radius.group +'em 0')}
            }
            .${namespace}inputgroup .${namespace}input:first-child {
                margin-left: 0;
                ${Prefix.border_radius(state, basic.input.radius.group +'em 0 0 '+ basic.input.radius.group +'em')}
            }
            .${namespace}inputgroup .${namespace}input:focus,
            .${namespace}inputgroup .${namespace}input.active {
                z-index: ${basic.input.group.zindex.focus};
                ${input_border(
                    state,
                    basic.input.borderwidth.group_focus,
                    basic.input.padding
                )}
            }
            .${namespace}inputgroup .${namespace}input-theme:focus,
            .${namespace}inputgroup .${namespace}input-theme.active {
                border-color: ${basic.input.style.theme.bordercolor.focus};
            }
            .${namespace}inputgroup .${namespace}input-key:focus,
            .${namespace}inputgroup .${namespace}input-key.active {
              border-color: ${basic.input.style.key.bordercolor.focus};
            }
            .${namespace}inputgroup .${namespace}input-light:focus,
            .${namespace}inputgroup .${namespace}input-light.active {
              border-color: ${basic.input.style.light.bordercolor.focus};
            }
            .${namespace}inputgroup .${namespace}input-nice:focus,
            .${namespace}inputgroup .${namespace}input-nice.active {
              border-color: ${basic.input.style.nice.bordercolor.focus};
            }
            .${namespace}inputgroup .addons {
                display: table-cell;
                vertical-align: middle;
                position: relative;
                z-index: ${basic.input.group.zindex.addons};
                width: 1%;
                ${Comm.inlineblock_clearspace(state)}
            }
            .${namespace}inputgroup .addons .text,
            .${namespace}inputgroup .addons .btn {
                ${Prefix.border_radius(state, 0)}
            }
            .${namespace}inputgroup .addons .text:last-child,
            .${namespace}inputgroup .addons .btn:last-child {
                ${Prefix.border_radius(state, '0 '+ basic.input.radius.group +'em '+ basic.input.radius.group +'em 0')}
            }
            .${namespace}inputgroup .addons .text {
                display: inline-block;
                margin-left: ${-basic.input.borderwidth.group.left}px;
                padding: 4px 8px;
                height: ${basic.input.height.def}px;
                line-height: ${basic.input.height.def-4*2}px;
                font-size: ${basic.input.fontsize.def}px;
                color: #aaaaaa;
                background-color: #f7f7f7;
                border: 1px solid #dddddd;
            }
            .${namespace}inputgroup .addons .text-small {
                height: ${basic.input.height.small}px;
                line-height: ${basic.input.height.small-4*2}px;
                font-size: ${basic.input.fontsize.small}px;
            }
            .${namespace}inputgroup .addons .text-large {
                height: ${basic.input.height.large}px;
                line-height: ${basic.input.height.large-4*2}px;
                font-size: ${basic.input.fontsize.large}px;
            }
            .${namespace}inputgroup .addons .btn {
                position: relative;
                margin-left: ${-basic.input.borderwidth.group.left}px;
            }
            .${namespace}inputgroup .addons:first-child .text:last-child,
            .${namespace}inputgroup .addons:first-child .btn:last-child {
                ${Prefix.border_radius(state, 0)}
            }
            .${namespace}inputgroup .addons:first-child .text:first-child,
            .${namespace}inputgroup .addons:first-child .btn:first-child {
                margin-left: 0;
                ${Prefix.border_radius(state, basic.input.radius.group +'em 0 0 '+ basic.input.radius.group +'em')}
            }
            .${namespace}inputgroup .addons:first-child .text:first-child {
                padding-left: 15px;
            }
            .${namespace}inputgroup .addons:last-child .text:last-child {
                padding-right: 15px;
            }
            .${namespace}inputgroup-full {
                width: 100%;
            }
        `;
    }
};


