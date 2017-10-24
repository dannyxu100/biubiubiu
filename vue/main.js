import Vue                      from 'vue';
import Vuex                     from 'vuex';
import VueRouter                from 'vue-router';
Vue.use(Vuex);
Vue.use(VueRouter);

//组件
// import CMyComponent            from '_PLUGIN_/mycomponent.vue';
import CLeftpad                 from '_APPS_/common/leftpad.vue';
import CLeftpadSmall            from '_APPS_/common/leftpadsmall.vue';

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
        return {
            navlist: [],
            currentnav: '',
        };
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
        ]),
        //切换nav
        switchnav(item) {
            this.currentnav = item.name;
            this.$router.push(item.path);
        }
    },
    created(){
        // debugger;
        // this.actions.marge_data();
        this.navlist = [{
            name: '用户',
            path: '/admin-users',
        }, {
            name: '角色',
            path: '/admin-roles',
        }, {
            name: '权限',
            path: '/admin-power',
        }, {
            name: '系统配置',
            path: '/admin-setting'
        }];
    }
});