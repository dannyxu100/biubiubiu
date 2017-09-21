import VueRouter                from 'vue-router';

import CHome                    from '_APPS_/home/index.vue';
import CAdmin                   from '_APPS_/admin/index.vue';

const ROUTELIST = [
    { path: '/',                component: CHome },
    { path: '/admin',           component: CAdmin }
];

export default new VueRouter({
    routes: ROUTELIST
});

