import Vue                      from 'vue';
import VueRouter                from 'vue-router';
import MT                       from './mutations-types.js';
Vue.use(VueRouter);

//将native_apps_data的数据结构合并入store
export default {
	marge_data: ({commit, state}, $data) => {
	    commit( MT.MERGE_DATA, $data );
	},

    //路由跳转
    router_push: ({commit, state}, vm, path ) => {
        vm.$router.push(path);
    },

    //展开收起左侧栏
    toggle_leftpad({commit, state}, force ){
        if( 'undefined' !== typeof force) {
            state.data.leftpad.show = force;
            state.data.leftpadsmall.show = !force;
        } else {
            state.data.leftpad.show = !state.data.leftpad.show;
            state.data.leftpadsmall.show = !state.data.leftpadsmall.show;
        }
    },
    //展开收起右侧栏
    toggle_rightpad({commit, state}, force ){
        if( 'undefined' !== typeof force) {
            state.data.rightpad.show = force;
        } else {
            state.data.rightpad.show = !state.data.rightpad.show;
        }
    },
};
