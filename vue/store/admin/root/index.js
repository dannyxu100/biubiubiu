import Vue                      from 'vue';
import Vuex                     from 'vuex';
import MT                       from './mutaions-types.js';
import Getters                  from './getter.js';
import Actions                  from './action.js';
Vue.use(Vuex);

const State = {
    data_copy: {},
    data: {
        topbar: {
            show: false
        },
        leftpad: {
            show: false
        },
        leftpadsmall: {
            show: true
        },
        rightpad: {
            show: false
        },
    }
};

const Mutations = {
    [MT.MERGE_DATA] ( state, newdata ) {
        state.data_copy = Vue.api.copy( state.data );       //备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    }
};

export default {
    state:        State,
    mutations:    Mutations,
    actions:      Actions,
    getters:      Getters
};
