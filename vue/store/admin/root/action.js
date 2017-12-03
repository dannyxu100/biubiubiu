import mt                       from './mutaions-types';
import Vue                      from 'vue';
import VueRouter                from 'vue-router';
Vue.use(VueRouter);

//将native_apps_data的数据结构合并入store
export default {
	marge_data: ({dispatch, state}, $data) => {
	    dispatch( mt.MERGE_DATA, $data );
	},

    //展开收起左侧栏
    toggle_leftpad({dispatch, state}, force ){
        if( 'undefined' !== typeof force) {
            state.data.leftpad.show = force;
            state.data.leftpadsmall.show = !force;
        } else {
            state.data.leftpad.show = !state.data.leftpad.show;
            state.data.leftpadsmall.show = !state.data.leftpadsmall.show;
        }
    },
    //展开收起右侧栏
    toggle_rightpad({dispatch, state}, force ){
        if( 'undefined' !== typeof force) {
            state.data.rightpad.show = force;
        } else {
            state.data.rightpad.show = !state.data.rightpad.show;
        }
    },
};
