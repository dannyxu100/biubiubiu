import VueRouter                from 'vue-router';

import Admin                   from '_APPS_/admin/index.vue';
import AdminUsers              from '_APPS_/admin/users.vue';
import AdminPower              from '_APPS_/admin/power.vue';
import AdminRoles              from '_APPS_/admin/roles.vue';
import AdminThemeColor         from '_APPS_/admin/theme-color.vue';
import AdminThemeColor_C       from '_APPS_/admin/theme-color-controler.vue';
import AdminThemeFont          from '_APPS_/admin/theme-font.vue';
import AdminThemeFont_C        from '_APPS_/admin/theme-font-controler.vue';
import AdminThemeGrid          from '_APPS_/admin/theme-grid.vue';
import AdminThemeTable         from '_APPS_/admin/theme-table.vue';
import AdminThemeButton        from '_APPS_/admin/theme-button.vue';
import AdminThemePopmenu       from '_APPS_/admin/theme-popmenu.vue';
import AdminThemeCheck         from '_APPS_/admin/theme-check.vue';
import AdminThemeSelect        from '_APPS_/admin/theme-select.vue';
import AdminThemeTabs          from '_APPS_/admin/theme-tabs.vue';
import AdminThemeTag           from '_APPS_/admin/theme-tag.vue';
import AdminThemeInput         from '_APPS_/admin/theme-input.vue';
import AdminThemeForm          from '_APPS_/admin/theme-form.vue';
import AdminThemeDlg           from '_APPS_/admin/theme-dialog.vue';
import AdminThemeIcons         from '_APPS_/admin/theme-icons.vue';
import AdminThemeSection       from '_APPS_/admin/theme-section.vue';
import AdminThemeComm          from '_APPS_/admin/theme-comm.vue';

import Home                    from '_APPS_/home/index.vue';

const ROUTES = [
    {
        path: '/',
        components: {
            main: Admin
        }
    },
    {
        path: '/admin',
        components: {
            main: Admin
        }
    },
    {
        path: '/admin-users',
        components: {
            main: AdminUsers
        }
    },
    {
        path: '/admin-power',
        components: {
            main: AdminPower
        }
    },
    {
        path: '/admin-roles',
        components: {
            main: AdminRoles
        }
    },

    {
        path: '/admin-theme-color',
        components: {
            main:       AdminThemeColor,
            right:      AdminThemeColor_C
        }
    },
    {
        path: '/admin-theme-font',
        components: {
            main:       AdminThemeFont,
            right:      AdminThemeFont_C
        }
    },
    {
        path: '/admin-theme-grid',
        components: {
            main:       AdminThemeGrid
        }
    },
    {
        path: '/admin-theme-table',
        components: {
            main:       AdminThemeTable
        }
    },
    {
        path: '/admin-theme-button',
        components: {
            main:       AdminThemeButton
        }
    },
    {
        path: '/admin-theme-popmenu',
        components: {
            main:       AdminThemePopmenu
        }
    },
    {
        path: '/admin-theme-check',
        components: {
            main:       AdminThemeCheck
        }
    },
    {
        path: '/admin-theme-select',
        components: {
            main:       AdminThemeSelect
        }
    },
    {
        path: '/admin-theme-tabs',
        components: {
            main:       AdminThemeTabs
        }
    },
    {
        path: '/admin-theme-tag',
        components: {
            main:       AdminThemeTag
        }
    },
    {
        path: '/admin-theme-input',
        components: {
            main:       AdminThemeInput
        }
    },
    {
        path: '/admin-theme-form',
        components: {
            main:       AdminThemeForm
        }
    },
    {
        path: '/admin-theme-dialog',
        components: {
            main:       AdminThemeDlg
        }
    },
    {
        path: '/admin-theme-icons',
        components: {
            main:       AdminThemeIcons
        }
    },
    {
        path: '/admin-theme-section',
        components: {
            main:       AdminThemeSection
        }
    },
    {
        path: '/admin-theme-comm',
        components: {
            main:       AdminThemeComm
        }
    },






    { path: '/home',            component: Home },
];

export default new VueRouter({
    routes: ROUTES
});

