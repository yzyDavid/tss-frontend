import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CourseFormData,CourseInfo} from '../components/ManualScheduling';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";

const model = {
    namespace: 'selectCourse',
    state: {
        dataSource: [
            {key: 1, courseNumber: '00001', courseTitle: '线性代数', courseAddress: '3150100001', courseTime: '16:30-18:30', semester: '秋冬', credit: 2},
            {key: 2, courseNumber: '00002', courseTitle: '微积分', courseAddress: '3150100002', courseTime: '16:30-18:30', semester: '秋', credit: 3},
        ]
    },
    reducers: {
        updateCourseInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/selection') {
                    dispatch({ type: 'courseInfo', payload: {key: 1, courseNumber: '', courseTitle: '', courseAddress: '', courseTime: ''} });
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'showAll', payload: {courseId: 1}})
                }
            });
        }
    },
    effects: {
        * showAll(payload: { payload: {payload: {courseId: number}}}, {call, put}) {
            const value = payload.payload.toString();
            console.log(payload.payload);
            //fetch the data of the case and add to the query
            yield put(routerRedux.push({pathname:'/manualSchModify/'+value,query: payload.payload,}));
            return;
        },

        * modifyCourseInfo(payload: { payload: CourseInfo}, {call, put})
        {
            const value = payload.payload.courseNumber.toString();
            //console.log(payload.payload);
            //fetch the data of the case and add to the query
            yield put(routerRedux.push({pathname:'/manualSchModify/'+value,query: payload.payload,}));
            return;
        },
    }
};

export default model;
