import Vue                      from 'vue';
import Vuex                     from 'vuex';
import VueRouter                from 'vue-router';
Vue.use(Vuex);
Vue.use(VueRouter);

//组件
// import CMyComponent            from '_PLUGIN_/mycomponent.vue';
import CLeftpad                 from '_APPS_/home/leftpad.vue';
import CLeftpadSmall            from '_APPS_/home/leftpadsmall.vue';

//路由
import Router                   from '_ROUTER_/index.js';


//Vuex
import Store                                from '_STORE_/store.js';
import { mapGetters, mapActions }           from 'vuex';


//基础样式
// import './less/app.less';

//实例
window.vueapp = new Vue({
	el: '#vueapp',
    components: {
        'c-leftpad':            CLeftpad,
        'c-leftpadsmall':       CLeftpadSmall
    },
    router: Router,
    store: Store,
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'topbar',
            'leftbar',
            'leftbarsmall'
        ])
    },
    methods: {
        ...mapActions([
            'toggle_leftbar'
        ])
    },
    created(){
        // debugger;
        // this.actions.marge_data();
    }
});