import Vue                      from 'vue';
import Vuex                     from 'vuex';
import getters                  from './getter.js';
import actions                  from './action.js';
import mt                       from './mutaions-types.js';
Vue.use(Vuex);

const state = {
    data_copy: {},
    data: {
        topbar: {
            show: false
        },
        leftbar: {
            show: false
        },
        leftbarsmall: {
            show: true
        }
    }
};

const mutations = {
    [mt.MERGE_DATA] ( state, newdata ) {
        state.data_copy = Vue.api.copy( state.data );       //备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});


/*
import Vue                  from 'vue';
import Vuex                 from 'vuex';
import * as actions         from './actions';
import * as getters         from './getters';
import cart                 from './modules/cart';
import products             from './modules/products';
import createLogger         from '../../../src/plugins/logger';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
*/