import Vue                      from 'vue';
import Vuex                     from 'vuex';
import VueRouter                from 'vue-router';
import Api                      from '_JS_/api.js';
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

//Mixin
import Base                                 from '_JS_/mixin-base.js';
Vue.mixin(Base);

//实例
window.vueapp = new Vue({
	el: '#vueapp',
    components: {
        'c-navsbar':                    CNavsbar,
        'c-searchbar':                  CSearchbar,
        'c-icons-docker':               CIconsDocker,
        'c-leftpad':                    CLeftpad,
        'c-leftpadsmall':               CLeftpadSmall,
        'c-rightpad':                   CRightpad
    },
    router: RouterAdmin,
    store: Store,
    data() {
        return {
            search: {
                key: ''
            },
            dockerlist: [],
            events: {
                click: [],
                resize: []
            }
        };
    },
    computed: {
        ...mapGetters([
            'topbar',
            'leftpad',
            'leftpadsmall',
            'rightpad',
            'navs',
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
            this.loadnavmaps();
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

            window.addEventListener('resize', this.$fn.later(this.resize, 100), false);
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
        },
        //
        loadnavmaps() {
            this.$fn.get('/public/data/admin-navs.json').then((res)=>{
                this.navs.maps = res.data;
            });
        },

        //判断路由是否存在nav标签
        isopenpath( path ) {
            let res = false;
            this.$fn.each(this.navs.list, (nav, idx)=>{
                if( nav.path === path ){
                    res = idx;
                    return false;
                }
            });
            return res;
        },
        //根据path提取nav数据对象
        getnav4path( path ) {
            return this.navs.maps[path] || false;
        },
        //添加nav标签
        pushnav( path ) {
            let nav, idx;
            idx = this.isopenpath(path);
            if( false === idx ){
                if( nav = this.getnav4path(path) ){
                    this.navs.list.push(nav);
                    this.navs.current = nav.name;
                } else {
                    this.$fn.error('path尚未配置nav信息');
                }
            } else {
                nav = this.navs.list[idx];
                this.navs.current = nav.name;
            }
        },

        //路由跳转
        routerpath( path ){
            this.$router.push(path);
            this.pushnav( path );
        },

        //添加窗口尺寸监听
        resizeadd( fn, name ) {
            this.events.resize.push({
                name: name || '',
                handle: fn
            });
        },
        //移除窗口尺寸监听
        resizeremove( name ) {
            this.$fn.each(this.events.resize, (item, idx)=>{
                if( item.name === name ){
                    this.events.resize.splice(idx, 1);
                    return false;
                }
            });
        },
        //执行窗口尺寸监听处理
        resize() {
            this.$fn.each(this.events.resize, (item, idx)=>{
                if( item.handle ){
                    item.handle();
                }
            });
        }
    },
    created(){
        this.init();
    }
});