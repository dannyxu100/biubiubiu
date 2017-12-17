import Vue                      from 'vue';
import Api                      from '_JS_/api.js';
import MT                       from './mutations-types.js';

import Framework                from './mutations-framework.js';
import Grid                     from './mutations-grid.js';
import Table                    from './mutations-table.js';
import Btn                      from './mutations-btn.js';
import Popmenu                  from './mutations-popmenu.js';
import Checkboxradio            from './mutations-checkboxradio.js';

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
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.theme.ladder.darker.rgb}, .5)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.theme.ladder.darker.rgb}, .5)`,
                        disabled:   'none !important'
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
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .5)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .5)`,
                        disabled:   'none !important'
                    }
                },
                theme: {
                    color: {
                        def:        basic.colors.white.ladder.normal.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.normal.hex,
                        active:     basic.colors.white.ladder.light.hex,
                        disabled:   basic.colors.white.ladder.normal.hex
                    },
                    bordercolor: {
                        def:        basic.colors.theme.ladder.dark.hex,
                        hover:      basic.colors.theme.ladder.darker.hex,
                        focus:      basic.colors.theme.ladder.darker.hex,
                        active:     basic.colors.theme.ladder.darker.hex,
                        disabled:   basic.colors.theme.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.theme.ladder.dark.hex,
                        hover:      basic.colors.theme.ladder.normal.hex,
                        focus:      basic.colors.theme.ladder.normal.hex,
                        active:     basic.colors.theme.ladder.normal.hex,
                        disabled:   basic.colors.theme.ladder.dark.hex
                    },
                    shadow: {
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.theme.ladder.darker.rgb}, .5)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.theme.ladder.darker.rgb}, .5)`,
                        disabled:   'none !important'
                    }
                },
                key: {
                    color: {
                        def:        basic.colors.white.ladder.normal.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.normal.hex,
                        active:     basic.colors.white.ladder.light.hex,
                        disabled:   basic.colors.white.ladder.normal.hex
                    },
                    bordercolor: {
                        def:        basic.colors.key.ladder.dark.hex,
                        hover:      basic.colors.key.ladder.darker.hex,
                        focus:      basic.colors.key.ladder.darker.hex,
                        active:     basic.colors.key.ladder.darker.hex,
                        disabled:   basic.colors.key.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.key.ladder.dark.hex,
                        hover:      basic.colors.key.ladder.normal.hex,
                        focus:      basic.colors.key.ladder.normal.hex,
                        active:     basic.colors.key.ladder.normal.hex,
                        disabled:   basic.colors.key.ladder.dark.hex
                    },
                    shadow: {
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.key.ladder.darker.rgb}, .3)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.key.ladder.darker.rgb}, .3)`,
                        disabled:   'none !important'
                    }
                },
                light: {
                    color: {
                        def:        basic.colors.black.ladder.normal.hex,
                        hover:      basic.colors.black.ladder.light.hex,
                        focus:      basic.colors.black.ladder.normal.hex,
                        active:     basic.colors.black.ladder.light.hex,
                        disabled:   basic.colors.black.ladder.normal.hex
                    },
                    bordercolor: {
                        def:        basic.colors.light.ladder.dark.hex,
                        hover:      basic.colors.light.ladder.darker.hex,
                        focus:      basic.colors.light.ladder.darker.hex,
                        active:     basic.colors.light.ladder.darker.hex,
                        disabled:   basic.colors.light.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.light.ladder.dark.hex,
                        hover:      basic.colors.light.ladder.normal.hex,
                        focus:      basic.colors.light.ladder.normal.hex,
                        active:     basic.colors.light.ladder.normal.hex,
                        disabled:   basic.colors.light.ladder.dark.hex
                    },
                    shadow: {
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .15)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .15)`,
                        disabled:   'none !important'
                    }
                },
                nice: {
                    color: {
                        def:        basic.colors.white.ladder.normal.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.normal.hex,
                        active:     basic.colors.white.ladder.light.hex,
                        disabled:   basic.colors.white.ladder.normal.hex
                    },
                    bordercolor: {
                        def:        basic.colors.nice.ladder.dark.hex,
                        hover:      basic.colors.nice.ladder.darker.hex,
                        focus:      basic.colors.nice.ladder.darker.hex,
                        active:     basic.colors.nice.ladder.darker.hex,
                        disabled:   basic.colors.nice.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.nice.ladder.dark.hex,
                        hover:      basic.colors.nice.ladder.normal.hex,
                        focus:      basic.colors.nice.ladder.normal.hex,
                        active:     basic.colors.nice.ladder.normal.hex,
                        disabled:   basic.colors.nice.ladder.dark.hex
                    },
                    shadow: {
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.nice.ladder.darker.rgb}, .3)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.nice.ladder.darker.rgb}, .3)`,
                        disabled:   'none !important'
                    }
                },
                border: {
                    borderwidth:    2,
                    color: {
                        def:        basic.colors.gray.ladder.light.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.light.hex,
                        active:     basic.colors.gray.ladder.light.hex,
                        disabled:   basic.colors.gray.ladder.lighter.hex
                    },
                    bordercolor: {
                        def:        basic.colors.gray.ladder.light.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.light.hex,
                        active:     basic.colors.gray.ladder.light.hex,
                        disabled:   basic.colors.gray.ladder.lighter.hex
                    },
                    bgcolor: {
                        def:        'transparent',
                        hover:      'transparent',
                        focus:      'transparent',
                        active:     'transparent',
                        disabled:   'transparent'
                    },
                    shadow: {
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .5)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .5)`,
                        disabled:   'none !important'
                    }
                },
                borderinverse: {
                    color: {
                        def:        basic.colors.black.ladder.light.hex,
                        hover:      basic.colors.black.ladder.normal.hex,
                        focus:      basic.colors.black.ladder.normal.hex,
                        active:     basic.colors.black.ladder.normal.hex,
                        disabled:   basic.colors.black.ladder.light.hex
                    },
                    bordercolor: {
                        def:        basic.colors.black.ladder.normal.hex,
                        hover:      basic.colors.black.ladder.normal.hex,
                        focus:      basic.colors.black.ladder.normal.hex,
                        active:     basic.colors.black.ladder.normal.hex,
                        disabled:   basic.colors.black.ladder.light.hex
                    },
                    bgcolor: {
                        def:        'transparent',
                        hover:      'transparent',
                        focus:      'transparent',
                        active:     'transparent',
                        disabled:   'transparent'
                    },
                    shadow: {
                        def:        'none',
                        hover:      `0 5px 15px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .3)`,
                        focus:      'none',
                        active:     `0 2px 3px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .3)`,
                        disabled:   'none !important'
                    }
                },
                link: {
                    color: {
                        def:        basic.colors.theme.ladder.dark.hex,
                        hover:      basic.colors.theme.ladder.light.hex,
                        focus:      basic.colors.theme.ladder.dark.hex,
                        active:     basic.colors.theme.ladder.dark.hex,
                        disabled:   basic.colors.theme.ladder.dark.hex
                    },
                    bordercolor: {
                        def:        'transparent',
                        hover:      'transparent',
                        focus:      'transparent',
                        active:     'transparent',
                        disabled:   'transparent'
                    },
                    bgcolor: {
                        def:        'transparent',
                        hover:      'transparent',
                        focus:      'transparent',
                        active:     'transparent',
                        disabled:   'transparent'
                    },
                    shadow: {
                        def:        'none',
                        hover:      'none',
                        focus:      'none',
                        active:     'none',
                        disabled:   'none !important'
                    }
                }
            }
        });
        Api.extend(basic.popmenu, {
            color: {
                def:        basic.colors.black.ladder.normal.hex,
                hover:      basic.colors.white.ladder.light.hex,
                active:     basic.colors.white.ladder.light.hex,
                disabled:   basic.colors.gray.ladder.normal.hex,
                icon:       basic.colors.black.ladder.light.hex
            },
            bgcolor: {
                def:        basic.colors.white.ladder.normal.hex,
                hover:      basic.colors.theme.ladder.dark.hex,
                active:     basic.colors.theme.ladder.darker.hex,
                disabled:   basic.colors.white.ladder.normal.hex
            },
            bordercolor:    'transparent',
            borderwidth:    0,
            zindex: {
                def:        basic.zindex.control,
                active:     basic.zindex.control + 10,
                hover:      basic.zindex.control + 20
            },
            radius:         basic.radius.def,
            shadow:         '0 15px 50px rgba(0, 0, 0, .3)',
            minwidth: {
                def:        160,
                small:      140,
                large:      180
            },
            fontsize: {
                def:        basic.control.fontsize.def,
                small:      basic.control.fontsize.small,
                large:      basic.control.fontsize.large
            },
            fontweight: {
                def:        basic.fontweight.def,
                small:      basic.fontweight.def,
                large:      basic.fontweight.def
            },
            padding: {
                top:        5,
                bottom:     5,
                left:       0,
                right:      0
            },
            selectableright:    35,
            itemheight: {
                def:        28,
                small:      26,
                large:      34
            },
            itempadding: {
                top:        0,
                bottom:     0,
                left:       15,
                right:      15,
                iconleft:   40,
                treeright:  40
            },
            itemshadow:     {
                active:             'none',
                disabled:           'none'
            },
            itemselected: {
                color:              basic.colors.black.ladder.light.hex,
                bgcolor:            basic.colors.gray.ladder.lighter.hex,
                icon:               basic.icons.done,
                iconcolor:          basic.colors.theme.ladder.darker.hex,
                iconfontsize:       14,
                shadow:             'none'
            },
            itemhassub: {
                icon:               basic.icons.rightsmall,
                iconcolor:          basic.colors.theme.ladder.dark.hex,
                iconfontsize:       14
            },
            split: {
                height:             10,
                borderwidth: {
                    top:            1,
                    bottom:         1
                },
                bordercolor: {
                    top:            basic.colors.gray.ladder.lighter.hex,
                    bottom:         basic.colors.white.ladder.light.hex
                }

            }
        });
        // debugger;
    },
    ...Framework,
    ...Grid,
    ...Table,
    ...Btn,
    ...Popmenu,
    ...Checkboxradio
};


