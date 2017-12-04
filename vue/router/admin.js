import VueRouter                from 'vue-router';

import Admin                   from '_APPS_/admin/index.vue';
import AdminUsers              from '_APPS_/admin/users.vue';
import AdminPower              from '_APPS_/admin/power.vue';
import AdminRoles              from '_APPS_/admin/roles.vue';


export default [
    {
        path: '/admin',
        components: {
            main: Admin
        }
    }, {
        path: '/admin-users',
        components: {
            main: AdminUsers
        }
    }, {
        path: '/admin-power',
        components: {
            main: AdminPower
        }
    }, {
        path: '/admin-roles',
        components: {
            main: AdminRoles
        }
    }
];


