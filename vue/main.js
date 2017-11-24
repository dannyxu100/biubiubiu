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
import CSearchbar               from '_APPS_/common/searchbar.vue';
import CIconsDocker             from '_APPS_/common/iconsdocker.vue';
import CLeftpad                 from '_APPS_/common/leftpad.vue';
import CLeftpadSmall            from '_APPS_/common/leftpadsmall.vue';
import CRightpad                from '_APPS_/common/rightpad.vue';

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
        'c-searchbar':          CSearchbar,
        'c-icons-docker':       CIconsDocker,
        'c-leftpad':            CLeftpad,
        'c-leftpadsmall':       CLeftpadSmall,
        'c-rightpad':           CRightpad
    },
    router: RouterAdmin,
    store: Store,
    data() {
        return {
            navs: {
                list: [],
                current: ''
            },
            search: {
                key: ''
            },
            dockerlist: []
        };
    },
    computed: {
        ...mapGetters([
            'topbar',
            'leftpad',
            'leftpadsmall',
            'rightpad',
            'basic'
        ])
    },
    watch: {
        ['leftbarsmall.show']( newvalue, oldvalue ){
            this.dockerlist.splice(2, 1, {
                title: '用户',
                iconpath: '/public/images/avatar.png',
                show: this.leftpadsmall.show,
                class: 'large circle'
            });
        }
    },
    methods: {
        ...mapActions([
            'toggle_leftpad',
            'toggle_rightpad'
        ]),

        //初始化
        init() {
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

            this.dockerlist = [{
                title: '消息',
                iconpath: '/public/images/comment.svg',
                show: true,
                class: ' animate animate-shake',
                badge: 16
            }, {
                title: '设置',
                iconpath: '/public/images/setting.svg',
                show: true,
                class: 'animate animate-rotate'
            }, {
                title: '用户',
                iconpath: '/public/images/avatar.png',
                show: this.leftpadsmall.show,
                class: 'large circle'
            }];
        },
        //
        appclasses() {
            return {
                'showleftpad': this.leftpad.show,
                'showleftpad-small': this.leftpadsmall.show,
                'showrightpad': this.rightpad.show
            };
        },
        //
        appstyles() {
            let ff = this.basic.fontfamily;
            return {
                'font-family': ff.ios.concat( ff.en, ff.zh, ff.sys ).join(',')
            };
        },
        //顶部导航切换
        navswitch( item ) {
            this.$router.push( item.path );
        },
        //搜索
        searchhandle() {

        },
        //右上图标hover
        dockerhover( icon, iconidx, list ){

        },
        //右上图标点击
        dockerclick( icon, iconidx, list ){
            if( '设置' === icon.title ) {
                this.toggle_rightpad();
            }
        }
    },
    created(){
        this.init();
    }
});