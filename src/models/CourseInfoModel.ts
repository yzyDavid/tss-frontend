import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CourseFormData} from '../components/ManualScheduling';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";

const model = {
    namespace: 'courseinfo',
    state: {
        dataSource: [
            {id :'',courseId:'', courseName:'', numLessonsLeft:'',  courseAddress:'',  courseTime:''},
        ],
        clazzInfo:{courseId:'', courseName:'', numLessonsLeft:'',numLessonsEachWeek:'',arrangements:[{buildingName:'',classroomId:'', type:''},]}
    },
    reducers: {
        updateCourseInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateClassInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateClassArrangeInfo(st, payload) {
            var clazzInfo = {...st.clazzInfo,...payload.payload};
            return {...st, clazzInfo};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/manualScheduling') {
                    dispatch({ type: 'courseInfo', payload: {key: 1, courseName: ''} });
                }
            });
        }
    },
    effects: {
        * courseInfo(payload: { payload: CourseFormData}, {call, put}) {
            //console.log((!payload.payload.campus));
            //console.log(payload.payload);
            if((!payload.payload.courseName))
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource:[
                            {id: '', courseId:'', courseName:'', numLessonsLeft:'',  courseAddress:'',  courseTime:''},]}});
            else
            {
                const response = yield call(tssFetch, '/classes/search/findByCourse_NameAndYearAndSemester?courseName='+payload.payload.courseName, 'GET');
                //console.log(response);
                if (response.status === 400) {
                    message.error('课程信息错误');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log(body);
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource:body["classes"]}
                });
            }
            return;
        },

        * modifyCourseInfo(payload: { payload: number }, {call, put}) {
            const value = payload.payload;
            //fetch the data of the case and add to the query
            yield put({
                type: 'getClassInfo',
                payload: value});
            yield put(routerRedux.push({pathname:'/manualSchModify/'+value,query: payload.payload,}));
            return;
       },

        * getClassInfo(payload: { payload: number }, {call, put}) {
            const response = yield call(tssFetch, '/classes/'+payload.payload, 'GET');
            if (response.status === 400) {
                message.error('课程信息错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'updateClassInfo',
                payload: {clazzInfo:body}
            });
            return;
        },

        * deleteClassArrange(payload: { payload: number }, {call, put}) {
            console.log('delectedCourseInfo ');
            // console.log(payload.payload);
            // const msg = payload.payload;
            // // //const tssFetch = (url: string, method: httpMethod, payload: string | object)
            // // //返回一个js对象
            // const response = yield call(tssFetch, '/classroom/info', 'GET', msg);
            // if(response.status === 400) {
            //     message.error('查询空闲教室信息失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // //将字符串转换为json对象
            // const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateClassArrangeInfo',
                //payload: {data:body.data}
                payload: { arrangements:[
                    {buildingName:'123',classroomId:'456', type:'789'},{buildingName:'456',classroomId:'789', type:'000'}]}
            });
            return;
        },
    }
};

export default model;
