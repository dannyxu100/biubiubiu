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
        leftbar: {
            show: false
        },
        leftbarsmall: {
            show: true
        }
    }
};

const Mutations = {
    [MT.MERGE_DATA] ( state, newdata ) {
        state.data_copy = Vue.api.copy( state.data );       //备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    }
};

export default new Vuex.Store({
    State,
    Mutations,
    Getters,
    Actions
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