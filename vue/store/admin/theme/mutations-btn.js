import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

function buttonsize( state, paddingtb, paddinglr, fontsize, height, lineheight, radius, fontweight ){
    fontweight = fontweight || state.data.basic.fontweight.def;
    return `
        padding: ${paddingtb} ${paddinglr};
        height: ${height};
        line-height: ${lineheight};
        font-size: ${fontsize};
        font-weight: ${fontweight};
        ${Prefix.border_radius(radius)}
    `;
}

export default {
    [MT.CSS_BTN]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
            .btn,
            .btn-def {
                display: inline-block;
                position: relative;
                z-index: 100;
                margin-bottom: 0;
                text-align: center;
                vertical-align: middle;
                touch-action: manipulation;
                color: #444;
                background-image: none;
                border: 1px solid #DDD;
                background-color: #FFF;
                cursor: pointer;
                white-space: nowrap;

                ${buttonsize(
                    basic.
                )}
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-transition: all linear 0.15s;
                -ms-transition: all linear 0.15s;
                -moz-transition: all linear 0.15s;
                transition: all linear 0.15s;
            }
            .btn:focus,
            .btn-def:focus,
            .btn:active:focus,
            .btn-def:active:focus,
            .btn.active:focus,
            .btn-def.active:focus,
            .btn.loading:focus,
            .btn-def.loading:focus,
            .btn.focus,
            .btn-def.focus,
            .btn:active.focus,
            .btn-def:active.focus,
            .btn.active.focus,
            .btn-def.active.focus,
            .btn.loading.focus,
            .btn-def.loading.focus {
              border-color: #CCC;
              z-index: 110;
              outline: thin dotted;
              outline: 2px auto -webkit-focus-ring-color;
              outline-offset: -2px;
              outline: none;
            }
            .btn:hover,
            .btn-def:hover,
            .btn.hover,
            .btn-def.hover {
              color: #222;
              border-color: #CCC;
              background-color: #FFF;
              text-decoration: none;
              z-index: 110;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            }
            .btn:focus,
            .btn-def:focus,
            .btn.focus,
            .btn-def.focus {
              color: #222;
              border-color: #CCC;
              background-color: #FFF;
              text-decoration: none;
              z-index: 110;
            }
            .btn:active,
            .btn-def:active,
            .btn.active,
            .btn-def.active,
            .btn.loading,
            .btn-def.loading {
              color: #666;
              border-color: #CCC;
              background-color: #FAFAFA;
              z-index: 110;
              -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
              -ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
              -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
            }
            .btn:active,
            .btn-def:active {
              background-image: none;
            }
            .btn.active,
            .btn-def.active {
              cursor: default;
            }
            .btn.loading,
            .btn-def.loading {
              cursor: wait;
            }
            .btn.border,
            .btn-def.border {
              border-color: #CCC;
            }
            .btn.disabled,
            .btn-def.disabled,
            .btn[disabled],
            .btn-def[disabled],
            fieldset[disabled] .btn,
            fieldset[disabled] .btn-def,
            .btn.disabled:hover,
            .btn-def.disabled:hover,
            .btn[disabled]:hover,
            .btn-def[disabled]:hover,
            fieldset[disabled] .btn:hover,
            fieldset[disabled] .btn-def:hover,
            .btn.disabled:focus,
            .btn-def.disabled:focus,
            .btn[disabled]:focus,
            .btn-def[disabled]:focus,
            fieldset[disabled] .btn:focus,
            fieldset[disabled] .btn-def:focus,
            .btn.disabled.focus,
            .btn-def.disabled.focus,
            .btn[disabled].focus,
            .btn-def[disabled].focus,
            fieldset[disabled] .btn.focus,
            fieldset[disabled] .btn-def.focus,
            .btn.disabled:active,
            .btn-def.disabled:active,
            .btn[disabled]:active,
            .btn-def[disabled]:active,
            fieldset[disabled] .btn:active,
            fieldset[disabled] .btn-def:active,
            .btn.disabled.active,
            .btn-def.disabled.active,
            .btn[disabled].active,
            .btn-def[disabled].active,
            fieldset[disabled] .btn.active,
            fieldset[disabled] .btn-def.active {
              color: #666;
              border-color: transparent;
              background-color: #F5F5F5;
              cursor: not-allowed;
              -moz-opacity: 0.55;
              -khtml-opacity: 0.55;
              opacity: 0.55;
              filter: Alpha(Opacity=55.00000000000001);
              -webkit-box-shadow: none !important;
              -ms-box-shadow: none !important;
              -moz-box-shadow: none !important;
              box-shadow: none !important;
            }
            a.btn,
            a.btn-def {
              text-decoration: none;
            }
            a.btn.disabled,
            a.btn-def.disabled,
            fieldset[disabled] a.btn,
            fieldset[disabled] a.btn-def {
              pointer-events: none;
            }
            .btn-min {
              padding: 6px 14px;
              height: 28px;
              line-height: 14px;
              font-size: 12px;
              font-weight: 400;
              -moz-border-radius: 0.3em;
              -webkit-border-radius: 0.3em;
              border-radius: 0.3em;
            }
            .btn-big {
              padding: 10px 30px;
              height: 45px;
              line-height: 23px;
              font-size: 16px;
              font-weight: 400;
              -moz-border-radius: 0.3em;
              -webkit-border-radius: 0.3em;
              border-radius: 0.3em;
            }
            .btn-full {
              display: block;
              width: 100%;
            }
            .btn-inverse {
              color: #F7F7F7;
              border-color: #666;
              background-color: #666;
            }
            .btn-inverse.border {
              border-color: #333;
            }
            .btn-inverse:focus,
            .btn-inverse.focus {
              color: #FFF;
              border-color: #333;
              background-color: #444;
            }
            .btn-inverse:hover,
            .btn-inverse.hover {
              color: #FFF;
              border-color: #333;
              background-color: #444;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            }
            .btn-inverse:active,
            .btn-inverse.active,
            .btn-inverse.loading,
            .open > .dropdown-toggle.btn-inverse {
              color: #FAFAFA;
              border-color: #222;
              background-color: #333;
              -webkit-box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.5);
              -ms-box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.5);
              -moz-box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.5);
              box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.5);
            }
            .btn-inverse:active:hover,
            .btn-inverse.active:hover,
            .btn-inverse.loading:hover,
            .open > .dropdown-toggle.btn-inverse:hover,
            .btn-inverse:active:focus,
            .btn-inverse.active:focus,
            .btn-inverse.loading:focus,
            .open > .dropdown-toggle.btn-inverse:focus,
            .btn-inverse:active.focus,
            .btn-inverse.active.focus,
            .btn-inverse.loading.focus,
            .open > .dropdown-toggle.btn-inverse.focus {
              color: #FFF;
              border-color: #222;
              background-color: #333;
            }
            .btn-inverse.disabled,
            .btn-inverse[disabled],
            fieldset[disabled] .btn-inverse,
            .btn-inverse.disabled:hover,
            .btn-inverse[disabled]:hover,
            fieldset[disabled] .btn-inverse:hover,
            .btn-inverse.disabled:focus,
            .btn-inverse[disabled]:focus,
            fieldset[disabled] .btn-inverse:focus,
            .btn-inverse.disabled.focus,
            .btn-inverse[disabled].focus,
            fieldset[disabled] .btn-inverse.focus,
            .btn-inverse.disabled:active,
            .btn-inverse[disabled]:active,
            fieldset[disabled] .btn-inverse:active,
            .btn-inverse.disabled.active,
            .btn-inverse[disabled].active,
            fieldset[disabled] .btn-inverse.active {
              color: #FFF;
              border-color: transparent;
              background-color: #444;
            }
            .btn-inverse .badge {
              color: #F7F7F7;
              background-color: #333;
            }
            .btn-theme {
              color: #F7F7F7;
              border-color: #05C3F9;
              background-color: #05C3F9;
            }
            .btn-theme.border {
              border-color: #05C3F9;
            }
            .btn-theme:focus,
            .btn-theme.focus {
              color: #FFF;
              border-color: #05C3F9;
              background-color: #43D3FC;
            }
            .btn-theme:hover,
            .btn-theme.hover {
              color: #FFF;
              border-color: #43D3FC;
              background-color: #74DEFC;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            }
            .btn-theme:active,
            .btn-theme.active,
            .btn-theme.loading,
            .open > .dropdown-toggle.btn-theme {
              color: #FAFAFA;
              border-color: #05C3F9;
              background-color: #43D3FC;
              -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
              -ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
              -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
            }
            .btn-theme:active:hover,
            .btn-theme.active:hover,
            .btn-theme.loading:hover,
            .open > .dropdown-toggle.btn-theme:hover,
            .btn-theme:active:focus,
            .btn-theme.active:focus,
            .btn-theme.loading:focus,
            .open > .dropdown-toggle.btn-theme:focus,
            .btn-theme:active.focus,
            .btn-theme.active.focus,
            .btn-theme.loading.focus,
            .open > .dropdown-toggle.btn-theme.focus {
              color: #FFF;
              border-color: #05C3F9;
              background-color: #43D3FC;
            }
            .btn-theme.disabled,
            .btn-theme[disabled],
            fieldset[disabled] .btn-theme,
            .btn-theme.disabled:hover,
            .btn-theme[disabled]:hover,
            fieldset[disabled] .btn-theme:hover,
            .btn-theme.disabled:focus,
            .btn-theme[disabled]:focus,
            fieldset[disabled] .btn-theme:focus,
            .btn-theme.disabled.focus,
            .btn-theme[disabled].focus,
            fieldset[disabled] .btn-theme.focus,
            .btn-theme.disabled:active,
            .btn-theme[disabled]:active,
            fieldset[disabled] .btn-theme:active,
            .btn-theme.disabled.active,
            .btn-theme[disabled].active,
            fieldset[disabled] .btn-theme.active {
              color: #FFF;
              border-color: transparent;
              background-color: #43D3FC;
            }
            .btn-theme .badge {
              color: #F7F7F7;
              background-color: #05C3F9;
            }
            .btn-key {
              color: #F7F7F7;
              border-color: #F95339;
              background-color: #F95339;
            }
            .btn-key.border {
              border-color: #F95339;
            }
            .btn-key:focus,
            .btn-key.focus {
              color: #FAFAFA;
              border-color: #F95339;
              background-color: #FB6C56;
            }
            .btn-key:hover,
            .btn-key.hover {
              color: #FAFAFA;
              border-color: #F95339;
              background-color: #FB6C56;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            }
            .btn-key:active,
            .btn-key.active,
            .btn-key.loading,
            .open > .dropdown-toggle.btn-key {
              color: #FAFAFA;
              border-color: #F95339;
              background-color: #FB6C56;
              -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
              -ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
              -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            .btn-key:active:hover,
            .btn-key.active:hover,
            .btn-key.loading:hover,
            .open > .dropdown-toggle.btn-key:hover,
            .btn-key:active:focus,
            .btn-key.active:focus,
            .btn-key.loading:focus,
            .open > .dropdown-toggle.btn-key:focus,
            .btn-key:active.focus,
            .btn-key.active.focus,
            .btn-key.loading.focus,
            .open > .dropdown-toggle.btn-key.focus {
              color: #FAFAFA;
              border-color: #F95339;
              background-color: #FB6C56;
            }
            .btn-key:active,
            .btn-key.active,
            .btn-key.loading,
            .open > .dropdown-toggle.btn-key {
              background-image: none;
            }
            .btn-key.disabled,
            .btn-key[disabled],
            fieldset[disabled] .btn-key,
            .btn-key.disabled:hover,
            .btn-key[disabled]:hover,
            fieldset[disabled] .btn-key:hover,
            .btn-key.disabled:focus,
            .btn-key[disabled]:focus,
            fieldset[disabled] .btn-key:focus,
            .btn-key.disabled.focus,
            .btn-key[disabled].focus,
            fieldset[disabled] .btn-key.focus,
            .btn-key.disabled:active,
            .btn-key[disabled]:active,
            fieldset[disabled] .btn-key:active,
            .btn-key.disabled.active,
            .btn-key[disabled].active,
            fieldset[disabled] .btn-key.active {
              color: #FAFAFA;
              border-color: transparent;
              background-color: #FB6C56;
            }
            .btn-key .badge {
              color: #F7F7F7;
              background-color: #F95339;
            }
            .btn-light {
              color: #333;
              border-color: #FFFF41;
              background-color: #FFFF41;
            }
            .btn-light.border {
              border-color: #FFF201;
            }
            .btn-light:focus,
            .btn-light.focus {
              color: #222;
              border-color: #FFF201;
              background-color: #FFFF73;
            }
            .btn-light:hover,
            .btn-light.hover {
              color: #222;
              border-color: #FFF201;
              background-color: #FFFF73;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
            }
            .btn-light:active,
            .btn-light.active,
            .btn-light.loading,
            .open > .dropdown-toggle.btn-light {
              color: #333;
              border-color: #FFF201;
              background-color: #FFFF73;
              -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
              -ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
              -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
            }
            .btn-light:active:hover,
            .btn-light.active:hover,
            .btn-light.loading:hover,
            .open > .dropdown-toggle.btn-light:hover,
            .btn-light:active:focus,
            .btn-light.active:focus,
            .btn-light.loading:focus,
            .open > .dropdown-toggle.btn-light:focus,
            .btn-light:active.focus,
            .btn-light.active.focus,
            .btn-light.loading.focus,
            .open > .dropdown-toggle.btn-light.focus {
              color: #222;
              border-color: #FFF201;
              background-color: #FFFF73;
            }
            .btn-light:active,
            .btn-light.active,
            .btn-light.loading,
            .open > .dropdown-toggle.btn-light {
              background-image: none;
            }
            .btn-light.disabled,
            .btn-light[disabled],
            fieldset[disabled] .btn-light,
            .btn-light.disabled:hover,
            .btn-light[disabled]:hover,
            fieldset[disabled] .btn-light:hover,
            .btn-light.disabled:focus,
            .btn-light[disabled]:focus,
            fieldset[disabled] .btn-light:focus,
            .btn-light.disabled.focus,
            .btn-light[disabled].focus,
            fieldset[disabled] .btn-light.focus,
            .btn-light.disabled:active,
            .btn-light[disabled]:active,
            fieldset[disabled] .btn-light:active,
            .btn-light.disabled.active,
            .btn-light[disabled].active,
            fieldset[disabled] .btn-light.active {
              color: #222;
              border-color: transparent;
              background-color: #FFFF73;
            }
            .btn-light .badge {
              color: #333;
              background-color: #FFFF41;
            }
            .btn-nice {
              color: #F7F7F7;
              border-color: #01C677;
              background-color: #01C677;
            }
            .btn-nice.border {
              border-color: #01C677;
            }
            .btn-nice:focus,
            .btn-nice.focus {
              color: #FFF;
              border-color: #01C677;
              background-color: #39E39E;
            }
            .btn-nice:hover,
            .btn-nice.hover {
              color: #FFF;
              border-color: #01C677;
              background-color: #67E3B1;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            }
            .btn-nice:active,
            .btn-nice.active,
            .btn-nice.loading,
            .open > .dropdown-toggle.btn-nice {
              color: #FAFAFA;
              border-color: #01C677;
              background-color: #39E39E;
              -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
              -ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
              -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
            }
            .btn-nice:active:hover,
            .btn-nice.active:hover,
            .btn-nice.loading:hover,
            .open > .dropdown-toggle.btn-nice:hover,
            .btn-nice:active:focus,
            .btn-nice.active:focus,
            .btn-nice.loading:focus,
            .open > .dropdown-toggle.btn-nice:focus,
            .btn-nice:active.focus,
            .btn-nice.active.focus,
            .btn-nice.loading.focus,
            .open > .dropdown-toggle.btn-nice.focus {
              color: #FFF;
              border-color: #01C677;
              background-color: #39E39E;
            }
            .btn-nice.disabled,
            .btn-nice[disabled],
            fieldset[disabled] .btn-nice,
            .btn-nice.disabled:hover,
            .btn-nice[disabled]:hover,
            fieldset[disabled] .btn-nice:hover,
            .btn-nice.disabled:focus,
            .btn-nice[disabled]:focus,
            fieldset[disabled] .btn-nice:focus,
            .btn-nice.disabled.focus,
            .btn-nice[disabled].focus,
            fieldset[disabled] .btn-nice.focus,
            .btn-nice.disabled:active,
            .btn-nice[disabled]:active,
            fieldset[disabled] .btn-nice:active,
            .btn-nice.disabled.active,
            .btn-nice[disabled].active,
            fieldset[disabled] .btn-nice.active {
              color: #FFF;
              border-color: transparent;
              background-color: #39E39E;
            }
            .btn-nice .badge {
              color: #F7F7F7;
              background-color: #01C677;
            }
            .btn-border {
              border-width: 2px;
              color: #CCC;
              border-color: #CCC;
              background-color: transparent;
            }
            .btn-border:focus,
            .btn-border.focus {
              color: #FAFAFA;
              border-color: #FAFAFA;
              background-color: transparent;
            }
            .btn-border:hover,
            .btn-border.hover {
              color: #FAFAFA;
              border-color: #FAFAFA;
              background-color: transparent;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            }
            .btn-border:active,
            .btn-border.active,
            .btn-border.loading,
            .open > .dropdown-toggle.btn-border {
              color: #CCC;
              border-color: #CCC;
              background-color: transparent;
              -webkit-box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
              -ms-box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
              box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
            }
            .btn-border:active:hover,
            .btn-border.active:hover,
            .btn-border.loading:hover,
            .open > .dropdown-toggle.btn-border:hover,
            .btn-border:active:focus,
            .btn-border.active:focus,
            .btn-border.loading:focus,
            .open > .dropdown-toggle.btn-border:focus,
            .btn-border:active.focus,
            .btn-border.active.focus,
            .btn-border.loading.focus,
            .open > .dropdown-toggle.btn-border.focus {
              color: #CCC;
              border-color: #CCC;
              background-color: transparent;
            }
            .btn-border.disabled,
            .btn-border[disabled],
            fieldset[disabled] .btn-border,
            .btn-border.disabled:hover,
            .btn-border[disabled]:hover,
            fieldset[disabled] .btn-border:hover,
            .btn-border.disabled:focus,
            .btn-border[disabled]:focus,
            fieldset[disabled] .btn-border:focus,
            .btn-border.disabled.focus,
            .btn-border[disabled].focus,
            fieldset[disabled] .btn-border.focus,
            .btn-border.disabled:active,
            .btn-border[disabled]:active,
            fieldset[disabled] .btn-border:active,
            .btn-border.disabled.active,
            .btn-border[disabled].active,
            fieldset[disabled] .btn-border.active {
              color: #EEE;
              border-color: #EEE;
              background-color: transparent;
              -moz-opacity: 0.8;
              -khtml-opacity: 0.8;
              opacity: 0.8;
              filter: Alpha(Opacity=80);
            }
            .btn-border .badge {
              color: #EEE;
              background-color: transparent;
            }
            .btn-border-inverse {
              border-width: 2px;
              color: #666;
              border-color: #666;
              background-color: transparent;
            }
            .btn-border-inverse:focus,
            .btn-border-inverse.focus {
              color: #444;
              border-color: #333;
              background-color: transparent;
            }
            .btn-border-inverse:hover,
            .btn-border-inverse.hover {
              color: #444;
              border-color: #333;
              background-color: transparent;
              -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            }
            .btn-border-inverse:active,
            .btn-border-inverse.active,
            .btn-border-inverse.loading,
            .open > .dropdown-toggle.btn-border-inverse {
              color: #666;
              border-color: #333;
              background-color: transparent;
              -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
              -ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
              box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
            }
            .btn-border-inverse:active:hover,
            .btn-border-inverse.active:hover,
            .btn-border-inverse.loading:hover,
            .open > .dropdown-toggle.btn-border-inverse:hover,
            .btn-border-inverse:active:focus,
            .btn-border-inverse.active:focus,
            .btn-border-inverse.loading:focus,
            .open > .dropdown-toggle.btn-border-inverse:focus,
            .btn-border-inverse:active.focus,
            .btn-border-inverse.active.focus,
            .btn-border-inverse.loading.focus,
            .open > .dropdown-toggle.btn-border-inverse.focus {
              color: #666;
              border-color: #333;
              background-color: transparent;
            }
            .btn-border-inverse.disabled,
            .btn-border-inverse[disabled],
            fieldset[disabled] .btn-border-inverse,
            .btn-border-inverse.disabled:hover,
            .btn-border-inverse[disabled]:hover,
            fieldset[disabled] .btn-border-inverse:hover,
            .btn-border-inverse.disabled:focus,
            .btn-border-inverse[disabled]:focus,
            fieldset[disabled] .btn-border-inverse:focus,
            .btn-border-inverse.disabled.focus,
            .btn-border-inverse[disabled].focus,
            fieldset[disabled] .btn-border-inverse.focus,
            .btn-border-inverse.disabled:active,
            .btn-border-inverse[disabled]:active,
            fieldset[disabled] .btn-border-inverse:active,
            .btn-border-inverse.disabled.active,
            .btn-border-inverse[disabled].active,
            fieldset[disabled] .btn-border-inverse.active {
              color: #666;
              border-color: #666;
              background-color: transparent;
            }
            .btn-border-inverse .badge {
              color: #444;
              background-color: transparent;
            }
            .btn-border,
            .btn-border-inverse {
              line-height: 15px;
            }
            .btn-border.btn-min,
            .btn-border-inverse.btn-min {
              line-height: 12px;
            }
            .btn-border.btn-big,
            .btn-border-inverse.btn-big {
              line-height: 21px;
            }
            .btn-link {
              color: #319DBB;
              border-color: transparent;
              background-color: transparent;
            }
            .btn-link:focus,
            .btn-link.focus {
              color: #43D3FC;
              border-color: transparent;
              background-color: transparent;
            }
            .btn-link:hover,
            .btn-link.hover {
              text-decoration: underline;
              color: #43D3FC;
              border-color: transparent;
              background-color: transparent;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .btn-link:active,
            .btn-link.active,
            .btn-link.loading,
            .open > .dropdown-toggle.btn-link {
              color: #319DBB;
              border-color: transparent;
              background-color: transparent;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .btn-link:active:hover,
            .btn-link.active:hover,
            .btn-link.loading:hover,
            .open > .dropdown-toggle.btn-link:hover,
            .btn-link:active:focus,
            .btn-link.active:focus,
            .btn-link.loading:focus,
            .open > .dropdown-toggle.btn-link:focus,
            .btn-link:active.focus,
            .btn-link.active.focus,
            .btn-link.loading.focus,
            .open > .dropdown-toggle.btn-link.focus {
              color: #319DBB;
              border-color: transparent;
              background-color: transparent;
            }
            .btn-link:active,
            .btn-link.active,
            .btn-link.loading,
            .open > .dropdown-toggle.btn-link {
              text-decoration: none;
              color: #319DBB;
            }
            .btn-link.disabled,
            .btn-link[disabled],
            fieldset[disabled] .btn-link,
            .btn-link.disabled:hover,
            .btn-link[disabled]:hover,
            fieldset[disabled] .btn-link:hover,
            .btn-link.disabled:focus,
            .btn-link[disabled]:focus,
            fieldset[disabled] .btn-link:focus,
            .btn-link.disabled.focus,
            .btn-link[disabled].focus,
            fieldset[disabled] .btn-link.focus,
            .btn-link.disabled:active,
            .btn-link[disabled]:active,
            fieldset[disabled] .btn-link:active,
            .btn-link.disabled.active,
            .btn-link[disabled].active,
            fieldset[disabled] .btn-link.active {
              color: #319DBB;
              background-color: transparent;
              text-decoration: line-through;
            }
            .btn-link .badge {
              color: #05C3F9;
            }
            .btngroup {
              display: inline-block;
              position: relative;
            }
            .btngroup > .btngroup,
            .btngroup > .btn {
              display: inline-block;
              position: relative;
              float: left;
              margin-left: -1px;
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .btngroup > .btngroup:first-child,
            .btngroup > .btn:first-child,
            .btngroup > .btngroup.btn-first,
            .btngroup > .btn.btn-first {
              margin-left: 0;
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .btngroup > .btngroup:last-child,
            .btngroup > .btn:last-child,
            .btngroup > .btngroup.btn-last,
            .btngroup > .btn.btn-last {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
            }
            .btngroup-list {
              display: block;
            }
            .btngroup-list > .btngroup,
            .btngroup-list > .btn {
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
            .btngroup-list > .btngroup:first-child,
            .btngroup-list > .btn:first-child,
            .btngroup-list > .btngroup.btn-first,
            .btngroup-list > .btn.btn-first {
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
            .btngroup-list > .btngroup:last-child,
            .btngroup-list > .btn:last-child,
            .btngroup-list > .btngroup.btn-last,
            .btngroup-list > .btn.btn-last {
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
            .btngroup-table {
              display: table;
              border-collapse: separate;
              width: 100%;
            }
            .btngroup-table > .btngroup,
            .btngroup-table > .btn {
              display: table-cell;
              float: none;
              width: 1%;
            }
            .btngroup-table > .btngroup > .btn {
              width: 100%;
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .btngroup-table > .btngroup:first-child > .btn {
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .btngroup-table > .btngroup:last-child > .btn {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
            }
            .btngroup-full {
              width: 100%;
            }
            .grid-btngroup .grid-row > [class^="cell-"] {
              padding: 0 !important;
              margin-left: -1px;
              font-size: 0;
              white-space: nowrap;
            }
            .grid-btngroup .grid-row > [class^="cell-"]:first-child {
              margin-left: 0;
            }
            .grid-btngroup .grid-row > [class^="cell-"] > .btn,
            .grid-btngroup .grid-row > [class^="cell-"] > .btngroup,
            .grid-btngroup .grid-row > [class^="cell-"] > .btngroup > .btn {
              width: 100%;
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .grid-btngroup .grid-row > [class^="cell-"]:first-child > .btn,
            .grid-btngroup .grid-row > [class^="cell-"]:first-child > .btngroup > .btn {
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .grid-btngroup .grid-row > [class^="cell-"]:last-child > .btn,
            .grid-btngroup .grid-row > [class^="cell-"]:last-child > .btngroup > .btn {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
            }
        `;
    },
    [MT.CSS_BTNGROUP]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
            .btngroup {
              display: inline-block;
              position: relative;
            }
            .btngroup > .btngroup,
            .btngroup > .btn {
              display: inline-block;
              position: relative;
              float: left;
              margin-left: -1px;
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .btngroup > .btngroup:first-child,
            .btngroup > .btn:first-child,
            .btngroup > .btngroup.btn-first,
            .btngroup > .btn.btn-first {
              margin-left: 0;
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .btngroup > .btngroup:last-child,
            .btngroup > .btn:last-child,
            .btngroup > .btngroup.btn-last,
            .btngroup > .btn.btn-last {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
            }
            .btngroup-list {
              display: block;
            }
            .btngroup-list > .btngroup,
            .btngroup-list > .btn {
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
            .btngroup-list > .btngroup:first-child,
            .btngroup-list > .btn:first-child,
            .btngroup-list > .btngroup.btn-first,
            .btngroup-list > .btn.btn-first {
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
            .btngroup-list > .btngroup:last-child,
            .btngroup-list > .btn:last-child,
            .btngroup-list > .btngroup.btn-last,
            .btngroup-list > .btn.btn-last {
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
            .btngroup-table {
              display: table;
              border-collapse: separate;
              width: 100%;
            }
            .btngroup-table > .btngroup,
            .btngroup-table > .btn {
              display: table-cell;
              float: none;
              width: 1%;
            }
            .btngroup-table > .btngroup > .btn {
              width: 100%;
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .btngroup-table > .btngroup:first-child > .btn {
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .btngroup-table > .btngroup:last-child > .btn {
              -moz-border-bottom-right-radius: 0.3em;
              -moz-border-top-right-radius: 0.3em;
              -webkit-border-bottom-right-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              border-bottom-right-radius: 0.3em;
              border-top-right-radius: 0.3em;
            }
            .btngroup-full {
              width: 100%;
            }
        `;
    },
    [MT.CSS_BTNGROUP_GRID]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;

        state.data.csstext += `
            .grid-btngroup .grid-row > [class^="cell-"] {
              padding: 0 !important;
              margin-left: -1px;
              font-size: 0;
              white-space: nowrap;
            }
            .grid-btngroup .grid-row > [class^="cell-"]:first-child {
              margin-left: 0;
            }
            .grid-btngroup .grid-row > [class^="cell-"] > .btn,
            .grid-btngroup .grid-row > [class^="cell-"] > .btngroup,
            .grid-btngroup .grid-row > [class^="cell-"] > .btngroup > .btn {
              width: 100%;
              -moz-border-radius: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
            }
            .grid-btngroup .grid-row > [class^="cell-"]:first-child > .btn,
            .grid-btngroup .grid-row > [class^="cell-"]:first-child > .btngroup > .btn {
              -moz-border-bottom-left-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-bottom-left-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-bottom-left-radius: 0.3em;
              border-top-left-radius: 0.3em;
            }
            .grid-btngroup .grid-row > [class^="cell-"]:last-child > .btn,
            .grid-btngroup .grid-row > [class^="cell-"]:last-child > .btngroup > .btn {
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


