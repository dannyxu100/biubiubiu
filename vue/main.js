import Vue                      from 'vue';
import Vuex                     from 'vuex';
import VueRouter                from 'vue-router';
Vue.use(Vuex);
Vue.use(VueRouter);

//组件
import Topbar                   from '_PLUGIN_/topbar.vue';
import Leftbar                  from '_PLUGIN_/leftbar.vue';

//路由
import Home                     from '_APPS_/home/index.vue';
import Admin                    from '_APPS_/admin/index.vue';
const ROUTELIST = [
    { path: '/',                component: Home },
    { path: '/admin',           component: Admin }
];
const router = new VueRouter({
    routes: ROUTELIST
});


//Vuex
import store                                from '_STORE_/store.js';
import { mapGetters, mapActions }           from 'vuex';


//基础样式
// import './less/app.less';

//实例
window.vueapp = new Vue({
	el: '#vueapp',
    components: {
        topbar: Topbar,
        leftbar: Leftbar
    },
    router,
    store,
    computed: {
        test() {
            return 1111;
        },
        ...mapGetters({
            topbar: 'topbar',
            leftbar: 'leftbar',
            leftbarsmall: 'leftbarsmall'
        })
    },
    data() {
        return {};
    },
    created(){
        // debugger;
        // this.actions.marge_data();
    }
});