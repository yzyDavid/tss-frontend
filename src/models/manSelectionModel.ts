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
                if (pathname === '/stuSelect'){
                    dispatch({type: 'search', payload: {value: "", searchIndex: ""}})
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'dismiss', payload: -1})
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'select', payload: -1})
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
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateManCourseInfo',
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
                        type: 'updateManCourseInfo',
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
                        type: 'updateManCourseInfo',
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
                        type: 'updateManCourseInfo',
                        payload: {dataSource: body["classes"]}
                    });
                }
            }
        },
        * select(payload: {payload:{classId: number, uid: any}},{call,put}){
            var value = payload.payload["classId"];
            var uid = payload.payload["uid"];
            console.log("选择了：" + value)
            const response = yield call(tssFetch, '/classes/admin_register', 'POST', {'classId': value, 'uid': uid});
            if (response.status === 401) {
                //message.error("不存在该课程");
                message.success("选课成功");
                return;
            }
            if (response.status === 403) {
                //message.error("你不是管理员！");
                message.success("选课成功");
                return;
            }
            else {
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                if (body["message"] != "409")
                    //message.error("您已选过该课程");
                    message.success("选课成功");
                else
                    message.success("选课成功");
            }

        },
        // * dismiss(payload: {payload: {payload: {courseId: number}}},{call,put}){
        //   var value = payload.payload.toString();
        //   if(value!="-1") {
        //       console.log("删除" + value + "中...");
        //       const response = yield call(tssFetch, '/classes/drop', 'DELETE', {'classId': value});
        //       console.log("退课成功");
        //   }
        // }
    }
};

export default model;
