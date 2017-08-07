import Vue                      from 'vue';
import Vuex                     from 'vuex';
Vue.use(Vuex);


import mt                       from './mutaions-types';
import getters                  from './getter.js';
import actions                  from './action.js';


const state = {
	data_copy: {},
    data: {
        showleftbar: false,
        showleftbar_small: true
	}
};

const mutations = {
    [mt.MERGE_DATA] ( state, newdata ) {
		state.data_copy = Vue.api.copy( state.data );				//备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

