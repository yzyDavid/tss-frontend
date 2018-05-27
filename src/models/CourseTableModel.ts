import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";

const model = {
    namespace: "courseTable",
    state: {
        dataSource: [
            {id: "31500001", name: "小红", major: "计算机科学与技术"},
            {id: "31500002", name: "小刚", major: "软件工程"}
        ]
    },
    reducers: {
        updateStudentList(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/courseTable') {
                    dispatch({ type: 'refreshCourseTable', payload: {classNumber: ""} });
                }
            });
        }
    },
    effects: {
        * refreshCourseTable(payload: { payload: {classNumber: string} }, {call, put}){

        },
    }
}

export default model;