import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CourseFormData,CourseInfo} from '../components/ManualScheduling';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";

const model = {
    namespace: 'selectCourse',
    state: {
        dataSource: [
            {key: 1, courseId: '00001', classId: '201001',courseName: "My Plan",year: "2018", semester: "SECOND", timeSlot: "SUN_3_5", capacity: 100, numStudent: 0, brief: "asdf"},
            {key: 2, courseId: '00002', classId: '201003',courseName: "your Plan",year: "2018", semester: "SECOND", timeSlot: "SUN_3_5", capacity: 100, numStudent: 0, brief: "bbbb"},
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
                    dispatch({type: 'showAll', payload: {courseId: -1}})
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'search', payload: {value: "", searchIndex: ""}})
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'dismiss', payload: {classId: -1}})
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'select', payload: {classId: -1}})
                }
            });
        }
    },
    effects: {
        * showAll(payload: { payload: {payload: {courseName: number}}}, {call, put}) {
            var value = payload.payload["courseName"].toString();
            console.log(payload.payload["courseName"]);
            //fetch the data of the case and add to the query
            if(value!="-1") {
                yield put(routerRedux.push({pathname: '/course/search?name=' + value, query: payload.payload,}));
            }
            return;
        },
        * search(payload: { payload: {payload: {value: string, searchIndex: string}}}, {call, put}){
            var value = payload.payload["value"];
            var index = payload.payload["searchIndex"];
            console.log(payload.payload["value"])
            if(index=="课程号")
            {
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseName': null, 'courseId': value, 'teacherName': null} );
                if(response.status === 401) {
                    message.error("不存在该课程");
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                // message.success(body.status);
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource: body}
                });
            }
            else if(index=="课程名"){
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseName': value,'courseId': null, 'teacherName': null});
                if(response.status === 401) {
                    console.log("error")
                    message.error("不存在该课程");
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log("success")
                console.log(body["classes"])
                // message.success(body.status);
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource: body["classes"]}
                });
            }
            else if(index=="教师"){
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseName': null, 'courseId': null, 'teacherName': value});
                if(response.status === 401) {
                    console.log("error")
                    message.error("不存在该课程");
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log("success")
                console.log(body["classes"])
                // message.success(body.status);
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource: body["classes"]}
                });
            }
        },
        * select(payload: { payload: {payload: {classId: number}}},{call,put}){
            var value = payload.payload.toString();
            console.log("选择了："+value)
            const response = yield call(tssFetch, '/classes/register', 'POST', {'classId': value});
            if(response.status === 401) {
                message.error("不存在该课程");
                return;
            }
            //const jsonBody = yield call(response.text.bind(response));
            //const body = JSON.parse(jsonBody);
            else {
                console.log("选课成功");
            }
        },
        * dismiss(payload: {payload: {payload: {courseId: number}}},{call,put}){
          var value = payload.payload.toString();
          console.log("删除"+value+"中...");
            const response = yield call(tssFetch, '/classes/drop', 'DELETE', {'classId': value});
            console.log("退课成功");
        }
    }
};

export default model;
