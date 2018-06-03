import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";

const model = {
    namespace: "courseTable",
    state: {
        dataSource: [
            {key: 1, id: "20001", courseName: "Software Engineering", timeSlot: "Mon_1_2", semester: "FIRST", credit: 3}
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