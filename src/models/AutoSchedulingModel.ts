import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";
import {CourseFormData,CourseInfo} from '../components/ManualScheduling';
import SchedulingTime from '../components/SetSchedulingTime';

const model = {
    namespace: 'autoscheduling',
    state: {
        dataSource: [
            {key: 1, courseNumber: '', courseName: '', restCourseTime: ''},
            ],
        totalCourse: 0,
        schedulingTime: {year: -1, semester: -1}
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
                }
                else if (pathname === '/setSchedulingTime') {
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
            //const tssFetch = (url: string, method: httpMethod, payload: string | object)
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
                type: 'updateSchedulingInfo',
                payload: {
                    schedulingTime: {year: 2018, semester: 2}
                }
            });
            return;
        },

        * setSchedulingInfo(payload: { payload: SchedulingTime}, {call, put}) {
            console.log(payload.payload);
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
            //console.log(body);
            return;
        },
    }
};

export default model;
