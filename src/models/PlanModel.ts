import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";
import {tssFetch} from "../utils/tssFetch";
import {message} from "antd";

const model = {
    namespace: "plan",
    state: {
        dataSource1: [
            {key:1, courseId: 20111, courseName: "Data Science", credit: 3.0, type: "必修"},
        ],
        dataSource2: [
            {key:1, courseId: 20000, courseName: "sdfa", credit: 4.0, semester: "FIRST" }
        ]
    },
    reducers: {
        updatePlan(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/plan') {
                    dispatch({ type: 'fetchPlan' });
                }
                if (pathname === '/plan') {
                    dispatch({ type: 'fetchCourseList'});
                }
                if (pathname === '/plan') {
                    dispatch({ type: 'addPlan',payload: {courseId: ""}});
                }
                if (pathname === '/plan') {
                    dispatch({ type: 'deletePlan',payload: {courseId: ""}});
                }

            });
        }
    },
    effects: {
        * fetchPlan(payload:{},{call,put}){
            //fetch the latest plan
            const response = yield call(tssFetch, '/program/status', 'GET');
            if(response.status == 200){
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                yield put({
                    type: "updatePlan",
                    payload: {dataSource1: body["courses"]}
                });
            }
        },
        * fetchCourseList(payload: {}, {call,put}){
            //fetch the course list
            //TODO
            // yield put({
            //     type: "updatePlan",
            // })
        },
        * addPlan(payload: {courseId: string}, {call, put}){
            var id = payload["payload"]["courseId"];
            var uid = payload["payload"]["uid"];
            if (id!="") {
                //send a request to add a course
                const response = yield call(tssFetch, '/program/status', 'PUT',{"cid": id, uid: "3150101000", pid: "3150101000", type: 1});
                if(response.status == 200){
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    yield put({
                        type: "fetchPlan",
                        payload: ""
                    });
                }
                else{
                    message.error("无法添加该课程");
                    return;
                }
            }
        },
        * deletePlan(payload: {courseId: string, uid: string}, {call, put}){
            var id = payload["payload"]["courseId"];
            var uid = payload["payload"]["uid"];
            console.log(uid);
            if (id!="") {
                //send a request to delete a course
                const response = yield call(tssFetch, '/program/status', 'DELETE',{"cid": id, uid: "3150101000", pid: "3150101000", type: 1});
                if(response.status == 200){
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    yield put({
                        type: "fetchPlan",
                        payload: ""
                    });
                }
                else{
                    message.error("无法删除该课程");
                    return;
                }

            }
        }
    }
}

export default model;