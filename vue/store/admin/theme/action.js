import mt from './mutaions-types.js';
import Vue from 'vue';

//将native_apps_data的数据结构合并入store
export default {
	marge_data: ({commit, state}, $data) => {
	    commit( mt.MERGE_DATA, $data );
	},

    //计算主题基础变量
    init_basic: ({commit, state}) => {
        commit( mt.COMPUTE_BASIC );
    }

};
