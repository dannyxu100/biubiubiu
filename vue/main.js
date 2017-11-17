import Vue                      from 'vue';
import Vuex                     from 'vuex';
import VueRouter                from 'vue-router';
import Api                      from './js/api.js';
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Api);

//组件
// import CMyComponent            from '_PLUGIN_/mycomponent.vue';
import CNavsbar                 from '_APPS_/common/navsbar.vue';
import CLeftpad                 from '_APPS_/common/leftpad.vue';
import CLeftpadSmall            from '_APPS_/common/leftpadsmall.vue';

//路由
// import Router                   from '_ROUTER_/index.js';
import RouterAdmin              from '_ROUTER_/admin.js';


//Vuex
import Store                                from './store';
import { mapGetters, mapActions }           from 'vuex';

//基础样式
// import './less/app.less';

//实例
window.vueapp = new Vue({
	el: '#vueapp',
    components: {
        'c-navsbar':            CNavsbar,
        'c-leftpad':            CLeftpad,
        'c-leftpadsmall':       CLeftpadSmall
    },
    router: RouterAdmin,
    store: Store,
    data() {
        return {
            navs: {
                list: [],
                current: ''
            }
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
        //顶部导航切换
        navswitch( item ) {
            this.$router.push( item.path );
        }
    },
    created(){
        // debugger;
        // this.actions.marge_data();
        this.navs.current = '';
        this.navs.list = [{
            value: '',
            icon: 'icon-apps',
            class: 'home',
            path: '/admin',
        }, {
            value: '用户',
            icon: '',
            class: '',
            path: '/admin-users',
        }, {
            value: '角色',
            icon: '',
            class: '',
            path: '/admin-roles',
        }, {
            value: '权限',
            icon: '',
            class: '',
            path: '/admin-power',
        }, {
            value: '系统配置',
            icon: '',
            class: '',
            path: '/admin-setting'
        }];
    }
});