import Vue                      from 'vue';
import Api                      from '_JS_/api.js';
import Color                    from '_JS_/color.js';
import MT                       from './mutations-types.js';

import Framework                from './mutations-framework.js';
import Grid                     from './mutations-grid.js';
import Table                    from './mutations-table.js';
import Btn                      from './mutations-btn.js';
import Popmenu                  from './mutations-popmenu.js';
import Checkboxradio            from './mutations-checkboxradio.js';
import Tabs                     from './mutations-tabs.js';
import Tag                      from './mutations-tag.js';
import Input                    from './mutations-input.js';

import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
    [MT.MERGE_DATA] ( state, newdata ) {
        state.data_copy = Vue.api.copy( state.data );       //备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    },
    ...Framework,
    ...Grid,
    ...Table,
    ...Btn,
    ...Popmenu,
    ...Checkboxradio,
    ...Tabs,
    ...Tag,
    ...Input,
    [MT.INIT_BASIC]( state ) {
        let basic = state.data.basic;

        Api.extend(true, basic.fontcolor, {
            def:        basic.colors.black.ladder.normal.hex,
            weak:       basic.colors.gray.ladder.darker.hex,
            hr:         basic.colors.gray.ladder.lighter.hex,
            small:      basic.colors.gray.ladder.darker.hex,
            link:       basic.colors.theme.ladder.dark.hex,
            linkhover:  basic.colors.theme.ladder.darker.hex
        });
        Api.extend(true, basic.fontcolor, {
            def:        basic.colors.white.ladder.light.hex,
            weak:       basic.colors.white.ladder.normal.hex
        });
        basic.bgcolor.def           = basic.colors.white.ladder.light.hex;
        basic.fontfamily.def        = basic.fontfamily.ios.concat( basic.fontfamily.en, basic.fontfamily.zh, basic.fontfamily.sys ).join(',');
        basic.rem2px                = 1/basic.defpx;                                                              // 1/16 = 0.0625;
        basic.lineheight.auto       = Math.floor(basic.fontsize.def/basic.rem2px * basic.lineheight.def);         //动态行高，根据字体大小计算
        basic.table.fontsize        = basic.fontsize.def;
        basic.table.radius          = basic.radius.r6;

        Api.extend(true, basic.btn, basic.control);
        Api.extend(true, basic.btn, {
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
                        def:        basic.colors.black.ladder.dark.hex,
                        hover:      basic.colors.black.ladder.darkest.hex,
                        focus:      basic.colors.black.ladder.darkest.hex,
                        active:     basic.colors.black.ladder.darker.hex,
                        disabled:   basic.colors.black.ladder.dark.hex
                    },
                    bordercolor: {
                        def:        basic.colors.white.ladder.normal.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.light.hex,
                        active:     basic.colors.gray.ladder.lighter.hex,
                        disabled:   basic.colors.white.ladder.normal.hex
                    },
                    bgcolor: {
                        def:        basic.colors.white.ladder.normal.hex,
                        hover:      basic.colors.white.ladder.light.hex,
                        focus:      basic.colors.white.ladder.light.hex,
                        active:     basic.colors.gray.ladder.lighter.hex,
                        disabled:   basic.colors.white.ladder.normal.hex
                    },
                    shadow: {
                        def:        `0 1px 2px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .2)`,
                        hover:      `0 3px 10px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .3)`,
                        focus:      `0 0 0 3px rgba(${basic.colors.black.ladder.darker.rgb}, .3)`,
                        active:     `0 2px 5px rgba(${basic.colors.black.ladder.darker.rgb}, .4)`
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
                        def:        basic.colors.black.ladder.normal.hex,
                        hover:      basic.colors.black.ladder.dark.hex,
                        focus:      basic.colors.black.ladder.dark.hex,
                        active:     basic.colors.black.ladder.darker.hex,
                        disabled:   basic.colors.black.ladder.normal.hex
                    },
                    bgcolor: {
                        def:        basic.colors.black.ladder.normal.hex,
                        hover:      basic.colors.black.ladder.dark.hex,
                        focus:      basic.colors.black.ladder.dark.hex,
                        active:     basic.colors.black.ladder.darker.hex,
                        disabled:   basic.colors.black.ladder.normal.hex
                    },
                    shadow: {
                        def:        `0 1px 3px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .3)`,
                        hover:      `0 3px 10px 0 rgba(${basic.colors.black.ladder.darker.rgb}, .3)`,
                        focus:      `0 0 0 3px rgba(${basic.colors.black.ladder.darker.rgb}, .3)`,
                        active:     `0 2px 5px rgba(${basic.colors.black.ladder.darker.rgb}, .4)`
                    }
                },
                border: {
                    color: {
                        def:        basic.colors.gray.ladder.light.hex,
                        hover:      basic.colors.white.ladder.normal.hex,
                        focus:      basic.colors.white.ladder.light.hex,
                        active:     basic.colors.gray.ladder.darker.hex,
                        disabled:   basic.colors.gray.ladder.light.hex
                    },
                    bordercolor: {
                        def:        basic.colors.gray.ladder.light.hex,
                        hover:      basic.colors.white.ladder.normal.hex,
                        focus:      basic.colors.white.ladder.light.hex,
                        active:     basic.colors.gray.ladder.darker.hex,
                        disabled:   basic.colors.gray.ladder.light.hex
                    }
                },
                borderinverse: {
                    color: {
                        def:        basic.colors.black.ladder.light.hex,
                        hover:      basic.colors.black.ladder.dark.hex,
                        focus:      basic.colors.black.ladder.darker.hex,
                        active:     basic.colors.black.ladder.light.hex,
                        disabled:   basic.colors.black.ladder.light.hex
                    },
                    bordercolor: {
                        def:        basic.colors.black.ladder.light.hex,
                        hover:      basic.colors.black.ladder.dark.hex,
                        focus:      basic.colors.black.ladder.darker.hex,
                        active:     basic.colors.black.ladder.light.hex,
                        disabled:   basic.colors.black.ladder.light.hex
                    }
                },
                link: {
                    color: {
                        def:        basic.colors.theme.ladder.dark.hex,
                        hover:      basic.colors.theme.ladder.darker.hex,
                        focus:      basic.colors.theme.ladder.darker.hex,
                        active:     basic.colors.theme.ladder.darker.hex,
                        disabled:   basic.colors.theme.ladder.darker.hex
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
                        hover:      basic.colors.theme.ladder.normal.hex,
                        focus:      basic.colors.theme.ladder.normal.hex,
                        active:     basic.colors.theme.ladder.dark.hex,
                        disabled:   basic.colors.theme.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.theme.ladder.dark.hex,
                        hover:      basic.colors.theme.ladder.normal.hex,
                        focus:      basic.colors.theme.ladder.normal.hex,
                        active:     basic.colors.theme.ladder.dark.hex,
                        disabled:   basic.colors.theme.ladder.dark.hex
                    },
                    shadow: {
                        def:        `0 1px 2px 0 rgba(${basic.colors.theme.ladder.darker.rgb}, .8)`,
                        hover:      `0 3px 10px 0 rgba(${basic.colors.theme.ladder.dark.rgb}, .8)`,
                        focus:      `0 0 0 3px rgba(${basic.colors.theme.ladder.dark.rgb}, .5)`,
                        active:     `0 2px 5px rgba(${basic.colors.theme.ladder.dark.rgb}, .4)`
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
                        hover:      basic.colors.key.ladder.normal.hex,
                        focus:      basic.colors.key.ladder.normal.hex,
                        active:     basic.colors.key.ladder.dark.hex,
                        disabled:   basic.colors.key.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.key.ladder.dark.hex,
                        hover:      basic.colors.key.ladder.normal.hex,
                        focus:      basic.colors.key.ladder.normal.hex,
                        active:     basic.colors.key.ladder.dark.hex,
                        disabled:   basic.colors.key.ladder.dark.hex
                    },
                    shadow: {
                        def:        `0 1px 2px 0 rgba(${basic.colors.key.ladder.darker.rgb}, .6)`,
                        hover:      `0 3px 10px 0 rgba(${basic.colors.key.ladder.dark.rgb}, .5)`,
                        focus:      `0 0 0 3px rgba(${basic.colors.key.ladder.dark.rgb}, .4)`,
                        active:     `0 2px 5px rgba(${basic.colors.key.ladder.dark.rgb}, .3)`
                    }
                },
                light: {
                    color: {
                        def:        basic.colors.black.ladder.normal.hex,
                        hover:      basic.colors.black.ladder.dark.hex,
                        focus:      basic.colors.black.ladder.dark.hex,
                        active:     basic.colors.black.ladder.dark.hex,
                        disabled:   basic.colors.black.ladder.normal.hex
                    },
                    bordercolor: {
                        def:        basic.colors.light.ladder.dark.hex,
                        hover:      basic.colors.light.ladder.light.hex,
                        focus:      basic.colors.light.ladder.light.hex,
                        active:     basic.colors.light.ladder.dark.hex,
                        disabled:   basic.colors.light.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.light.ladder.dark.hex,
                        hover:      basic.colors.light.ladder.light.hex,
                        focus:      basic.colors.light.ladder.light.hex,
                        active:     basic.colors.light.ladder.dark.hex,
                        disabled:   basic.colors.light.ladder.dark.hex
                    },
                    shadow: {
                        def:        `0 1px 2px 0 rgba(${basic.colors.gray.ladder.darker.rgb}, .6)`,
                        hover:      `0 3px 10px 0 rgba(${basic.colors.gray.ladder.dark.rgb}, .5)`,
                        focus:      `0 0 0 3px rgba(${basic.colors.gray.ladder.dark.rgb}, .6)`,
                        active:     `0 2px 5px rgba(${basic.colors.gray.ladder.dark.rgb}, .4)`
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
                        hover:      basic.colors.nice.ladder.normal.hex,
                        focus:      basic.colors.nice.ladder.normal.hex,
                        active:     basic.colors.nice.ladder.dark.hex,
                        disabled:   basic.colors.nice.ladder.dark.hex
                    },
                    bgcolor: {
                        def:        basic.colors.nice.ladder.dark.hex,
                        hover:      basic.colors.nice.ladder.normal.hex,
                        focus:      basic.colors.nice.ladder.normal.hex,
                        active:     basic.colors.nice.ladder.dark.hex,
                        disabled:   basic.colors.nice.ladder.dark.hex
                    },
                    shadow: {
                        def:        `0 1px 3px 0 rgba(${basic.colors.nice.ladder.darker.rgb}, .9)`,
                        hover:      `0 3px 10px 0 rgba(${basic.colors.nice.ladder.dark.rgb}, .8)`,
                        focus:      `0 0 0 3px rgba(${basic.colors.nice.ladder.dark.rgb}, .5)`,
                        active:     `0 2px 5px rgba(${basic.colors.nice.ladder.dark.rgb}, .4)`
                    }
                }
            }
        });
        Api.extend(true, basic.popmenu, {
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
            zindex: {
                def:        basic.zindex.control,
                active:     basic.zindex.control + 10,
                hover:      basic.zindex.control + 20
            },
            radius:         basic.radius.def,
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
            item_selected: {
                color:              basic.colors.black.ladder.light.hex,
                bgcolor:            basic.colors.gray.ladder.lighter.hex,
                icon:               basic.icons.done,
                iconcolor:          basic.colors.theme.ladder.darker.hex
            },
            item_hassub: {
                icon:               basic.icons.rightsmall,
                iconcolor:          basic.colors.theme.ladder.dark.hex
            },
            split: {
                bordercolor: {
                    top:            basic.colors.gray.ladder.lighter.hex,
                    bottom:         basic.colors.white.ladder.light.hex
                }

            }
        });
        Api.extend(true, basic.chkradio, {
            fontsize:               basic.control.fontsize.def,
            zindex: {
                before:             basic.zindex.control,
                after:              basic.zindex.control + 10
            },
            icon_after:             basic.icons.done,
            color: {
                def:                basic.colors.gray.ladder.lighter.hex,
                hover:              basic.colors.gray.ladder.lighter.hex,
                checked:            basic.colors.white.ladder.light.hex,
                disabled:           basic.colors.gray.ladder.normal.hex
            },
            style: {
                def: {
                    bordercolor_before: {
                        def:                basic.colors.gray.ladder.light.hex,
                        hover:              basic.colors.gray.ladder.lighter.hex,
                        checked:            basic.colors.white.ladder.light.hex,
                        disabled:           basic.colors.gray.ladder.light.hex
                    },
                    bgcolor_before: {
                        checked:            basic.colors.white.ladder.light.hex
                    },
                    // bgcolor_before: {
                    //     def:                'rgba('+ basic.colors.gray.ladder.lighter.rgb +', 1)',
                    //     hover:              'rgba('+ basic.colors.gray.ladder.lighter.rgb +', 1)',
                    //     checked:            'rgba('+ basic.colors.white.ladder.light.rgb +', 1)',
                    //     disabled:           'rgba('+ basic.colors.gray.ladder.lighter.rgb +', 1)'
                    // },
                    bgcolor_after: {
                        hover:              basic.colors.gray.ladder.lighter.hex,
                        checked:            basic.colors.black.ladder.darker.hex
                    },
                    color_after: {
                        hover:              basic.colors.gray.ladder.lighter.hex,
                        checked:            basic.colors.black.ladder.darkest.hex
                    }
                },
                theme: {
                    bordercolor_before: {
                        def:                basic.colors.theme.ladder.darker.hex,
                        hover:              basic.colors.theme.ladder.darker.hex,
                        checked:            basic.colors.theme.ladder.darker.hex,
                        disabled:           basic.colors.theme.ladder.darker.hex
                    },
                    bgcolor_before: {
                        checked:            basic.colors.theme.ladder.darker.hex
                    },
                    // bgcolor_before: {
                    //     def:                'rgba('+ basic.colors.theme.ladder.darker.rgb +', .8)',
                    //     hover:              'rgba('+ basic.colors.theme.ladder.darker.rgb +', .8)',
                    //     checked:            'rgba('+ basic.colors.theme.ladder.darker.rgb +', 1)',
                    //     disabled:           'rgba('+ basic.colors.theme.ladder.darker.rgb +', .8)'
                    // },
                    bgcolor_after: {
                        hover:              basic.colors.theme.ladder.darker.hex,
                        checked:            basic.colors.white.ladder.light.hex
                    },
                    color_after: {
                        hover:              basic.colors.theme.ladder.darker.hex,
                        checked:            basic.colors.white.ladder.light.hex
                    }
                },
                key: {
                    bordercolor_before: {
                        def:                basic.colors.key.ladder.darker.hex,
                        hover:              basic.colors.key.ladder.darker.hex,
                        checked:            basic.colors.key.ladder.darker.hex,
                        disabled:           basic.colors.key.ladder.darker.hex
                    },
                    bgcolor_before: {
                        checked:            basic.colors.key.ladder.darker.hex
                    },
                    // bgcolor_before: {
                    //     def:                'rgba('+ basic.colors.key.ladder.darker.rgb +', .9)',
                    //     hover:              'rgba('+ basic.colors.key.ladder.darker.rgb +', .9)',
                    //     checked:            'rgba('+ basic.colors.key.ladder.darker.rgb +', 1)',
                    //     disabled:           'rgba('+ basic.colors.key.ladder.darker.rgb +', .9)'
                    // },
                    bgcolor_after: {
                        hover:              basic.colors.key.ladder.darker.hex,
                        checked:            basic.colors.white.ladder.light.hex
                    },
                    color_after: {
                        hover:              basic.colors.key.ladder.darker.hex,
                        checked:            basic.colors.white.ladder.light.hex
                    }
                },
                light: {
                    bordercolor_before: {
                        def:                basic.colors.light.ladder.darker.hex,
                        hover:              basic.colors.light.ladder.darker.hex,
                        checked:            basic.colors.light.ladder.darker.hex,
                        disabled:           basic.colors.light.ladder.darker.hex
                    },
                    bgcolor_before: {
                        checked:            basic.colors.light.ladder.darker.hex
                    },
                    bgcolor_after: {
                        hover:              basic.colors.black.ladder.darker.hex,
                        checked:            basic.colors.black.ladder.dark.hex
                    },
                    color_after: {
                        hover:              basic.colors.black.ladder.darker.hex,
                        checked:            basic.colors.black.ladder.dark.hex
                    }
                },
                nice: {
                    bordercolor_before: {
                        def:                basic.colors.nice.ladder.darker.hex,
                        hover:              basic.colors.nice.ladder.darker.hex,
                        checked:            basic.colors.nice.ladder.darker.hex,
                        disabled:           basic.colors.nice.ladder.darker.hex
                    },
                    bgcolor_before: {
                        checked:            basic.colors.nice.ladder.darker.hex
                    },
                    bgcolor_after: {
                        hover:              basic.colors.nice.ladder.darker.hex,
                        checked:            basic.colors.white.ladder.light.hex
                    },
                    color_after: {
                        hover:              basic.colors.nice.ladder.darker.hex,
                        checked:            basic.colors.white.ladder.light.hex
                    }
                }
            }
        });
        Api.extend(true, basic.tabs, {
            bgcolor:                'transparent',
            borderwidth_navs:       1,
            bordercolor_navs:       'rgba('+ basic.colors.theme.ladder.darker.rgb +', 0.3)',
            zindex:                 basic.zindex.bg,
            nav: {
                color: {
                    def:            'rgba('+ basic.colors.theme.ladder.darker.rgb +', 0.8)',
                    hover:          'rgba('+ basic.colors.white.ladder.light.rgb +', 0.6)',
                    active:         'rgba('+ basic.colors.white.ladder.light.rgb +', 1)',
                },
                bordercolor: {
                    active:         basic.colors.white.ladder.light.hex
                },
                lineheight: {
                    def:            basic.tabs.nav.height.def - basic.tabs.nav.padding.def.top - basic.tabs.nav.padding.def.bottom,
                    small:          basic.tabs.nav.height.small - basic.tabs.nav.padding.small.top - basic.tabs.nav.padding.small.bottom
                },
                zindex: {
                    def:            basic.zindex.control,
                    hover:          basic.zindex.control +10,
                    active:         basic.zindex.control +20
                },
                // shadow: {
                //     hover:          '0 -1px 3px rgba(0, 0, 0, .05)',
                //     active:         '0 -2px 3px rgba(0, 0, 0, .06)'
                // },
                radius:             basic.radius.def,
                icon_popmenu:       basic.icons.rightsmall
            }
        });
        Api.extend(true, basic.tag, {
            color:              basic.colors.white.ladder.normal.hex,
            bgcolor:            basic.colors.gray.ladder.darkest.hex,
            bordercolor:        basic.colors.gray.ladder.darkest.hex,
            radius:             basic.radius.def
        });
        Api.extend(true, basic.input, {
            height: {
                def:                basic.control.height.def,
                small:              basic.control.height.small,
                large:              basic.control.height.large,
                textarea:           basic.control.height.def * 3
            },
            lineheight:             basic.lineheight.def,
            fontsize: {
                def:                basic.control.fontsize.def,
                small:              basic.control.fontsize.small,
                large:              basic.control.fontsize.large
            },
            radius: {
                textarea:           basic.radius.def,
                group:              basic.radius.def
            },
            style: {
                def: {
                    color: {
                        def:                basic.colors.white.ladder.darker.hex,
                        focus:              basic.colors.white.ladder.normal.hex,
                        disabled:           basic.colors.gray.ladder.darker.hex
                    },
                    bordercolor: {
                        def:                Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba,
                        focus:              Color.opacity(basic.colors.white.ladder.light.hex, 0.8).$rgba,
                        disabled:           Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba
                    }
                },
                theme: {
                    color: {
                        def:                basic.colors.black.ladder.light.hex,
                        focus:              basic.colors.black.ladder.light.hex,
                        disabled:           basic.colors.gray.ladder.darker.hex
                    },
                    bordercolor: {
                        def:                Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba,
                        focus:              Color.opacity(basic.colors.theme.ladder.darker.hex, 0.8).$rgba,
                        disabled:           Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba
                    }
                },
                key: {
                    color: {
                        def:                basic.colors.black.ladder.light.hex,
                        focus:              basic.colors.black.ladder.light.hex,
                        disabled:           basic.colors.gray.ladder.darker.hex
                    },
                    bordercolor: {
                        def:                Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba,
                        focus:              Color.opacity(basic.colors.key.ladder.normal.hex, 0.8).$rgba,
                        disabled:           Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba
                    }
                },
                light: {
                    color: {
                        def:                basic.colors.black.ladder.light.hex,
                        focus:              basic.colors.black.ladder.light.hex,
                        disabled:           basic.colors.gray.ladder.darker.hex
                    },
                    bordercolor: {
                        def:                Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba,
                        focus:              Color.opacity(basic.colors.light.ladder.darker.hex, 0.8).$rgba,
                        disabled:           Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba
                    }
                },
                nice: {
                    color: {
                        def:                basic.colors.black.ladder.light.hex,
                        focus:              basic.colors.black.ladder.light.hex,
                        disabled:           basic.colors.gray.ladder.darker.hex
                    },
                    bordercolor: {
                        def:                Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba,
                        focus:              Color.opacity(basic.colors.nice.ladder.normal.hex, 0.8).$rgba,
                        disabled:           Color.opacity(basic.colors.white.ladder.light.hex, 0.3).$rgba
                    }
                }
            },
            group: {
                zindex: {
                    def:                    basic.zindex.control,
                    focus:                  basic.zindex.control +20,
                    addons:                 basic.zindex.control +10,
                    addons_btn:             basic.zindex.control,
                    addons_btn_hover:       basic.zindex.control +10
                },
                radius:                     basic.radius.def
            }
        });
        // debugger;
    }
};


