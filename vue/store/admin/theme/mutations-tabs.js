import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

//设置标签页按钮尺寸
function nav_size(state, padding, fontsize, height, lineheight, fontweight) {
    fontweight = fontweight || state.data.basic.fontweight.def;
    return `
        padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
        height: ${height}px;
        line-height: ${lineheight};
        font-size: ${fontsize};
        font-weight: ${fontweight};
    `;
}

//设置标签页按钮样式
function nav_style(state, color, bgcolor, bordercolor, radius) {
    return `
        color: ${color};
        background-color: ${bgcolor};
        border-color: ${bordercolor};
        border-bottom-color: ${state.data.basic.tabs.bordercolor_navs};

        ${Prefix.border_radius(state, radius)}
    `;
}

export default {
    [MT.CSS_TABS]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                 tabs

            ====================================================*/
            .${namespace}tabs {
                position: relative;
                z-index: ${basic.tabs.zindex};
            }
            .${namespace}tabs .${namespace}tabs-navs {
                padding: 0;
                margin: 0;
                border: none;
                border-bottom: ${basic.tabs.borderwidth_navs}px solid ${basic.tabs.bordercolor_navs};
                background-color: ${basic.tabs.bgcolor};
                cursor: ${basic.cursor.pointer};

                ${Comm.inlineblock_clearspace(state)}
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav {
                display: inline-block;
                position: relative;
                padding: 0;
                margin: 0;
                margin-left: 3px;
                margin-bottom: ${-basic.tabs.borderwidth_navs}px;
                border: 1px solid transparent;

                ${nav_size(
                    state,
                    basic.tabs.nav.padding.def,
                    basic.tabs.nav.fontsize.def,
                    basic.tabs.nav.height.def,
                    basic.tabs.nav.lineheight.def
                )}
                ${nav_style(
                    state,
                    basic.tabs.nav.color.def,
                    basic.tabs.nav.bgcolor.def,
                    basic.tabs.nav.bordercolor.def
                )}
                ${Prefix.transition(state)}
                ${Prefix.transition(state)}
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:first-child {
              margin-left: 0;
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:hover,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.hover {
              color: #666;
              background-color: #FFF;
              border-color: #F5F5F5;
              -moz-border-top-right-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-top-right-radius: 0.3em;
              border-top-left-radius: 0.3em;
              z-index: 110;
              border-bottom-color: #DDD;
              -webkit-box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
              -ms-box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
              -moz-box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
              box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:active,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active {
              color: #333;
              background-color: #FFF;
              border-color: #DDD;
              border-bottom-color: #DDD;
              -moz-border-top-right-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-top-right-radius: 0.3em;
              border-top-left-radius: 0.3em;
              z-index: 120;
              border-bottom-color: transparent;
              -webkit-box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.06);
              -ms-box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.06);
              -moz-box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.06);
              box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.06);
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:active:focus,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active:focus,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:active.focus,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active.focus {
              border-color: #DDD;
              z-index: 120;
              outline: thin dotted;
              outline: 2px auto -webkit-focus-ring-color;
              outline-offset: -2px;
              outline: none;
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active {
              cursor: default;
            }
            .${namespace}tabs-small .${namespace}tabs-navs .${namespace}tabs-nav {
              padding: 8px 15px;
              height: 32px;
              line-height: 14px;
              font-size: 12px;
              font-weight: 400;
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu > .popmenu,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left > .popmenu {
              top: 100%;
              left: 0;
              margin-top: 3px;
              margin-left: 0;
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left:after {
              vertical-align: top;
              color: #999;
              text-align: center;
              font-family: "iconfont" !important;
              font-size: inherit;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              content: "\e652";
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu:active,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left:active,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu.active,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left.active {
              color: #666;
              background-color: #FFF;
              border-color: #F5F5F5;
              border-bottom-color: #DDD;
              -moz-border-top-right-radius: 0.3em;
              -moz-border-top-left-radius: 0.3em;
              -webkit-border-top-right-radius: 0.3em;
              -webkit-border-top-left-radius: 0.3em;
              border-top-right-radius: 0.3em;
              border-top-left-radius: 0.3em;
              -webkit-box-shadow: none;
              -ms-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu:active:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left:active:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu.active:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left.active:after {
              font-family: "iconfont" !important;
              font-size: inherit;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              content: "\e64d";
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left > .popmenu {
              left: auto;
              right: 0;
              margin-left: 0;
              margin-right: 0;
            }
        `;
    }
};


