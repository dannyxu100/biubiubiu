import VueRouter                from 'vue-router';

import CAdmin                   from '_APPS_/admin/index.vue';
import CAdminPower              from '_APPS_/admin/power.vue';
import CAdminRoles              from '_APPS_/admin/roles.vue';

import CHome                    from '_APPS_/home/index.vue';

const ROUTELIST = [
    { path: '/',                component: CAdmin },
    { path: '/admin',           component: CAdmin },
    { path: '/admin-power',     component: CAdminPower },
    { path: '/admin-roles',     component: CAdminRoles },

    { path: '/home',            component: CHome }
];

export default new VueRouter({
    routes: ROUTELIST
});

