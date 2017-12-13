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
              border-width: 2px;
              color: #CCC;
              border-color: #CCC;
              background-color: transparent;
            }
            .${namespace}btn-border:focus,
            .${namespace}btn-border.focus {
              color: #FAFAFA;
              border-color: #FAFAFA;
              background-color: transparent;
            }
            .${namespace}btn-border:hover,
            .${namespace}btn-border.hover {
              color: #FAFAFA;
              border-color: #FAFAFA;
              background-color: transparent;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            }
            .${namespace}btn-border:active,
            .${namespace}btn-border.active,
            .${namespace}btn-border.loading,
            .open > .dropdown-toggle.${namespace}btn-border {
              color: #CCC;
              border-color: #CCC;
              background-color: transparent;
              -webkit-box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
              -ms-box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
              box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
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
              color: #CCC;
              border-color: #CCC;
              background-color: transparent;
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
              color: #EEE;
              border-color: #EEE;
              background-color: transparent;
              -moz-opacity: 0.8;
              -khtml-opacity: 0.8;
              opacity: 0.8;
              filter: Alpha(Opacity=80);
            }
            .${namespace}btn-border .badge {
              color: #EEE;
              background-color: transparent;
            }
            .${namespace}btn-border-inverse {
              border-width: 2px;
              color: #666;
              border-color: #666;
              background-color: transparent;
            }
            .${namespace}btn-border-inverse:focus,
            .${namespace}btn-border-inverse.focus {
              color: #444;
              border-color: #333;
              background-color: transparent;
            }
            .${namespace}btn-border-inverse:hover,
            .${namespace}btn-border-inverse.hover {
              color: #444;
              border-color: #333;
              background-color: transparent;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            }
            .${namespace}btn-border-inverse:active,
            .${namespace}btn-border-inverse.active,
            .${namespace}btn-border-inverse.loading,
            .open > .dropdown-toggle.${namespace}btn-border-inverse {
              color: #666;
              border-color: #333;
              background-color: transparent;
              -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
              -ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
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
              color: #666;
              border-color: #333;
              background-color: transparent;
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
              color: #666;
              border-color: #666;
              background-color: transparent;
            }
            .${namespace}btn-border-inverse .badge {
              color: #444;
              background-color: transparent;
            }
            .${namespace}btn-border,
            .${namespace}btn-border-inverse {
              line-height: 15px;
            }
            .${namespace}btn-border.${namespace}btn-small,
            .${namespace}btn-border-inverse.${namespace}btn-small {
              line-height: 12px;
            }
            .${namespace}btn-border.${namespace}btn-large,
            .${namespace}btn-border-inverse.${namespace}btn-large {
              line-height: 21px;
            }
            .${namespace}btn-link {
              color: #319DBB;
              border-color: transparent;
              background-color: transparent;
            }
            .${namespace}btn-link:focus,
            .${namespace}btn-link.focus {
              color: #43D3FC;
              border-color: transparent;
              background-color: transparent;
            }
            .${namespace}btn-link:hover,
            .${namespace}btn-link.hover {
              text-decoration: underline;
              color: #43D3FC;
              border-color: transparent;
              background-color: transparent;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .${namespace}btn-link:active,
            .${namespace}btn-link.active,
            .${namespace}btn-link.loading,
            .open > .dropdown-toggle.${namespace}btn-link {
              color: #319DBB;
              border-color: transparent;
              background-color: transparent;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
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
              color: #319DBB;
              border-color: transparent;
              background-color: transparent;
            }
            .${namespace}btn-link:active,
            .${namespace}btn-link.active,
            .${namespace}btn-link.loading,
            .open > .dropdown-toggle.${namespace}btn-link {
              text-decoration: none;
              color: #319DBB;
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
              color: #319DBB;
              background-color: transparent;
              text-decoration: line-through;
            }
            .${namespace}btn-link .badge {
              color: #05C3F9;
            }
        `;
    },
    [MT.CSS_BTNGROUP]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
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
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .${namespace}btngroup > .${namespace}btngroup:first-child,
            .${namespace}btngroup > .${namespace}btn:first-child,
            .${namespace}btngroup > .${namespace}btngroup.${namespace}btn-first,
            .${namespace}btngroup > .${namespace}btn.${namespace}btn-first {
              margin-left: 0;
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .${namespace}btngroup > .${namespace}btngroup:last-child,
            .${namespace}btngroup > .${namespace}btn:last-child,
            .${namespace}btngroup > .${namespace}btngroup.${namespace}btn-last,
            .${namespace}btngroup > .${namespace}btn.${namespace}btn-last {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
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
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .${namespace}btngroup-list > .${namespace}btngroup:first-child,
            .${namespace}btngroup-list > .${namespace}btn:first-child,
            .${namespace}btngroup-list > .${namespace}btngroup.${namespace}btn-first,
            .${namespace}btngroup-list > .${namespace}btn.${namespace}btn-first {
              -moz-border-bottom-left-radius: 0;
              -moz-border-top-left-radius: 0;
              -webkit-border-bottom-left-radius: 0;
              -webkit-border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-top-left-radius: 0;
              -moz-border-top-right-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-top-right-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .${namespace}btngroup-list > .${namespace}btngroup:last-child,
            .${namespace}btngroup-list > .${namespace}btn:last-child,
            .${namespace}btngroup-list > .${namespace}btngroup.${namespace}btn-last,
            .${namespace}btngroup-list > .${namespace}btn.${namespace}btn-last {
              -moz-border-bottom-right-radius: 0;
              -moz-border-top-right-radius: 0;
              -webkit-border-bottom-right-radius: 0;
              -webkit-border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              border-top-right-radius: 0;
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-bottom-left-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
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
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .${namespace}btngroup-table > .${namespace}btngroup:first-child > .${namespace}btn {
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .${namespace}btngroup-table > .${namespace}btngroup:last-child > .${namespace}btn {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
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
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] {
              padding: 0 !important;
              margin-left: -1px;
              font-size: 0;
              white-space: nowrap;
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:first-child {
              margin-left: 0;
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] > .${namespace}btn,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] > .${namespace}btngroup,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"] > .${namespace}btngroup > .${namespace}btn {
              width: 100%;
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:first-child > .${namespace}btn,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:first-child > .${namespace}btngroup > .${namespace}btn {
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:last-child > .${namespace}btn,
            .${namespace}grid-btngroup .${namespace}grid-row > [class^="cell-"]:last-child > .${namespace}btngroup > .${namespace}btn {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
            }
        `;
    },
};


