import VueRouter                from 'vue-router';

import CAdmin                   from '_APPS_/admin/index.vue';
import CAdminUsers              from '_APPS_/admin/users.vue';
import CAdminPower              from '_APPS_/admin/power.vue';
import CAdminRoles              from '_APPS_/admin/roles.vue';
import CAdminThemeColor         from '_APPS_/admin/theme-color.vue';
import CAdminThemeFont          from '_APPS_/admin/theme-font.vue';
import CAdminThemeGrid          from '_APPS_/admin/theme-grid.vue';
import CAdminThemeTable         from '_APPS_/admin/theme-table.vue';
import CAdminThemeButton        from '_APPS_/admin/theme-button.vue';
import CAdminThemePopmenu       from '_APPS_/admin/theme-popmenu.vue';
import CAdminThemeCheck         from '_APPS_/admin/theme-check.vue';
import CAdminThemeSelect        from '_APPS_/admin/theme-select.vue';
import CAdminThemeTabs          from '_APPS_/admin/theme-tabs.vue';
import CAdminThemeTag           from '_APPS_/admin/theme-tag.vue';
import CAdminThemeInput         from '_APPS_/admin/theme-input.vue';
import CAdminThemeForm          from '_APPS_/admin/theme-form.vue';
import CAdminThemeDlg           from '_APPS_/admin/theme-dialog.vue';
import CAdminThemeIcons         from '_APPS_/admin/theme-icons.vue';
import CAdminThemeSection       from '_APPS_/admin/theme-section.vue';
import CAdminThemeComm          from '_APPS_/admin/theme-comm.vue';

import CHome                    from '_APPS_/home/index.vue';

const ROUTELIST = [
    { path: '/',                component: CAdmin },
    { path: '/admin',           component: CAdmin },
    { path: '/admin-users',     component: CAdminUsers },
    { path: '/admin-power',     component: CAdminPower },
    { path: '/admin-roles',     component: CAdminRoles },


    { path: '/admin-theme-color',       component: CAdminThemeColor },
    { path: '/admin-theme-font',        component: CAdminThemeFont },
    { path: '/admin-theme-grid',        component: CAdminThemeGrid },
    { path: '/admin-theme-table',       component: CAdminThemeTable },
    { path: '/admin-theme-button',      component: CAdminThemeButton },
    { path: '/admin-theme-popmenu',     component: CAdminThemePopmenu },
    { path: '/admin-theme-check',       component: CAdminThemeCheck },
    { path: '/admin-theme-select',      component: CAdminThemeSelect },
    { path: '/admin-theme-tabs',        component: CAdminThemeTabs },
    { path: '/admin-theme-tag',         component: CAdminThemeTag },
    { path: '/admin-theme-input',       component: CAdminThemeInput },
    { path: '/admin-theme-form',        component: CAdminThemeForm },
    { path: '/admin-theme-dialog',      component: CAdminThemeDlg },
    { path: '/admin-theme-icons',       component: CAdminThemeIcons },
    { path: '/admin-theme-section',     component: CAdminThemeSection },
    { path: '/admin-theme-comm',        component: CAdminThemeComm },


    { path: '/home',            component: CHome }
];

export default new VueRouter({
    routes: ROUTELIST
});

