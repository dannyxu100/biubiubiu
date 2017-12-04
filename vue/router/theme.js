import VueRouter                from 'vue-router';

import Index                    from '_APPS_/theme/index.vue';
import ThemeColor               from '_APPS_/theme/theme-color.vue';
import ThemeColor_C             from '_APPS_/theme/theme-color-controler.vue';
import ThemeFont                from '_APPS_/theme/theme-font.vue';
import ThemeFont_C              from '_APPS_/theme/theme-font-controler.vue';
import ThemeGrid                from '_APPS_/theme/theme-grid.vue';
import ThemeGrid_C              from '_APPS_/theme/theme-grid-controler.vue';
import ThemeTable               from '_APPS_/theme/theme-table.vue';
import ThemeButton              from '_APPS_/theme/theme-button.vue';
import ThemePopmenu             from '_APPS_/theme/theme-popmenu.vue';
import ThemeCheck               from '_APPS_/theme/theme-check.vue';
import ThemeSelect              from '_APPS_/theme/theme-select.vue';
import ThemeTabs                from '_APPS_/theme/theme-tabs.vue';
import ThemeTag                 from '_APPS_/theme/theme-tag.vue';
import ThemeInput               from '_APPS_/theme/theme-input.vue';
import ThemeForm                from '_APPS_/theme/theme-form.vue';
import ThemeDlg                 from '_APPS_/theme/theme-dialog.vue';
import ThemeIcons               from '_APPS_/theme/theme-icons.vue';
import ThemeSection             from '_APPS_/theme/theme-section.vue';
import ThemeComm                from '_APPS_/theme/theme-comm.vue';

export default [
    {
        path: '/theme',
        components: {
            main: Index
        }
    }, {
        path: '/theme-color',
        components: {
            main:       ThemeColor,
            right:      ThemeColor_C
        }
    }, {
        path: '/theme-font',
        components: {
            main:       ThemeFont,
            right:      ThemeFont_C
        }
    }, {
        path: '/theme-grid',
        components: {
            main:       ThemeGrid,
            right:      ThemeGrid_C
        }
    }, {
        path: '/theme-table',
        components: {
            main:       ThemeTable
        }
    }, {
        path: '/theme-button',
        components: {
            main:       ThemeButton
        }
    }, {
        path: '/theme-popmenu',
        components: {
            main:       ThemePopmenu
        }
    }, {
        path: '/theme-check',
        components: {
            main:       ThemeCheck
        }
    }, {
        path: '/theme-select',
        components: {
            main:       ThemeSelect
        }
    }, {
        path: '/theme-tabs',
        components: {
            main:       ThemeTabs
        }
    }, {
        path: '/theme-tag',
        components: {
            main:       ThemeTag
        }
    }, {
        path: '/theme-input',
        components: {
            main:       ThemeInput
        }
    }, {
        path: '/theme-form',
        components: {
            main:       ThemeForm
        }
    }, {
        path: '/theme-dialog',
        components: {
            main:       ThemeDlg
        }
    }, {
        path: '/theme-icons',
        components: {
            main:       ThemeIcons
        }
    }, {
        path: '/theme-section',
        components: {
            main:       ThemeSection
        }
    }, {
        path: '/theme-comm',
        components: {
            main:       ThemeComm
        }
    }
];
