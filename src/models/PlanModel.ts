import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";

const model = {
    namespace: "plan",
    state: {
        dataSource1: [
            {key: 1, courseId: 20111, courseName: "Data Science", credit: 3.0, type: "必修"},
        ],
        dataSource2: [
            {key: 1, courseId: 20000, courseName: "sdfa", credit: 4.0, semester: "FIRST"}
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
                    dispatch({type: 'fetchPlan'});
                }
                if (pathname === '/plan') {
                    dispatch({type: 'fetchCourseList'});
                }
                if (pathname === '/plan') {
                    dispatch({type: 'addPlan', payload: {courseId: ""}});
                }
                if (pathname === '/plan') {
                    dispatch({type: 'deletePlan', payload: {courseId: ""}});
                }

            });
        }
    },
    effects: {
        * fetchPlan(payload: {}, {call, put}) {
            //fetch the latest plan
            //TODO
            yield  put({
                type: "updatePlan",
                payload: {dataSource2: [{key: 1, courseId: "20111", courseName: "Data", credit: 3.0, type: "必修"}]}
            })
        },
        * fetchCourseList(payload: {}, {call, put}) {
            //fetch the course list
            //TODO
            // yield put({
            //     type: "updatePlan",
            //     payload: {dataSource1: []}
            // })
        },
        * addPlan(payload: { courseId: string }, {call, put}) {
            let id = payload["payload"]["courseId"];
            if (id != "") {
                //send a request to delete a course
                //TODO
            }
        },
        * deletePlan(payload: { courseId: string }, {call, put}) {
            let id = payload["payload"]["courseId"];
            if (id != "") {
                //send a request to add a course
                //TODO
                //update the plan
                //TODO
            }
        }
    }
};

export default model;
