import Vue              from 'vue';
import MT               from './mutations-types.js';


//将native_apps_data的数据结构合并入store
export default {
	marge_data({commit, state}, $data) {
	    commit( MT.MERGE_DATA, $data );
	},
    /*//计算主题基础变量
    prefix_fontsize({commit, state}, rem) {
        let basic = state.data.basic;
        return `font-size: ${rem/basic.rem2px}px;
        font-size: ${rem}`;
    },

    //计算主题基础变量
    comm_fontsize({dispatch, commit, state}, rem) {
        return dispatch('prefix.fontsize', rem );
    },*/

    //计算主题基础变量
    init_basic({commit, state}) {
        commit('INIT_BASIC');
    },
    //
    changestyle({dispatch, commit, state}, node, css) {
        state.data.csstext = '';
        // commit('CSS_FRAMEWORK');
        // commit('CSS_GRID');
        // commit('CSS_TABLE');
        // commit('CSS_BTN');
        // commit('CSS_BTNGROUP');
        // commit('CSS_BTNGROUP_GRID');
        // commit('CSS_POPMENU');
        commit('CSS_CHECKBOXRADIO');

        if(node.styleSheet){                                                   //ie下
            node.styleSheet.cssText = state.data.csstext;
        } else {
            node.innerHTML = state.data.csstext;                               //或者写成 nod.appendChild(document.createTextNode(str))
        }
        console.log(state.data.csstext);
    }

};
