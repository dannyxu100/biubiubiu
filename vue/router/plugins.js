import VueRouter                from 'vue-router';

import Index                    from '_APPS_/plugins/index.vue';
import XScroll                  from '_APPS_/plugins/xscroll.vue';

export default [
    {
        path: '/plugins',
        components: {
            main: Index
        }
    }, {
        path: '/plugins-xscroll',
        components: {
            main:       XScroll
        }
    }
];
