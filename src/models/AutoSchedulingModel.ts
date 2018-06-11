import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'autoscheduling',
    state: {
        dataSource: [{}],
        numArrangedClasses: '还未排课',
        schedulingTime: {year: -1, semester: ''}
    },
    reducers: {
        updateRestCourseInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateSchedulingInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/autoScheduling') {
                    dispatch({ type: 'restCourseInfo', payload: {year: -1}});
                    dispatch({ type: 'getSchedulingInfo', payload: false});
                }
                if(pathname == '/manualScheduling'){
                    dispatch({ type: 'getSchedulingInfo', payload: false});
                }
            });
        }
    },
    effects: {
        * restCourseInfo(payload: { payload: {year: number, semester: string}}, {call, put}) {
            if(payload.payload.year === -1)
            {
                console.log('the set up');
                yield put({
                    type: 'updateRestCourseInfo',
                    payload: {dataSource:[], totalCourse: "还未排课."}
                });
            }
            else {
                const response = yield call(tssFetch,'/auto-arrangement?year='+payload.payload.year+'&semester='+payload.payload.semester , 'PUT');
                if(response.status === 400) {
                   message.error('自动排课失败,请查看是否设置了当前排课时间');
                   return;
                }
                const jsonBody = yield call(response.text.bind(response));
                //将字符串转换为json对象
                const body = JSON.parse(jsonBody);
                yield put({
                    type: 'updateRestCourseInfo',
                    payload: { dataSourse:body.pendingClassIds, numArrangedClasses: body.numArrangedClasses}
                });
            }
            return;
        },

        * getSchedulingInfo(payload: { payload: boolean}, {call, put}) {
            const response = yield call(tssFetch, '/current-year-semester-of-arrangement', 'GET',);
            if(response.status === 400) {
               message.error('查询排课时间信息失败');
               return;
            }
            const jsonBody = yield call(response.text.bind(response));
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'updateSchedulingInfo',
                payload: {schedulingTime: body}
            });
            return;
        },

        * setSchedulingInfo(payload: { payload: {year: number, semester: any} }, {call, put}) {
            //console.log(payload.payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/current-year-semester-of-arrangement', 'PUT',msg);
            if(response.status === 400) {
               message.error('设置失败');
               return;
            }
            return;
        },
    }
};

export default model;
