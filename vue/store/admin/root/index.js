import Vue                      from 'vue';
import Vuex                     from 'vuex';
import Mutations                from './mutations.js';
import Getters                  from './getters.js';
import Actions                  from './actions.js';
Vue.use(Vuex);

const State = {
    data_copy: {},
    data: {
        topbar: {
            show: false
        },
        leftpad: {
            show: true
        },
        leftpadsmall: {
            show: false
        },
        rightpad: {
            show: false
        },
        navs: {
            maps:       {},
            used:       [],
            plugins:    [],
            list:       [],
            home: {
                'name':         '',
                'icon':         'icon-apps',
                'image':        '',
                'class':        '',
                'path':         '/theme'
            },
            current:    ''
        },
    }
};

export default {
    state:        State,
    mutations:    Mutations,
    actions:      Actions,
    getters:      Getters
};
