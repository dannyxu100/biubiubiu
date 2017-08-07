import './less/index.less';


import Vue                      from 'vue';
import Vuex                     from 'vuex';
import VueRouter                from 'vue-router';
Vue.use(Vuex);
Vue.use(VueRouter);

//组件
import Topbar                   from './common/topbar.vue';
import Leftbar                  from './common/leftbar.vue';
import Home                     from './home/index.vue';
import User                     from './user/index.vue';


//路由
const ROUTELIST = [
    { path: '/',                component: Home },
    { path: '/user',            component: User }
];
const router = new VueRouter({
    routes: ROUTELIST
});


//vuex
import store                                from './common/vuex/store.js';
import { mapGetters, mapActions }           from 'vuex';


//实例
window.vapp = new Vue({
	el: '#v-app',
    components: {
        topbar: Topbar,
        leftbar: Leftbar
    },
    router,
    store,
    // vuex: {
    //     getters,
    //     actions
    // },
    computed: mapGetters({
        showleftbar: 'showleftbar',
        showleftbar_small: 'showleftbar_small'
    }),
    data() {
        return {};
    },
    created(){
        // debugger;
        // this.actions.marge_data();
    }
});