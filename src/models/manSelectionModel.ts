import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'selectManCourse',
    state: {
        dataSource: [
        ]
    },
    reducers: {
        updateManCourseInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/manSelect'){
                    dispatch({type: 'fetchClassLists', payload: -1})
                }
            });
        }
    },
    effects: {
        * fetchClassLists(payload:{},{call,put}){
            const response = yield call(tssFetch, '/classes/search', 'POST', {'courseName': ""});
            if(response.status === 401) {
                console.log("error")
                message.error("没有课程可选");
                return;
            }
            else {
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                yield put({
                    type: 'updateManCourseInfo',
                    payload: {dataSource: body["classes"]}
                });
            }
        },
        * search(payload: { payload: {payload: {value: string, searchIndex: string}}}, {call, put}){
            var value = payload.payload["value"];
            var index = payload.payload["searchIndex"];
            console.log(payload.payload["value"])
            if(index=="课程号")
            {
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseId': value} );
                if(response.status != 200) {
                    message.error("不存在该课程");
                    yield put({
                        type: 'updateManCourseInfo',
                        payload: {dataSource: []}
                    });
                }
                else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    // message.success(body.status);
                    yield put({
                        type: 'updateManCourseInfo',
                        payload: {dataSource: body["classes"]}
                    });
                }
            }
            else if(index=="课程名"){
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseName': value});
                if(response.status != 200) {
                    message.error("不存在该课程");
                    yield put({
                        type: 'updateManCourseInfo',
                        payload: {dataSource: []}
                    });
                }
                else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    // message.success(body.status);
                    yield put({
                        type: 'updateManCourseInfo',
                        payload: {dataSource: body["classes"]}
                    });
                }
            }
            else if(index=="教师"){
                const response = yield call(tssFetch, '/classes/search', 'POST', {'teacherName': value});
                if(response.status != 200) {
                    message.error("不存在该课程");
                    yield put({
                        type: 'updateManCourseInfo',
                        payload: {dataSource: []}
                    });
                }
                else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    yield put({
                        type: 'updateManCourseInfo',
                        payload: {dataSource: body["classes"]}
                    });
                }
            }
        },
        * select(payload: {payload:{classId: number, uid: any, courseId}},{call,put}) {
            var value = payload.payload["classId"];
            var uid = payload.payload["uid"];
            var courseId = payload.payload["courseId"];
            console.log("选择了：" + value)
            const response = yield call(tssFetch, '/classes/admin_register', 'POST', {'classId': value, 'uid': uid});
            if (response.status != 200) {
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body["status"]);
                return;
            }
            else {
                const response = yield call(tssFetch, '/classes/search', 'POST', {'courseId': value} );
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                // message.success(body.status);
                yield put({
                    type: 'updateManCourseInfo',
                    payload: {dataSource: body["classes"]}
                });
                message.success("选课成功");

            }
        }

    }
};

export default model;
