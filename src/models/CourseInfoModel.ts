import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CourseFormData} from '../components/ManualScheduling';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";

const model = {
    namespace: 'courseinfo',
    state: {
        dataSource: [
            {id :'',courseId:'', courseName:'', numLessonsLeft:''},
        ],
        clazzInfo:{courseId:'', courseName:'', numLessonsLeft:'',numLessonsEachWeek:'',arrangements:[{buildingName:'',classroomId:'', typeName:''},]}
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
                const response = yield call(tssFetch, '/classes/search/find-by-course-name-containing-and-year-and-semester?courseName='+payload.payload.courseName+'&year=2017&semester=FIRST', 'GET');
                //console.log(response);
                if (response.status === 400) {
                    message.error('课程信息错误');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                //console.log(body);
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource:body}
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
            console.log(payload.payload);
            const response = yield call(tssFetch, '/classes/'+payload.payload, 'GET');
            if (response.status === 400) {
                message.error('课程信息错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateClassInfo',
                payload: {clazzInfo:body}
            });
            return;
        },

        * deleteClassArrange(payload: { payload:{classroomId: number, typeName: any, classId: number} }, {call, put}) {
            // console.log('delectedCourseInfo ');
            // console.log(payload.payload);
            var classId = payload.payload.classId;
            const response = yield call(tssFetch, '/classrooms/'+payload.payload.classroomId+'/time-slots/'+payload.payload.typeName+'/clazz', 'DELETE');
            if(response.status === 400) {
                message.error('删除信息失败');
                return;
            }
            yield put({
                type: 'getClassInfo',
                payload: classId
            });
            return;
        },

        * modifyClassArrange(payload: { payload:{classroomId: number, typeName: any, classId: number} }, {call, put}) {
            //console.log(payload.payload);
            var classId = payload.payload.classId;
            const response = yield call(tssFetch, '/classrooms/'+payload.payload.classroomId+'/time-slots/'+payload.payload.typeName+'/clazz/?classId='+payload.payload.classId, 'PUT');
            if(response.status === 400) {
                message.error('修改信息失败');
                return;
            }
            yield put({
                type: 'getClassInfo',
                payload: classId
            });
            return;
        },

    }
};

export default model;
