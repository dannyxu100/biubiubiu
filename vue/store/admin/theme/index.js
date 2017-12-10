import Vue                      from 'vue';
import Vuex                     from 'vuex';
import Mutations                from './mutations.js';
import Getters                  from './getters.js';
import Actions                  from './actions.js';
Vue.use(Vuex);

const State = {
    data_copy: {},
    data: {
        basic: {
            namespace:  '',
            colors: {
                theme: {
                    editable:   true,
                    ladder: {
                        lightest:   {
                            name:   '主题-最亮',
                            class:  '.bgtheme-lightest',
                            hex:    '#C9FFFF',
                            rgb:    '201,255,255',
                        },
                        lighter:    {
                            name:   '主题-较亮',
                            class:  '.bgtheme-lighter',
                            hex:    '#5FFFFF',
                            rgb:    '95,255,255',
                        },
                        light:      {
                            name:   '主题-亮',
                            class:  '.bgtheme-light',
                            hex:    '#23E1FF',
                            rgb:    '35,225,255',
                        },
                        normal:     {
                            name:   '主题',
                            class:  '.bgtheme',
                            hex:    '#05C3F9',
                            rgb:    '5,195,249',
                        },
                        dark:       {
                            name:   '主题-暗',
                            class:  '.bgtheme-dark',
                            hex:    '#00AFE5',
                            rgb:    '0,175,229',
                        },
                        darker:     {
                            name:   '主题-较暗',
                            class:  '.bgtheme-darker',
                            hex:    '#0087BD',
                            rgb:    '0,135,189',
                        },
                        darkest:    null
                    },
                    complementary: {
                        hex:    '#FA3C06',
                        rgb:    '250,60,6',
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
                            rgb:    '255,113,87',
                        },
                        normal:     {
                            name:   '关键的',
                            class:  '.bgkey',
                            hex:    '#F95339',
                            rgb:    '249,83,57',
                        },
                        dark:       {
                            name:   '关键的-暗',
                            class:  '.bgkey-dark',
                            hex:    '#E53F25',
                            rgb:    '229,63,37',
                        },
                        darker:     {
                            name:   '关键的-较暗',
                            class:  '.bgkey-darker',
                            hex:    '#BD1700',
                            rgb:    '189,23,0',
                        },
                        darkest:    null,
                    },
                    complementary: {
                        hex:    '#06ACC6',
                        rgb:    '6,172,198',
                    }
                },
                light: {
                    editable:   true,
                    ladder: {
                        lightest:   {
                            name:   '闪亮的-最亮',
                            class:  '.bglight-lightest',
                            hex:    '#FFFFC5',
                            rgb:    '255,255,197',
                        },
                        lighter:    {
                            name:   '闪亮的-较亮',
                            class:  '.bglight-lighter',
                            hex:    '#FFFF5B',
                            rgb:    '255,255,91',
                        },
                        light:      {
                            name:   '闪亮的-亮',
                            class:  '.bglight-light',
                            hex:    '#FFFF1F',
                            rgb:    '255,255,31',
                        },
                        normal:     {
                            name:   '闪亮的',
                            class:  '.bglight',
                            hex:    '#FFFF01',
                            rgb:    '255,255,1',
                        },
                        dark:       {
                            name:   '闪亮的-暗',
                            class:  '.bglight-dark',
                            hex:    '#EBEB00',
                            rgb:    '235,235,0',
                        },
                        darker:     {
                            name:   '闪亮的-较暗',
                            class:  '.bglight-darker',
                            hex:    '#C3C300',
                            rgb:    '195,195,0',
                        },
                        darkest:    null,
                    },
                    complementary: {
                        hex:    '#0000FE',
                        rgb:    '0,0,254',
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
                            rgb:    '91,255,209',
                        },
                        light:      {
                            name:   '友好的-亮',
                            class:  '.bgnice-light',
                            hex:    '#1FE495',
                            rgb:    '31,228,149',
                        },
                        normal:     {
                            name:   '友好的',
                            class:  '.bgnice',
                            hex:    '#01C677',
                            rgb:    '1,198,119',
                        },
                        dark:       {
                            name:   '友好的-暗',
                            class:  '.bgnice-dark',
                            hex:    '#00B263',
                            rgb:    '0,178,99',
                        },
                        darker:     {
                            name:   '友好的-较暗',
                            class:  '.bgnice-darker',
                            hex:    '#008A3B',
                            rgb:    '0,138,59',
                        },
                        darkest:    null,
                    },
                    complementary: {
                        hex:    '#FE3988',
                        rgb:    '254,57,136',
                    }
                },
                black: {
                    editable:   false,
                    ladder: {
                        lightest:   null,
                        lighter:    null,
                        light:      {
                            name:   '黑-亮',
                            class:  '.bgnice-light',
                            hex:    '#666666',
                            rgb:    '102,102,102',
                        },
                        normal:     {
                            name:   '黑',
                            class:  '.bgnice',
                            hex:    '#444444',
                            rgb:    '68,68,68',
                        },
                        dark:       {
                            name:   '黑-暗',
                            class:  '.bgnice-dark',
                            hex:    '#333333',
                            rgb:    '51,51,51',
                        },
                        darker:     {
                            name:   '黑-较暗',
                            class:  '.bgnice-darker',
                            hex:    '#141414',
                            rgb:    '20,20,20',
                        },
                        darkest:    {
                            name:   '黑-最暗',
                            class:  '.bgnice-darker',
                            hex:    '#000000',
                            rgb:    '0,0,0',
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
                            rgb:    '238,238,238',
                        },
                        light:      {
                            name:   '灰-亮',
                            class:  '.bggray-light',
                            hex:    '#DDDDDD',
                            rgb:    '221,221,221',
                        },
                        normal:     {
                            name:   '灰',
                            class:  '.bggray',
                            hex:    '#CCCCCC',
                            rgb:    '204,204,204',
                        },
                        dark:       {
                            name:   '灰-暗',
                            class:  '.bggray-dark',
                            hex:    '#BBBBBB',
                            rgb:    '187,187,187',
                        },
                        darker:     {
                            name:   '灰-较暗',
                            class:  '.bggray-darker',
                            hex:    '#AAAAAA',
                            rgb:    '170,170,170',
                        },
                        darkest:    {
                            name:   '灰-最暗',
                            class:  '.bggray-darker',
                            hex:    '#99999',
                            rgb:    '153,153,153',
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
                            rgb:    '255,255,255',
                        },
                        normal:     {
                            name:   '白',
                            class:  '.bgwhite',
                            hex:    '#FAFAFA',
                            rgb:    '250,250,250',
                        },
                        dark:       {
                            name:   '白-暗',
                            class:  '.bgwhite-dark',
                            hex:    '#F7F7F7',
                            rgb:    '247,247,247',
                        },
                        darker:     {
                            name:   '白-较暗',
                            class:  '.bgwhite-darker',
                            hex:    '#F5F5F5',
                            rgb:    '245,245,245',
                        },
                        darkest:    {
                            name:   '白-最暗',
                            class:  '.bgwhite-darker',
                            hex:    '#F3F3F3',
                            rgb:    '243,243,243',
                        },
                    }
                },
            },
            fontcolor: {
                def:        '',
                weak:       '',
                title:      'inherit',
                hr:         '',
                small:      '',
                link:       '',
                linkhover:  '',
            },
            bgcolor: {
                def:        '',
                weak:       ''
            },
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
            zindex: {
                def:        0,
                bg:         1,
                control:    100,
                layer:      1000
            },
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
            lineheight: {
                def:        1.5,
                auto:       0,
                title:      1.1
            },
            grid: {
                colspace: 2,
                rowspace: 2
            },
            table: {
                caption: {
                    color:      'rgb(255,255,255)',
                    bgcolor:    'linear-gradient(225deg, rgb(0, 83, 185), rgb(163, 108, 249))'
                },
                color: {
                    def:        'rgb(255,255,255)',
                    head:       'rgb(255,255,255)',
                    body:       'rgb(211,255,255)',
                    foot:       'rgb(211,255,255)',
                    hover:      'rgb(255,255,255)'
                },
                bgcolor: {
                    def:        'linear-gradient(225deg, rgb(41, 123, 245), rgb(0, 132, 183))',
                    diff:       'rgb(0, 136, 191)',
                    hover:      'rgb(29, 171, 234)'
                },
                bordercolor:{
                    def:        'rgb(0, 143, 210)',
                    box:        'rgba(181, 231, 255, 0.3)',
                    head:       'rgb(62, 167, 214)'
                },
                fontsize:   0,
                radius:     0              //em
            }
        },
        csstext: ''
    }
};

export default {
    state:        State,
    mutations:    Mutations,
    actions:      Actions,
    getters:      Getters
};
