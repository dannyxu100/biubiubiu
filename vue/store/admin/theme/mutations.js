import Vue                      from 'vue';
import Api                      from '_JS_/api.js';
import MT                       from './mutations-types.js';

import Framework                from './mutations-framework.js';
import Grid                     from './mutations-grid.js';
import Table                    from './mutations-table.js';
import Btn                      from './mutations-btn.js';

import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
    [MT.MERGE_DATA] ( state, newdata ) {
        state.data_copy = Vue.api.copy( state.data );       //备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    },
    [MT.INIT_BASIC]( state ) {
        let basic = state.data.basic;

        Api.extend(basic.fontcolor, {
            def:        basic.colors.black.ladder.normal.hex,
            weak:       basic.colors.gray.ladder.darker.hex,
            hr:         basic.colors.gray.ladder.lighter.hex,
            small:      basic.colors.gray.ladder.darker.hex,
            link:       basic.colors.theme.ladder.dark.hex,
            linkhover:  basic.colors.theme.ladder.darker.hex
        });
        Api.extend(basic.fontcolor, {
            def:        basic.colors.white.ladder.light.hex,
            weak:       basic.colors.white.ladder.normal.hex
        });
        basic.fontfamily.def        = basic.fontfamily.ios.concat( basic.fontfamily.en, basic.fontfamily.zh, basic.fontfamily.sys ).join(',');
        basic.rem2px                = 1/basic.defpx;                                                              // 1/16 = 0.0625;
        basic.lineheight.auto       = Math.floor(basic.fontsize.def/basic.rem2px * basic.lineheight.def);         //动态行高，根据字体大小计算
        basic.table.fontsize        = basic.fontsize.def;
        basic.table.radius          = basic.radius.r6;

        Api.extend(basic.btn, basic.control);
        Api.extend(basic.btn, {
            lineheight: {
                def:        basic.btn.height.def-(basic.control.padding.def.top+basic.control.padding.def.bottom)-2,
                small:      basic.btn.height.small-(basic.control.padding.small.top+basic.control.padding.small.bottom)-2,
                large:      basic.btn.height.large-(basic.control.padding.large.top+basic.control.padding.large.bottom)-2
            },
            radius:         basic.radius.def,
            zindex: {
                def:        basic.zindex.control,
                active:     basic.zindex.control + 10
            },
            style: {
                def: {
                    color: {
                        def:        basic.colors.black.ladder.light.hex,
                        hover:      basic.colors.black.ladder.dark.hex,
                        focus:      basic.colors.black.ladder.dark.hex,
                        active:     basic.colors.black.ladder.light.hex,
                        disabled:   basic.colors.black.ladder.light.hex
                    },
                    bordercolor: {
                        def:        basic.colors.theme.ladder.dark.hex,
                        hover:      basic.colors.theme.ladder.darker.hex,
                        focus:      basic.colors.theme.ladder.darker.hex,
                        active:     basic.colors.theme.ladder.darker.hex,
                        disabled:   basic.colors.theme.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.white.ladder.dark.hex,
                        hover:      basic.colors.white.ladder.normal.hex,
                        focus:      basic.colors.white.ladder.normal.hex,
                        active:     basic.colors.white.ladder.normal.hex,
                        disabled:   basic.colors.white.ladder.dark.hex
                    },
                    shadow: {
                        def:            'none',
                        hover:          `0 5px 15px 0 rgba(${basic.colors.theme.ladder.darker.rgb}, .5)`,
                        focus:          'none',
                        active:         `0 1px 3px 0 rgba(${basic.colors.theme.ladder.darker.rgb}, .5)`,
                        disabled:       'none !important'
                    }
                },
                inverse: {
                    color: {
                        def:        basic.colors.white.ladder.normal.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.normal.hex,
                        active:     basic.colors.white.ladder.light.hex,
                        disabled:   basic.colors.white.ladder.normal.hex
                    },
                    bordercolor: {
                        def:        basic.colors.black.ladder.dark.hex,
                        hover:      basic.colors.black.ladder.darker.hex,
                        focus:      basic.colors.black.ladder.darker.hex,
                        active:     basic.colors.black.ladder.darker.hex,
                        disabled:   basic.colors.black.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.black.ladder.dark.hex,
                        hover:      basic.colors.black.ladder.normal.hex,
                        focus:      basic.colors.black.ladder.normal.hex,
                        active:     basic.colors.black.ladder.normal.hex,
                        disabled:   basic.colors.black.ladder.dark.hex
                    },
                    shadow: {
                        def:            'none',
                        hover:          `0 5px 15px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .5)`,
                        focus:          'none',
                        active:         `0 1px 3px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .5)`,
                        disabled:       'none !important'
                    }
                }
            }
        });
    },
    ...Framework,
    ...Grid,
    ...Table,
    ...Btn
};


