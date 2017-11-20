import VueRouter                from 'vue-router';

import CHome                    from '_APPS_/home/index.vue';

const ROUTELIST = [
    { path: '/home',            component: CHome }
];

export default new VueRouter({
    routes: ROUTELIST
});

