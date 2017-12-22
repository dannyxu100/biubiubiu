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
        line-height: ${lineheight}px;
        font-size: ${fontsize}px;
        font-weight: ${fontweight};
    `;
}

//设置标签页按钮样式
function nav_style(state, color, bgcolor, borderwidth, bordercolor, radius) {
    radius = radius || state.data.basic.tabs.nav.radius;
    return `
        color: ${color};
        background-color: ${bgcolor};
        border-bottom: ${borderwidth}px solid ${bordercolor};
        ${Prefix.border_radius(state, radius +'em '+ radius +'em 0 0')}
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
                margin-bottom: ${-basic.tabs.borderwidth_navs}px;
                z-index: ${basic.tabs.nav.zindex.def};
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
                    basic.tabs.nav.borderwidth,
                    basic.tabs.nav.bordercolor.def
                )}
                ${Prefix.transition(state)}
                ${Prefix.user_select(state)}
                ${Prefix.box_shadow(state, basic.tabs.nav.shadow.def)}
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:first-child {
                margin-left: 0;
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:hover,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.hover {
                ${nav_style(
                    state,
                    basic.tabs.nav.color.hover,
                    basic.tabs.nav.bgcolor.hover,
                    basic.tabs.nav.borderwidth,
                    basic.tabs.nav.bordercolor.hover
                )}
                z-index: ${basic.tabs.nav.zindex.hover};
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:active,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active {
                ${nav_style(
                    state,
                    basic.tabs.nav.color.active,
                    basic.tabs.nav.bgcolor.active,
                    basic.tabs.nav.borderwidth,
                    basic.tabs.nav.bordercolor.active
                )}
                z-index: ${basic.tabs.nav.zindex.active};
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:active:focus,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active:focus,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav:active.focus,
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active.focus {
                border-color: basic.tabs.nav.bordercolor.active;
                z-index: ${basic.tabs.nav.zindex.active};
                ${Prefix.outline(state)}
            }
            .${namespace}tabs .${namespace}tabs-navs .${namespace}tabs-nav.active {
                cursor: ${basic.cursor.def};
            }
            .${namespace}tabs-small .${namespace}tabs-navs .${namespace}tabs-nav {
                ${nav_size(
                    state,
                    basic.tabs.nav.padding.small,
                    basic.tabs.nav.fontsize.small,
                    basic.tabs.nav.height.small,
                    basic.tabs.nav.lineheight.small
                )}
            }
        `;
    },
    [MT.CSS_TABS_POPMENU]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                 tabs-popmenu

            ====================================================*/
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu > .popmenu,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left > .popmenu {
                top: 100%;
                left: 0;
                margin-top: ${basic.tabs.nav.borderwidth+3}px;
                margin-left: 0;
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left:after {
                display: inline-block;
                vertical-align: top;
                color: ${basic.tabs.nav.color.def};
                text-align: center;
                ${Comm.iconfont(state, basic.tabs.nav.icon_popmenu)}
                ${Prefix.transition(state)}
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu:active,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left:active,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu.active,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left.active {
                ${nav_style(
                    state,
                    basic.tabs.nav.color.active,
                    basic.tabs.nav.bgcolor.active,
                    basic.tabs.nav.borderwidth,
                    basic.tabs.nav.bordercolor.active
                )}
            }
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu:active:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left:active:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu.active:after,
            .${namespace}tabs > .${namespace}tabs-navs > .${namespace}tabs-nav-popmenu-left.active:after {
                color: ${basic.tabs.nav.color.active};
                ${Comm.iconfont(state, basic.tabs.nav.icon_popmenu)}
                ${Prefix.transform(state, 'rotate(90deg)')}
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


