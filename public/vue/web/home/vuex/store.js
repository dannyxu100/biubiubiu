import mt from './mutaions-types';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	data_copy: {},
    data: {
		kpiranking: [],
		kpilist: [],
		kpidetail: {
			'unsettledTime': 0,			//未结算人天
			'workingTime': 0,			//工作有效人天
			'cusFixedTime': 0,			//客户通过人天
			'cusAddTime': 0,			//客户追加人天
			'wasteTime': 0,				//浪费人天
			'taskPredictTime': 0,		//任务排期人天
			'taskConsumeTime': 0,		//任务消耗人天
			'trainTime': 0, 			//培训人天
			'mentorTime': 0,			//导师抽取人天
			'freeTime': 0,				//空闲人天
			'professionalDegree': 0,	//技术平均评分，专业度
			'approvalDegree': 0, 		//认可度平均评分
			'rank': 0,  				//参与任务人员级别
			'extractTime': 0, 			//抽取人天
			'contributionTime': 0, 		//贡献人天
			'effectiveTime': 0, 		//评审人天
			'username': '', 			//名称
			'sex': '男', 				//性别
			'department': '', 			//部门
			'profession': '', 			//专业方向
			'level': '', 				//级别
			'entryTime': '', 			//入职时间
			'levelStartTime': '',		//级别开始时间
			'levelEffecTime': '',		//级别有效时间
			'levelEndTime': '',			//级别到期时间
			'artistKpi': '%' 			//kpi
		}
	}
};

const mutations = {
    [mt.MERGE_DATA] ( state, newdata ) {
		state.data_copy = Vue.api.copy( state.data );				//备份，做重置覆盖使用
        state.data = Object.assign( state.data, newdata );
    },
    [mt.SET_KPIRANKING] ( state, list ) {
        state.data.kpiranking = list;
    },
    [mt.SET_DETAIL] ( state, detail ) {
        state.data.kpidetail = detail;
    },
    [mt.SET_LIST] ( state, list ) {
        state.data.kpilist = list;
    }
};

export default new Vuex.Store({
    state,
    mutations
});

