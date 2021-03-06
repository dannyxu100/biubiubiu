import Vue                      from 'vue';
import Vuex                     from 'vuex';
import Mutations                from './mutations.js';
import Getters                  from './getters.js';
import Actions                  from './actions.js';
Vue.use(Vuex);

const State = {
    data_copy: {},
    data: {
        csstext:        '',
        basic: {
            //命名空间（前缀）
            namespace:  '',
            //主题色
            colors: {
                theme: {
                    editable:   true,
                    ladder: {
                        lightest:   {
                            name:   '主题-最亮',
                            class:  '.bgtheme-lightest',
                            hex:    '#C9FFFF',
                            rgb:    'rgb(201,255,255)',
                        },
                        lighter:    {
                            name:   '主题-较亮',
                            class:  '.bgtheme-lighter',
                            hex:    '#5FFFFF',
                            rgb:    'rgb(95,255,255)',
                        },
                        light:      {
                            name:   '主题-亮',
                            class:  '.bgtheme-light',
                            hex:    '#23E1FF',
                            rgb:    'rgb(35,225,255)',
                        },
                        normal:     {
                            name:   '主题',
                            class:  '.bgtheme',
                            hex:    '#05C3F9',
                            rgb:    'rgb(5,195,249)',
                        },
                        dark:       {
                            name:   '主题-暗',
                            class:  '.bgtheme-dark',
                            hex:    '#00AFE5',
                            rgb:    'rgb(0,175,229)',
                        },
                        darker:     {
                            name:   '主题-较暗',
                            class:  '.bgtheme-darker',
                            hex:    '#0087BD',
                            rgb:    'rgb(0,135,189)',
                        },
                        darkest:    null
                    },
                    complementary: {
                        hex:    '#FA3C06',
                        rgb:    'rgb(250,60,6)',
                    }
                },
                key: {
                    editable:   true,
                    ladder: {
                        lightest:   null,
                        lighter:    null,
                        light:      {
                            name:   '关键的-亮',
                            class:  '.bgkey-light',
                            hex:    '#FF7157',
                            rgb:    'rgb(255,113,87)',
                        },
                        normal:     {
                            name:   '关键的',
                            class:  '.bgkey',
                            hex:    '#F95339',
                            rgb:    'rgb(249,83,57)',
                        },
                        dark:       {
                            name:   '关键的-暗',
                            class:  '.bgkey-dark',
                            hex:    '#E53F25',
                            rgb:    'rgb(229,63,37)',
                        },
                        darker:     {
                            name:   '关键的-较暗',
                            class:  '.bgkey-darker',
                            hex:    '#BD1700',
                            rgb:    'rgb(189,23,0)',
                        },
                        darkest:    null,
                    },
                    complementary: {
                        hex:    '#06ACC6',
                        rgb:    'rgb(6,172,198)',
                    }
                },
                light: {
                    editable:   true,
                    ladder: {
                        lightest:   {
                            name:   '闪亮的-最亮',
                            class:  '.bglight-lightest',
                            hex:    '#FFFFC5',
                            rgb:    'rgb(255,255,197)',
                        },
                        lighter:    {
                            name:   '闪亮的-较亮',
                            class:  '.bglight-lighter',
                            hex:    '#FFFF5B',
                            rgb:    'rgb(255,255,91)',
                        },
                        light:      {
                            name:   '闪亮的-亮',
                            class:  '.bglight-light',
                            hex:    '#FFFF1F',
                            rgb:    'rgb(255,255,31)',
                        },
                        normal:     {
                            name:   '闪亮的',
                            class:  '.bglight',
                            hex:    '#FFFF01',
                            rgb:    'rgb(255,255,1)',
                        },
                        dark:       {
                            name:   '闪亮的-暗',
                            class:  '.bglight-dark',
                            hex:    '#EBEB00',
                            rgb:    'rgb(235,235,0)',
                        },
                        darker:     {
                            name:   '闪亮的-较暗',
                            class:  '.bglight-darker',
                            hex:    '#C3C300',
                            rgb:    'rgb(195,195,0)',
                        },
                        darkest:    null,
                    },
                    complementary: {
                        hex:    '#0000FE',
                        rgb:    'rgb(0,0,254)',
                    }
                },
                nice: {
                    editable:   true,
                    ladder: {
                        lightest:   null,
                        lighter:    {
                            name:   '友好的-较亮',
                            class:  '.bgnice-lighter',
                            hex:    '#5BFFD1',
                            rgb:    'rgb(91,255,209)',
                        },
                        light:      {
                            name:   '友好的-亮',
                            class:  '.bgnice-light',
                            hex:    '#1FE495',
                            rgb:    'rgb(31,228,149)',
                        },
                        normal:     {
                            name:   '友好的',
                            class:  '.bgnice',
                            hex:    '#01C677',
                            rgb:    'rgb(1,198,119)',
                        },
                        dark:       {
                            name:   '友好的-暗',
                            class:  '.bgnice-dark',
                            hex:    '#00B263',
                            rgb:    'rgb(0,178,99)',
                        },
                        darker:     {
                            name:   '友好的-较暗',
                            class:  '.bgnice-darker',
                            hex:    '#008A3B',
                            rgb:    'rgb(0,138,59)',
                        },
                        darkest:    null,
                    },
                    complementary: {
                        hex:    '#FE3988',
                        rgb:    'rgb(254,57,136)',
                    }
                },
                black: {
                    editable:   false,
                    ladder: {
                        lightest:   null,
                        lighter:    null,
                        light:      {
                            name:   '黑-亮',
                            class:  '.bgblack-light',
                            hex:    '#666666',
                            rgb:    'rgb(102,102,102)',
                        },
                        normal:     {
                            name:   '黑',
                            class:  '.bgblack',
                            hex:    '#444444',
                            rgb:    'rgb(68,68,68)',
                        },
                        dark:       {
                            name:   '黑-暗',
                            class:  '.bgblack-dark',
                            hex:    '#333333',
                            rgb:    'rgb(51,51,51)',
                        },
                        darker:     {
                            name:   '黑-较暗',
                            class:  '.bgblack-darker',
                            hex:    '#141414',
                            rgb:    'rgb(20,20,20)',
                        },
                        darkest:    {
                            name:   '黑-最暗',
                            class:  '.bgblack-darkest',
                            hex:    '#000000',
                            rgb:    'rgb(0,0,0)',
                        },
                    }
                },
                gray: {
                    editable:   false,
                    ladder: {
                        lightest:   null,
                        lighter:    {
                            name:   '灰-较亮',
                            class:  '.bggray-lighter',
                            hex:    '#EEEEEE',
                            rgb:    'rgb(238,238,238)',
                        },
                        light:      {
                            name:   '灰-亮',
                            class:  '.bggray-light',
                            hex:    '#DDDDDD',
                            rgb:    'rgb(221,221,221)',
                        },
                        normal:     {
                            name:   '灰',
                            class:  '.bggray',
                            hex:    '#CCCCCC',
                            rgb:    'rgb(204,204,204)',
                        },
                        dark:       {
                            name:   '灰-暗',
                            class:  '.bggray-dark',
                            hex:    '#BBBBBB',
                            rgb:    'rgb(187,187,187)',
                        },
                        darker:     {
                            name:   '灰-较暗',
                            class:  '.bggray-darker',
                            hex:    '#AAAAAA',
                            rgb:    'rgb(170,170,170)',
                        },
                        darkest:    {
                            name:   '灰-最暗',
                            class:  '.bggray-darkest',
                            hex:    '#999999',
                            rgb:    'rgb(153,153,153)',
                        },
                    }
                },
                white: {
                    editable:   false,
                    ladder: {
                        lightest:   null,
                        lighter:    null,
                        light:      {
                            name:   '白-亮',
                            class:  '.bgwhite-light',
                            hex:    '#FFFFFF',
                            rgb:    'rgb(255,255,255)',
                        },
                        normal:     {
                            name:   '白',
                            class:  '.bgwhite',
                            hex:    '#FAFAFA',
                            rgb:    'rgb(250,250,250)',
                        },
                        dark:       {
                            name:   '白-暗',
                            class:  '.bgwhite-dark',
                            hex:    '#F7F7F7',
                            rgb:    'rgb(247,247,247)',
                        },
                        darker:     {
                            name:   '白-较暗',
                            class:  '.bgwhite-darker',
                            hex:    '#F5F5F5',
                            rgb:    'rgb(245,245,245)',
                        },
                        darkest:    {
                            name:   '白-最暗',
                            class:  '.bgwhite-darkest',
                            hex:    '#F3F3F3',
                            rgb:    'rgb(243,243,243)',
                        },
                    }
                },
            },
            //字色
            fontcolor: {
                def:            '',
                weak:           '',
                title:          'inherit',
                hr:             'inherit',
                small:          'inherit',
                link:           '',
                linkhover:      '',
                placeholder:    ''
            },
            //底色
            bgcolor: {
                def:        '',
                weak:       ''
            },
            //控件
            control: {
                height: {
                    def:    35,                         //px
                    small:  28,
                    large:  45
                },
                fontsize: {
                    def:    14,
                    small:  12,
                    large:  16
                },
                padding: {
                    def: {
                        top:        8,
                        bottom:     8,
                        left:       18,
                        right:      18
                    },
                    small: {
                        top:        6,
                        bottom:     6,
                        left:       14,
                        right:      14
                    },
                    large: {
                        top:        10,
                        bottom:     10,
                        left:       30,
                        right:      30
                    },
                }
            },
            //字体
            fontfamily: {
                ios:    ['-apple-system', 'sf_ui_textlight'],
                en:     ['"ff-tisa-web-pro-1"', '"ff-tisa-web-pro-2"', '"Lucida Grande"', '"Helvetica Neue"', 'Helvetica', '"Nimbus Sans L"', 'Arial'],
                zh:     ['"Hiragino Sans GB"', '"Hiragino Sans GB W3"', '"Microsoft YaHei UI"', '"Microsoft YaHei"', '"WenQuanYi Micro Hei"'],
                sys:    ['sans-serif'],
                title:  ['inherit'],
                html:   ['"Helvetica Neue", Helvetica, Arial, sans-serif'],
                def:    '',
                icon:   '"iconfont"'
            },
            //图标（必要功能图标）
            icons: {
                done:                           '"\\e60b"',
                delete:                         '"\\e608"',

                checkboxbefore:                 '"\\e620"',
                checkboxafter:                  '"\\e621"',
                checkboxafterchecked:           '"\\e622"',
                radiobefore:                    '"\\e64b"',
                radioafter:                     '"\\e64c"',
                radioafterchecked:              '"\\e64a"',

                left:                           '"\\e603"',
                leftsmall:                      '"\\e61f"',
                right:                          '"\\e601"',
                rightsmall:                     '"\\e652"',
                down:                           '"\\e600"',
                downsmall:                      '"\\e64d"',
                up:                             '"\\e602"',
                upsmall:                        '"\\e615"',

                snow:                           '*',
            },
            //字号
            defpx:      16,
            rem2px:     0,
            fontsize: {
                s:          0.75,                   // 12px
                def:        0.875,                  // 14px
                m:          1,                      // 16px
                l:          1.125,                  // 16px
                xl:         1.5,                    // 18px
                xxl:        1.875,                  // 30px
                xxxl:       2.25                    // 36px
            },
            fontweight: {
                def:        400,                    // normal
                bold:       700,                    // bold
                title:      500                     // medium
            },
            //行高
            lineheight: {
                def:        1.5,
                auto:       0,
                title:      1.1
            },
            //边框
            border: {
                style: {
                    def:        'solid',
                    dotted:     'dotted',
                    double:     'double',
                    dashed:     'dashed'
                },
                width: 1,
                color: ''
            },
            //层级
            zindex: {
                def:        0,
                bg:         1,
                control:    100,
                layer:      1000
            },
            //倒角
            radius: {
                def:        0.3,           //em
                r1:         0.1,
                r2:         0.2,
                r3:         0.3,
                r4:         0.4,
                r5:         0.5,
                r6:         0.6,
                r7:         0.7,
                r8:         0.8,
                r9:         0.9,
                r10:        1,
            },
            //指针样式
            cursor: {
                def:        'default',
                pointer:    'pointer',
                no:         'not-allowed',
                loading:    'wait'
            },
            //栅格
            grid: {
                colspace: 2,
                rowspace: 2
            },
            //表格
            table: {
                caption: {
                    color:      'rgb(255,255,255)',
                    bgcolor:    'linear-gradient(225deg, rgb(0, 83, 185), rgb(163, 108, 249))'
                },
                color: {
                    def:        'rgb(175, 224, 224)',
                    head:       'rgb(210, 233, 236)',
                    body:       'rgb(175, 224, 224)',
                    foot:       'rgb(175, 224, 224)',
                    hover:      'rgb(255,255,255)'
                },
                bgcolor: {
                    def:        'linear-gradient(225deg, rgb(41, 123, 245), rgb(0, 132, 183))',
                    diff:       'rgb(17, 120, 197)',
                    hover:      'rgb(29, 171, 234)'
                },
                bordercolor:{
                    def:        'rgb(0, 143, 210)',
                    box:        'rgba(181, 231, 255, 0.3)',
                    head:       'rgb(62, 167, 214)'
                },
                fontsize:   0,
                radius:     0              //em
            },
            //按钮
            btn: {
                height: {
                    def:        0,
                    small:      0,
                    large:      0
                },
                lineheight: {
                    def:        0,
                    small:      0,
                    larget:     0
                },
                fontsize: {
                    def:        0,
                    small:      0,
                    larget:     0
                },
                padding: {
                    def: {
                        top:        0,
                        bottom:     0,
                        left:       0,
                        right:      0
                    },
                    small: {
                        top:        0,
                        bottom:     0,
                        left:       0,
                        right:      0
                    },
                    large: {
                        top:        0,
                        bottom:     0,
                        left:       0,
                        right:      0
                    },
                },
                radius:         0,
                zindex: {
                    def:        0,
                    hover:      0,
                    focus:      0,
                    active:     0
                },
                style: {
                    def: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bgcolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        shadow: {
                            def:        'none',
                            hover:      'none',
                            focus:      'none',
                            active:     'none',
                            disabled:   'none !important'
                        }
                    },
                    inverse: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bgcolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        shadow: {
                            def:        'none',
                            hover:      'none',
                            focus:      'none',
                            active:     'none',
                            disabled:   'none !important'
                        }
                    },
                    border: {
                        borderwidth:    2,
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
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
                    },
                    borderinverse: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
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
                    },
                    link: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
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
                    },
                    theme: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bgcolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        shadow: {
                            def:        'none',
                            hover:      'none',
                            focus:      'none',
                            active:     'none',
                            disabled:   'none !important'
                        }
                    },
                    key: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bgcolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        shadow: {
                            def:        'none',
                            hover:      'none',
                            focus:      'none',
                            active:     'none',
                            disabled:   'none !important'
                        }
                    },
                    light: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bgcolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        shadow: {
                            def:        'none',
                            hover:      'none',
                            focus:      'none',
                            active:     'none',
                            disabled:   'none !important'
                        }
                    },
                    nice: {
                        color: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bordercolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
                        },
                        bgcolor: {
                            def:        '',
                            hover:      '',
                            focus:      '',
                            active:     '',
                            disabled:   ''
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
            },
            //气泡菜单
            popmenu: {
                color: {
                    def:        '',
                    hover:      '',
                    active:     '',
                    disabled:   '',
                    icon:       ''
                },
                bgcolor: {
                    def:        '',
                    hover:      '',
                    active:     '',
                    disabled:   ''
                },
                bordercolor:    'transparent',
                borderwidth:    0,
                zindex: {
                    def:        0,
                    hover:      0,
                    active:     0
                },
                radius:         0,
                shadow:         '0 15px 50px rgba(0, 0, 0, .3)',
                minwidth: {
                    def:        160,
                    small:      140,
                    large:      180
                },
                fontsize: {
                    def:        0,
                    small:      0,
                    large:      0
                },
                fontweight: {
                    def:        0,
                    small:      0,
                    large:      0
                },
                padding: {
                    top:        5,
                    bottom:     5,
                    left:       0,
                    right:      0
                },
                selectable_right:    35,
                item_height: {
                    def:        28,
                    small:      26,
                    large:      34
                },
                item_padding: {
                    top:        0,
                    bottom:     0,
                    left:       15,
                    right:      15,
                    iconleft:   40,
                    treeright:  40
                },
                item_shadow:     {
                    active:             'none',
                    disabled:           'none'
                },
                item_selected: {
                    color:              '',
                    bgcolor:            '',
                    iconfontsize:       14,
                    shadow:             'none'
                },
                item_hassub: {
                    icon:               '',
                    iconcolor:          '',
                    iconfontsize:       14
                },
                split: {
                    height:             10,
                    borderwidth: {
                        top:            1,
                        bottom:         1
                    },
                    bordercolor: {
                        top:            '',
                        bottom:         ''
                    }

                }
            },
            //单选复选框
            chkradio: {
                fontsize:       0,
                zindex: {
                    before:     0,
                    after:      0
                },
                padding: {
                    top:        3,
                    bottom:     3,
                    left:       25,
                    right:      10
                },
                height:         20,
                icon_after:     '',
                color: {
                    def:                '',
                    hover:              '',
                    checked:            '',
                    disabled:           ''
                },
                borderwidth_before:     1,
                radius_before: {
                    chk:                0,
                    radio:              1
                },
                style: {
                    def: {
                        bordercolor_before: {
                            def:                '',
                            hover:              '',
                            checked:            '',
                            disabled:           ''
                        },
                        bgcolor_before: {
                            def:                '',
                            hover:              '',
                            checked:            '',
                            disabled:           ''
                        },
                        bgcolor_after: {
                            def:                'transparent',
                            hover:              '',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        color_after: {
                            hover:              '',
                            checked:            ''
                        }
                    },
                    theme: {
                        bordercolor_before: {
                            def:                '',
                            hover:              '',
                            checked:            '',
                            disabled:           ''
                        },
                        bgcolor_before: {
                            def:                'transparent',
                            hover:              'transparent',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        bgcolor_after: {
                            def:                'transparent',
                            hover:              '',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        color_after: {
                            hover:              '',
                            checked:            ''
                        }
                    },
                    key: {
                        bordercolor_before: {
                            def:                '',
                            hover:              '',
                            checked:            '',
                            disabled:           ''
                        },
                        bgcolor_before: {
                            def:                'transparent',
                            hover:              'transparent',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        bgcolor_after: {
                            def:                'transparent',
                            hover:              '',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        color_after: {
                            hover:              '',
                            checked:            ''
                        }
                    },
                    light: {
                        bordercolor_before: {
                            def:                '',
                            hover:              '',
                            checked:            '',
                            disabled:           ''
                        },
                        bgcolor_before: {
                            def:                'transparent',
                            hover:              'transparent',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        bgcolor_after: {
                            def:                'transparent',
                            hover:              '',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        color_after: {
                            hover:              '',
                            checked:            ''
                        }
                    },
                    nice: {
                        bordercolor_before: {
                            def:                '',
                            hover:              '',
                            checked:            '',
                            disabled:           ''
                        },
                        bgcolor_before: {
                            def:                'transparent',
                            hover:              'transparent',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        bgcolor_after: {
                            def:                'transparent',
                            hover:              '',
                            checked:            '',
                            disabled:           'transparent'
                        },
                        color_after: {
                            hover:              '',
                            checked:            ''
                        }
                    }
                }
            },
            //标签页
            tabs: {
                bgcolor:                'transparent',
                bordercolor_navs:       '',
                borderwidth_navs:       1,
                zindex:                 0,
                nav: {
                    color: {
                        def:            '',
                        hover:          '',
                        active:         ''
                    },
                    bgcolor: {
                        def:            'transparent',
                        hover:          'transparent',
                        active:         'transparent'
                    },
                    borderwidth:        2,
                    bordercolor: {
                        def:            'transparent',
                        hover:          'transparent',
                        active:         'transparent'
                    },
                    height: {
                        def:            50,
                        small:          36
                    },
                    lineheight: {
                        def:            0,
                        small:          0
                    },
                    fontsize: {
                        def:            14,
                        small:          12
                    },
                    padding: {
                        def: {
                            top:        10,
                            bottom:     10,
                            left:       20,
                            right:      20
                        },
                        small: {
                            top:        8,
                            bottom:     8,
                            left:       20,
                            right:      20
                        }
                    },
                    zindex: {
                        def:            0,
                        hover:          0,
                        active:         0
                    },
                    shadow: {
                        def:            'none',
                        hover:          'none',
                        active:         'none'
                    },
                    radius:             0,
                    icon_popmenu:       ''
                }
            },
            //标签
            tag: {
                padding: {
                    top:            0.25,
                    bottom:         0.25,
                    left:           0.45,
                    right:          0.45
                },
                padding_circle: {
                    left:           0.51,
                    right:          0.51
                },
                height:             'inherit',
                lineheight:         1,
                fontsize:           0.75,
                color:              '',
                bgcolor:            '',
                borderwidth:        1,
                bordercolor:        '',
                radius:             0
            },
            //输入框
            input: {
                width: {
                    def:                160,
                    textarea:           160
                },
                height: {
                    def:                0,
                    small:              0,
                    large:              0,
                    textarea:           0
                },
                lineheight:             0,
                fontsize: {
                    def:                0,
                    small:              0,
                    large:              0
                },
                radius: {
                    def:                0,
                    textarea:           0,
                    group:             0
                },
                padding: {
                    top:                4,
                    bottom:             4,
                    left:               15,
                    right:              4
                },
                borderwidth: {
                    def: {
                        top:            0,
                        bottom:         1,
                        left:           0,
                        right:          0
                    },
                    focus: {
                        top:            0,
                        bottom:         2,
                        left:           0,
                        right:          0
                    },
                    textarea: {
                        top:            1,
                        bottom:         1,
                        left:           1,
                        right:          1
                    },
                    textarea_focus: {
                        top:            2,
                        bottom:         2,
                        left:           2,
                        right:          2
                    },
                    group: {
                        top:            1,
                        bottom:         1,
                        left:           1,
                        right:          1
                    },
                    group_focus: {
                        top:            2,
                        bottom:         2,
                        left:           2,
                        right:          2
                    }
                },
                borderstyle: {
                    def:                'solid',
                    focus:              'solid',
                    disabled:           'dotted'
                },
                style: {
                    def: {
                        color: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        bgcolor: {
                            def:                'transparent',
                            focus:              'transparent',
                            disabled:           'transparent'
                        },
                        bordercolor: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        shadow: {
                            def:                'none',
                            focus:              'none',
                            disabled:           'none'
                        }
                    },
                    theme: {
                        color: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        bgcolor: {
                            def:                'transparent',
                            focus:              'transparent',
                            disabled:           'transparent'
                        },
                        bordercolor: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        shadow: {
                            def:                'none',
                            focus:              'none',
                            disabled:           'none'
                        }
                    },
                    key: {
                        color: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        bgcolor: {
                            def:                'transparent',
                            focus:              'transparent',
                            disabled:           'transparent'
                        },
                        bordercolor: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        shadow: {
                            def:                'none',
                            focus:              'none',
                            disabled:           'none'
                        }
                    },
                    light: {
                        color: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        bgcolor: {
                            def:                'transparent',
                            focus:              'transparent',
                            disabled:           'transparent'
                        },
                        bordercolor: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        shadow: {
                            def:                'none',
                            focus:              'none',
                            disabled:           'none'
                        }
                    },
                    nice: {
                        color: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        bgcolor: {
                            def:                'transparent',
                            focus:              'transparent',
                            disabled:           'transparent'
                        },
                        bordercolor: {
                            def:                '',
                            focus:              '',
                            disabled:           ''
                        },
                        shadow: {
                            def:                'none',
                            focus:              'none',
                            disabled:           'none'
                        }
                    }
                },
                group: {
                    zindex: {
                        def:                    0,
                        focus:                  0,
                        addons:                 0,
                        addons_btn:             0,
                        addons_btn_hover:       0
                    },
                    input: {
                        bgcolor: {
                            def:                'transparent',
                            focus:              'transparent',
                            disabled:           'transparent'
                        }
                    },
                    addons: {
                        text: {
                            color:              '',
                            bgcolor:            '',
                            bordercolor:        '',
                            borderwidth:        1
                        }
                    },
                    shadow:             'none'
                }
            },
            //表单
            form: {
                padding: {
                    top:                0,
                    bottom:             0,
                    left:               0,
                    right:              0
                },
                margin: {
                    top:                0,
                    bottom:             0,
                    left:               0,
                    right:              0
                },
                margin_sub: {
                    top:                5,
                    bottom:             30,
                    left:               0,
                    right:              0
                },
                margin_item: {
                    top:                0,
                    bottom:             15,
                    left:               0,
                    right:              0
                },
                label: {
                    color:              '',
                    fontsize:           0,
                    minwidth:           80,
                    margin: {
                        top:            0,
                        bottom:         0,
                        left:           0,
                        right:          15
                    }
                },
                must: {
                    color:              '',
                    icon:               ''
                }
            },
            //遮罩层
            mask: {
                zindex:             0,
                bgcolor:            ''
            },
            //对话框
            dlg: {
                bgcolor:            '',
                zindex: {
                    def:            0,
                    mask:           0,
                    wrapper:        0
                },
                head: {
                    minheight:      40,
                    padding: {
                        top:        10,
                        bottom:     10,
                        left:       15,
                        right:      15
                    },
                    borderwidth:    1,
                    bordercolor:    ''
                },
                title: {
                    zindex:         0,
                    color:          '',
                    fontsize:       0,
                    fontweight:     0
                },
                close: {
                    zindex:         0,
                    width:          40,
                    height:         40,
                    padding: {
                        top:        0,
                        bottom:     0,
                        left:       0,
                        right:      0
                    },
                    color: {
                        def:        '',
                        hover:      ''
                    },
                    icon:           ''
                },
                foot: {
                    minheight:      40,
                    padding: {
                        top:        10,
                        bottom:     15,
                        left:       15,
                        right:      15
                    },
                    borderwidth:    0,
                    bordercolor:    ''
                },
                body: {
                    minheight:      80,
                    padding: {
                        top:        15,
                        bottom:     15,
                        left:       15,
                        right:      15
                    }
                },
                radius:             0,
                shadow:             ''
            }
        }
    }
};

export default {
    state:        State,
    mutations:    Mutations,
    actions:      Actions,
    getters:      Getters
};
