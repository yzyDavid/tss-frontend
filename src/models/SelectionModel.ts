import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

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
                if (pathname === '/stuSelect'){
                    dispatch({type: 'fetchClassLists'})
                }
            });
        }
    },
    effects: {
        * fetchClassLists(payload:{},{call,put}){
            console.log("~~")
            const response = yield call(tssFetch, '/classes/search', 'POST', {'courseName': ""});
            if(response.status === 401) {
                console.log("error")
                message.error("没有课程可选");
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateCourseInfo',
                payload: {dataSource: body["classes"]}
            });
        },
        * search(payload: { payload: {payload: {value: string, searchIndex: string}}}, {call, put}){
            var value = payload.payload["value"];
            var index = payload.payload["searchIndex"];
            console.log(payload.payload["value"])
            if(index=="课程号")
            {
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseId': value} );
                if(response.status === 401) {
                    message.error("不存在该课程");
                    return;
                }
                else if(response.status==404){
                    message.error("该课程不存在");
                    yield put({
                        type: "fetchClassLists",
                        payload: ""
                    })
                }
                else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    // message.success(body.status);
                    yield put({
                        type: 'updateCourseInfo',
                        payload: {dataSource: body["classes"]}
                    });
                }
            }
            else if(index=="课程名"){
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseName': value});
                if(response.status === 401) {
                    console.log("error")
                    message.error("不存在该课程");
                    return;
                }
                else if(response.status==404){
                    message.error("该课程不存在");
                    yield put({
                        type: "fetchClassLists",
                        payload: ""
                    })
                }
                else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    // message.success(body.status);
                    yield put({
                        type: 'updateCourseInfo',
                        payload: {dataSource: body["classes"]}
                    });
                }
            }
            else if(index=="教师"){
                const response = yield call(tssFetch, '/classes/search', 'POST', {'teacherName': value});
                if(response.status === 401) {
                    console.log("error")
                    message.error("不存在该课程");
                    return;
                }
                else if(response.status==404){
                    message.error("该课程不存在");
                    yield put({
                        type: "fetchClassLists",
                        payload: ""
                    })
                }else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    yield put({
                        type: 'updateCourseInfo',
                        payload: {dataSource: body["classes"]}
                    });
                }
            }
        },
        * select(payload: { payload: {payload: {classId: number}}},{call,put}){
            var value = payload.payload.toString();
            console.log("value" +value);
            if(value!="-1") {
                console.log("选择了：" + value)
                const response = yield call(tssFetch, '/classes/register', 'POST', {'classId': value});
                if (response.status === 409) {
                    message.success("选课成功");
                    return;
                }
                else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                        message.success("选课成功");
                }
            }
        },
        * dismiss(payload: {payload: {payload: {courseId: number}}},{call,put}){
          var value = payload.payload.toString();
          if(value!="-1") {
              const response = yield call(tssFetch, '/classes/drop', 'DELETE', {'classId': value});
              if (response.status === 404) {
                  //message.error("您未选择该门课");
                  message.success("退课成功");
                  return;
              }
              else if (response.status == 409){
                  message.success("退课成功");
              }
              else{
                  message.success("退课成功");
                  return;
              }
          }
        }
    }
};

export default model;
