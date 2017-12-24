import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

//设置标签尺寸
function tag_size(state, padding, height, lineheight, fontsize, fontweight) {
    fontweight = fontweight || state.data.basic.fontweight.bold;
    return `
        padding: ${padding.top}em ${padding.right}em ${padding.bottom}em ${padding.left}em;
        height: ${height};
        line-height: ${lineheight};
        font-size: ${fontsize};
        font-weight: ${fontweight};
    `;
}
//设置标签风格
function tag_style(state, color, bgcolor, bordercolor, radius) {
    radius = radius || state.data.basic.tag.radius;
    return `
        color: ${color};
        background-color: ${bgcolor};
        border: 1px solid ${bordercolor};
        ${Prefix.border_radius(state, radius +'em')}
    `;
}

export default {
    [MT.CSS_TAG]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  tag

            ====================================================*/
            .${namespace}tag,
            .${namespace}tag-def {
                display: inline-block;
                position: relative;
                text-align: center;
                vertical-align: baseline;
                cursor: ${basic.cursor.def};
                white-space: nowrap;
                ${tag_size(
                    state,
                    basic.tag.padding,
                    basic.tag.height,
                    basic.tag.lineheight,
                    basic.tag.fontsize +'em'
                )}
                ${tag_style(
                    state,
                    basic.tag.color,
                    basic.tag.bgcolor,
                    basic.tag.bordercolor
                )}
                ${Prefix.transition(state)}
            }
            .${namespace}tag-theme {
                ${tag_style(
                    state,
                    basic.colors.white.ladder.normal.hex,
                    basic.colors.theme.ladder.darker.hex,
                    basic.colors.theme.ladder.darker.hex
                )}
            }
            .${namespace}tag-key {
                ${tag_style(
                    state,
                    basic.colors.white.ladder.normal.hex,
                    basic.colors.key.ladder.dark.hex,
                    basic.colors.key.ladder.dark.hex
                )}
            }
            .${namespace}tag-light {
                ${tag_style(
                    state,
                    basic.colors.black.ladder.normal.hex,
                    basic.colors.light.ladder.dark.hex,
                    basic.colors.light.ladder.dark.hex
                )}
            }
            .${namespace}tag-nice {
                ${tag_style(
                    state,
                    basic.colors.white.ladder.normal.hex,
                    basic.colors.nice.ladder.dark.hex,
                    basic.colors.nice.ladder.dark.hex
                )}
            }
            .${namespace}tag-black {
                ${tag_style(
                    state,
                    basic.colors.white.ladder.normal.hex,
                    basic.colors.black.ladder.normal.hex,
                    basic.colors.black.ladder.normal.hex
                )}
            }
            .${namespace}tag-full {
                display: block;
                width: 100%;
            }
            .${namespace}tag-circle {
                padding-left: ${basic.tag.padding_circle.left}em;
                padding-right: ${basic.tag.padding_circle.right}em;
                ${Prefix.border_radius(state, basic.radius.r10 +'em')}
            }
        `;
    }
};


