import mt from './mutaions-types';
import Vue from 'vue';

//将native_apps_data的数据结构合并入store
export default {
	marge_data: ({dispatch}, $data) => {
	    dispatch( mt.MERGE_DATA, $data );
	},

    //展开收起左侧栏
    toggle_leftbar(){

    }
};
