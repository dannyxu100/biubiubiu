import Vue                      from 'vue';
import Color                    from '_JS_/color.js';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

//设置菜单尺寸
function popmenusize( state, minwidth, fontsize, fontweight, padding ) {
    return `
        min-width: ${minwidth}px;
        font-size: ${fontsize}px;
        font-weight: ${fontweight};
        padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
    `;
}
//设置菜单风格
function popmenustyle( state, borderwidth, bordercolor, bgcolor, radius ) {
    return `
        border: ${borderwidth}px solid ${bordercolor};
        background: ${bgcolor};
        ${Prefix.border_radius(state, radius +'em')}
    `;
}
//设置选项尺寸
function itemsize( state, height, lineheight, padding ) {
    return `
        height: ${height}px;
        line-height: ${lineheight}px;
        padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
    `;
}

export default {
    [MT.CSS_POPMENU]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                 popmenu

            ====================================================*/
            .${namespace}popmenu,
            .${namespace}popmenu-sub {
                position: absolute;
                z-index: ${basic.popmenu.zindex.def};
                display: none;
                left: 0;
                margin: 0;
                text-align: left;
                ${popmenusize(
                    state,
                    basic.popmenu.minwidth.def,
                    basic.popmenu.fontsize.def,
                    basic.popmenu.fontweight.def,
                    basic.popmenu.padding
                )}
                ${popmenustyle(
                    state,
                    basic.popmenu.borderwidth,
                    basic.popmenu.bordercolor,
                    basic.popmenu.bgcolor.def,
                    basic.popmenu.radius
                )}
                ${Prefix.box_shadow(state, basic.popmenu.shadow)}
            }
            .${namespace}popmenu .${namespace}popmenu-item,
            .${namespace}popmenu-sub .${namespace}popmenu-item {
                ${itemsize(
                    state,
                    basic.popmenu.item_height.def,
                    basic.popmenu.item_height.def - basic.popmenu.item_padding.top - basic.popmenu.item_padding.bottom,
                    basic.popmenu.item_padding
                )}
            }
            .${namespace}popmenu:active,
            .${namespace}popmenu-sub:active,
            .${namespace}popmenu.active,
            .${namespace}popmenu-sub.active {
                z-index: ${basic.popmenu.zindex.active};
                display: block;
            }
            .${namespace}popmenu:hover,
            .${namespace}popmenu-sub:hover,
            .${namespace}popmenu.hover,
            .${namespace}popmenu-sub.hover {
                z-index: ${basic.popmenu.zindex.hover};
            }
            .${namespace}popmenu .${namespace}popmenu-item,
            .${namespace}popmenu-sub .${namespace}popmenu-item {
                position: relative;
                display: block;
                width: 100%;
                list-style: none;
                color: ${basic.popmenu.color.def};
                background: ${basic.popmenu.bgcolor.def};
                text-decoration: none;
                cursor: ${basic.cursor.pointer};
                ${Prefix.transition(state, 'all linear .08s')}
                ${Prefix.user_select(state)}
                ${Comm.text_overflow(state)}
            }
            ${Comm.clearfix(
                state,
                '.${namespace}popmenu .${namespace}popmenu-item',
                '.${namespace}popmenu-sub .${namespace}popmenu-item'
            )}
            .${namespace}popmenu .${namespace}popmenu-item .icon,
            .${namespace}popmenu-sub .${namespace}popmenu-item .icon,
            .${namespace}popmenu .${namespace}popmenu-item .hd,
            .${namespace}popmenu-sub .${namespace}popmenu-item .hd,
            .${namespace}popmenu .${namespace}popmenu-item .md,
            .${namespace}popmenu-sub .${namespace}popmenu-item .md,
            .${namespace}popmenu .${namespace}popmenu-item .ft,
            .${namespace}popmenu-sub .${namespace}popmenu-item .ft {
                line-height: ${basic.popmenu.item_height.def - basic.popmenu.item_padding.top - basic.popmenu.item_padding.bottom}px;
            }
            .${namespace}popmenu .${namespace}popmenu-item .icon,
            .${namespace}popmenu-sub .${namespace}popmenu-item .icon,
            .${namespace}popmenu .${namespace}popmenu-item .hd,
            .${namespace}popmenu-sub .${namespace}popmenu-item .hd {
                position: absolute;
                top: 0;
                left: ${basic.popmenu.item_padding.left}px;
                bottom: 0;
            }
            .${namespace}popmenu .${namespace}popmenu-item .md,
            .${namespace}popmenu-sub .${namespace}popmenu-item .md {
                text-align: center;
            }
            .${namespace}popmenu .${namespace}popmenu-item .ft,
            .${namespace}popmenu-sub .${namespace}popmenu-item .ft {
                position: absolute;
                top: 0;
                right: ${basic.popmenu.item_padding.right}px;
                bottom: 0;
            }
            .${namespace}popmenu .${namespace}popmenu-item small,
            .${namespace}popmenu-sub .${namespace}popmenu-item small,
            .${namespace}popmenu .${namespace}popmenu-item .small,
            .${namespace}popmenu-sub .${namespace}popmenu-item .small {
                color: ${'rgb('+ Color.lighten(basic.popmenu.color.def, 80) +')'};
                font-size: 0.65em;
            }
            .${namespace}popmenu .${namespace}popmenu-item:first-child,
            .${namespace}popmenu-sub .${namespace}popmenu-item:first-child {
                ${Prefix.border_radius(state, basic.popmenu.radius +'em '+ basic.popmenu.radius +'em 0 0')}
            }
            .${namespace}popmenu .${namespace}popmenu-item:last-child,
            .${namespace}popmenu-sub .${namespace}popmenu-item:last-child {
                ${Prefix.border_radius(state, '0 0 '+ basic.popmenu.radius +'em '+ basic.popmenu.radius +'em')}
            }
            .${namespace}popmenu .${namespace}popmenu-item:hover,
            .${namespace}popmenu-sub .${namespace}popmenu-item:hover {
                color: ${basic.popmenu.color.hover};
                background: ${basic.popmenu.bgcolor.hover};
            }
            .${namespace}popmenu .${namespace}popmenu-item:hover small,
            .${namespace}popmenu-sub .${namespace}popmenu-item:hover small,
            .${namespace}popmenu .${namespace}popmenu-item:hover .small,
            .${namespace}popmenu-sub .${namespace}popmenu-item:hover .small {
                color: ${basic.popmenu.color.hover};
            }
            .${namespace}popmenu .${namespace}popmenu-item:active,
            .${namespace}popmenu-sub .${namespace}popmenu-item:active,
            .${namespace}popmenu .${namespace}popmenu-item.active,
            .${namespace}popmenu-sub .${namespace}popmenu-item.active,
            .${namespace}popmenu .${namespace}popmenu-item.selected,
            .${namespace}popmenu-sub .${namespace}popmenu-item.selected {
                color: ${basic.popmenu.color.active};
                background: ${basic.popmenu.bgcolor.active};
                ${Prefix.box_shadow(state, basic.popmenu.item_shadow.active)}
            }
            .${namespace}popmenu .${namespace}popmenu-item:active small,
            .${namespace}popmenu-sub .${namespace}popmenu-item:active small,
            .${namespace}popmenu .${namespace}popmenu-item.active small,
            .${namespace}popmenu-sub .${namespace}popmenu-item.active small,
            .${namespace}popmenu .${namespace}popmenu-item.selected small,
            .${namespace}popmenu-sub .${namespace}popmenu-item.selected small,
            .${namespace}popmenu .${namespace}popmenu-item:active .small,
            .${namespace}popmenu-sub .${namespace}popmenu-item:active .small,
            .${namespace}popmenu .${namespace}popmenu-item.active .small,
            .${namespace}popmenu-sub .${namespace}popmenu-item.active .small,
            .${namespace}popmenu .${namespace}popmenu-item.selected .small,
            .${namespace}popmenu-sub .${namespace}popmenu-item.selected .small {
                color: ${basic.popmenu.color.active};
            }
            .${namespace}popmenu .${namespace}popmenu-item.selected,
            .${namespace}popmenu-sub .${namespace}popmenu-item.selected {
                color: ${basic.popmenu.item_selected.color};
                background: ${basic.popmenu.item_selected.bgcolor};
                cursor: ${basic.cursor.def};
                ${Prefix.box_shadow(state, basic.popmenu.item_selected.shadow)}
            }
            .${namespace}popmenu .${namespace}popmenu-item.selected small,
            .${namespace}popmenu-sub .${namespace}popmenu-item.selected small,
            .${namespace}popmenu .${namespace}popmenu-item.selected .small,
            .${namespace}popmenu-sub .${namespace}popmenu-item.selected .small {
                color: ${basic.popmenu.item_selected.color};
            }
            .${namespace}popmenu .${namespace}popmenu-item.selected::after,
            .${namespace}popmenu-sub .${namespace}popmenu-item.selected::after {
                position: absolute;
                top: 0;
                right: ${basic.popmenu.item_padding.right}px;
                height: ${basic.popmenu.item_height.def}px;
                line-height: ${basic.popmenu.item_height.def - basic.popmenu.item_padding.top - basic.popmenu.item_padding.bottom}px;
                color: ${basic.popmenu.item_selected.iconcolor};
                display: none \\9;      /* ie hack */
                ${Prefix.opacity(state, 0)}
                ${Comm.iconfont(state, basic.popmenu.item_selected.icon, basic.popmenu.item_selected.iconfontsize+'px')}
            }
            .${namespace}popmenu .${namespace}popmenu-item.hassub::after,
            .${namespace}popmenu-sub .${namespace}popmenu-item.hassub::after {
                position: absolute;
                top: 0;
                right: ${basic.popmenu.item_padding.right}px;
                height: ${basic.popmenu.item_height.def}px;
                line-height: ${basic.popmenu.item_height.def - basic.popmenu.item_padding.top - basic.popmenu.item_padding.bottom}px;
                color: ${basic.popmenu.item_hassub.iconcolor};
                display: none;
                ${Comm.iconfont(state, basic.popmenu.item_hassub.icon, basic.popmenu.item_hassub.iconfontsize+'px')}
            }
            .${namespace}popmenu .${namespace}popmenu-item.disabled,
            .${namespace}popmenu-sub .${namespace}popmenu-item.disabled,
            .${namespace}popmenu .${namespace}popmenu-item.disabled:hover,
            .${namespace}popmenu-sub .${namespace}popmenu-item.disabled:hover,
            .${namespace}popmenu .${namespace}popmenu-item.disabled:active,
            .${namespace}popmenu-sub .${namespace}popmenu-item.disabled:active,
            .${namespace}popmenu .${namespace}popmenu-item.disabled.active,
            .${namespace}popmenu-sub .${namespace}popmenu-item.disabled.active,
            .${namespace}popmenu .${namespace}popmenu-item.disabled.selected,
            .${namespace}popmenu-sub .${namespace}popmenu-item.disabled.selected,
            .${namespace}popmenu .${namespace}popmenu-item.disabled.hassub,
            .${namespace}popmenu-sub .${namespace}popmenu-item.disabled.hassub {
                color: ${basic.popmenu.color.disabled};
                cursor: ${basic.cursor.no};
                background: ${basic.popmenu.bgcolor.disabled};
                ${Prefix.box_shadow(state, basic.popmenu.item_shadow.disabled)}
            }
            .${namespace}popmenu .split,
            .${namespace}popmenu-sub .split {
                height: 0px;
                border-top: ${basic.popmenu.split.borderwidth.top}px solid ${basic.popmenu.split.bordercolor.top};
                border-bottom: ${basic.popmenu.split.borderwidth.bottom}px solid ${basic.popmenu.split.bordercolor.bottom};
                margin: ${basic.popmenu.split.height/2}px 0px;
                font-size: 0;
            }
            .${namespace}popmenu-selectable .${namespace}popmenu-item {
                padding-right: ${basic.popmenu.selectable_right}px;
            }
            .${namespace}popmenu-selectable .${namespace}popmenu-item.selected::after {
                display: block \\9;       /* ie hack */
                ${Prefix.opacity(state, 1)}
            }
            .${namespace}popmenu-icon .${namespace}popmenu-item {
                padding-left: ${basic.popmenu.item_padding.iconleft}px;
            }
            .${namespace}popmenu-icon .${namespace}popmenu-item .icon {
                color: ${basic.popmenu.color.icon};
                font-size: ${basic.popmenu.fontsize.def}px;
                ${Prefix.transition(state, 'all linear .08s')}
            }
            .${namespace}popmenu-icon .${namespace}popmenu-item .hd {
                left: ${basic.popmenu.item_padding.iconleft}px;
            }
            .${namespace}popmenu-icon .${namespace}popmenu-item:hover .icon {
                color: ${basic.popmenu.color.hover};
            }
            .${namespace}popmenu-icon .${namespace}popmenu-item:active .icon,
            .${namespace}popmenu-icon .${namespace}popmenu-item.active .icon,
            .${namespace}popmenu-icon .${namespace}popmenu-item.selected .icon {
                color: ${basic.popmenu.color.active};
            }
            .${namespace}popmenu-tree .${namespace}popmenu-item,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item {
                padding-right: ${basic.popmenu.item_padding.treeright}px;
            }
            .${namespace}popmenu-tree .${namespace}popmenu-item > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item > .${namespace}popmenu-sub {
                top: 0;
                left: 100%;
                margin-left: -5px;
                display: none;
            }
            .${namespace}popmenu-tree .${namespace}popmenu-item.hassub::after,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item.hassub::after,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item.hassub::after {
                display: block;
            }
            .${namespace}popmenu-tree .${namespace}popmenu-item.hassub:hover > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item.hassub:hover > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item.hassub:hover > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree .${namespace}popmenu-item.hassub:active > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item.hassub:active > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item.hassub:active > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree .${namespace}popmenu-item.hassub.active > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item.hassub.active > .${namespace}popmenu-sub,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item.hassub.active > .${namespace}popmenu-sub {
                display: block;
            }
            .${namespace}popmenu-tree .${namespace}popmenu-item.hassub:hover::after,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item.hassub:hover::after,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item.hassub:hover::after,
            .${namespace}popmenu-tree .${namespace}popmenu-item.hassub:active::after,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item.hassub:active::after,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item.hassub:active::after,
            .${namespace}popmenu-tree .${namespace}popmenu-item.hassub.active::after,
            .${namespace}popmenu-tree-left .${namespace}popmenu-item.hassub.active::after,
            .${namespace}popmenu-tree-top .${namespace}popmenu-item.hassub.active::after {
                color: ${basic.popmenu.color.hover};
            }
            .${namespace}popmenu-tree-left .${namespace}popmenu-item > .${namespace}popmenu-sub {
                left: auto;
                right: 100%;
                margin-right: -5px;
            }
            .${namespace}popmenu-tree-top .${namespace}popmenu-item > .${namespace}popmenu-sub {
                top: auto;
                bottom: 0px;
            }
            .${namespace}popmenu-full {
                min-width: 100%;
                width: 100%;
            }
            .${namespace}popmenu-small,
            .${namespace}popmenu-small .${namespace}popmenu-sub {
                ${popmenusize(
                    state,
                    basic.popmenu.minwidth.small,
                    basic.popmenu.fontsize.small,
                    basic.popmenu.fontweight.small,
                    basic.popmenu.padding
                )}
            }
            .${namespace}popmenu-small .${namespace}popmenu-item,
            .${namespace}popmenu-small .${namespace}popmenu-sub .${namespace}popmenu-item {
                ${itemsize(
                    state,
                    basic.popmenu.item_height.small,
                    basic.popmenu.item_height.small - basic.popmenu.item_padding.top - basic.popmenu.item_padding.bottom,
                    basic.popmenu.item_padding
                )}
            }
            .${namespace}popmenu-large,
            .${namespace}popmenu-large .${namespace}popmenu-sub {
                ${popmenusize(
                    state,
                    basic.popmenu.minwidth.large,
                    basic.popmenu.fontsize.large,
                    basic.popmenu.fontweight.large,
                    basic.popmenu.padding
                )}
            }
            .${namespace}popmenu-large .${namespace}popmenu-item,
            .${namespace}popmenu-large .${namespace}popmenu-sub .${namespace}popmenu-item {
                ${itemsize(
                    state,
                    basic.popmenu.item_height.large,
                    basic.popmenu.item_height.large - basic.popmenu.item_padding.top - basic.popmenu.item_padding.bottom,
                    basic.popmenu.item_padding
                )}
            }
        `;
    }
};


