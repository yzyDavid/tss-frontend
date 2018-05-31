import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'autoscheduling',
    state: {
        dataSource: [
            {key: 1, courseNumber: '', courseName: '', restCourseTime: ''},
            ],
        totalCourse: 0,
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
                    dispatch({ type: 'restCourseInfo', payload: false});
                    dispatch({ type: 'getSchedulingInfo', payload: false});
                }
            });
        }
    },
    effects: {
        * restCourseInfo(payload: { payload: boolean}, {call, put}) {
            if(!payload.payload)
            {
                console.log('the set up');
                yield put({
                    type: 'updateRestCourseInfo',
                    //payload: {data:body.data}
                    payload: {dataSource:[
                            {key: 1, courseNumber: ' ', courseName: ' ', restCourseTime: ' '},
                        ], totalCourse: "loading......"}
                });
            }
            else {
                //console.log(payload.payload);
                //const msg = payload.payload;
                // //const tssFetch = (url: string, method: httpMethod, payload: string | object)
                // //返回一个js对象
                //const response = yield call(tssFetch, '/classroom/info', 'GET', msg);
                // if(response.status === 400) {
                //    message.error('查询空闲教室信息失败');
                //    return;
                //}
                // const jsonBody = yield call(response.text.bind(response));
                //将字符串转换为json对象
                //const body = JSON.parse(jsonBody);
                yield put({
                    type: 'updateRestCourseInfo',
                    //payload: {data:body.data}
                    payload: {
                        dataSource: [
                            {key: 1, courseNumber: '22221', courseName: '大学英语Ⅲ', restCourseTime: '2'},
                            {key: 2, courseNumber: '22223', courseName: '微积分Ⅲ', restCourseTime: '4'},
                        ], totalCourse: 22
                    }
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
            console.log(payload.payload);
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
