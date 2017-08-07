import mt from './mutaions-types';
import Vue from 'vue';

//将native_apps_data的数据结构合并入store
export const marge_data = ({dispatch}, $data) => {
    dispatch( mt.MERGE_DATA, $data );
};


//获取KPI统计排名
export const get_kpiranking = ({dispatch}) => {
	let params = {
		httpType: 'post',
		serviceName: 'assessment',
		functionName: 'getMembersKpiByUserId',
		company_id: nowCompanyId,
		user_id: '',
		token: ''
	};

	return Vue.api.ajax( false, params ).then(( res ) => {
		if( res && res.result && 'TRUE'===res.result ) {
			res.data.sort((a, b) => {					//根据KPI值排倒序
				return a.kpi < b.kpi ? 1 : -1;
			});

			dispatch( mt.SET_KPIRANKING, res.data );
			// console.log( res.data );
		} else {

		}
	}, ( res ) => {
		// debugger;
	});
};

//获取个人页面当前信息
export const get_kpidetail = ({dispatch}, userid) => {
	let params = {
		httpType: 'post',
		serviceName: 'assessment',
		functionName: 'getIndividualAssessment',
		company_id: nowCompanyId,
		user_id: '',
		token: '',
		target_user_id: userid
	};

	return Vue.api.ajax( false, params ).then(( res ) => {
		if( res && res.result && 'TRUE'===res.result ) {
			dispatch( mt.SET_DETAIL, res.data );
			// console.log( res.data );
		} else {

		}
	}, ( res ) => {
		// debugger;
	});
};

//获取个人页面详情列表
export const get_kpilist = ({dispatch}, userid) => {
	let params = {
		httpType: 'post',
		serviceName: 'assessment',
		functionName: 'getStatisticByMonthList',
		company_id: nowCompanyId,
		user_id: '',
		token: '',
		target_user_id: userid
	};

	return Vue.api.ajax( false, params ).then(( res ) => {
		if( res && res.result && 'TRUE'===res.result ) {
			dispatch( mt.SET_LIST, res.data );
			// console.log( res.data );
		} else {

		}
	}, ( res ) => {
		// debugger;
	});
};
