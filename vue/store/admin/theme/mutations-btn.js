import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

function buttonsize( state, padding, fontsize, height, lineheight, radius, fontweight ){
    fontweight = fontweight || state.data.basic.fontweight.def;
    return `
        padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
        height: ${height}px;
        line-height: ${lineheight}px;
        font-size: ${fontsize}px;
        font-weight: ${fontweight};
        ${Prefix.border_radius(state, radius+'em')}
    `;
}

export default {
    [MT.CSS_BTN]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
            /*====================================================

                 btn

            ====================================================*/
            .${namespace}btn,
            .${namespace}btn-def {
                display: inline-block;
                position: relative;
                z-index: ${basic.btn.zindex.def};
                margin-bottom: 0;                       /*For input.btn*/
                text-align: center;
                vertical-align: middle;
                color: ${basic.btn.style.def.color.def};
                background-image: none;                 /*Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214*/
                border: 1px solid ${basic.btn.style.def.bordercolor.def};
                background-color: ${basic.btn.style.def.bgcolor.def};
                cursor: ${basic.cursor.pointer};
                white-space: nowrap;
                touch-action: manipulation;             /*支持手势操作*/

                ${buttonsize(
                    state,
                    basic.btn.padding.def,
                    basic.btn.fontsize.def,
                    basic.btn.height.def,
                    basic.btn.lineheight.def,
                    basic.btn.radius
                )}
                ${Prefix.user_select(state)}
                ${Prefix.transition(state)}
            }
            .${namespace}btn:focus,
            .${namespace}btn-def:focus,
            .${namespace}btn:active:focus,
            .${namespace}btn-def:active:focus,
            .${namespace}btn.active:focus,
            .${namespace}btn-def.active:focus,
            .${namespace}btn.loading:focus,
            .${namespace}btn-def.loading:focus,
            .${namespace}btn.focus,
            .${namespace}btn-def.focus,
            .${namespace}btn:active.focus,
            .${namespace}btn-def:active.focus,
            .${namespace}btn.active.focus,
            .${namespace}btn-def.active.focus,
            .${namespace}btn.loading.focus,
            .${namespace}btn-def.loading.focus {
                border-color: ${basic.btn.style.def.bordercolor.focus};
                z-index: ${basic.btn.zindex.active};

                ${Prefix.outline()}
            }
            .${namespace}btn:hover,
            .${namespace}btn-def:hover,
            .${namespace}btn.hover,
            .${namespace}btn-def.hover {
                color: ${basic.btn.style.def.color.hover};
                border-color: ${basic.btn.style.def.bordercolor.hover};
                background-color: ${basic.btn.style.def.bgcolor.hover};
                text-decoration: none;
                z-index: ${basic.btn.zindex.active};
                ${Prefix.box_shadow(state, basic.btn.style.def.shadow.hover)}
            }
            .${namespace}btn:focus,
            .${namespace}btn-def:focus,
            .${namespace}btn.focus,
            .${namespace}btn-def.focus {
                color: ${basic.btn.style.def.color.focus};
                border-color: ${basic.btn.style.def.bordercolor.focus};
                background-color: ${basic.btn.style.def.bgcolor.focus};
                text-decoration: none;
                z-index: ${basic.btn.zindex.active};
            }
            .${namespace}btn:active,
            .${namespace}btn-def:active,
            .${namespace}btn.active,
            .${namespace}btn-def.active,
            .${namespace}btn.loading,
            .${namespace}btn-def.loading {
                color: ${basic.btn.style.def.color.active};
                border-color: ${basic.btn.style.def.bordercolor.active};
                background-color: ${basic.btn.style.def.bgcolor.active};
                z-index: ${basic.btn.zindex.active};
                ${Prefix.box_shadow(state, basic.btn.style.def.shadow.active)}
            }
            .${namespace}btn:active,
            .${namespace}btn-def:active {
                background-image: none;
            }
            .${namespace}btn.active,
            .${namespace}btn-def.active {
                cursor: default;
            }
            .${namespace}btn.loading,
            .${namespace}btn-def.loading {
                cursor: wait;
            }
            .${namespace}btn.border,
            .${namespace}btn-def.border {
                border-color: ${basic.btn.style.def.bordercolor.active};
            }
            .${namespace}btn.disabled,
            .${namespace}btn-def.disabled,
            .${namespace}btn[disabled],
            .${namespace}btn-def[disabled],
            fieldset[disabled] .${namespace}btn,
            fieldset[disabled] .${namespace}btn-def,
            .${namespace}btn.disabled:hover,
            .${namespace}btn-def.disabled:hover,
            .${namespace}btn[disabled]:hover,
            .${namespace}btn-def[disabled]:hover,
            fieldset[disabled] .${namespace}btn:hover,
            fieldset[disabled] .${namespace}btn-def:hover,
            .${namespace}btn.disabled:focus,
            .${namespace}btn-def.disabled:focus,
            .${namespace}btn[disabled]:focus,
            .${namespace}btn-def[disabled]:focus,
            fieldset[disabled] .${namespace}btn:focus,
            fieldset[disabled] .${namespace}btn-def:focus,
            .${namespace}btn.disabled.focus,
            .${namespace}btn-def.disabled.focus,
            .${namespace}btn[disabled].focus,
            .${namespace}btn-def[disabled].focus,
            fieldset[disabled] .${namespace}btn.focus,
            fieldset[disabled] .${namespace}btn-def.focus,
            .${namespace}btn.disabled:active,
            .${namespace}btn-def.disabled:active,
            .${namespace}btn[disabled]:active,
            .${namespace}btn-def[disabled]:active,
            fieldset[disabled] .${namespace}btn:active,
            fieldset[disabled] .${namespace}btn-def:active,
            .${namespace}btn.disabled.active,
            .${namespace}btn-def.disabled.active,
            .${namespace}btn[disabled].active,
            .${namespace}btn-def[disabled].active,
            fieldset[disabled] .${namespace}btn.active,
            fieldset[disabled] .${namespace}btn-def.active {
                color: ${basic.btn.style.def.color.disabled};
                border-color: ${basic.btn.style.def.bordercolor.disabled};
                background-color: ${basic.btn.style.def.bgcolor.disabled};
                cursor: not-allowed;

                ${Prefix.opacity(state, 0.55)}
                ${Prefix.box_shadow(state, basic.btn.style.def.shadow.disabled)}
            }
            a.${namespace}btn,
            a.${namespace}btn-def {
                text-decoration: none;
            }
            a.${namespace}btn.disabled,
            a.${namespace}btn-def.disabled,
            fieldset[disabled] a.${namespace}btn,
            fieldset[disabled] a.${namespace}btn-def {
                pointer-events: none;
            }
            .${namespace}btn-small {
                ${buttonsize(
                    state,
                    basic.btn.padding.small,
                    basic.btn.fontsize.small,
                    basic.btn.height.small,
                    basic.btn.lineheight.small,
                    basic.btn.radius
                )}
            }
            .${namespace}btn-large {
                ${buttonsize(
                    state,
                    basic.btn.padding.large,
                    basic.btn.fontsize.large,
                    basic.btn.height.large,
                    basic.btn.lineheight.large,
                    basic.btn.radius
                )}
            }
            .${namespace}btn-full {
                display: block;
                width: 100%;
            }
            .${namespace}btn-inverse {
                color: ${basic.btn.style.inverse.color.def};
                border-color: ${basic.btn.style.inverse.bordercolor.def};
                background-color: ${basic.btn.style.inverse.bgcolor.def};
            }
            .${namespace}btn-inverse.border {
                border-color: ${basic.btn.style.inverse.bordercolor.active};
            }
            .${namespace}btn-inverse:focus,
            .${namespace}btn-inverse.focus {
                color: ${basic.btn.style.inverse.color.focus};
                border-color: ${basic.btn.style.inverse.bordercolor.focus};
                background-color: ${basic.btn.style.inverse.bgcolor.focus};
            }
            .${namespace}btn-inverse:hover,
            .${namespace}btn-inverse.hover {
                color: ${basic.btn.style.inverse.color.hover};
                border-color: ${basic.btn.style.inverse.bordercolor.hover};
                background-color: ${basic.btn.style.inverse.bgcolor.hover};

                ${Prefix.box_shadow(state, basic.btn.style.inverse.shadow.hover)}
            }
            .${namespace}btn-inverse:active,
            .${namespace}btn-inverse.active,
            .${namespace}btn-inverse.loading,
            .open > .dropdown-toggle.${namespace}btn-inverse {
                color: ${basic.btn.style.inverse.color.active};
                border-color: ${basic.btn.style.inverse.bordercolor.active};
                background-color: ${basic.btn.style.inverse.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.inverse.shadow.active)}
            }
            .${namespace}btn-inverse:active:hover,
            .${namespace}btn-inverse.active:hover,
            .${namespace}btn-inverse.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-inverse:hover,
            .${namespace}btn-inverse:active:focus,
            .${namespace}btn-inverse.active:focus,
            .${namespace}btn-inverse.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-inverse:focus,
            .${namespace}btn-inverse:active.focus,
            .${namespace}btn-inverse.active.focus,
            .${namespace}btn-inverse.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-inverse.focus {
                color: ${basic.btn.style.inverse.color.focus};
                border-color: ${basic.btn.style.inverse.bordercolor.focus};
                background-color: ${basic.btn.style.inverse.bgcolor.focus};
            }
            .${namespace}btn-inverse.disabled,
            .${namespace}btn-inverse[disabled],
            fieldset[disabled] .${namespace}btn-inverse,
            .${namespace}btn-inverse.disabled:hover,
            .${namespace}btn-inverse[disabled]:hover,
            fieldset[disabled] .${namespace}btn-inverse:hover,
            .${namespace}btn-inverse.disabled:focus,
            .${namespace}btn-inverse[disabled]:focus,
            fieldset[disabled] .${namespace}btn-inverse:focus,
            .${namespace}btn-inverse.disabled.focus,
            .${namespace}btn-inverse[disabled].focus,
            fieldset[disabled] .${namespace}btn-inverse.focus,
            .${namespace}btn-inverse.disabled:active,
            .${namespace}btn-inverse[disabled]:active,
            fieldset[disabled] .${namespace}btn-inverse:active,
            .${namespace}btn-inverse.disabled.active,
            .${namespace}btn-inverse[disabled].active,
            fieldset[disabled] .${namespace}btn-inverse.active {
                color: ${basic.btn.style.inverse.color.disabled};
                border-color: ${basic.btn.style.inverse.bordercolor.disabled};
                background-color: ${basic.btn.style.inverse.bgcolor.disabled};
            }
            .${namespace}btn-inverse .badge {
                color: ${basic.colors.white.ladder.normal.hex};
                background-color: ${basic.colors.black.ladder.normal.hex};
            }
            .${namespace}btn-theme {
                color: ${basic.btn.style.theme.color.def};
                border-color: ${basic.btn.style.theme.bordercolor.def};
                background-color: ${basic.btn.style.theme.bgcolor.def};
            }
            .${namespace}btn-theme.border {
                border-color: ${basic.btn.style.theme.bordercolor.active};
            }
            .${namespace}btn-theme:focus,
            .${namespace}btn-theme.focus {
                color: ${basic.btn.style.theme.color.focus};
                border-color: ${basic.btn.style.theme.bordercolor.focus};
                background-color: ${basic.btn.style.theme.bgcolor.focus};
            }
            .${namespace}btn-theme:hover,
            .${namespace}btn-theme.hover {
                color: ${basic.btn.style.theme.color.hover};
                border-color: ${basic.btn.style.theme.bordercolor.hover};
                background-color: ${basic.btn.style.theme.bgcolor.hover};

                ${Prefix.box_shadow(state, basic.btn.style.theme.shadow.hover)}
            }
            .${namespace}btn-theme:active,
            .${namespace}btn-theme.active,
            .${namespace}btn-theme.loading,
            .open > .dropdown-toggle.${namespace}btn-theme {
                color: ${basic.btn.style.theme.color.active};
                border-color: ${basic.btn.style.theme.bordercolor.active};
                background-color: ${basic.btn.style.theme.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.theme.shadow.active)}
            }
            .${namespace}btn-theme:active:hover,
            .${namespace}btn-theme.active:hover,
            .${namespace}btn-theme.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-theme:hover,
            .${namespace}btn-theme:active:focus,
            .${namespace}btn-theme.active:focus,
            .${namespace}btn-theme.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-theme:focus,
            .${namespace}btn-theme:active.focus,
            .${namespace}btn-theme.active.focus,
            .${namespace}btn-theme.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-theme.focus {
                color: ${basic.btn.style.theme.color.focus};
                border-color: ${basic.btn.style.theme.bordercolor.focus};
                background-color: ${basic.btn.style.theme.bgcolor.focus};
            }
            .${namespace}btn-theme.disabled,
            .${namespace}btn-theme[disabled],
            fieldset[disabled] .${namespace}btn-theme,
            .${namespace}btn-theme.disabled:hover,
            .${namespace}btn-theme[disabled]:hover,
            fieldset[disabled] .${namespace}btn-theme:hover,
            .${namespace}btn-theme.disabled:focus,
            .${namespace}btn-theme[disabled]:focus,
            fieldset[disabled] .${namespace}btn-theme:focus,
            .${namespace}btn-theme.disabled.focus,
            .${namespace}btn-theme[disabled].focus,
            fieldset[disabled] .${namespace}btn-theme.focus,
            .${namespace}btn-theme.disabled:active,
            .${namespace}btn-theme[disabled]:active,
            fieldset[disabled] .${namespace}btn-theme:active,
            .${namespace}btn-theme.disabled.active,
            .${namespace}btn-theme[disabled].active,
            fieldset[disabled] .${namespace}btn-theme.active {
                color: ${basic.btn.style.theme.color.disabled};
                border-color: ${basic.btn.style.theme.bordercolor.disabled};
                background-color: ${basic.btn.style.theme.bgcolor.disabled};
            }
            .${namespace}btn-theme .badge {
                color: ${basic.colors.white.ladder.normal.hex};
                background-color: ${basic.colors.black.ladder.normal.hex};
            }
            .${namespace}btn-key {
                color: ${basic.btn.style.key.color.def};
                border-color: ${basic.btn.style.key.bordercolor.def};
                background-color: ${basic.btn.style.key.bgcolor.def};
            }
            .${namespace}btn-key.border {
                border-color: ${basic.btn.style.key.bordercolor.active};
            }
            .${namespace}btn-key:focus,
            .${namespace}btn-key.focus {
                color: ${basic.btn.style.key.color.focus};
                border-color: ${basic.btn.style.key.bordercolor.focus};
                background-color: ${basic.btn.style.key.bgcolor.focus};
            }
            .${namespace}btn-key:hover,
            .${namespace}btn-key.hover {
                color: ${basic.btn.style.key.color.hover};
                border-color: ${basic.btn.style.key.bordercolor.hover};
                background-color: ${basic.btn.style.key.bgcolor.hover};

                ${Prefix.box_shadow(state, basic.btn.style.key.shadow.hover)}
            }
            .${namespace}btn-key:active,
            .${namespace}btn-key.active,
            .${namespace}btn-key.loading,
            .open > .dropdown-toggle.${namespace}btn-key {
                color: ${basic.btn.style.key.color.active};
                border-color: ${basic.btn.style.key.bordercolor.active};
                background-color: ${basic.btn.style.key.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.key.shadow.active)}
            }
            .${namespace}btn-key:active:hover,
            .${namespace}btn-key.active:hover,
            .${namespace}btn-key.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-key:hover,
            .${namespace}btn-key:active:focus,
            .${namespace}btn-key.active:focus,
            .${namespace}btn-key.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-key:focus,
            .${namespace}btn-key:active.focus,
            .${namespace}btn-key.active.focus,
            .${namespace}btn-key.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-key.focus {
                color: ${basic.btn.style.key.color.focus};
                border-color: ${basic.btn.style.key.bordercolor.focus};
                background-color: ${basic.btn.style.key.bgcolor.focus};
            }
            .${namespace}btn-key:active,
            .${namespace}btn-key.active,
            .${namespace}btn-key.loading,
            .open > .dropdown-toggle.${namespace}btn-key {
                background-image: none;
            }
            .${namespace}btn-key.disabled,
            .${namespace}btn-key[disabled],
            fieldset[disabled] .${namespace}btn-key,
            .${namespace}btn-key.disabled:hover,
            .${namespace}btn-key[disabled]:hover,
            fieldset[disabled] .${namespace}btn-key:hover,
            .${namespace}btn-key.disabled:focus,
            .${namespace}btn-key[disabled]:focus,
            fieldset[disabled] .${namespace}btn-key:focus,
            .${namespace}btn-key.disabled.focus,
            .${namespace}btn-key[disabled].focus,
            fieldset[disabled] .${namespace}btn-key.focus,
            .${namespace}btn-key.disabled:active,
            .${namespace}btn-key[disabled]:active,
            fieldset[disabled] .${namespace}btn-key:active,
            .${namespace}btn-key.disabled.active,
            .${namespace}btn-key[disabled].active,
            fieldset[disabled] .${namespace}btn-key.active {
                color: ${basic.btn.style.key.color.disabled};
                border-color: ${basic.btn.style.key.bordercolor.disabled};
                background-color: ${basic.btn.style.key.bgcolor.disabled};
            }
            .${namespace}btn-key .badge {
                color: ${basic.colors.white.ladder.normal.hex};
                background-color: ${basic.colors.black.ladder.normal.hex};
            }
            .${namespace}btn-light {
                color: ${basic.btn.style.light.color.def};
                border-color: ${basic.btn.style.light.bordercolor.def};
                background-color: ${basic.btn.style.light.bgcolor.def};
            }
            .${namespace}btn-light.border {
                border-color: ${basic.btn.style.light.bordercolor.active};
            }
            .${namespace}btn-light:focus,
            .${namespace}btn-light.focus {
                color: ${basic.btn.style.light.color.focus};
                border-color: ${basic.btn.style.light.bordercolor.focus};
                background-color: ${basic.btn.style.light.bgcolor.focus};
            }
            .${namespace}btn-light:hover,
            .${namespace}btn-light.hover {
                color: ${basic.btn.style.light.color.hover};
                border-color: ${basic.btn.style.light.bordercolor.hover};
                background-color: ${basic.btn.style.light.bgcolor.hover};

                ${Prefix.box_shadow(state, basic.btn.style.light.shadow.hover)}
            }
            .${namespace}btn-light:active,
            .${namespace}btn-light.active,
            .${namespace}btn-light.loading,
            .open > .dropdown-toggle.${namespace}btn-light {
                color: ${basic.btn.style.light.color.active};
                border-color: ${basic.btn.style.light.bordercolor.active};
                background-color: ${basic.btn.style.light.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.light.shadow.active)}
            }
            .${namespace}btn-light:active:hover,
            .${namespace}btn-light.active:hover,
            .${namespace}btn-light.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-light:hover,
            .${namespace}btn-light:active:focus,
            .${namespace}btn-light.active:focus,
            .${namespace}btn-light.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-light:focus,
            .${namespace}btn-light:active.focus,
            .${namespace}btn-light.active.focus,
            .${namespace}btn-light.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-light.focus {
                color: ${basic.btn.style.light.color.focus};
                border-color: ${basic.btn.style.light.bordercolor.focus};
                background-color: ${basic.btn.style.light.bgcolor.focus};
            }
            .${namespace}btn-light:active,
            .${namespace}btn-light.active,
            .${namespace}btn-light.loading,
            .open > .dropdown-toggle.${namespace}btn-light {
                background-image: none;
            }
            .${namespace}btn-light.disabled,
            .${namespace}btn-light[disabled],
            fieldset[disabled] .${namespace}btn-light,
            .${namespace}btn-light.disabled:hover,
            .${namespace}btn-light[disabled]:hover,
            fieldset[disabled] .${namespace}btn-light:hover,
            .${namespace}btn-light.disabled:focus,
            .${namespace}btn-light[disabled]:focus,
            fieldset[disabled] .${namespace}btn-light:focus,
            .${namespace}btn-light.disabled.focus,
            .${namespace}btn-light[disabled].focus,
            fieldset[disabled] .${namespace}btn-light.focus,
            .${namespace}btn-light.disabled:active,
            .${namespace}btn-light[disabled]:active,
            fieldset[disabled] .${namespace}btn-light:active,
            .${namespace}btn-light.disabled.active,
            .${namespace}btn-light[disabled].active,
            fieldset[disabled] .${namespace}btn-light.active {
                color: ${basic.btn.style.light.color.disabled};
                border-color: ${basic.btn.style.light.bordercolor.disabled};
                background-color: ${basic.btn.style.light.bgcolor.disabled};
            }
            .${namespace}btn-light .badge {
                color: ${basic.colors.white.ladder.normal.hex};
                background-color: ${basic.colors.black.ladder.normal.hex};
            }
            .${namespace}btn-nice {
                color: ${basic.btn.style.nice.color.def};
                border-color: ${basic.btn.style.nice.bordercolor.def};
                background-color: ${basic.btn.style.nice.bgcolor.def};
            }
            .${namespace}btn-nice.border {
                border-color: ${basic.btn.style.nice.bordercolor.active};
            }
            .${namespace}btn-nice:focus,
            .${namespace}btn-nice.focus {
                color: ${basic.btn.style.nice.color.focus};
                border-color: ${basic.btn.style.nice.bordercolor.focus};
                background-color: ${basic.btn.style.nice.bgcolor.focus};
            }
            .${namespace}btn-nice:hover,
            .${namespace}btn-nice.hover {
                color: ${basic.btn.style.nice.color.hover};
                border-color: ${basic.btn.style.nice.bordercolor.hover};
                background-color: ${basic.btn.style.nice.bgcolor.hover};

                ${Prefix.box_shadow(state, basic.btn.style.nice.shadow.hover)}
            }
            .${namespace}btn-nice:active,
            .${namespace}btn-nice.active,
            .${namespace}btn-nice.loading,
            .open > .dropdown-toggle.${namespace}btn-nice {
                color: ${basic.btn.style.nice.color.active};
                border-color: ${basic.btn.style.nice.bordercolor.active};
                background-color: ${basic.btn.style.nice.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.nice.shadow.active)}
            }
            .${namespace}btn-nice:active:hover,
            .${namespace}btn-nice.active:hover,
            .${namespace}btn-nice.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-nice:hover,
            .${namespace}btn-nice:active:focus,
            .${namespace}btn-nice.active:focus,
            .${namespace}btn-nice.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-nice:focus,
            .${namespace}btn-nice:active.focus,
            .${namespace}btn-nice.active.focus,
            .${namespace}btn-nice.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-nice.focus {
                color: ${basic.btn.style.nice.color.focus};
                border-color: ${basic.btn.style.nice.bordercolor.focus};
                background-color: ${basic.btn.style.nice.bgcolor.focus};
            }
            .${namespace}btn-nice.disabled,
            .${namespace}btn-nice[disabled],
            fieldset[disabled] .${namespace}btn-nice,
            .${namespace}btn-nice.disabled:hover,
            .${namespace}btn-nice[disabled]:hover,
            fieldset[disabled] .${namespace}btn-nice:hover,
            .${namespace}btn-nice.disabled:focus,
            .${namespace}btn-nice[disabled]:focus,
            fieldset[disabled] .${namespace}btn-nice:focus,
            .${namespace}btn-nice.disabled.focus,
            .${namespace}btn-nice[disabled].focus,
            fieldset[disabled] .${namespace}btn-nice.focus,
            .${namespace}btn-nice.disabled:active,
            .${namespace}btn-nice[disabled]:active,
            fieldset[disabled] .${namespace}btn-nice:active,
            .${namespace}btn-nice.disabled.active,
            .${namespace}btn-nice[disabled].active,
            fieldset[disabled] .${namespace}btn-nice.active {
                color: ${basic.btn.style.nice.color.disabled};
                border-color: ${basic.btn.style.nice.bordercolor.disabled};
                background-color: ${basic.btn.style.nice.bgcolor.disabled};
            }
            .${namespace}btn-nice .badge {
                color: ${basic.colors.white.ladder.normal.hex};
                background-color: ${basic.colors.black.ladder.normal.hex};
            }
            .${namespace}btn-border {
                border-width: ${basic.btn.style.border.borderwidth}px;
                color: ${basic.btn.style.border.color.def};
                border-color: ${basic.btn.style.border.bordercolor.def};
                background-color: ${basic.btn.style.border.bgcolor.def};
            }
            .${namespace}btn-border:focus,
            .${namespace}btn-border.focus {
                color: ${basic.btn.style.border.color.focus};
                border-color: ${basic.btn.style.border.bordercolor.focus};
                background-color: ${basic.btn.style.border.bgcolor.focus};
            }
            .${namespace}btn-border:hover,
            .${namespace}btn-border.hover {
                color: ${basic.btn.style.border.color.hover};
                border-color: ${basic.btn.style.border.bordercolor.hover};
                background-color: ${basic.btn.style.border.bgcolor.hover};

                ${Prefix.box_shadow(state, basic.btn.style.border.shadow.hover)}
            }
            .${namespace}btn-border:active,
            .${namespace}btn-border.active,
            .${namespace}btn-border.loading,
            .open > .dropdown-toggle.${namespace}btn-border {
                color: ${basic.btn.style.border.color.active};
                border-color: ${basic.btn.style.border.bordercolor.active};
                background-color: ${basic.btn.style.border.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.border.shadow.active)}
            }
            .${namespace}btn-border:active:hover,
            .${namespace}btn-border.active:hover,
            .${namespace}btn-border.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-border:hover,
            .${namespace}btn-border:active:focus,
            .${namespace}btn-border.active:focus,
            .${namespace}btn-border.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-border:focus,
            .${namespace}btn-border:active.focus,
            .${namespace}btn-border.active.focus,
            .${namespace}btn-border.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-border.focus {
                color: ${basic.btn.style.border.color.focus};
                border-color: ${basic.btn.style.border.bordercolor.focus};
                background-color: ${basic.btn.style.border.bgcolor.focus};
            }
            .${namespace}btn-border.disabled,
            .${namespace}btn-border[disabled],
            fieldset[disabled] .${namespace}btn-border,
            .${namespace}btn-border.disabled:hover,
            .${namespace}btn-border[disabled]:hover,
            fieldset[disabled] .${namespace}btn-border:hover,
            .${namespace}btn-border.disabled:focus,
            .${namespace}btn-border[disabled]:focus,
            fieldset[disabled] .${namespace}btn-border:focus,
            .${namespace}btn-border.disabled.focus,
            .${namespace}btn-border[disabled].focus,
            fieldset[disabled] .${namespace}btn-border.focus,
            .${namespace}btn-border.disabled:active,
            .${namespace}btn-border[disabled]:active,
            fieldset[disabled] .${namespace}btn-border:active,
            .${namespace}btn-border.disabled.active,
            .${namespace}btn-border[disabled].active,
            fieldset[disabled] .${namespace}btn-border.active {
                color: ${basic.btn.style.border.color.disabled};
                border-color: ${basic.btn.style.border.bordercolor.disabled};
                background-color: ${basic.btn.style.border.bgcolor.disabled};

                ${Prefix.opacity(state, 0.8)}
            }
            .${namespace}btn-border .badge {
                color: ${basic.colors.gray.ladder.lighter.hex};
                background-color: transparent;
            }
            .${namespace}btn-border-inverse {
                border-width: ${basic.btn.style.border.borderwidth}px;
                color: ${basic.btn.style.borderinverse.color.def};
                border-color: ${basic.btn.style.borderinverse.bordercolor.def};
                background-color: ${basic.btn.style.borderinverse.bgcolor.def};
            }
            .${namespace}btn-border-inverse:focus,
            .${namespace}btn-border-inverse.focus {
                color: ${basic.btn.style.borderinverse.color.focus};
                border-color: ${basic.btn.style.borderinverse.bordercolor.focus};
                background-color: ${basic.btn.style.borderinverse.bgcolor.focus};
            }
            .${namespace}btn-border-inverse:hover,
            .${namespace}btn-border-inverse.hover {
                color: ${basic.btn.style.borderinverse.color.hover};
                border-color: ${basic.btn.style.borderinverse.bordercolor.hover};
                background-color: ${basic.btn.style.borderinverse.bgcolor.hover};

                ${Prefix.box_shadow(state, basic.btn.style.borderinverse.shadow.hover)}
            }
            .${namespace}btn-border-inverse:active,
            .${namespace}btn-border-inverse.active,
            .${namespace}btn-border-inverse.loading,
            .open > .dropdown-toggle.${namespace}btn-border-inverse {
                color: ${basic.btn.style.borderinverse.color.active};
                border-color: ${basic.btn.style.borderinverse.bordercolor.active};
                background-color: ${basic.btn.style.borderinverse.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.borderinverse.shadow.active)}
            }
            .${namespace}btn-border-inverse:active:hover,
            .${namespace}btn-border-inverse.active:hover,
            .${namespace}btn-border-inverse.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-border-inverse:hover,
            .${namespace}btn-border-inverse:active:focus,
            .${namespace}btn-border-inverse.active:focus,
            .${namespace}btn-border-inverse.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-border-inverse:focus,
            .${namespace}btn-border-inverse:active.focus,
            .${namespace}btn-border-inverse.active.focus,
            .${namespace}btn-border-inverse.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-border-inverse.focus {
                color: ${basic.btn.style.borderinverse.color.focus};
                border-color: ${basic.btn.style.borderinverse.bordercolor.focus};
                background-color: ${basic.btn.style.borderinverse.bgcolor.focus};
            }
            .${namespace}btn-border-inverse.disabled,
            .${namespace}btn-border-inverse[disabled],
            fieldset[disabled] .${namespace}btn-border-inverse,
            .${namespace}btn-border-inverse.disabled:hover,
            .${namespace}btn-border-inverse[disabled]:hover,
            fieldset[disabled] .${namespace}btn-border-inverse:hover,
            .${namespace}btn-border-inverse.disabled:focus,
            .${namespace}btn-border-inverse[disabled]:focus,
            fieldset[disabled] .${namespace}btn-border-inverse:focus,
            .${namespace}btn-border-inverse.disabled.focus,
            .${namespace}btn-border-inverse[disabled].focus,
            fieldset[disabled] .${namespace}btn-border-inverse.focus,
            .${namespace}btn-border-inverse.disabled:active,
            .${namespace}btn-border-inverse[disabled]:active,
            fieldset[disabled] .${namespace}btn-border-inverse:active,
            .${namespace}btn-border-inverse.disabled.active,
            .${namespace}btn-border-inverse[disabled].active,
            fieldset[disabled] .${namespace}btn-border-inverse.active {
                color: ${basic.btn.style.borderinverse.color.disabled};
                border-color: ${basic.btn.style.borderinverse.bordercolor.disabled};
                background-color: ${basic.btn.style.borderinverse.bgcolor.disabled};
            }
            .${namespace}btn-border-inverse .badge {
                color: ${basic.colors.black.ladder.light.hex};
                background-color: transparent;
            }
            .${namespace}btn-border,
            .${namespace}btn-border-inverse {
                line-height: ${basic.btn.lineheight.def-basic.btn.style.border.borderwidth*2}px;
            }
            .${namespace}btn-border.${namespace}btn-small,
            .${namespace}btn-border-inverse.${namespace}btn-small {
                line-height: ${basic.btn.lineheight.small-basic.btn.style.border.borderwidth*2}px;
            }
            .${namespace}btn-border.${namespace}btn-large,
            .${namespace}btn-border-inverse.${namespace}btn-large {
                line-height: ${basic.btn.lineheight.large-basic.btn.style.border.borderwidth*2}px;
            }
            .${namespace}btn-link {
                color: ${basic.btn.style.link.color.def};
                border-color: ${basic.btn.style.link.bordercolor.def};
                background-color: ${basic.btn.style.link.bgcolor.def};
            }
            .${namespace}btn-link:focus,
            .${namespace}btn-link.focus {
                color: ${basic.btn.style.link.color.focus};
                border-color: ${basic.btn.style.link.bordercolor.focus};
                background-color: ${basic.btn.style.link.bgcolor.focus};
            }
            .${namespace}btn-link:hover,
            .${namespace}btn-link.hover {
                color: ${basic.btn.style.link.color.hover};
                border-color: ${basic.btn.style.link.bordercolor.hover};
                background-color: ${basic.btn.style.link.bgcolor.hover};
                text-decoration: underline;

                ${Prefix.box_shadow(state, basic.btn.style.link.shadow.hover)}
            }
            .${namespace}btn-link:active,
            .${namespace}btn-link.active,
            .${namespace}btn-link.loading,
            .open > .dropdown-toggle.${namespace}btn-link {
                color: ${basic.btn.style.link.color.active};
                border-color: ${basic.btn.style.link.bordercolor.active};
                background-color: ${basic.btn.style.link.bgcolor.active};

                ${Prefix.box_shadow(state, basic.btn.style.link.shadow.active)}
            }
            .${namespace}btn-link:active:hover,
            .${namespace}btn-link.active:hover,
            .${namespace}btn-link.loading:hover,
            .open > .dropdown-toggle.${namespace}btn-link:hover,
            .${namespace}btn-link:active:focus,
            .${namespace}btn-link.active:focus,
            .${namespace}btn-link.loading:focus,
            .open > .dropdown-toggle.${namespace}btn-link:focus,
            .${namespace}btn-link:active.focus,
            .${namespace}btn-link.active.focus,
            .${namespace}btn-link.loading.focus,
            .open > .dropdown-toggle.${namespace}btn-link.focus {
                color: ${basic.btn.style.link.color.focus};
                border-color: ${basic.btn.style.link.bordercolor.focus};
                background-color: ${basic.btn.style.link.bgcolor.focus};
            }
            .${namespace}btn-link:active,
            .${namespace}btn-link.active,
            .${namespace}btn-link.loading,
            .open > .dropdown-toggle.${namespace}btn-link {
                color: ${basic.btn.style.link.color.active};
                border-color: ${basic.btn.style.link.bordercolor.active};
                background-color: ${basic.btn.style.link.bgcolor.active};
                text-decoration: none;
            }
            .${namespace}btn-link.disabled,
            .${namespace}btn-link[disabled],
            fieldset[disabled] .${namespace}btn-link,
            .${namespace}btn-link.disabled:hover,
            .${namespace}btn-link[disabled]:hover,
            fieldset[disabled] .${namespace}btn-link:hover,
            .${namespace}btn-link.disabled:focus,
            .${namespace}btn-link[disabled]:focus,
            fieldset[disabled] .${namespace}btn-link:focus,
            .${namespace}btn-link.disabled.focus,
            .${namespace}btn-link[disabled].focus,
            fieldset[disabled] .${namespace}btn-link.focus,
            .${namespace}btn-link.disabled:active,
            .${namespace}btn-link[disabled]:active,
            fieldset[disabled] .${namespace}btn-link:active,
            .${namespace}btn-link.disabled.active,
            .${namespace}btn-link[disabled].active,
            fieldset[disabled] .${namespace}btn-link.active {
                color: ${basic.btn.style.link.color.disabled};
                border-color: ${basic.btn.style.link.bordercolor.disabled};
                background-color: ${basic.btn.style.link.bgcolor.disabled};
                text-decoration: line-through;
            }
            .${namespace}btn-link .badge {
                color: ${basic.colors.black.ladder.light.hex};
                background-color: transparent;
            }
        `;
    },
    [MT.CSS_BTNGROUP]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
            /*====================================================

                 btngroup

            ====================================================*/
            .${namespace}btngroup {
                display: inline-block;
                position: relative;
            }
            .${namespace}btngroup > .${namespace}btngroup,
            .${namespace}btngroup > .${namespace}btn {
                display: inline-block;
                position: relative;
                float: left;
                margin-left: -1px;
                ${Prefix.border_radius(state, 0)}
            }
            .${namespace}btngroup > .${namespace}btngroup:first-of-type,
            .${namespace}btngroup > .${namespace}btn:first-of-type {
                margin-left: 0;
                ${Prefix.border_radius(state, basic.btn.radius +'em 0 0 '+ basic.btn.radius +'em')}
            }
            .${namespace}btngroup > .${namespace}btngroup:last-of-type,
            .${namespace}btngroup > .${namespace}btn:last-of-type {
                ${Prefix.border_radius(state, '0 '+ basic.btn.radius +'em '+ basic.btn.radius +'em 0')}
            }
            .${namespace}btngroup > .${namespace}btngroup:only-of-type,
            .${namespace}btngroup > .${namespace}btn:only-of-type {
                ${Prefix.border_radius(state, basic.btn.radius +'em')}
            }
            .${namespace}btngroup-list {
                display: block;
            }
            .${namespace}btngroup-list > .${namespace}btngroup,
            .${namespace}btngroup-list > .${namespace}btn {
                display: inline-block;
                position: relative;
                float: none;
                width: 100%;
                margin-left: 0;
                margin-top: -1px;
                ${Prefix.border_radius(state, 0)}
            }
            .${namespace}btngroup-list > .${namespace}btngroup:first-of-type,
            .${namespace}btngroup-list > .${namespace}btn:first-of-type {
                margin-top: 0;
                ${Prefix.border_radius(state, basic.btn.radius +'em '+ basic.btn.radius +'em 0 0')}
            }
            .${namespace}btngroup-list > .${namespace}btngroup:last-of-type,
            .${namespace}btngroup-list > .${namespace}btn:last-of-type {
                ${Prefix.border_radius(state, '0 0 '+ basic.btn.radius +'em '+ basic.btn.radius +'em')}
            }
            .${namespace}btngroup-list > .${namespace}btngroup:only-of-type,
            .${namespace}btngroup-list > .${namespace}btn:only-of-type {
                ${Prefix.border_radius(state, basic.btn.radius +'em')}
            }
            .${namespace}btngroup-table {
                display: table;
                border-collapse: separate;
                width: 100%;
            }
            .${namespace}btngroup-table > .${namespace}btngroup,
            .${namespace}btngroup-table > .${namespace}btn {
                display: table-cell;
                float: none;
                width: 1%;
            }
            .${namespace}btngroup-table > .${namespace}btngroup > .${namespace}btn {
                width: 100%;
                ${Prefix.border_radius(state, 0)}
            }
            .${namespace}btngroup-table > .${namespace}btngroup:first-of-type > .${namespace}btn {
                ${Prefix.border_radius(state, basic.btn.radius +'em 0 0 '+ basic.btn.radius +'em')}
            }
            .${namespace}btngroup-table > .${namespace}btngroup:last-of-type > .${namespace}btn {
                ${Prefix.border_radius(state, '0 '+ basic.btn.radius +'em '+ basic.btn.radius +'em 0')}
            }
            .${namespace}btngroup-full {
                width: 100%;
            }
        `;
    },
    [MT.CSS_BTNGROUP_GRID]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
            /*====================================================

                 grid-btngroup

            ====================================================*/
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] {
                padding: 0 !important;
                margin-left: -1px;
                ${Comm.inlineblock_clearspace()}
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:first-child {
                margin-left: 0;
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] > .${namespace}btn,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] > .${namespace}btngroup,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] > .${namespace}btngroup > .${namespace}btn {
                width: 100%;
                ${Prefix.border_radius(state, 0)}
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:first-child > .${namespace}btn,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:first-child > .${namespace}btngroup > .${namespace}btn {
                ${Prefix.border_radius(state, basic.btn.radius +'em 0 0 '+ basic.btn.radius +'em')}
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:last-child > .${namespace}btn,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:last-child > .${namespace}btngroup > .${namespace}btn {
                ${Prefix.border_radius(state, '0 '+ basic.btn.radius +'em '+ basic.btn.radius +'em 0')}
            }
        `;
    },
};


